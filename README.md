# Abdulhaq.it — Software engineer & IT geek

Next.js App Router portfolio with a progressive procedural 3D hero, a typed project archive, evidence-qualified case studies and trusted local MDX support.

## Run locally

Use a Node version matching package.json engines (22.22.2+, 24.15+, or 26+), then:

```sh
npm ci
npm run dev -- --port 4178
```

Open http://localhost:4178. A short Abdulhaq.it opening appears once per tab session and can be skipped. The 3D core activates on desktop hover or the interaction button; reduced motion/data saving keep the static artwork. Existing project and article URLs are preserved.

## Verify

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright owns port 4177 and refuses to reuse an unrelated server. You can set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chrome executable instead of downloading Chromium. `npm start -- --port 4178` runs the production build. Font downloads require network access during a clean build; fonts are served locally at runtime. In environments that block Turbopack’s helper-port binding, use `npm run build -- --webpack`; the current production build was validated with that supported compiler.

## Documentation

- [Discovery audit](docs/01-discovery-audit.md)
- [Architecture and creative direction](docs/architecture/blacksite.md)
- [Design tokens](docs/design-system/tokens.md)
- [Motion and storytelling](docs/motion-and-story.md)
- [GHOST PROTOCOL command reveals](docs/ghost-protocol-reveals.md)
- [Brand, profile and client journey update](docs/brand-profile-refinement.md)
- [Combined experience and current task status](docs/combined-experience.md)
- [Implementation report](docs/implementation-report.md)
- [Content editing](docs/content-editing.md)
- [Accessibility review](docs/accessibility-review.md)
- [Measured performance](docs/performance/README.md)
- [Deployment guide](docs/deployment/README.md)

No contact service or application secrets are required. Production has not been deployed. Existing article topics are drafts; missing evidence, imagery and project outcomes are explicitly recorded rather than invented.
