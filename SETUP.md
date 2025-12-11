# Chrome Web Store Auto-Publish Setup

## Required GitHub Secrets

Add these secrets to your repository at:
`Settings → Secrets and variables → Actions → New repository secret`

| Secret Name | Description |
|-------------|-------------|
| `CHROME_EXTENSION_ID` | Your extension ID from Chrome Web Store (e.g., `abcdefghijklmnopqrstuvwxyz`) |
| `CHROME_CLIENT_ID` | OAuth2 client ID from Google Cloud Console |
| `CHROME_CLIENT_SECRET` | OAuth2 client secret from Google Cloud Console |
| `CHROME_REFRESH_TOKEN` | OAuth2 refresh token for API access |

## How to Get Credentials

### 1. Get Extension ID
- Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- Upload your extension manually for the first time
- Copy the extension ID from the URL or dashboard

### 2. Create Google Cloud OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Chrome Web Store API**:
   - Go to `APIs & Services → Library`
   - Search for "Chrome Web Store API"
   - Click Enable
4. Create OAuth credentials:
   - Go to `APIs & Services → Credentials`
   - Click `Create Credentials → OAuth client ID`
   - Application type: **Desktop app**
   - Save the `Client ID` and `Client Secret`

### 3. Get Refresh Token

Run this locally to get your refresh token:

```bash
npx chrome-webstore-upload-cli init \
  --client-id YOUR_CLIENT_ID \
  --client-secret YOUR_CLIENT_SECRET
```

This will open a browser for authentication. After authorizing, it will output a refresh token.

Alternatively, use this URL pattern to get an auth code:
```
https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=YOUR_CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob
```

Then exchange the code for a refresh token.

## Workflow Behavior

- **Trigger:** Push to `main` or `master` branch
- **Actions:**
  1. Creates `extension.zip` with all required files
  2. Uploads the zip to Chrome Web Store
  3. Publishes the extension (submits for review)

## Notes

- First upload must be done manually via the Developer Dashboard
- Subsequent updates will be automatic via this workflow
- Published extensions go through Google's review process (can take hours to days)
- Version number in `manifest.json` must be incremented for each release
