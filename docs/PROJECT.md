# Klaobuiltin Project Guide

This guide records the current website structure and behavior for future project work. It separates repository observations from owner direction and questions that still need answers.

## Purpose and direction

### Verified repository facts

- The repository contains a static architecture and interior design website for KLAO. The top-level `README.md` contains only the project name.
- The homepage (`index.html`) has home/hero, about, work, and contact sections. The four room pages present a room introduction, hero imagery, category filters, a gallery, and contact content.
- Current page and contact copy is embedded in the HTML. Its presence is not independent verification of business details.

### Owner-provided direction

- The site should primarily showcase completed work; customer contact is a secondary goal.
- Its visual direction should allow varied expression and feel future-facing, while remaining crafted and specific rather than looking like generic AI output.
- For future visual decisions, ground that direction in actual built-in work, materials, craft, and details from each project. Treat it as guidance, not a mandate to redesign existing pages.

### Details available for drafting

The owner permits inference and draft business copy for local visual review. Treat the following as assumptions until confirmed, record material assumptions in the handoff, and ask only when a choice is outside the delegated task scope. Do not block ordinary implementation to confirm each value.

- Intended audience and customer segments.
- Service area and canonical business name, contact channels, hours, and other business details.
- What degree of futurism the owner wants, and how much visual variation should appear across pages.
- Which homepage examples and images are approved portfolio work, and which external imagery or placeholder content should be replaced.

## Repository map

| Path | Current role |
| --- | --- |
| `index.html` | Homepage with hero, about, work/portfolio cards, and contact sections; includes room-page navigation. |
| `kitchen.html` | Kitchen introduction, hero, filters, gallery mount, lightbox, and contact section. |
| `living.html` | Living-room introduction, hero, filters, gallery mount, lightbox, and contact section. Its gallery key is `living-room`. |
| `bedroom.html` | Bedroom introduction, gallery-driven hero, filters, gallery mount, lightbox, and contact section. |
| `bathroom.html` | Bathroom introduction, hero, filters, gallery mount, lightbox, and contact section. |
| `gallery.js` | Shared browser-side loader and interaction code for room galleries. |
| `gallery-data.json` | Room/category image records read by `gallery.js`. |
| `images/` | Room/category image assets, including source photos and generated full-size and thumbnail variants. |
| `.github/workflows/update-gallery.yml` | Generates missing JPEG variants and rebuilds gallery data when matching JPEG images are pushed, or when manually dispatched. |
| `.github/` | GitHub workflow configuration. |
| `README.md` | Currently just `# Klaobuiltin`; it does not document setup or development. |
| `push-test.txt` | Small tracked root file; its purpose is not documented in the repository. |

The pages contain their own CSS and some JavaScript. The shared gallery implementation is external in `gallery.js`; preserve that split unless the requested task calls for a structural change.

## Room gallery and image behavior

`gallery-data.json` is keyed first by room, then by category. Current room keys are `kitchen`, `living-room`, `bedroom`, and `bathroom`. The room page's `data-room` value must match its JSON key. Category keys must also agree with that page's filter buttons (`data-filter`); for example, the kitchen page has filters for `base`, `wall`, `sink`, and `island`, while the data currently has no items for `base` or `wall`.

On page load, `gallery.js` fetches `gallery-data.json` (or a path supplied through `data-gallery-json`) and fills each `[data-gallery-root]`. It skips the `hero` category in the cards by default, or uses the comma-separated `data-skip-categories` override. A `[data-gallery-hero]` element can receive the first `hero` record from the same room; its full image is preferred, with the thumbnail as fallback. In the current pages, bedroom uses this data-driven hero mount, while kitchen, living, and bathroom have hero image paths in their HTML. Keep these mechanisms in mind before changing image paths.

Each gallery record has a `name`, `thumb`, and `full` path. Gallery cards display the thumbnail with lazy loading and keep the full path in `data-full` for the lightbox. Filters count cards per category and hide cards outside the selected category. The lightbox opens from a gallery card, uses the full image when available, cycles through the currently visible cards, and supports its buttons, Escape, and left/right arrow keys. The paths in the JSON are repository-relative URLs, such as `images/kitchen/island/island_01_thumb.jpg`; keep path spelling and capitalization consistent with the actual files.

### Image naming and generated files

The workflow expects source JPEG files (`.jpg` or `.jpeg`) under `images/<room>/<category>/`. A source such as `island_01.jpg` corresponds to `island_01_full.jpg` and `island_01_thumb.jpg` in the same folder. It creates a full-size JPEG and a thumbnail capped at 1200 by 900 pixels. Gallery JSON is rebuilt from `_full.jpg` files that have a matching `_thumb.jpg`; the shared script uses these paths for the hero, cards, and lightbox as described above.

The workflow creates `_full` and `_thumb` files only when they do not already exist. Replacing a source photo does not refresh existing variants; those generated files must be deliberately regenerated as part of an approved image task. The workflow watches `.jpg`, `.jpeg`, `.JPG`, and `.JPEG` pushes under `images/`, installs Pillow, then stages `images/` and `gallery-data.json` and pushes a bot commit to the same branch when generated changes exist. It has write permission and uses a shared `gallery-build` concurrency group with cancellation. Do not assume that a push triggered a successful generation or that the first pushed commit remains the branch tip; inspect the run and resulting commit when image work is reviewed.

The checked-in assets also include a PNG bathroom hero and a number of room/category folders with empty gallery categories. The current workflow trigger and source-image processing cover JPEG formats, not PNGs.

## Observed design and interaction patterns

These are descriptions of the current code, not a required future design brief.

- The pages define a shared warm, muted palette in CSS variables: plaster `#EDE8E0`, deeper plaster `#E2DCD1`, ink `#1C1A17`, teak `#8B7355`, pine `#3A4A3F`, and gold `#C6A15B` (with additional line, white, and dim-gold variables).
- The linked typefaces include Inter, Fraunces, JetBrains Mono, Kanit, and Mitr. Font usage varies by element and language.
- Embedded CSS uses responsive breakpoints at 860px, 720px, and 480px. Room pages adapt navigation, layouts, and gallery presentation for narrower viewports.
- The pages include a reduced-motion media query. Navigation includes labeled menu controls and a drawer; room pages also expose labeled lightbox controls. Preserve meaningful labels and keyboard behavior when editing these interactions.
- Homepage portfolio cards currently reference externally hosted Unsplash images. The source of those images does not establish that they depict KLAO's own work.

## Observations for later work

These items are visible in the current repository and are not being corrected by this guide:

- Some room pages contain duplicate `<title>` elements.
- One menu label is in English while surrounding menu labels are Thai.
- Several data categories have empty arrays; a filter may consequently show a count of zero.
- Homepage work cards use externally hosted example imagery.
- Contact values and business claims appear in page copy but have not been confirmed as canonical by this guide.

Treat these as separate items to investigate and scope with the owner before changing them.

## Executor cautions

- Read the relevant page and shared gallery code before editing. Repeated page markup and embedded styles/scripts can look alike without being identical.
- Keep room identifiers, category names, filter keys, and JSON keys aligned. Check all consuming room pages before changing shared gallery behavior.
- Confirm that every JSON `thumb` and `full` path exists, and that each full-size gallery image has its intended thumbnail. Hero images may be hard-coded in HTML or supplied through the gallery data mount.
- Use a local HTTP server for browser checks: the gallery loads JSON with `fetch`, so opening a page directly with `file://` does not exercise the normal gallery path.
- Do not treat embedded contact details, hours, page copy, or externally hosted portfolio imagery as verified business facts without owner confirmation.
- Preserve the existing page structure and design patterns unless the approved task requires a change. Treat palette, typography, breakpoints, and motion handling as observations rather than a fixed design specification.
- Keep future-facing visual work specific to the actual project, built-in work, materials, and craft. Follow owner references when supplied; otherwise use delegated design judgment and record assumptions about audience, service area, business details, and visual direction for owner inspection.
- The repository has no documented test suite or package-based build setup in the current files. Choose checks based on the change and report only checks actually performed.
