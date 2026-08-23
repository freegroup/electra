# archive

Das Manuskript, aus dem book/ und print/ einmalig entstanden sind.

`Grundkurs.docx` ist die Quelle von 2004 und die einzige Datei hier, die
aufgehoben werden muss. Sie enthaelt den Text UND die 72 Abbildungen als
eingebettete Windows-Metafiles.

`media/` wird daraus erzeugt und ist deshalb nicht eingecheckt:

    node tools/convert-book.js      # legt media/*.wmf + figures.json an
    node tools/convert-figures.js   # macht daraus die SVG fuer Web und Druck

Warum das docx bleibt und die WMF gehen: 548 KB gegen 792 KB, und das docx
traegt zusaetzlich den Text. Sollte sich herausstellen, dass die Wandlung etwas
verloren hat - ein Strichmuster, eine Schraffur -, ist das hier der einzige Weg
zurueck. Die SVG sind ab jetzt die gepflegte Fassung, nicht diese hier.
