# Operating this site with pstack

The website remains an Astro static site on GitHub Pages. Pstack provides agent
workflows, not a CMS, hosting service, or browser dependency. Journal entries
remain Markdown files in `src/content/journal/`.

## Installation

The 54 upstream skills and their supporting files are installed in
`.agents/skills/`. Cursor shares these through the `.cursor/skills` symlink and
loads the upstream agent definitions from `.cursor/agents/`. Codex can discover
the project skills on a new turn or session. This is a project-local skill
installation, not a registration with Cursor's plugin marketplace.

Source: https://github.com/cursor/plugins/tree/0317eb8b858c991c57721358daaee19dbe8c814d/pstack

Upstream plugin version: 0.15.25. The original MIT license and plugin metadata
are retained in `.agents/pstack/`. Upstream skill files are unchanged.

## Using it

In Cursor, invoke `/poteto-mode` with the task. In Codex, ask to use the
project's `poteto-mode` skill. For example:

> Use poteto-mode to add a journal entry from these photos, preserving the layout.

Read `AGENTS.md` first. Follow the relevant investigation, bug-fix, or feature
playbook, inspect the diff, and verify the requested behavior. Use the current
chat model by default. Cursor-specific Task tools, model identifiers, external
plugins such as cursor-team-kit, and scheduled automations are not installed by
this integration. If a requested workflow needs one, report the missing
capability; do not claim that a substitute ran the original tool.

No global model settings, schedules, or external messaging are configured.
The user's instructions and the host's permissions take priority over upstream
autonomy guidance. Commit, push, or deploy only within the user's authorized scope.

## Verification and publishing

Run `npm run verify`. It builds the production output and checks generated HTML
links and image/script/style paths against the configured deployment base.
It checks local targets; it does not check external sites or browser interactions.
For layout, section folding, carousel controls, and photo protection changes,
also verify the affected behavior in a browser.

GitHub Actions runs the same command before uploading the Pages artifact.
After an authorized push, check the workflow and the public home and journal URLs.
Keep the installed upstream revision pinned; review an update before replacing it.
