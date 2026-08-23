# Steckbares Login - Auth-Provider

Status: geplant, nicht begonnen. Aufgenommen am 23.08.2026.

## Warum

Das Ziel ist, dass eine Schule Electra selbst hosten kann - wenigstens zum
Ausprobieren, ohne Vertrag, ohne Konto bei uns. Der Weg dahin ist ein
Docker-Image (siehe `Selfhosting.md`, noch nicht geschrieben). Das Login steht
dem heute im Weg, an drei Stellen:

1. **Der Ingress startet ohne Google gar nicht.**
   `ingress/server/index.js:76` macht aus einer fehlenden `GOOGLE_CLIENT_ID`
   ein hartes `die()`. Ein Selbsthoster bräuchte also ein eigenes
   Google-Cloud-Projekt, bevor überhaupt irgendetwas läuft.

2. **Selbst mit Projekt bleibt Google unerreichbar.** Google Sign-In verweigert
   Nicht-HTTPS-Origins ausser `localhost`, und die Redirect-URIs müssten je
   Installation registriert werden. Für eine Schul-IT ist das kein Weg.

3. **Drei Seiten rufen Google fest verdrahtet auf:**
   `simulator/public/index.html:475`, `author/public/index.html:321`,
   `designer/public/index.html:398` laden `accounts.google.com/gsi/client`.
   Offline hängt das im Timeout, im Schulnetz ist es genau der Google-Kontakt,
   den wir beim Tag Manager rausgeworfen haben.

Daraus folgt nicht "Login weg", sondern **Login steckbar**: die öffentliche
Installation behält Google, die Schulinstallation nimmt lokale Konten oder den
Identitätsanbieter des Landes, der Probier-Container nimmt gar keins.

---

## Bestandsaufnahme

Nachgemessen am 23.08.2026. Die gute Nachricht zuerst: **Identität betritt das
System an genau einer Stelle und verlässt sie als zwei HTTP-Header.** Der
Umbau ist dadurch räumlich begrenzt.

| Was | Wo | Anmerkung |
|---|---|---|
| Identität entsteht | `ingress/server/index.js:275-321` | `oauth/callback` schreibt `req.session.{email,name,picture,...}` |
| Identität wird verteilt | `ingress/server/index.js:148-176` | `onProxyReq` setzt `x-mail` / `x-role` an jedem weitergeleiteten Request |
| Identität wird gelesen | 12 Backend-Dateien | **keine davon kennt Google** |
| Rolle | `ingress/server/index.js:82,92` | `roleOf()` vergleicht gegen `ADMIN_MAIL`, sonst `"user"` |
| Profil ans Frontend | `userinfo/server/index.js:55` | `sendProfile` baut die Antwort ausschliesslich aus den Headern |
| Frontend "wer bin ich" | `common/public/js/session.js` | `GET /userinfo`, 403 heisst anonym |
| Frontend "wie ist diese Installation aufgesetzt" | `common/public/js/authConfiguration.js` | `GET /auth/configuration`, heute nur `{googleClientId}` |
| Login-UI | `common/public/js/Userinfo.js` | Zeile 14: ohne Client-ID wird der Anmeldeknopf entfernt, der Rest läuft weiter |

Die zwölf lesenden Dateien, damit später niemand suchen muss:

```
brains/server/db.js            shapes/server/db.js            sheets/server/db.js
brains/server/files.js         shapes/server/handler/index.js sheets/server/files.js
brains/server/utils/auth-headers.js
                               shapes/server/handler/part.js  sheets/server/utils/auth-headers.js
database/server/auth.js        userinfo/server/index.js       userinfo/server/utils/auth-headers.js
```

### Zwei Befunde, die den Zuschnitt bestimmen

**Es gibt keine Benutzertabelle.** Die Migrationen 001 bis 012 legen `scopes`,
`scope_closure`, `memberships`, `versions`, `votes`, `blobs` und `activity` an -
kein Benutzer, kein Passwort, kein Konto. Identität ist ein blosser String:
`person_ref text NOT NULL`
(`database/server/persistence/migrations/001_initial.sql:43`), in
`database/server/auth.js` schlicht `personRef = mail`, **nirgends eine Prüfung
auf E-Mail-Form**.

- Gut: ein Benutzername trägt als `person_ref` ohne jede Schemaänderung.
  `kevin` statt `kevin@gmail.com`, Mitgliedschaften und Scopes funktionieren
  unverändert weiter.
- Teuer: `local` bringt die erste echte Benutzerverwaltung ins Produkt. Tabelle,
  Hash, Lebenszyklus. Das Anmeldeformular ist davon der kleinste Teil.

**`usermanagement` ist eine tote Flagge.** Sie steht in allen drei Dateien
`permissions/server/permissions-{anonym,user,admin}.json` auf `false`, auch bei
admin. Es gibt keine Oberfläche dahinter. Die Admin-Seite ist grüne Wiese.

**Nebenbefund, der Stufe 1 billiger macht:** `common/public/js/Userinfo.js:1`
importiert `loadScript` und benutzt es nicht - ein Rest aus der Zeit, als das
GSI-Skript dynamisch geladen wurde. Der Lader existiert also schon
(`common/public/js/loadScript.js`, versprechensbasiert, in
`ComponentIndex.js:75` in Benutzung). Die drei festen `<script>`-Zeilen können
ersatzlos raus und werden nur noch geladen, wenn der Google-Anbieter aktiv ist.

---

## Die Anbieter

| Kennung | Für wen | Aufwand |
|---|---|---|
| `google` | die öffentliche Installation, unverändert | schon da, nur hinter die Weiche |
| `local` | Schulen ohne Identitätsanbieter, Container mit Klassenkonten | der Brocken |
| `oidc` | weiterführende Schulen: Entra, Keycloak, Authentik, Landesanbieter | erst auf Nachfrage |

### Warum kein "Sozial"

GitHub, Microsoft-Privatkonto, Apple, Discord. Verworfen, nicht vergessen:

- Schulen können von Schülern kein GitHub-Konto verlangen.
- Auf der öffentlichen Seite steht Google bereits.
- Jeder Anbieter ist eine eigene Integration mit eigener Konsole, eigenen
  Redirect-URIs und eigener Pflege - der Posten mit dem meisten Aufwand und der
  geringsten Nachfrage.

**Ein generisches OIDC deckt stattdessen Entra, Keycloak, Authentik und die
Landes-Identitätsanbieter mit einer Implementierung ab.** Das ist der Anschluss,
nach dem eine Schul-IT tatsächlich fragt. Falls später doch ein einzelner
sozialer Anbieter gebraucht wird, ist er über dieselbe Schnittstelle ein
Nachmittag.

---

## Konfiguration

**Eine Liste, kein Einzelwert:**

```ini
AUTH_PROVIDERS=local,oidc
```

Eine Schule mit Entra will trotzdem zwei lokale Konten für Vertretung und Gäste.
Eine Liste später auf einen Skalar nachzurüsten bricht die Konfiguration jeder
bestehenden Installation - jetzt kostet es nichts.

| Installation | Wert |
|---|---|
| electra.academy | `google` |
| Schulserver | `local` oder `oidc` oder beides |
| Probier-Container | leer |

**Leer heisst sauber "kein Login, reiner Anonym-Modus"** und ersetzt damit das
`die()` in Zeile 76.

`/auth/configuration` liefert danach statt `{googleClientId}` eine
Anbieterliste, aus der das Frontend die Anmeldefläche baut. Der Kommentar in
`authConfiguration.js` formuliert die Frage schon heute wörtlich als *"how is
this install set up?"* - die Erweiterung passt in die vorhandene Absicht.

---

## Stufen

### Stufe 1 - Die Weiche, plus Anonym-Fall

Der Teil, der den Container überhaupt startbar macht. Ohne `local`, ohne `oidc`.

| Datei | Änderung |
|---|---|
| `ingress/server/index.js:76` | `die()` raus, `AUTH_PROVIDERS` einlesen, Google-Pfad nur registrieren, wenn `google` in der Liste steht |
| `ingress/server/index.js:271` | `/auth/configuration` liefert `{ providers: [...] }`; Google-Zweig behält seine `clientId` darin |
| `common/public/js/authConfiguration.js` | `getProviders()` neben dem bestehenden `getGoogleClientId()`, das solange bleibt, bis der letzte Aufrufer weg ist |
| `common/public/js/Userinfo.js` | rendert je Anbieter; GSI-Skript per vorhandenem `loadScript`, nur wenn `google` aktiv |
| `simulator/public/index.html:475`, `author/public/index.html:321`, `designer/public/index.html:398` | die festen `<script>`-Zeilen entfernen |
| `settings.ini`, `ansible/secrets.ini` | `AUTH_PROVIDERS=google` für die öffentliche Installation |

Ergebnis: unverändertes Verhalten auf electra.academy, und ein Start ohne jede
Google-Konfiguration ist möglich - dann ohne Anmeldung und **ohne einen einzigen
Aufruf an Google**.

### Stufe 2 - `local`

Neue Tabelle, Anmeldeformular, Lehrer-Admin-Seite. Details unten.

### Stufe 3 - `oidc`

Erst, wenn eine Schule danach fragt. Vorher weiss man nicht, gegen welchen
Anbieter man baut, und baut am Ende gegen den falschen.

---

## Stufe 2 im Detail

### Kein Self-Service-Reset

Self-Service heisst E-Mail: SMTP-Server, Zugangsdaten, Token mit Ablauf,
Zustellbarkeit, Rate Limit. In einem Schulcontainer nicht machbar - kein
Mailserver, oft gesperrte Ports.

Schulen brauchen es auch nicht. Sie brauchen **vom Lehrer angelegte Konten**:
Klasse anlegen, Schüler eintragen, Passwörter auf Papier verteilen, bei Kevin
auf "Zurücksetzen" klicken. Kein Mailversand, nirgends.

Das streicht SMTP, Reset-Token-Tabelle, Verifikationsmails, den
"Passwort vergessen"-Fluss und das Debuggen von Zustellproblemen. **Die
Admin-Seite ersetzt den Reset-Fluss, sie kommt nicht zusätzlich dazu.**

### Schema

Eine Migration, eine Tabelle:

```sql
CREATE TABLE local_accounts (
    person_ref    text PRIMARY KEY,       -- derselbe String wie in memberships
    display_name  text NOT NULL,
    pwd_hash      text NOT NULL,
    must_change   boolean NOT NULL DEFAULT true,
    disabled      boolean NOT NULL DEFAULT false,
    created_at    timestamptz NOT NULL DEFAULT now(),
    created_by    text
);
```

`person_ref` ist der Fremdschlüssel in der Sache, nicht in der Datenbank -
`memberships.person_ref` kennt auch Google-Adressen, die hier nie stehen werden.

**Zum Hash: `crypto.scrypt` aus dem Node-Kern.** Kein `argon2`, obwohl es die
etwas modernere Wahl wäre - argon2 braucht `node-gyp` und eine
Übersetzungswerkzeugkette, und das schlägt genau dort zu, wo es am meisten
stört: im Docker-Bau und beim Selbsthoster ohne Compiler. scrypt ist von der
OWASP als Passwort-KDF anerkannt und schon installiert.

### Oberflächen

**Anmeldeformular.** Ein Dialog im Appbar-Umfeld, dort wo heute der
GSI-Knopf gerendert wird (`.userinfo_toggler`). Eine Stelle, weil alle Apps sich
die Appbar aus `common` holen.

**Lehrer-Admin-Seite.** Drei Knöpfe, mehr nicht:

| Aktion | Verhalten |
|---|---|
| Anlegen | Name eingeben, Passwort wird erzeugt und **einmal angezeigt**, `must_change = true` |
| Zurücksetzen | neues Passwort, einmal angezeigt, `must_change = true` |
| Deaktivieren | `disabled = true`; nicht löschen, sonst verwaisen Dokumente und Mitgliedschaften |

Dazu ein Sammelanlegen: eine Liste von Namen einfügen, eine Tabelle mit
Zugangsdaten zum Ausdrucken fällt heraus. Das ist die Funktion, die im
Klassenzimmer den Unterschied macht.

Aufhängen an `usermanagement` in `permissions-admin.json` - die Flagge existiert
schon und wartet auf ihren Inhalt.

---

## Fallen

1. **Der erste Admin.** `roleOf()` vergleicht gegen `ADMIN_MAIL`, und in einem
   frischen Container gibt es niemanden mit dieser Adresse. Lösung wie bei Gitea
   und Jellyfin: beim ersten Start ohne Konto ein Einmal-Passwort **ins
   Container-Log** schreiben. Besser als ein Standardpasswort, das nie geändert
   wird.

2. **Sessions leben im Speicher, und `SESSION_SECRET` wird bei jedem Start neu
   gewürfelt** (`ingress/server/index.js:88`, der Kommentar dort sagt es
   selbst). Heute fällt das kaum auf, weil ein Neustart selten ist und Google
   sofort wieder anmeldet. Mit lokalem Login wirft jeder Neustart die ganze
   Klasse mitten in der Stunde raus. Also: fester `SESSION_SECRET` **und** ein
   Session-Store in Postgres. Gehört zu Stufe 2, nicht später.

3. **Passwörter über HTTP im LAN.** Ehrlich bleiben: das Risiko ist klein -
   Passwörter vom Zettel, geschützt werden Zeichnungen von UND-Gattern. Trotzdem
   soll die Voreinstellung nicht stillschweigend Klartext über ein Netz
   schicken. Ein kleiner Riegel: `local` nur auf `localhost` oder über HTTPS,
   ausser der Betreiber setzt ausdrücklich `AUTH_ALLOW_INSECURE=true`.

4. **`roleOf()` ist der einzige Ort für die Plattformrolle** und soll es
   bleiben. Kein Anbieter darf eine Rolle mitbringen - `local` liefert eine
   `person_ref`, sonst nichts. Sonst gibt es zwei Wahrheiten darüber, wer Admin
   ist.

---

## Verifikation

```bash
# Stufe 1: die oeffentliche Installation darf sich nicht veraendern
curl -s localhost:8080/auth/configuration      # providers: ["google"], clientId unveraendert

# Stufe 1: Start ohne jede Google-Konfiguration
AUTH_PROVIDERS= pm2 startOrRestart ecosystem.config.js
curl -sI localhost:8080/                       # 200, kein die()
curl -s localhost:8080/simulator/ | grep -c "accounts.google.com"   # muss 0 sein

# Stufe 2: anmelden, arbeiten, neu starten, immer noch angemeldet
# Stufe 2: Konto anlegen -> speichern -> Dokument haengt an der person_ref
```

Der eigentliche Test ist keiner von diesen: **eine Schule startet den Container,
legt eine Klasse an und hält eine Stunde damit.** Alles davor ist nur die
Voraussetzung dafür.

---

## Bewusst nicht enthalten

- **Kein sozialer Anbieter.** Begründung oben; die Schnittstelle bleibt offen.
- **Kein Self-Service-Reset, keine E-Mail.** Ersetzt durch die Admin-Seite.
- **Keine Passwortrichtlinie, keine Sperre nach Fehlversuchen.** Für einen
  Klassensatz Konten hinter der Schulfirewall überflüssig. Wenn Electra einmal
  öffentlich lokale Konten anbietet, ändert sich das - dann aber mit Anlass.
- **Kein Umbau des Google-Pfads auf generisches OIDC.** Technisch möglich
  (Google ist OIDC), aber der bestehende Weg nutzt den GSI-Knopf mit
  One-Tap-Verhalten, das reines OIDC nicht mitbringt. Funktioniert, bleibt.
- **Keine Umstellung von `person_ref` auf eine Benutzer-ID.** Der freie
  Textschlüssel trägt beide Welten; eine Normalisierung wäre eine Migration
  quer durch `memberships`, `versions` und `activity` ohne heutigen Nutzen.

---

## Aufwand

| Stufe | |
|---|---|
| 1 Anbieterliste, Anonym-Fall, Google-Skripte lösen | ~4 h |
| 2 `local`: Schema, Hash, Formular, Admin-Seite, Session-Store | ~2 Tage |
| 3 `oidc` | ~1 Tag, erst auf Nachfrage |

Stufe 1 ist die Voraussetzung für das Docker-Image und lohnt sich auch dann,
wenn Stufe 2 nie kommt: ein Container ohne Login ist heute schon ein
vollwertiger Probier-Modus, weil `permissions-anonym.json` Simulator, Designer,
Author und die Schaltungsbibliothek bereits freigibt.

Stufe 2 ist das, was aus dem Probieren Unterricht macht - mit eigenen Konten
trägt das vorhandene Scope- und Mitgliedschaftsmodell ohne eine einzige
Änderung, und die Frage "dürfen Schüler speichern" beantwortet sich von selbst.
