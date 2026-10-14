# Project Workflow and Handoffs

[AGENTS.md](../AGENTS.md) holds authority, role boundaries, scope, and publication policy. This guide supplies procedures; [DEPLOYMENT.md](DEPLOYMENT.md) supplies publication checks.

## 1. Define and assign

Owner -> one right-hand advisor -> Manager -> assigned task chats.

Manager records the requested outcome/target, acceptance, executor, workspace/state, and authorization once. Default to one executor and a local draft. Existing role chats may receive complete tasks; do not automatically route through Builder, Reviewer, and Release. Specialist chats support useful independent work without becoming review gates.

Read only relevant guidance and target source. Make routine content/design choices under AGENTS, briefly recording assumptions. Ask only for a material decision outside the granted scope; do not repeat settled choices.

## 2. Prepare and implement

The executor refreshes workspace, branch, HEAD/status, target content, and writer ownership. Use only temporary branch/worktree `a`, created or refreshed from current `main`, for the active task. Do not create another task or Preview branch. If `a` already contains another active task, coordinate that work before reusing it; do not overwrite it.

Continue around unrelated dirty work and preserve it. Coordinate actual overlapping writes; use an isolated checkout if needed. For publication, exclude unrelated files and mixed hunks from the candidate.

Implement the requested result. Adjust the target's typography, colors, layout, spacing, and motion as needed without per-choice approval. A copy change may include a small layout fix required to display it correctly. Fix task-caused defects; list unrelated defects separately.

Draft missing business copy/values when useful. Put assumptions in the handoff for the owner's visual review; do not present them as verified evidence.

## 3. Validate affected work

There is no independent Reviewer or mandatory separate design-fidelity review.

| Change | Executor checks |
| --- | --- |
| Exact copy/title/link value | Intended target/replacement, scoped diff, surrounding markup; inspect destination meaning or wrapping when affected |
| CSS/layout/motion | Affected desktop/mobile sizes, overflow, keyboard/touch behavior, reduced motion where relevant |
| JavaScript/shared behavior | Changed interaction, relevant console output, and consuming pages |
| Images/gallery | Actual paths, image variants, room/category keys, filters/lightbox or hero behavior affected by the task |
| Publication | Scoped candidate/current target, authorization, destination, deployment identity, and affected live result |

Do not invent an automated suite. Do not add tests unless the owner asks or an applicable higher-priority instruction requires them. Repair failures within scope, then repeat affected checks; do not automatically run a full matrix.

Reuse evidence when the checked inputs, environment/viewport, and observed result still match. An unrelated edit or role change does not invalidate it. Refresh publication identity and integration for the actual candidate. Record unperformed checks and unresolved limits honestly.

Use local HTTP for gallery fetch checks. If browser inspection fails, try at most one available non-mutating fallback and report remaining limits; do not bypass policy/access blocks.

## 4. Deliver locally or publish as requested

- **Local default:** show the identified `a` draft locally with its assumptions, relevant checks, and limits. No mandatory hosted Preview or second-agent review.
- **Decision gate:** when the `a` task is ready, ask whether to integrate it into `main`. If accepted, integrate only the scoped task into local `main`, verify the resulting state, then delete `a` and its worktree. If rejected, verify the exact disposable target and permanently delete `a` and its task changes. Preserve unrelated work in either case.
- **Explicit Preview request:** publish and verify the current `main` candidate to a non-production Preview destination. Never publish `a` or create a retained Preview branch.
- **Explicit production instruction:** publish the current scoped `main` candidate and verify the live result. No separate design, Preview acceptance, PR, or merge approval is added.
- Use hosted Preview when it resolves a concrete validation need or is requested. Local inspection is enough for a task that ends locally.
- Follow [DEPLOYMENT.md](DEPLOYMENT.md) when publishing. An unexpected scope/destination change or unresolved publication failure needs direction; routine in-scope fixes and expected generated assets remain covered by the task instruction.

## Design and live UI work

A supplied reference or chosen direction goes directly to scoped implementation. Research and alternative directions are optional when the owner is still choosing a direction; use [klao-design-research](../.agents/skills/klao-design-research/SKILL.md) only for that work. Do not force three alternatives or expand a room-only task into homepage work.

For direct owner UI iteration, Manager assigns the executor and exclusive writer ownership once. Owner feedback inside the agreed target goes directly to that executor. Show incremental local results and check affected behavior. On completion or a clear stop request, release the writer slot and hand back the current state. Live satisfaction alone does not authorize publication.

## Compact dispatch and handoff

Routine records should fit 4-6 lines. Link existing rules/evidence instead of copying protocols or logs.

```text
Task / owner instruction / target and acceptance:
Executor / workspace / branch / HEAD and scoped uncommitted state:
Changes / decisions / content assumptions:
Relevant checks / results / limits:
Authorization / delivered state / next action / writer state:
```

Publication results additionally identify the final candidate/production commit, destination URL, observed deployment status, and affected live checks. Distinguish a local draft, a commit, a verified Preview, and a verified production release; a push alone proves no deployment.

## Cost and waiting

Manager alone coordinates dependent chat waits; the right-hand advisor does not duplicate polling. Preserve running tool sessions, wait for events with bounded 30-60 second waits when needed, and do not retry unfinished mutation commands before reconciling their outcome.

Keep owner updates concise and meaningful. Load extra skills, source, agents, or broad checks only for a concrete task need. Choose the least costly available model capable of the task when a choice is actually exposed; do not invent pricing or change the owner's settings.

For naturally occurring tasks, note elapsed time, handoff count, and visible token/quota/cost usage in the existing task record. Leave unavailable usage unknown. Compare comparable tasks without manufacturing benchmarks or promising savings.
