# Case study evidence TODO

The public GitHub account does not contain a usable source repository for the
3D House Planning Builder. `jkdionaldo/3D-Room` is empty, and
`jkdionaldo/3JS-Test-` contains only a small standalone Three.js test with no
README, application source, database schema, authentication code, or Supabase
policies. No `source-docs` directory exists in this portfolio repository.

The live case study now includes editable draft copy for every section because
the owner requested placeholders. Replace the draft claims before treating the
case study as factual or publishing it as final.

## Questions to confirm

- **Problem and context:** Who was the tool for, and what specific workflow
  existed before it? Was the previous workflow manual, split across tools, or
  something else? Confirm the exact before/after contrast. The uncertainty is
  visible in [`src/data/portfolio.ts:113-120`](./src/data/portfolio.ts), where
  the current before/after wording is intentionally not confirmed.
- **Challenges and decisions:** Which two or three implementation problems did
  the code actually require solving? For each, what decision did you make and
  what trade-off did it create? Confirm whether placement, cost synchronization,
  mobile 3D performance, or Supabase data modeling were actually part of this
  project. The project currently has no source evidence beyond the feature
  summary at [`src/data/portfolio.ts:104-109`](./src/data/portfolio.ts).
- **Architecture:** What are the real runtime steps between the browser UI,
  A-Frame/Three.js scene, application state, and Supabase? Which nodes
  communicate, and what does each one do?
  The only local evidence is the technology summary at
  [`src/data/portfolio.ts:109`](./src/data/portfolio.ts); the public
  `jkdionaldo/3D-Room` repository is empty.
- **Security and data:** What data is stored, where is it stored, who can
  access it, and which authentication, validation, environment-variable, or
  Supabase RLS rules are present? Do not provide keys, internal URLs, or
  client-sensitive table names. No security implementation is visible in the
  portfolio data at [`src/data/portfolio.ts:100-134`](./src/data/portfolio.ts),
  and no usable project source or policies were found in the public account.
- **Links:** Is there a public live demo URL? Is there a public source
  repository that you approve for the case-study footer?
- **Next step:** What honest improvement would you make next, if any?

## Current draft warning

The problem, challenges, architecture, security/data, and next-step content in
[`src/data/portfolio.ts`](./src/data/portfolio.ts) is placeholder copy requested
for editing. In particular, replace the security values before publishing:
they are prompts, not evidence of implemented controls.
