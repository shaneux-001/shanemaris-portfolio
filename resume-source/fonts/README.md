# Font files

Archivo (Regular/SemiBold/Bold) and IBM Plex Mono (Regular/Medium), sourced as
static (non-variable) TTFs from Google Fonts, then subsetted 2026-09-08 with
fontTools to fix a crash in `scripts/generate-resume-pdf.tsx`'s font
registration (see that file's comments for the full story — react-pdf's font
embedding walks every glyph in the file, and a handful of unrelated corrupted
composite glyphs at the tail end of the original exports crashed it
regardless of what text was on the page).

To re-subset (e.g. if the resume ever needs a character outside basic Latin
+ em/en dash + middle dot + curly quotes + ellipsis):

```bash
python3 -m fontTools.subset "resume-source/fonts/<Font-Weight>.ttf" \
  --unicodes="U+0020-007E,U+2013,U+2014,U+00B7,U+2018,U+2019,U+201C,U+201D,U+2026" \
  --glyph-names --layout-features='*' \
  --output-file="resume-source/fonts/<Font-Weight>.ttf"
```

Requires `fontTools` (`pip3 install fonttools`).
