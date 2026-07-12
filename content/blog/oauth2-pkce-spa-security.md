---
title: "OAuth2 + PKCE: Auth for Modern Single-Page Apps"
description: "Why implicit flow died, how PKCE protects public clients, and the token flow every React app should implement."
date: "2025-04-28"
tags: ["Security", "OAuth", "Web"]
featured: false
published: true
thumbnail: "/blog/thumbnails/oauth-pkce.svg"
---

SPAs can't keep secrets   your client ID lives in bundled JavaScript. OAuth2's implicit flow treated that as acceptable. **It wasn't.** PKCE fixed public client auth without a backend holding credentials.

## The actors

- **Resource owner**   the user
- **Client**   your SPA or mobile app
- **Authorization server**   issues tokens (Auth0, Keycloak)
- **Resource server**   your API

## Authorization code + PKCE flow

1. Generate random `code_verifier` (43–128 chars)
2. Hash it → `code_challenge` (S256)
3. Redirect user to auth server with challenge
4. User logs in, auth server returns **authorization code**
5. Exchange code + original verifier for tokens

```javascript
// Step 1   before redirect
const verifier = generateRandomString(64);
const challenge = base64url(sha256(verifier));
sessionStorage.setItem("pkce_verifier", verifier);

// Step 5   token exchange
const res = await fetch("/oauth/token", {
  method: "POST",
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    code_verifier: sessionStorage.getItem("pkce_verifier"),
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  }),
});
```

An attacker intercepting the code can't exchange it without the verifier they never saw.

## Token storage

| Storage | XSS risk | Refresh |
| --- | --- | --- |
| localStorage | High | Easy |
| memory | Lower | Lost on refresh |
| httpOnly cookie | Lowest | Needs BFF pattern |

For SPAs, **Backend-for-Frontend** (BFF) holding refresh tokens in httpOnly cookies is the production-grade pattern.

## What to avoid

- ~~Implicit flow~~   deprecated (RFC 9700)
- Long-lived access tokens in localStorage
- Client secrets in frontend bundles

> [!WARNING]
> OAuth2 is a framework, not a plug-and-play library. Misconfigured redirect URIs and scopes cause more breaches than crypto breaks.

## Takeaway

PKCE turns "public client" from a vulnerability into a defined threat model. Pair it with short-lived access tokens and secure refresh handling   your users (and compliance team) will thank you.
