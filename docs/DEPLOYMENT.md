# Deployment and Release Guide

[AGENTS.md](../AGENTS.md) defines authorization; [WORKFLOW.md](WORKFLOW.md) defines assignment. One executor owns the complete authorized publication task. There is no independent Reviewer or separate Release chat gate.

## Known integration and limits

- Local origin is `https://github.com/Nuugarn/Klaobuiltin.git`. The site is static HTML/CSS/JavaScript.
- Setup reported Cloudflare Pages `klaobuiltin`, production branch `main`, and `https://klaobuiltin.pages.dev`.
- Current production baseline, build/output settings, Preview configuration/URLs, DNS, deployment health, and resolution of reported HTTP 522 must be verified when relevant; setup notes alone do not prove them.
- `.github/workflows/update-gallery.yml` generates images/data and may commit/push back to the branch. It is not the website deployment workflow.

## Prepare the scoped candidate

1. Refresh workspace, branch, HEAD/status, writer ownership, remote/destination, and a fresh production baseline. The publication candidate must be the current `main` commit; never publish temporary branch `a`. Dirty status alone does not block work; preserve and exclude unrelated changes.
2. Inspect the full task comparison, including added/deleted/generated content. Stage explicit authorized paths or hunks and inspect the staged diff for unrelated files/private configuration/secrets.
3. If the shared checkout cannot yield a clean scoped `main` candidate, stop publication and isolate or resolve the unrelated work without creating another retained project branch.
4. Record the owner's task instruction and destination. Named Preview authority covers Preview; explicit production authority covers Production. Record the final `main` candidate SHA after in-scope fixes/generation; no new approval is required for each intermediate commit.

## Publish and verify Preview

When requested, publish the exact current `main` candidate to the configured non-production Preview destination and identify the actual successful Cloudflare Preview deployment, deployed SHA, usable URL, and affected rendered behavior. Do not publish `a`, create a retained Preview branch, infer the URL from a branch name, or report a successful upload/push as deployment proof.

Preview and Production use the same approved `main` source but remain separate destinations and permissions. If the available Cloudflare/Git configuration cannot preview a `main` commit without updating Production, do not push `main` merely to obtain a Preview and do not change infrastructure automatically; report that Preview is unavailable under the current configuration and request direction.

Hosted Preview and owner Preview acceptance are not universal production gates. Report unavailable inspection accurately and resolve checks that are necessary for the requested publication.

## Gallery generated changes

Wait for the gallery Actions run only when the candidate triggers it or the task explicitly requires a manual run. Inspect its result and final branch tip: shared `gallery-build` concurrency may cancel runs.

Verify intended `gallery-data.json` paths and `_full.jpg`/`_thumb.jpg` pairs. Existing variants are preserved; replacing a source image does not automatically refresh them. Include intended regeneration in the image task.

Expected generated changes within scope remain covered by task authorization. Inspect the actual generated diff and final deployment identity. Exclude unrelated bot changes; obtain direction if they cannot be separated or change the requested outcome.

## Publish and verify production

1. Confirm explicit production authority, the full scoped state of current `main`, the correct destination, and known integration. Reuse valid affected-behavior evidence; self-check the final release candidate.
2. Publish that exact `main` candidate to the configured production branch/destination. Do not add a separate task branch or PR gate unless the owner explicitly requests one for that release.
3. If remote `main` advances, assess integration and resolve in-scope issues. A changed base alone does not require re-approval; a different requested outcome or unresolved integration does.
4. Identify the final production commit, actual successful Cloudflare deployment for that commit, and production URL.
5. Verify affected live behavior. UI changes need relevant desktop/mobile checks; shared changes need consuming-page checks. Deployment status alone is not behavior proof.

## Pending commands and failures

Retain and resume the execution session; do not retry a pending push/merge. If the session is lost, reconcile relevant process/remote state before retrying.

Repair task-caused failures within scope. Report unresolved failure with commit, deployment status, URL, and limits; ask only for the direction needed to proceed. Rollback/settings changes retain AGENTS authorization boundaries. Never claim an unavailable check passed.
