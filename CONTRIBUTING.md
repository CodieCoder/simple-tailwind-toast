# Contributing

Thanks for helping improve `simple-tailwind-toast`. This is a small React library, so the best contributions are focused, tested, and careful about public API changes.

## Before You Start

- Search existing issues and pull requests to avoid duplicate work.
- Open an issue first for new public APIs, behavior changes, accessibility changes, or anything that could affect bundle size.
- Small documentation fixes, tests, and bug fixes can go straight to a pull request.

## Local Setup

```bash
corepack enable
yarn install
yarn test
yarn typecheck
yarn build
```

Use `yarn test:watch` while developing tests. Use `yarn pack:dry` before release or package metadata changes.

## Project Shape

- `lib/index.ts` is the public export surface.
- `lib/Toaster.tsx` owns rendering, accessibility attributes, timers, icons, slots, and custom render support.
- `lib/store.ts` owns toast state, subscriptions, IDs, updates, dismissals, and SSR-safe snapshots.
- `lib/toast.ts` exposes the imperative `toast` API.
- `lib/classes.ts` contains the default Tailwind class presets.
- `tests/` contains store, renderer, and SSR coverage.

## Contribution Guidelines

- Keep React as a peer dependency.
- Avoid runtime dependencies unless they remove substantial complexity.
- Preserve SSR-safe imports. Browser globals should be guarded or used inside client-only effects.
- Do not add providers, React context, CSS injection, generated CSS, or a bundled Tailwind reset.
- Keep Tailwind customization string-based through `toastClasses.default`, `className`, `classNames`, and `renderToast`.
- Treat accessibility as part of the public contract.

## Testing Expectations

- Add or update tests for behavior changes.
- Add SSR coverage when import-time behavior changes.
- Run `yarn typecheck` and `yarn test` before opening a pull request.
- Run `yarn build` when changing exports, package entrypoints, or type generation.

## Pull Requests

Please include:

- A short summary of the change.
- Any public API or migration notes.
- Tests run locally.
- Screenshots only when the rendered UI changed.

## Releases

This package follows semantic versioning:

- Patch: bug fixes with no API changes.
- Minor: backward-compatible features.
- Major: breaking API, package entrypoint, or behavior changes.

Do not manually edit the version for release work. Use the package-manager version command, for example:

```bash
yarn version patch --immediate
```
