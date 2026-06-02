# 🛡️ Security Policy

We take the security of **Online Belote** seriously. Thank you for helping us keep our multiplayer gaming platform safe, secure, and fun for everyone.

This document outlines our policy for reporting security vulnerabilities, our supported versions, and the practices we follow to ensure the integrity of the game.

---

## 📋 Supported Versions & Versioning Policy

We follow a structured Semantic Versioning (SemVer) model:
* **`x.0.0` (Major):** New major versions or substantial architectural changes/rewrites.
* **`0.x.0` (Minor):** New features or functional additions.
* **`0.0.x` (Patch):** Hotfixes, security patches, and general bug fixes.

We actively maintain and provide security updates for the following versions of the Online Belote frontend:

| Version | Supported | Notes |
|---------|-----------|-------|
| `v1.0.x` |  Yes | Active stable release branch. |
| `< v1.0.0` |  No | Pre-release and development versions. Please upgrade to the latest release. |

---

## 🔒 Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability, we ask that you report it to us privately. This allows us to investigate, develop a fix, and coordinate a release before the issue is publicly disclosed.

### How to Report

To report a vulnerability, please email us at [peevstoyan05@gmail.com](mailto:[EMAIL_ADDRESS]) with the following details:

1. **Description:** A detailed description of the vulnerability and its potential impact.
2. **Steps to Reproduce:** A step-by-step guide (or proof-of-concept exploit) to reproduce the issue.
3. **Environment Details:** Browser name/version, operating system, and whether this was observed on the deployed frontend or in a local development build.
4. **Attribution:** Let us know if you would like to be credited publicly in our release notes once the vulnerability is resolved.

We will acknowledge receipt of your report within **48 hours** and provide a status update on our investigation.

---

## 🛡️ Security Architecture & Best Practices

Online Belote incorporates several security measures at the frontend layer to protect user sessions and game integrity:

### 1. Secure Real-Time Communication
* **SignalR over TLS:** All real-time communication between the client and the backend hub is encrypted via TLS (HTTPS/WSS) in production.
* **Credentials Management:** The SignalR client uses `{ withCredentials: true }` to securely handle credentials and cookies only over encrypted channels.

### 2. Client-Side Input Sanitization
* All player names, lobby names, and inputs are validated and sanitized to prevent script injection (XSS) and client-side UI manipulation.

### 3. Session Isolation
* Game states, hand configurations, and private player details (like player cards) are maintained server-side. The frontend only receives game data relevant to the active player to prevent client-side "card-peeking" or cheating.
* Reconnection and state validation are bound to protected session identities.

---

## 🚀 Disclosure Process

Once a vulnerability is reported, we follow a responsible disclosure process:

1. **Triage:** We investigate and confirm the vulnerability.
2. **Mitigation:** We develop a patch or workaround.
3. **Coordination:** We coordinate the release of the fix across the deployed frontend and backend services.
4. **Disclosure:** Once the patch is deployed and verified, we publish a security advisory detailing the vulnerability and thanking the reporter (if desired).
