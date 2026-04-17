# 🚀 Lesan Release Guide

This document outlines the process for publishing new versions of the Lesan framework to **npm**, **JSR**, and **deno.land/x**. 

Releases are fully automated using GitHub Actions. When a new version tag (e.g., `v1.0.0`) is pushed to the repository, the CI/CD pipeline will automatically build and publish the packages.

---

## 🛠️ Part 1: One-Time Repository Setup

Before the automated release pipeline can work, the repository administrators must configure the following credentials and webhooks in the `MiaadTeam/lesan` repository.

### 1. npm Setup (GitHub Secret)
To publish to npm, the GitHub Action needs an authentication token.
1. Log in to [npmjs.com](https://www.npmjs.com/).
2. Go to **Access Tokens** -> **Generate New Token** -> **Automation**.
3. Copy the generated token.
4. Go to the Lesan GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
5. Click **New repository secret**.
6. Name: `NPM_TOKEN`
7. Value: *(Paste the npm token here)*

### 2. JSR Setup (OIDC Linking)
JSR uses secure OpenID Connect (OIDC) to authenticate GitHub Actions, so no manual tokens are needed. However, the repository must be linked.
1. Log in to [jsr.io](https://jsr.io/).
2. Create the scope `@miaad` (if not already created) and the package `@miaad/lesan`.
3. Go to the package **Settings** -> **GitHub Actions**.
4. Link the GitHub repository: `MiaadTeam/lesan`.

### 3. deno.land/x Setup (Webhook)
Publishing to `deno.land/x` does not use GitHub Actions. Instead, it relies on a GitHub Webhook.
1. Go to the Lesan GitHub repository -> **Settings** -> **Webhooks**.
2. Click **Add webhook**.
3. **Payload URL**: `https://api.deno.land/webhook/gh/lesan`
4. **Content type**: `application/json`
5. **Which events would you like to trigger this webhook?**: Select **Let me select individual events**, then check **Branch or tag creation**.
6. Click **Add webhook**.

---

## 📦 Part 2: How to Publish a New Release

Once the one-time setup is complete, follow these steps to release a new version of Lesan.

### Step 1: Bump the Version
Update the version number in both configuration files. Ensure the versions match exactly.

1. Update `package.json`:
   ```json
   {
     "name": "lesan",
     "version": "1.0.1"
   }
   ```

2. Update `deno.json`:
   ```json
   {
     "name": "@miaad/lesan",
     "version": "1.0.1"
   }
   ```

### Step 2: Commit the Changes
Commit the version bump to the `main` branch.
```bash
git add package.json deno.json
git commit -m "chore: release v1.0.1"
git push origin main
```

### Step 3: Create and Push a Tag
The automated publishing workflow is triggered by Git tags that start with `v`.

Create an annotated tag for the new version:
```bash
git tag -a v1.0.1 -m "Release v1.0.1"
```

Push the tag to GitHub:
```bash
git push origin v1.0.1
```

---

## 🔄 What Happens Next?

As soon as you push the `v*.*.*` tag:

1. **GitHub Actions** will trigger the `.github/workflows/publish.yml` workflow.
2. The **npm job** will install dependencies, run `npm run build` (via `tsup`), and publish the `dist/` folder to the npm registry.
3. The **JSR job** will authenticate via OIDC and publish the Deno-native source code directly to the JSR registry.
4. The **deno.land/x webhook** will notify Deno's servers to pull the new tag and make it available at `https://deno.land/x/lesan@v1.0.1/mod.ts`.

You can monitor the progress of the release in the **Actions** tab of the GitHub repository.
