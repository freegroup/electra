# Shapes Rework - Bauteile auf dem Dokument-Backend

Simulator und Author liegen auf dem neuen Backend, die Bauteile (Shapes) noch
nicht. Dieses Dokument setzt fest, wie sie dorthin kommen.

---

## Leitsatz

> **Ein Bauteil ist ein Dokument. Es wird gegen den Workspace der geöffneten
> Schaltung aufgelöst, nicht gegen die Menge aller Workspaces des Nutzers.**

Alles Weitere folgt daraus.

---

## 1. Ausgangslage

Zwei Eigenschaften des heutigen Systems bestimmen den Entwurf.

**Ein Bauteil ist zur Laufzeit eine globale JS-Variable.** Der generierte Index
definiert `var NAND = CircuitFigure.extend({...})`, instanziiert wird über genau
diesen Bezeichner mit `eval` ([View.js:437](simulator/public/js/View.js#L437)).
Der Scope steckt nicht im Bezeichner. Es gibt also **einen Namensplatz pro
Bauteilname für die ganze Seite**: Zwei Varianten desselben Bauteils können nicht
gleichzeitig geladen sein.

**Der Simulator braucht alle Bauteile, bevor er eine Schaltung öffnet.** Er lädt
`/shapes/index.js` einmal beim Start, ohne Bezug zur später geöffneten Datei
([Configuration.js:44](simulator/public/js/Configuration.js#L44)). Die globale
Index-Datei hat 24.299 Zeilen.

---

## 2. Ein Bauteil ist ein Dokument

Die fünf Dateien eines Bauteils - `.shape` (Geometrie und Ports), `.custom`
(handgeschriebene Quelle), `.js` (generiert), `.md` (Dokumentation) und `.png`
(Vorschau) - bilden **ein** Dokument.

Damit ist ein Bauteil eine Version, ein Review, ein Promote. Es kann nicht
passieren, dass die Logik freigegeben ist und die Vorschau noch die alte zeigt.

**Die vier Textteile liegen in `data`, die `.png` als Blob.** `blobs` hängt über
einen Fremdschlüssel auf `(scope_id, doc_path, version)` mit `ON DELETE CASCADE`
an genau der Version ([003_blobs.sql](database/server/persistence/migrations/003_blobs.sql)).
Das Bild ist also mitversioniert und stirbt mit seiner Version - die Atomizität
bleibt - aber es liegt nicht in der Zeile, die beim Bauen des Index über **alle**
Bauteile gelesen wird. Genau darauf kommt es in Abschnitt 4.2 an.

**Die Teileliste ist offen.** `data` ist eine benannte Ablage, kein Formular mit
fünf Feldern: Ein sechster Teil - Testfälle, Übersetzungen, eine Simulationsnote,
was auch immer - ist ein neuer Schlüssel, keine Migration. Für Binärteile gilt
dasselbe, weil der Primärschlüssel von `blobs` das Feld `key` enthält: Mehrere
benannte Bilder pro Version sind bereits vorgesehen, ohne dass etwas geändert
werden müsste.

Wer einen Teil nicht kennt, ignoriert ihn. Ein alter Client an einem neuen
Bauteil verliert nichts, solange er das Dokument nicht zurückschreibt.

### 2.1 Gezeichnet und programmiert

Nicht jedes Bauteil ist Inhalt. Von 119 Bauteilen im heutigen Bestand tragen
**108 eine `.shape`-Datei, 11 nicht** - und der Index-Generator unterscheidet das
längst: `type: "shape"` gegen `type: "code"`.

Die 11 sind `drawing/{Line,Circle,Rectangle,Polygon,Text}`,
`widget/{Wasm,Text,Markdown}`, `analog/{Slider,Sparkline}` und
`digital/signal/VerticalBus`. Sie sind **keine Zeichnungen ohne Bild**, sondern
Programme: `VerticalBus.js` leitet von `draw2d.shape.node.VerticalBus` ab und
definiert nebenbei eine eigene Locator-Klasse.

**Der Designer kann sie nicht pflegen.** Er lädt `.shape`-Dateien und lässt
innerhalb eines vorgegebenen Gerüsts `calculate` und einige Geschwister
überschreiben; Basisklasse und Konstruktor sind gesetzt. Das ist eine Grenze
seines Modells, keine fehlende Schaltfläche.

Für die **Ablage** ändert das trotzdem nichts: Auch sie werden Dokumente. Der Typ
entscheidet nur, wie sie bearbeitet werden, nicht wo sie liegen.

### 2.2 Zwei Wege in die Datenbank: `seed/` und `builtin/`

Ausgelieferter Inhalt kommt aus dem Repository, aber nicht jeder auf dieselbe
Weise. Der Unterschied ist die **Eigentümerschaft**:

| | `seed/` | `builtin/` |
|---|---|---|
| gehört danach | der Gemeinschaft | dem Deploy |
| wird eingespielt | **einmal** | bei jedem Start abgeglichen |
| änderbar über Promote | ja | nein, wird zurückgesetzt |
| Marker in `meta` | nein | `builtin: true` |

Der Pfad kommt in beiden Fällen aus der Verzeichnisstruktur, das Ziel ist fest
der Scope **`apps`** (`electra/content/apps`) - es wird kein Scope aus dem
Verzeichnis abgeleitet.

```
database/seed/shapes/digital/gate/IEC60617-12/AND.{shape,custom,js,md,png}
database/builtin/shapes/drawing/Line.{js,png}
database/seed/brains/8-bit-computer/004-Memory.brain
```

**Beide Ordner werden rekursiv gelesen**, beliebig tief, genau wie heute. Die
Verzeichnisstruktur ist dabei nicht nur Ordnung, sie trägt Bedeutung: Sie wird
zum Dokumentpfad, sie liefert die `tags`, nach denen die Palette filtert, und sie
erzeugt den **Bezeichner** des Bauteils.

Daraus folgt eine harte Nebenbedingung der Migration:

> **Die Ableitung Pfad → Bezeichner darf sich nicht ändern.**

`digital/gate/IEC60617-12/AND` wird zu `digital_gate_IEC60617_12_AND` -
Schrägstriche und Bindestriche werden zu Unterstrichen. Dieser Name steht in
**jeder gespeicherten Schaltung**, weil draw2d den Figurentyp so serialisiert und
`View.js` ihn per `eval` wieder instanziiert. Weicht die neue Ableitung auch nur
in einem Zeichen ab, öffnet kein Bestandsdokument mehr. Ein Test, der die
Bezeichner vor und nach der Migration vergleicht, gehört zu Schritt 1b.

Damit ist kein neuer Boden nötig: `apps` ist der geteilte Wurzel-Workspace, in
den ohnehin jeder per Bootstrap eingeschrieben wird, und damit die unterste
Ebene jeder Kette. Für jeden Leser ist der Bestand anschließend **ganz normaler
Dokumentbestand** - der Index-Dienst globt und bekommt alles, ohne Voranstellen,
Mischen oder eine Vorrangregel, die an zwei Stellen auseinanderlaufen könnte.

**Die Aufteilung der heutigen 119 Bauteile** folgt der Frage, ob es einen Editor
gibt:

- Die **108 gezeichneten** (`type: "shape"`) gehen nach `seed/`. Sie haben mit dem
  Designer einen Editor und sollen über Promote und Review weiterentwickelt
  werden. Würde man sie als `builtin` markieren, setzte der nächste Start jeden
  Promote zurück - der Weg aus Abschnitt 6 liefe für Bauteile ins Leere.
- Die **11 programmierten** (`type: "code"`) gehen nach `builtin/`. Kein Editor,
  direkte Abhängigkeit von draw2d-Klassen, müssen mit dem Code im Gleichschritt
  bleiben.

Kurz: Die 11 sind Quellcode, der aussieht wie Inhalt. Die 108 sind Inhalt, der
zufällig mitgeliefert wird.

#### `seed/` - das einmalige Fließband

Beim Start wird eingespielt, was im Ordner liegt. **Nach erfolgreichem Import
löscht der Dienst die Dateien dort.** Der leere Ordner ist damit selbst die
Zustandsinformation: nichts drin, nichts zu tun. Kein Häkchen in der Datenbank,
keine Frage "wurde das schon einmal eingespielt".

Zwei Dinge gehören dazu, sonst kippt der Mechanismus:

**Der leere Zustand muss nach Git.** Der Ordner liegt im Deploy-Artefakt. Wird
die Löschung nicht committet, holt der nächste `git pull` die Dateien zurück, und
der nächste Start spielt sie über gewachsenen Gemeinschaftsinhalt.

**Danach hat eine frische Installation keinen Anfangsbestand.** Der Seed ist ein
einmaliges Fließband für diese Migration, kein Bereitstellungsweg für neue
Instanzen. Soll er das später auch leisten, muss der Ordner gefüllt bleiben und
der Zustand stattdessen in der Datenbank stehen.

#### `builtin/` - der fortlaufende Abgleich

**Kein Flag am Scope, aber ein Marker am Dokument.** Eine Schreibsperre braucht es
vorerst nicht. Das eingespielte Dokument trägt seine Herkunft in `meta`:

```json
"meta": { "builtin": true, "hash": "<inhaltshash>" }
```

Der Marker beantwortet "woher kommt das", der Hash macht den Abgleich billig -
beides in `meta`, also ohne Schemaänderung und ohne `data` anzufassen.

Ohne Schreibsperre gilt: Wer nach `apps` promoten darf, kann ein ausgeliefertes
Dokument überschreiben, und der nächste Abgleich schreibt zurück. Solange das
Promoten dorthin über Review läuft, ist das beherrschbar; eine Sperre lässt sich
später nachziehen, ohne dass sich am Rest etwas ändert.

**Housekeeping ist ein Abgleich, kein Neuladen.** Beim Start des
Datenbankdienstes wird verglichen, was in `apps` als `builtin` markiert ist,
gegen das, was in `builtin/` liegt:

| Fall | Aktion |
|---|---|
| beidseitig, Hash gleich | nichts |
| beidseitig, Hash verschieden | eine neue Version |
| nur Datei | anlegen |
| nur Datenbank | Zeilen löschen |

Der Normalfall kostet damit **null Schreibvorgänge**, und ein Neustart bleibt für
Caches unsichtbar.

**Der erste Lauf ist auch hier der Vollimport.** Zu Beginn ist die Datenbankseite
leer, also trifft für jede Datei die Zeile "nur Datei" zu: alles wird angelegt,
jedes mit Version 1. Kein eigener Mechanismus, nur derselbe Abgleich auf einen
leeren Anfangszustand. Anders als beim Seed bleiben die Dateien dabei liegen -
sie sind ja die dauerhafte Wahrheit.

**Gelöscht wird hart, ohne Tombstone.** Ein Grabstein existiert, um eine Version
weiter oben in der Kette zu verdecken - über `apps` liegt aber nichts, was
Bauteile hielte, er würde also nichts maskieren. Die Historie steht ohnehin in
Git, wo das Löschen ein Commit mit Autor, Datum und Begründung ist: Bei
ausgeliefertem Inhalt ist die Datenbank nicht die Wahrheit, sondern die
Projektion. Die Bilder verschwinden über den Fremdschlüssel von `blobs` mit.

Alles abzuräumen und pauschal neu einzuspielen bleibt trotzdem der falsche Weg:
Es schriebe bei **jedem** Start neue Versionen, erhöhte `content_version` von
`apps` und machte damit nach Abschnitt 5.1 jeden Index-Cache im System ungültig.
Unter pm2, wo ohnehin ständig neu gestartet wird, käme der Cache aus Abschnitt 5
kaum je zum Tragen. Der Abgleich erreicht denselben Endzustand, fasst aber nur
an, was sich geändert hat.

Für die **programmierten** Bauteile braucht es dabei keine Sonderregel: Es gibt
keinen Editor, der sie speichern könnte, also entsteht auch keine persönliche
Kopie. Die **gezeichneten** haben mit dem Designer sehr wohl einen, und für sie
gilt schlicht der reguläre Weg aus Abschnitt 6 - eigene Kopie im Leaf, zurück nach
`apps` über Promote und Review. Das ist der Nachfolger des heutigen
`ensureAdminLoggedIn` auf `/shapes/global/save`.

### 2.3 Vorschaubilder gehören generell in Blobs

Das gilt nicht nur für Bauteile. **Ein Thumbnail ist ein Bild, sonst nichts** -
es sollte ausgeliefert werden, ohne dass irgendwer ein Dokument anfassen muss.

Heute liegt die Schaltungsvorschau als Data-URL in `data.image`. Daraus folgt:
`/brains/thumb` holt das ganze Dokument, um ein Bild herauszuschneiden; beim
Öffnen muss dasselbe Bild wieder herausgeschnitten werden (`withoutPreview`); und
Base64 bläht die Bytes um rund ein Drittel auf, mitten in der `jsonb`-Spalte, die
bei jedem Lesen des Dokuments mitkommt.

Die Blob-Infrastruktur kann längst alles, was eine Vorschau braucht:

- Blobs werden bei **Promote** in die Zielversion kopiert
  ([promote.js:99-104](database/server/persistence/promote.js#L99-L104)) und bei
  **Distribute** ebenso.
- `routes/blobs.js` liest per **Walk-up**, kann auf eine **Version pinnen** und
  hat einen **anonymen** Pfad für veröffentlichte Dokumente.

Das eingebettete Bild ist damit der Ausreißer, nicht die Regel. Die Vorschau zieht
nach `blobs`, unter einem festen `key`. Danach ist `/thumb` ein Lesevorgang auf
einer Blob-Zeile, `withoutPreview` entfällt ersatzlos, und weil die uuid eine
unveränderliche Version benennt, wird das Bild dauerhaft cachebar.

**`/thumb` liefert das Bild, nicht die Beschreibung eines Bildes.** Rohbytes im
Körper, `Content-Type` und `Content-Length` im Kopf. Kein JSON, keine Data-URL,
kein Zusammensetzen im Client - `<img src="...">` und fertig.

Auch dafür ist das Muster schon da: Die Blob-Route macht es genau so
([blobs.js:77-79](database/server/routes/blobs.js#L77-L79)), inklusive
Versions-Pinning und anonymem Zugriff. Base64 in einer Data-URL ist ein
Transporttrick, der ein Drittel Volumen kostet und beide Seiten zum Kodieren und
Dekodieren zwingt. Er verschwindet ersatzlos.

Was der Blob-Route für diesen Zweck noch fehlt, ist wenig:

- **Adressierung per uuid.** Sie adressiert heute über Scope, Pfad und Key. Ist
  die Auflösung beim Indexbau schon gefallen, will der Client mit **einem**
  Bezeichner nachladen, nicht mit dreien.
- **Cache-Header.** Eine versionsadressierte Ressource ist unveränderlich und
  gehört auf `public, max-age=31536000, immutable`.

Ehrlicherweise: Die Glob-Liste wird davon **nicht** schneller, sie liest `data`
ohnehin nicht mit. Der Gewinn liegt beim Thumbnail-Endpunkt, beim Öffnen eines
Dokuments und bei jedem künftigen Massenlesen - wie dem Bau des Bauteil-Index.

---

## 3. Auflösung: Verankerung am Operating Scope

Jede Schaltung hat einen Heimat-Scope. `ensureWriteLeaf` legt das persönliche
Leaf **unter einem bestimmten Workspace** an, je Workspace ein eigenes
([scopes.js:434](database/server/persistence/scopes.js#L434)), und `globDocs`
liefert zu jedem Dokument sein `operatingScopeRef` mit.

**Bauteile werden entlang der Kette dieses Scopes aufgelöst:** eigenes Leaf,
dann der Workspace, dann dessen Eltern, dann global. Derselbe Walk-up, den
Dokumente schon benutzen.

Von N Workspaces, in denen ein Nutzer Mitglied ist, liegt **genau einer** auf
dieser Kette. Damit ist die Auflösung eindeutig, ohne Merge und ohne
Stichentscheid:

| Schaltung wohnt in | `NAND` geändert von | geladen wird |
|---|---|---|
| Leaf unter Klasse 10 | Klasse 10 | Klasse 10 |
| Leaf unter Klasse 10 | AG Robotik, Klasse 9 | global |
| persönlicher Workspace | irgendeiner Gruppe | global |

Die Workspaces, die nicht auf der Kette liegen, werden nie gefragt.

**Eine private Datei sieht die Anpassungen ihres Workspace.** "Privat" heißt
"noch nicht geteilt", nicht "gehört nirgendwohin" - die Datei liegt im Leaf unter
ihrem Workspace und erbt dessen Bauteile. Nur eine Datei im persönlichen
Workspace (`users/<mail>`, der Promote-Ceiling) hat keine Gruppe auf der Kette
und sieht global plus die eigenen Änderungen.

**Ein Workspace darf ein Bauteil überschreiben, nicht nur eigene hinzufügen.**
Eine Klasse kann eine eigene Gatter-Darstellung setzen. Das ist eindeutig, weil
das Überschreiben immer nur entlang **einer** Kette wirkt.

---

## 4. Der Index ist eine Projektion

Es gibt keine gepflegte `index.js` mehr, weder pro Nutzer noch pro Workspace. Der
Index ist das Ergebnis der Auflösung aus Abschnitt 3, ausgeliefert pro
**Dokumentkontext**:

```
../shapes/index.js?doc=<id-handle>
```

**Der Kontext wird über das Dokument benannt, nicht über den Scope.** Das ist
keine Geschmacksfrage, sondern die bestehende Hausregel:

> "The frontend never talks to /database and never builds scope-based requests:
> every operation names a document by an opaque `id` handle the backend minted."
> ([StorageClient.js:3-8](common/public/js/storage/StorageClient.js#L3-L8))

Ein `?scope=<operatingScopeRef>` scheitert nicht an der Regel allein, sondern
daran, dass der Client den Scope **gar nicht hat**: `toItem` liefert `id, uuid,
name, path, providedBy, version, author, editable, published, instanceType,
original, promoteCeiling, deleteImmediate, thumbnailUrl` - der `scopeRef` steckt
eingepackt im Handle und wird nirgends nach vorne gereicht. Ihn dafür
durchzustechen wäre genau der Dammbruch, den die Regel verhindert.

Über das Handle leitet der Server ihn selbst ab, und die Berechtigung ist die
natürliche: Wer das Dokument lesen darf, bekommt dessen Bauteile.

Verwendet wird das **stabile Handle** aus `encodeId(scopeRef, docPath)`, nicht die
uuid. Die benennt eine *Version* und wechselt bei jedem Speichern - die URL wäre
nach jedem Speichern eine andere.

**Ausgeliefert wird über eine Weiterleitung.** Der Kontext-Aufruf beantwortet die
Frage "welches Bündel gilt hier", und die Antwort ist eine Adresse:

```
GET ../shapes/index.js?doc=<id-handle>
  -> 302 ../shapes/bundle/<scopeRef>-<stempel>.js   (immutable, ewig cachebar)
```

Damit sitzt jeder Bezeichner dort, wo er bekannt ist: **am Client-Rand das
Dokument**, weil nur das dort vorliegt, **in der kanonischen Adresse der Scope**,
weil dort Eindeutigkeit zählt. In Logs, im Netzwerk-Tab und im Cache steht danach
eine unmissverständliche, scope-adressierte URL, ohne dass der Client je einen
Scope erfunden hätte.

Ohne diesen Schritt lädt der Browser für zwei Dokumente desselben Workspace
zweimal dasselbe Bündel, weil sein Cache an der URL hängt. Mit ihm zeigen alle
Dokumente einer Kette auf **eine** Adresse, und der Stempel aus Abschnitt 5.1
sorgt dafür, dass sie sich ändert, sobald sich der Inhalt ändert. Dasselbe
Prinzip wie beim Bild: Auflösung einmal, danach unveränderliche Adressen.

Für ein noch nicht gespeichertes Dokument gibt es kein Handle. Dann gilt der
Workspace, in dem es angelegt wird.

### 4.1 Ladereihenfolge im Client

Das Handle liegt vor, bevor irgendetwas geladen ist - aus der URL oder aus dem
Klick in der Dateiliste. **Bündel und Dokumentinhalt hängen deshalb nicht
voneinander ab und werden parallel geholt:**

```
Handle bekannt
   |-- GET index.js?doc=<handle>   --+
   |-- GET Dokument                --+--> beide da: Figuren instanziieren
                                          danach: index.json nachladen
```

Nur das **Instanziieren** wartet auf beides, weil die Figuren die Klassen aus dem
Bündel brauchen. Nacheinander zu laden wäre ein vermeidbarer Roundtrip auf dem
kritischen Pfad.

`index.json` ist nachladbar. Es speist die Palette
([Palette.js:45](simulator/public/js/Palette.js#L45)), also die Auswahl zum
Danebenziehen. Eine bestehende Schaltung wird aus dem serialisierten Dokument
aufgebaut und braucht den Katalog nicht.

**Der Start ohne Dokument ändert sich.** Heute lädt der Simulator `index.js` beim
Booten ([index.js:71](simulator/public/js/index.js#L71)), lange bevor eine Datei
gewählt ist. Ohne Kontext steht künftig nicht fest, welches Bündel gilt: Der
Ladevorgang wandert vom Anwendungsstart an das Öffnen eines Dokuments.

Der flache Namensraum aus Abschnitt 1 bleibt damit tragfähig: Zu jedem Zeitpunkt
ist genau ein Kontext geladen. Beim Dateiwechsel wird das Bündel neu geladen.

**Auch das Vorschaubild ist scope-abhängig.** Ein Bauteil kann in einem Workspace
anders gezeichnet sein, also ist die Frage "welches PNG" dieselbe Auflösung wie
die Frage "welches JS". Ein Pfad reicht dafür nicht.

Heute trägt der Katalog genau so einen Pfad: `"imagePath": "analog/math/Mean.png"`.
Der ist mehrdeutig, sobald es mehr als einen Scope gibt. An seine Stelle tritt
die **uuid der Gewinnerversion**, die aus derselben Abfrage kommt, die den Index
baut. Jede Version hat eine, extern adressierbar und eindeutig
([010_versions_uuid.sql](database/server/persistence/migrations/010_versions_uuid.sql)),
und Schaltungen adressieren ihre Vorschau bereits so:
`../brains/thumb?uuid=<uuid>`.

Damit ist die Auflösung **einmal** erledigt, beim Bau des Index, und alles
Weitere hängt an der uuid statt an einem Namen. Der Client fragt nie "gib mir das
Bild zu diesem Pfad", sondern immer "gib mir das Bild zu dieser Version".

Die uuid in der URL ist die der **Version des Bauteils**, nicht eine eigene id
des Bildes. Ein Blob hat keine: Er ist über `(scope_id, doc_path, version, key)`
identifiziert, die Version liefert die uuid, `key` benennt das einzelne Bild -
also `?uuid=<version-uuid>` und ein `&key=`, sobald eine Version mehrere trägt.

Ausgeliefert wird das Bild dann über den Blob-Weg aus Abschnitt 2.3: Rohbytes,
korrekter Mime-Type, unveränderlich cachebar. Für die Palette ist das der
Unterschied zwischen "lädt bei jedem Öffnen hunderte Bilder neu" und "lädt sie
genau einmal".

Nicht betroffen sind die Kacheln der **Dateiliste**: Die zeigen die Vorschau der
Schaltung, nicht die eines Bauteils, und adressieren sie längst über die uuid des
Dokuments.

Der Bezeichner bekommt seinen Scope in dem Moment, in dem zwei Schaltungen aus
verschiedenen Workspaces gleichzeitig offen sein sollen. Bis dahin nicht.

### 4.2 Wie der Index gebaut wird

Es ist **eine** Abfrage für den ganzen Baum, nicht eine pro Bauteil. `listDocs`
kann das bereits ([docs.js:140](database/server/persistence/docs.js#L140)) und
macht genau das, was der Index braucht:

`WALKUP_SLOTS` bildet aus `scope_closure` alle Vorfahrenebenen und je Ebene zwei
Kandidaten - Slot 0 das eigene Leaf, Slot 1 die geteilte Version. Der Join gegen
`versions` filtert über den Pfad-Prefix, und dann entscheidet **eine Zeile SQL**
die ganze Auflösung:

```sql
SELECT DISTINCT ON (v.doc_path) ...
 ORDER BY v.doc_path, s.depth ASC, s.slot_rank ASC, v.version DESC
```

Je Pfad gewinnt die nächstliegende Ebene, dort der eigene Leaf vor der geteilten
Version, dort die höchste Version. Der Walk-up wird nicht je Dokument
ausgeführt, sondern **einmal als Join formuliert**. Ein Roundtrip, egal ob es um
zehn oder zweitausend Bauteile geht.

`globDocs` ist die Funktion, die je Mitgliedschafts-Scope eine eigene Abfrage
fährt. Die wird hier **nicht** gebraucht: Abschnitt 3 verankert an genau einem
Scope, und dafür ist `listDocs` zuständig.

**Der Dateisuffix verschwindet dabei.** Im Dateisystem wäre das ein
`glob("**/*.js")`. Im Dokumentmodell gibt es keine fünf Dateien mehr, über die
man filtern müsste - es gibt ein Dokument je Bauteil, und `.js` ist ein **Feld
darin**. Aus dem Suffix-Filter wird eine Projektion:

| Zweck | Projektion |
|---|---|
| `index.js` | `data->>'js'` je Gewinnerzeile, aneinandergehängt |
| `index.json` | nur `meta` - Name, Tags, displayName, basedir, imagePath |
| Palette-Bild | Blob der Gewinnerversion, per uuid nachgeladen |

Das ist auch der Grund, warum die `.png` nach `blobs` gehört (Abschnitt 2): Beim
Bau des Index wird jede Bauteilzeile angefasst, und Postgres muss die `jsonb`-
Spalte dafür auspacken. Binärdaten haben in dieser Spalte nichts verloren.

Für `index.json` wird `data` gar nicht erst gelesen - der Katalog der Palette
kommt vollständig aus `meta`.

### 4.3 Beide Artefakte stammen aus einem Durchgang

`index.js` ist das Ausführbare, `index.json` der Katalog der Palette. Sie sind
**zwei Projektionen derselben Gewinnerliste** und werden zusammen erzeugt, nie
getrennt.

Das ist keine Stilfrage, sondern eine Bedingung: Der Palette-Eintrag liefert beim
Ablegen auf die Bühne den Namen, mit dem `View.js` per `eval` die Klasse
instanziiert. Steht im Katalog ein Name, den das Bündel nicht unter genau diesem
Bezeichner definiert, gibt es kein Bauteil, sondern ein rotes Label.

Genau dieser Gleichlauf ist heute gebrochen - siehe Schritt 0 in Abschnitt 8 -
weil die beiden Dateien getrennt zusammengesetzt werden und dabei
entgegengesetzte Vorrangregeln anwenden. Aus einem Durchgang erzeugt, kann das
nicht mehr auseinanderlaufen.

---

## 5. Der Cache

Der Index wird **als Dokument im Leaf** abgelegt, unter einem festen Pfad. Der
Walk-up findet ihn dadurch von selbst: `getDoc(operatingScope, "<indexpfad>")`
löst ihn nach denselben Regeln auf wie jedes andere Dokument. Fehlt er, wird er
erzeugt und abgelegt - dasselbe faule Muster wie beim Leaf selbst ("provisioned
lazily, on first write - not eagerly on join").

Weil es je Workspace ein eigenes Leaf gibt, entsteht automatisch **ein Index pro
(Nutzer, Workspace)**. Genau die Granularität, die Abschnitt 3 verlangt.

### 5.1 Frische über einen Zähler am Scope

`scopes` bekommt eine Spalte:

```sql
content_version  bigint  NOT NULL DEFAULT 0
```

**Schreibweg:** Ein Commit in Scope X erhöht `content_version` von X. Eine Zeile,
ein UPDATE, kein Schreiben in Kinder.

**Leseweg:** Der Stempel der Kette wird aus den Vorfahren gebildet.
`scope_closure` hat den passenden Index auf `(descendant_id, depth)`, es sind so
viele Zeilen, wie der Baum tief ist:

```sql
SELECT s.id, s.content_version
  FROM scope_closure c JOIN scopes s ON s.id = c.ancestor_id
 WHERE c.descendant_id = $leaf
```

Stimmt der Stempel mit dem im Cache hinterlegten überein, wird der Cache
ausgeliefert. Sonst wird er neu erzeugt.

Das trägt, weil Lesen transitiv **nach oben** läuft: Eine Änderung am Root ist für
jeden Nachfahren an dessen eigenem Zähler sichtbar, ohne dass irgendjemand die
Nachfahren angefasst hat. Es wird nichts invalidiert und nichts gelöscht. Ein
Cache, den niemand liest, wird nie erzeugt.

**Der Stempel ist ein Fingerabdruck über die Paare `(ancestor_id,
content_version)`**, nicht deren Maximum. Wird ein Scope verschoben
(`move_scope`), ändert sich die Kette, ohne dass ein Maximum steigen muss; mit
dem Maximum allein bliebe der Cache fälschlich gültig.

### 5.2 Der Cache ist kein Inhalt

Das Index-Dokument trägt einen Marker, der es aus Finder, Suche, Review,
Aktivität und Promote heraushält. Es ist ein Artefakt, kein Dokument des Nutzers,
und darf nirgends als Schaltung auftauchen.

---

## 6. Promote

Unverändert gegenüber Dokumenten, das ist der Gewinn: Bauteil ändern, es liegt
als eigene Kopie im Leaf. Promote hebt es auf den Workspace darüber. Verlangt der
ein Review, geht es mit Änderungskommentar und Punkten in die Queue. Nach
Freigabe ist es die Version der Gruppe, und jeder im Teilbaum bekommt sie beim
nächsten Laden - sein Stempel stimmt dann nicht mehr.

**Bauteile sind lebendig: Schaltungen pinnen keine Bauteilversion.** Ein
Bauteil-Promote wirkt auf jede Schaltung, die es benutzt, und genau das ist der
Zweck einer gemeinsamen Bibliothek. Der Promote-Dialog zeigt deshalb, wie viele
Schaltungen betroffen sind, bevor er ausgelöst wird.

Pinnen bleibt später möglich, ohne dass etwas umgebaut werden müsste: Das Backend
kann versionsgenaue Reads bereits (`docAt(scopeId, path, version)`).

**Ein Bauteil-Promote verteilt ausführbaren Code.** Das gilt für **alle**
Bauteile, nicht nur für die eingebauten aus Abschnitt 2.1: `AND.custom` zeigt,
dass auch eine gezeichnete Form handgeschriebenes JavaScript trägt - dort steht
die `calculate`-Funktion. Die Grenze zwischen "gezeichnet" und "programmiert" ist
also **keine** Sicherheitsgrenze.

Heute ist das durch `ensureAdminLoggedIn` auf den globalen Routen gedeckelt, und
Bauteile eines Nutzers betreffen nur ihn selbst. Im Scope-Modell heißt "ein
Workspace darf ein Bauteil überschreiben" dagegen: Wer dort promoten darf,
liefert JavaScript an alle im Teilbaum aus. Bei einer Schaltung ist das Review
Qualitätssicherung, bei einem Bauteil ist es zusätzlich die einzige Schranke.

Daraus folgt die Frage, die vor Schritt 1 zu entscheiden ist: ob ein
Bauteil-Promote in Workspaces **ohne** Review überhaupt zulässig sein soll.

---

## 7. Sichtbarkeit

Dieselbe geteilte Schaltung verhält sich unterschiedlich, je nachdem, aus welchem
Workspace sie geöffnet wird. Das ist gewollt - es ist der Sinn anpassbarer
Bauteile - und muss deshalb **sichtbar** sein.

Der Editor zeigt an, aus welchem Workspace die geladenen Bauteile stammen. Ohne
diesen Hinweis ist das Verhalten ein Gespenst.

Der Platz dafür ist die **Kopfzeile über Palette und Bühne**, die heute schon
Dokumentname und Version trägt. Sie ist die gemeinsame Klammer über beidem, und
genau so weit reicht der Kontext: Er gilt nicht für die Palette allein, sondern
für alles, was auf der Bühne liegt.

Das ist **später** dran. Es gehört nicht auf den kritischen Pfad der Migration,
sondern in den Moment, in dem der erste Workspace tatsächlich ein Bauteil
überschreibt - vorher gibt es nichts anzuzeigen, worüber man stolpern könnte.

---

## 8. Reihenfolge der Umsetzung

**Schritt 0 - Widerspruch beseitigen.** `/shapes/index.js` verkettet global und
Nutzer, also gewinnt der Nutzer. `/shapes/index.json` dedupliziert über
`arrayUnique` und behält die erste Fundstelle, also gewinnt global
([handler/index.js:76-88](shapes/server/handler/index.js#L76-L88)). Code-Override
und Katalogeintrag widersprechen sich. Heute maskiert, weil Nutzer-Bauteile
eigene Namen tragen; mit echtem Überschreiben ein Fehler. Unabhängig vom Rest
sofort zu machen.

**Schritt 0b - Vorschaubilder nach `blobs`.** Gilt für alle Dokumente, nicht nur
für Bauteile (Abschnitt 2.3). Speicherpfad schreibt den Blob mit, `/thumb` liest
ihn direkt, `withoutPreview` fällt weg, Cache-Header auf `immutable`. Für
bestehende Dokumente ein Backfill aus `data.image` plus ein Rückfall auf das
eingebettete Bild, solange nicht alle migriert sind. Unabhängig vom Rest
nutzbringend und die Voraussetzung dafür, dass Schritt 2 nicht Binärdaten durch
die Indexerzeugung schleift.

**Schritt 1a - `seed/` und `builtin/` als Mechanismus.** Beide Verzeichnisse, das
einmalige Fließband und der fortlaufende Abgleich nach `apps` (Abschnitt 2.2).
Zuerst mit den Beispielschaltungen erprobt, die heute schon als `von import` in
der Datenbank liegen - dort ist der Bestand klein und der Schaden bei einem
Fehlversuch gering.

**Schritt 1b - Bauteile als Dokumente.** `data/shapes/global` wird aufgeteilt: die
108 gezeichneten nach `database/seed/shapes`, die 11 programmierten nach
`database/builtin/shapes`. Eine Dateiverschiebung in Git, den Rest erledigt der
erste Start. Textteile in `data`, `.png` als Blob, `type` nach `meta`. Bei den 11
fehlt schlicht der `.shape`-Teil; die Teileliste ist offen, das ist kein
Sonderfall im Schema, sondern ein fehlender Schlüssel.

Dazu gehört der Test aus Abschnitt 2.2: die erzeugten Bezeichner vor und nach der
Migration vergleichen. Weicht einer ab, öffnet die zugehörige Bestandsschaltung
nicht mehr.

`data/shapes/user/<hash>` ist dagegen **kein** `builtin`-Fall, sondern eine
einmalige Datenmigration in die jeweiligen Leaves. Achtung dabei: Die
Verzeichnisse heißen `sha256(email)`
([handler/index.js:17-24](shapes/server/handler/index.js#L17-L24)), `personRef`
ist inzwischen die Klartext-Adresse. Die Zuordnung geht nur vorwärts - über alle
bekannten Konten hashen und vergleichen. Für ein Verzeichnis, zu dem sich kein
Konto findet, gibt es kein Ziel; was damit geschieht, ist vor dem Lauf zu
entscheiden.

Danach ist `data/` leer und verschwindet.

**Schritt 2 - Index als Projektion.** Erzeugung aus dem Auflösungsergebnis, noch
ohne Cache, ausgeliefert über `?doc=`. Hier wird **gemessen**: Dauert das
Erzeugen deutlich unter der Wahrnehmungsschwelle, entfällt Schritt 3 und ein
Cache im Prozessspeicher reicht.

**Schritt 3 - Cache.** `content_version`, Stempel, Index-Dokument im Leaf.

**Schritt 4 - Simulator.** Index pro Dokumentkontext laden, Bündel beim
Dateiwechsel tauschen, Herkunftsanzeige aus Abschnitt 7.

**Schritt 5 - Designer.** Mehr als Bearbeiten und Speichern: Der Designer ist die
einzige der drei Apps, die noch vollständig pfadbasiert arbeitet, und zwar mit
genau der Aufteilung, die hier abgeschafft wird - `Configuration.backend` hat
einen `user`- und einen `global`-Zweig, jeder mit eigenem `get`, `list`, `save`,
`rename`, `delete`, `folder`
([Configuration.js:6-26](designer/public/js/Configuration.js#L6-L26)).

Zu tun ist damit:

- **Datenschicht** auf `StorageClient` umstellen: ein Weg statt zwei, Dokumente
  über Handles statt über `filePath`.
- **Finder** aus `common` übernehmen - `StorageScreen`, `DraftScreen`,
  `FileFactSheet`, `FolderCard`. Der Designer bekommt damit erstmals Entwürfe,
  geteilte Bauteile und Workspaces, so wie die anderen beiden Apps.
- **Speichern und Anlegen** über den Dokumentpfad; `FileSave` und `FileCreate`
  arbeiten heute mit `data.filePath` als Rückgabe, künftig mit einem Handle.
- **Vorschaubild** nicht mehr über `.shape` → `.png` im Pfad, sondern über den
  Blob (Abschnitt 2.3).
- **Promote, Verteilen, Verwerfen** werden dadurch überhaupt erst verfügbar; der
  Designer kennt sie heute nicht.

Überwiegend Löschen und Verdrahten, kein Neubau: Die genannten Bausteine liegen
alle in `common` und werden geerbt. Der Designer ist zuletzt dran, weil er ohne
die Schritte davor nichts hätte, wohin er speichern könnte.

---

## 9. Offen

Eine Frage bleibt und sie ist eine Produktfrage:

**Was passiert mit einer Schaltung, deren Bauteil in ihrem Workspace verschwindet
oder unbrauchbar wird?** Heute zeigt der Simulator ein rotes Label
("unable_to_load_element", [View.js:446](simulator/public/js/View.js#L446)).
Reicht das, oder soll auf die nächsthöhere Version der Kette zurückgefallen
werden? Zurückfallen ist freundlicher, verdeckt aber, dass etwas kaputt ist.
