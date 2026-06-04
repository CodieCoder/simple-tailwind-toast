---
trigger: always_on
---

# simple-tailwind-toast project rules

This repository is a small React library, not an application. Keep the structure flat and package-focused unless the codebase grows enough to justify another layer.

## Source layout

- `lib/index.ts` is the public export surface. Update it when adding or removing public APIs.
- `lib/Toaster.tsx` owns rendering, accessibility attributes, timers, slots, icons, and custom render support.
- `lib/store.ts` owns toast state, subscriptions, IDs, updates, dismissals, and SSR-safe snapshots.
- `lib/toast.ts` exposes the imperative `toast` API.
- `lib/classes.ts` contains default Tailwind class presets.
- `lib/types.ts` contains exported public types.
- `tests/` contains store, renderer, and SSR coverage. Keep tests near the behavior they protect rather than reintroducing root-level test files.

## Library constraints

- Keep React as a peer dependency and avoid runtime dependencies unless they remove substantial complexity.
- Do not add providers, React context, CSS injection, generated CSS, or a bundled Tailwind reset.
- Preserve SSR-safe imports. Browser globals such as `window` or `document` should only be touched inside client-only effects or guarded code.
- Keep Tailwind customization string-based: default slots live in `toastClasses.default`, per-toast overrides use `className`, and full control uses `renderToast`.
- Treat accessibility as part of the public contract. The viewport should remain a live region, errors and warnings should announce as alerts, and dismiss buttons need labels.

## Documentation

- `README.md` is the public product documentation. Update it whenever install steps, Tailwind setup, exports, props, or bundle claims change.
- `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, and `.github/pull_request_template.md` are public repo hygiene docs. Keep them short and aligned with the current package workflow.
- `.github/workflows/ci.yml` and `.github/dependabot.yml` are public maintenance defaults. Keep CI aligned with the scripts in `package.json`.
- Avoid keeping one-off implementation plans after the work is done. Move durable decisions into this rule, the README, or tests.
- Do not create a project-specific skill directory unless there is a repeated workflow that cannot be expressed clearly in these rules.

## Verification

- Run focused tests for changed behavior, then `yarn typecheck` and `yarn test` before release-oriented changes.
- Run `yarn build` after public API, package entrypoint, or bundling changes.
- Run `yarn pack:dry` when changing package metadata, files, exports, README packaging, or release contents.
