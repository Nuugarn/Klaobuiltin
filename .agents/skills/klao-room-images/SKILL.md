---
name: klao-room-images
description: Add or replace KLAO room-page gallery or room hero images from chat attachments or a supplied Google Drive folder. Use for kitchen, living room, bedroom, or bathroom imagery; do not use for homepage-only or other site images.
---

# KLAO Room Images

Use this repeatable workflow when the owner sends room images or a Google Drive folder and wants them placed on a KLAO room page. Explain results to the owner in concise Thai; write handoffs and repository rules in English.

## Scope and authority

- Follow [AGENTS.md](../../../AGENTS.md) and the task-relevant room/gallery and local-delivery sections of [PROJECT.md](../../../docs/PROJECT.md) and [WORKFLOW.md](../../../docs/WORKFLOW.md). Owner instructions override this skill.
- Work only on `kitchen`, `living-room`, `bedroom`, or `bathroom` room-page galleries and their room hero images. Do not change homepage-only images, homepage work cards, unrelated pages, or gallery behavior just to complete an image intake.
- The default result is an uncommitted local draft on temporary branch `a`. Do not integrate into `main`, push, create a hosted Preview, or deploy Production without the owner's corresponding explicit instruction. Follow the project's branch and writer-ownership rules.
- Never ask for an API secret, password, or token in chat; never commit credentials. Do not create a paid service, upload preset, API integration, or new infrastructure as part of routine image intake.

## Input and classification

1. At the start of each new image batch, establish both answers with the owner before uploading or editing: **where are the source images?** (chat attachments, exact Drive folder/file link, or an existing Cloudinary asset URL) and **where should the website show them?** (which of the four room pages, then room hero or gallery category, and add versus replace). Ask the missing questions together in concise Thai even if filenames seem suggestive. If both answers are already explicit, restate the mapping briefly and proceed without a redundant question. If the owner says only "put it in the room," ask which room and position.
2. Accept images attached in chat or the exact Google Drive folder link supplied by the owner. For Drive, use the available authenticated Drive connection if accessible; inspect only the supplied folder and its relevant children. If inaccessible, report that and ask for attachments or access through the supported connection. Do not claim a folder was read from its URL alone.
3. Inspect the specified room page, its filter `data-filter` keys, `gallery-data.json`, and relevant existing images before changing anything. Map each source to the owner's chosen room and location. Folder names and filenames are hints, not authority for page placement; ask about any remaining materially ambiguous replacement, order, or source rights.
4. Use `name` as a stable internal identifier, not a public title. The current lightbox displays the category label from `.project-meta`, not `name` or the filename. Do not promise per-image captions or change `gallery.js` unless the owner separately requests that feature. Do not label stock, AI, or unverified images as completed KLAO work.
5. Report the proposed room/category and add-or-replace mapping briefly before a destructive replacement. Preserve unrelated existing images and gallery entries.

## Place the images

1. Prefer the existing Cloudinary account and one original/master upload per image. Obtain the actual delivered URL, public ID, version, and format from the successful upload or asset details; do not guess them from a filename. Use authenticated tools or the owner's existing logged-in UI when available. If automated upload is unavailable, ask the owner to upload the master in Cloudinary and provide its delivery URL or accessible asset page; resume from there. Never claim that a skill by itself grants Cloudinary upload access.
2. For a Cloudinary gallery image, derive `thumb` and `full` delivery URLs from that same uploaded master, following the current Kitchen pattern (`c_limit,w_600/f_auto/q_auto` and `c_limit,w_1200/f_auto/q_auto`). Do not require separately uploaded thumbnail files. Confirm both URLs load and show the intended image.
3. Add or replace only the intended record in `gallery-data.json`, preserving the room key, category key, and existing order unless the owner specifies an order. A room hero belongs in its room's `hero` entry, not its gallery cards. Check whether the actual room hero is data-driven or hard-coded in the room HTML and update the necessary room-page reference only. The homepage hero is outside this skill's scope.
4. Avoid adding source JPEGs under `images/` for Cloudinary-only additions: the existing gallery-generation workflow can rebuild `gallery-data.json` from repository images when triggered. Do not run that workflow or mix the two image pipelines accidentally.

## Check and hand off

- Validate JSON, the scoped diff, room/category keys, actual image URLs, thumbnails, room hero if changed, gallery filter counts, and lightbox full-image behavior. Use local HTTP for browser checks because `gallery.js` fetches JSON. Reuse still-valid evidence; do not invent a test suite.
- Summarize in Thai: source count, destination room/category, added or replaced records, what loaded locally, any unresolved upload/access limit, and the exact local branch state. If an attachment or Drive item could not be accessed or uploaded, identify it rather than silently skipping it.
- Stop at the authorized outcome. Ask whether to integrate the completed `a` draft into local `main`; integration is not permission to publish the hosted site.
