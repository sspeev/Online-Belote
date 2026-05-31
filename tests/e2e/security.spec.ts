import { test, expect } from '@playwright/test';

test.describe('Security & Authorization Checks', () => {

  test('prevents XSS payloads in lobby and player names', async ({ browser }) => {
    const hostContext = await browser.newContext();
    const guestContext = await browser.newContext();

    const hostPage = await hostContext.newPage();
    const guestPage = await guestContext.newPage();

    const xssPayload = `<script>alert('xss')</script>XSS_Test`;

    // 1. Host creates a lobby with XSS payload
    await hostPage.goto('/create');
    await hostPage.fill('input[id="player-name"]', xssPayload);
    await hostPage.fill('input[id="lobby-name"]', xssPayload);
    await hostPage.click('button[type="submit"]');

    // Wait for the host to reach the waiting room
    await hostPage.waitForURL(/\/lobby\/\d+\/waiting/);
    
    // Verify the XSS payload is rendered as text and no alert dialog is triggered
    // Playwright automatically dismisses dialogs by default, but we can check if it was triggered
    // Better yet, we can check that the literal text is present, meaning it was escaped
    await expect(hostPage.locator('h1')).toHaveText(xssPayload);
    
    // 2. Guest goes to join page and checks if lobby name is safely rendered
    await guestPage.goto('/join');
    await guestPage.locator('button', { hasText: 'Refresh' }).click();
    
    // Check if the lobby card contains the literal string, not an active script tag
    const lobbyNameEl = guestPage.locator(`text=${xssPayload}`);
    await expect(lobbyNameEl).toBeVisible();

    // Clean up
    await hostContext.close();
    await guestContext.close();
  });

  test('unauthorized users cannot start the game', async ({ browser }) => {
    const hostContext = await browser.newContext();
    const guestContext = await browser.newContext();

    const hostPage = await hostContext.newPage();
    const guestPage = await guestContext.newPage();

    const hostName = `Host_${Math.floor(Math.random() * 100000)}`;
    const lobbyName = `Lobby_${Math.floor(Math.random() * 100000)}`;
    
    // 1. Host creates a lobby
    await hostPage.goto('/create');
    await hostPage.fill('input[id="player-name"]', hostName);
    await hostPage.fill('input[id="lobby-name"]', lobbyName);
    await hostPage.click('button[type="submit"]');
    await hostPage.waitForURL(/\/lobby\/\d+\/waiting/);

    // 2. Guest joins
    await guestPage.goto('/join');
    await guestPage.fill('input[placeholder="What\'s your nickname?"]', `Guest_${Math.floor(Math.random() * 100000)}`);
    await guestPage.locator('button', { hasText: 'Refresh' }).click();
    
    // Find the lobby row and click Join
    const lobbyCard = guestPage.locator('.group', { hasText: lobbyName }).first();
    const joinBtn = lobbyCard.locator('button', { hasText: 'Join' });
    await joinBtn.click();
    await guestPage.waitForURL(/\/lobby\/\d+\/waiting/);

    // 3. Verify Host has "Start Game" button
    const hostStartBtn = hostPage.locator('button', { hasText: 'Start Game' });
    await expect(hostStartBtn).toBeVisible();

    // 4. Verify Guest DOES NOT have "Start Game" button
    const guestStartBtn = guestPage.locator('button', { hasText: 'Start Game' });
    await expect(guestStartBtn).toHaveCount(0);
  });

});
