# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security.spec.ts >> Security & Authorization Checks >> prevents XSS payloads in lobby and player names
- Location: tests\e2e\security.spec.ts:5:3

# Error details

```
Test timeout of 60000ms exceeded.
```

# Page snapshot

```yaml
- main [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]: B
        - generic [ref=e8]: BELOTE.
      - generic [ref=e9]:
        - link "Features" [ref=e10] [cursor=pointer]:
          - /url: "#features"
        - link "Experience" [ref=e11] [cursor=pointer]:
          - /url: "#experience"
        - button "Toggle Dark Mode" [ref=e12] [cursor=pointer]:
          - img [ref=e13]
        - button "Login" [ref=e15] [cursor=pointer]
  - generic [ref=e19]:
    - img [ref=e21]
    - heading "Oops!" [level=1] [ref=e23]
    - paragraph [ref=e24]: Failed to create lobby
    - generic [ref=e25]:
      - button "Retry" [ref=e26] [cursor=pointer]:
        - img [ref=e27]
        - generic [ref=e32]: Retry
      - button "Home" [ref=e33] [cursor=pointer]:
        - img [ref=e34]
        - generic [ref=e37]: Home
  - generic [ref=e39]:
    - generic [ref=e40]:
      - generic [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e43]: B
          - generic [ref=e44]: BELOTE.
        - paragraph [ref=e45]: Bringing the tradition of Belote into the digital era with a focus on quality, community, and design.
      - generic [ref=e46]:
        - heading "Navigate" [level=4] [ref=e47]
        - list [ref=e48]:
          - listitem [ref=e49]:
            - link "Home" [ref=e50] [cursor=pointer]:
              - /url: /
          - listitem [ref=e51]:
            - link "Create Lobby" [ref=e52] [cursor=pointer]:
              - /url: /create
          - listitem [ref=e53]:
            - link "Join Lobby" [ref=e54] [cursor=pointer]:
              - /url: /join
      - generic [ref=e55]:
        - heading "Support" [level=4] [ref=e56]
        - list [ref=e57]:
          - listitem [ref=e58]:
            - link "Report a Bug" [ref=e59] [cursor=pointer]:
              - /url: https://github.com/sspeev/Online-Belote/issues/new
              - img [ref=e60]
              - text: Report a Bug
    - generic [ref=e69]:
      - paragraph [ref=e70]: © 2026 Belote Redefined. All rights reserved.
      - generic [ref=e71]:
        - link "Instagram" [ref=e72] [cursor=pointer]:
          - /url: https://www.instagram.com/_stoyan.peev.520_/?
          - img [ref=e73]
        - link "Github" [ref=e76] [cursor=pointer]:
          - /url: https://github.com/sspeev
          - img [ref=e77]
```