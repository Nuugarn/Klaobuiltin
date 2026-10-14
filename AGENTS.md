# Klaobuiltin: Project Instructions

These rules reflect the owner's workflow decisions through 2026-10-14. Direct owner instructions take precedence. Write rules and handoffs in English; explain decisions and results to the owner in concise Thai.

## Project context and reading

- This is the KLAO static HTML/CSS/JavaScript website: `index.html`, `kitchen.html`, `living.html`, `bedroom.html`, and `bathroom.html`. Pages contain embedded styles/scripts; change structure only as needed for the task.
- Galleries share `gallery.js`, `gallery-data.json`, and `images/`. Browser gallery checks require local HTTP because the script fetches JSON.
- Read only task-relevant sections of [PROJECT.md](docs/PROJECT.md), [WORKFLOW.md](docs/WORKFLOW.md), and, for publication, [DEPLOYMENT.md](docs/DEPLOYMENT.md). Reuse unchanged guidance; bound searches and output.
- There is no documented test suite or package build. Do not install a framework or add tests merely to satisfy a checklist.
- Setup reported origin `Nuugarn/Klaobuiltin`, Cloudflare Pages `klaobuiltin`, production branch `main`, and `https://klaobuiltin.pages.dev`. Verify the current destination and deployment when publishing; the reported HTTP 522 resolution is unknown.

## Roles and communication

### Right-hand advisor

- Keep one right-hand advisor for the project: discuss goals, review workflows, gather owner decisions, and communicate with Manager.
- Relay the latest owner instruction and relevant decisions once. Do not separately dispatch workers, duplicate Manager coordination, or poll the same status.
- Route implementation through Manager. Advice and a completed draft do not authorize publication.

### Manager

- Coordinate the project's existing task chats through one compact current-task record: owner instruction, outcome/target, acceptance, executor, workspace/branch/state, authorization, completed relevant checks, and next action.
- Assign one executor per task by default. Additional specialist chats are optional for useful independent work; do not split a small task into serial role handoffs.
- Resolve instructions in chronological owner-source order. Preserve settled decisions, park superseded scope, and ask only about a material unresolved choice outside delegated discretion.
- Coordinate exclusive writer ownership and consolidate one result back to the right-hand advisor. Do not manually edit website files or perform the executor's Git operations.

### Executor

- One assigned executor owns implementation, self-checks, branch preparation, scoped staging/commit/push, PR/merge, and deployment verification when authorized.
- Existing Builder, Reviewer, and Release chat names are legacy task labels; they do not require separate handoffs. Manager may assign one of these existing chats as executor for the whole task.
- There is no independent Reviewer role, mandatory second-agent review, or separate design-fidelity approval gate. Keep necessary technical and publication checks with the executor.
- Be the sole manual writer of task source, assets, and documentation in the shared checkout. Complete authorized work and report outcomes, assumptions, relevant checks, and limits.

### Design specialist and live UI work

- Manager may commission an optional read-only specialist for design research or specifications. Use [klao-design-research](.agents/skills/klao-design-research/SKILL.md) only when that research is useful; a chosen owner design skips research and alternative directions.
- The executor may choose colors, fonts, layout, spacing, and animation within the requested target, including small responsive fixes caused by new copy. No separate design-choice approval is required.
- A clear owner request to work together on a named UI target starts a direct feedback loop with the assigned executor. Manager coordinates writer ownership once; routine iterations need no relay or special entry/exit phrase. On completion, return a compact result to Manager.
- Figma operations use applicable skills, verified access, and scoped authority. Sharing, seats, billing, and permission changes need an explicit request.

## Defaults and scope

- Default outcome: an uncommitted local draft for owner inspection. Do not ask local-versus-hosted on every task or publish merely because files changed.
- Resolve routine implementation details and repair task-caused defects within scope. Design discretion covers the named target, not unrelated pages, features, or project-wide refactors.
- Report unrelated existing defects as separate proposals; do not silently fix them.
- Missing business details may be inferred or drafted, including suggested copy and values. Identify assumptions/placeholders briefly in the handoff so the owner can inspect and replace them visually; never describe an assumption as verified.
- Keep image provenance and reuse rights clear. Stock/AI concepts are not evidence of completed KLAO projects.
- Obtain direction for a different outcome, new dependencies/frameworks, paid services, infrastructure/access changes, or destructive actions. Do not reopen already granted task authority.

## Publication authorization

- A request for a local edit authorizes implementation and relevant checks on temporary branch `a`.
- When the `a` result is ready, ask the owner whether to integrate it into `main`. A clear yes authorizes scoped local integration into `main` and cleanup of `a`; it does not authorize a hosted Preview or Production publication.
- A clear no authorizes permanent deletion of the exact temporary `a` branch/worktree and its rejected task changes after checking that they contain no unrelated work.
- An explicit Preview request authorizes publishing and verifying the current `main` candidate to a non-production Preview destination. It does not authorize Production.
- An explicit instruction such as “deploy to production” authorizes publishing the current scoped `main` candidate and verifying Production. No separate Preview acceptance or additional publication confirmation is required.
- Record the instruction and destination once. Approval covers the requested outcome, necessary in-scope fixes, and expected generated assets; record the actual `main` candidate SHA rather than requiring the owner to approve each intermediate SHA.
- Hosted Preview is optional when it adds useful validation or the owner requests it; it is not a universal production gate. Production still requires scoped diff checks, correct destination, known integration, and successful final deployment verification under [DEPLOYMENT.md](docs/DEPLOYMENT.md).
- Repair an in-scope failed check and repeat only the affected check. Ask when scope/destination changes, an unresolved failure blocks publication, or unrelated content cannot be excluded. Never publish a known broken candidate merely because publication was authorized.
- Inspection, status, documentation changes, and PR-only requests do not authorize production. Rollback, force-push, history rewriting, branch deletion, settings, and DNS changes require an explicit task-specific request.

## Shared checkout and existing work

- Refresh workspace, branch, HEAD, status, and target content before mutations; verify remote/destination before publication.
- Use a two-branch project model: `main` is the sole retained integration/publication branch, and `a` is the sole temporary local work branch. Do not create persistent `preview/*`, task, or role branches.
- Treat `main` as the owner-approved source for both Preview and Production. Do not make routine edits directly on `main`, and never publish directly from `a`.
- Create or refresh `a` from the current `main` for one active task. Show `a` through Local for owner inspection. After an owner-approved integration or rejection, remove the exact `a` branch and its worktree so the next task starts from current `main`.
- Continue around unrelated pending work, including separate regions of the same file when safely separable. Dirty status alone is not a reason to stop.
- Preserve all existing work. Never silently discard, stash, move, or include it in publication.
- Manager coordinates one active writer in a shared checkout; read-only specialists may work alongside it. Actual overlapping edits require coordination or an isolated checkout, not repeated permission for unrelated dirt.
- Ordinary website edits stay on `a` until the owner accepts them into `main`. Do not switch a shared branch while another writer is active.
- Stage only authorized files or hunks; isolate a publication candidate when the checkout contains unrelated work. Inspect the full comparison against the current production baseline.
- Keep secrets/private configuration out of commits and handoffs; use existing authentication without requesting pasted credentials.

## Checks, handoffs, and cost

Follow the [validation matrix and compact handoff](docs/WORKFLOW.md). Check affected behavior, report unavailable checks accurately, and reuse evidence when its relevant inputs and environment remain unchanged. A new chat or unrelated change does not automatically require repeating checks.

Prioritize quota, token use, and visible monetary cost: use one executor, short briefs, narrow reads, targeted checks, and event-based waits. Do not create benchmark tasks, repeatedly poll unchanged state, or claim savings without measurements.
