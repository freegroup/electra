# Satz des gedruckten Grundkurses.
#
#   make        grundkurs.pdf bauen (mehrere Durchlaeufe, Index inklusive)
#   make clean  Zwischendateien loeschen, PDF behalten
#   make purge  alles Erzeugte loeschen, auch die abgeleiteten Abbildungen
#
# lualatex, nicht pdflatex: fontspec braucht eine Unicode-Engine, und die
# Logikzeichen aus dem Manuskript kommen direkt als Unicode an.
#
# Abbildungen: die QUELLE ist das SVG unter media/. LaTeX kann SVG nicht lesen,
# also leitet make daraus PDF ab - aber nur fuer die Dateien, die sich seit dem
# letzten Lauf geaendert haben. Damit bleibt jede Abbildung in Inkscape
# aenderbar, ohne dass jemand ein PDF von Hand pflegen muesste. Die PDFs sind
# Zwischenprodukte und gehoeren nicht ins Repository.
#
# Die Alternative waere \usepackage{svg} gewesen. Das ruft Inkscape bei jedem
# LaTeX-Lauf selbst auf und verlangt dafuer --shell-escape - einen Schalter, der
# beliebige Programmaufrufe aus dem Dokument heraus erlaubt. Fuer diesen einen
# Zweck ist eine Make-Regel der ruhigere Weg.

LATEXMK  = latexmk -lualatex -interaction=nonstopmode -halt-on-error
INKSCAPE ?= /Applications/Inkscape.app/Contents/MacOS/inkscape

SVGS = $(wildcard media/*.svg)
PDFS = $(SVGS:.svg=.pdf)

# Zielort in der Web-App: der Grundkurs wird unter /book/ als Download
# angeboten. Das frische Satzergebnis landet direkt dort, damit niemand von
# Hand kopieren muss.
DEST = ../book_html/public/grundkurs-digitaltechnik.pdf

all: $(DEST)

media/%.pdf: media/%.svg
	$(INKSCAPE) --export-type=pdf --export-filename=$@ $<

grundkurs.pdf: grundkurs.tex preamble.tex $(wildcard kapitel/*.tex) $(PDFS) $(wildcard media/*.png)
	$(LATEXMK) grundkurs.tex

$(DEST): grundkurs.pdf
	cp $< $@

clean:
	$(LATEXMK) -c
	rm -f grundkurs.idx grundkurs.ind grundkurs.ilg

purge: clean
	$(LATEXMK) -C
	rm -f $(PDFS)

.PHONY: all clean purge
