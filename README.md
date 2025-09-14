# 📦 Dashboard Studio CLI

Scaffold beautiful dashboards into your **Next.js**, **React**, or **Vue** project with a single command.

[![npm version](https://img.shields.io/npm/v/dashboard-studio.svg?style=flat-square)](https://www.npmjs.com/package/dashboard-studio)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/<your-org>/<your-repo>/publish.yml?branch=main&style=flat-square)](https://github.com/<your-org>/<your-repo>/actions)

---

## 🚀 Usage

Run directly with **npx**:

```bash
npx dashboard-studio add fintech/fintech-01
```

This will:

Copy the dashboard template into your project

Ensure required components and lib utils are installed

Install missing dependencies (Shadcn, Tailwind, Radix UI, Lucide, etc.)

Get you running instantly 🚀

🛠 Development Setup

Clone the repo:

git clone https://github.com/omojibolaorija/dashboard-studio.git
cd dashboard-studio

Install dependencies:

npm install

Build the CLI:

npm run build

Test locally:

npx ts-node src/index.ts add fintech/fintech-01

Or test from build output:

node dist/index.js add fintech/fintech-01

✍️ Contributing

We welcome contributions! 🎉
Please follow the Conventional Commits convention and the release workflow below.

Conventional Commits Format
<type>(optional scope): <description>

### Common Commit Types

| Type         | Use Case                                     | Example                                 |
| ------------ | -------------------------------------------- | --------------------------------------- |
| **feat**     | A new feature                                | `feat(cli): add analytics dashboard`    |
| **fix**      | A bug fix                                    | `fix(templates): correct chart colors`  |
| **chore**    | Maintenance, tooling, or dependency updates  | `chore(deps): bump fs-extra to v11.2.0` |
| **docs**     | Documentation changes only                   | `docs(readme): add usage instructions`  |
| **refactor** | Code restructuring without changing behavior | `refactor(utils): simplify path helper` |
| **test**     | Adding or updating tests                     | `test(cli): add dashboard init tests`   |

✅ Use meaningful messages.
❌ Don’t use vague commits like update code or fix stuff.

## Versioning & Releases

We use semantic versioning and manual version bumps.

Patch → backward-compatible bug fixes

Minor → new features, backward-compatible

Major → breaking changes

Release Steps

Bump version:

npm version patch # or minor / major

This updates package.json and creates a Git tag (vX.Y.Z).

Push changes & tags:

git push && git push --tags

GitHub Actions workflow will:

✅ Check version consistency (package.json vs tag)

✅ Build the CLI

✅ Publish to npm

✅ Create a GitHub Release with auto-generated changelog

Verify:

npm → https://www.npmjs.com/package/dashboard-studio

## 🔄 Release Workflow

The release process follows these steps:

1. **Commit** your changes using [Conventional Commits](#common-commit-types).
2. **Bump version** manually with `npm version patch|minor|major`.
3. A **Git tag** (`vX.Y.Z`) is created automatically.
4. **Push** commits and tags to GitHub (`git push && git push --tags`).
5. **GitHub Actions workflow** runs and will:
   - ✅ Check version consistency (`package.json` vs tag)
   - ✅ Build the CLI
   - ✅ Publish to **npm**
   - ✅ Create a **GitHub Release** with auto-generated changelog
6. 🎉 The new version is live on **npm** and documented under **GitHub Releases**.

## 🐛 Troubleshooting

Here are some common issues and how to fix them:

- **Permission denied**

  - Make sure you run the CLI inside a valid **Next.js/React/Vue project** (with a `package.json` file).
  - The CLI will refuse to scaffold outside of a project root.

- **Publish fails**

  - Verify that your **`NPM_TOKEN`** is set correctly in your GitHub repository secrets.
  - Ensure it has **publish** access (Granular Access Token recommended).

- **Version mismatch**
  - Happens if your `package.json` version doesn’t match the Git tag.
  - Always run `npm version patch|minor|major` before pushing tags.

## License

-MIT © 2025 — Dashboard Studio Contributors
