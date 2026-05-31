import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

// Define a test suite for 4-player multiplayer simulation
test.describe('Multiplayer Game Simulation', () => {

  test('simulate full 4-player lobby creation and transition to game', async ({ browser }) => {
    // We will create 4 isolated browser contexts to simulate 4 distinct players
    const hostContext = await browser.newContext();
    const guest1Context = await browser.newContext();
    const guest2Context = await browser.newContext();
    const guest3Context = await browser.newContext();

    const hostPage = await hostContext.newPage();
    const guest1Page = await guest1Context.newPage();
    const guest2Page = await guest2Context.newPage();
    const guest3Page = await guest3Context.newPage();

    hostPage.on('console', msg => console.log('HOST PAGE LOG:', msg.text()));
    hostPage.on('pageerror', err => console.log('HOST PAGE ERROR:', err.message));
    hostPage.on('requestfailed', request => console.log('HOST PAGE REQUEST FAILED:', request.url(), request.failure()?.errorText));
    hostPage.on('response', async response => {
      if (response.status() >= 400) {
        console.log(`HOST PAGE RESPONSE ${response.status()}:`, await response.text());
      }
    });

    // 1. Host creates a lobby
    const hostName = `Host_${Math.floor(Math.random() * 100000)}`;
    const lobbyName = `Lobby_${Math.floor(Math.random() * 100000)}`;
    await hostPage.goto('/create');
    await hostPage.fill('input[id="player-name"]', hostName);
    await hostPage.fill('input[id="lobby-name"]', lobbyName);
    await hostPage.click('button[type="submit"]');

    // Wait for the host to reach the waiting room and verify the lobby name
    await hostPage.waitForURL(/\/lobby\/\d+\/waiting/);
    await expect(hostPage.locator('h1')).toHaveText(lobbyName);

    // Verify Host sees 3 empty slots
    await expect(hostPage.locator('text=Waiting...')).toHaveCount(3);
    
    // Check that Start Game is disabled
    const startGameBtn = hostPage.locator('button', { hasText: 'Start Game' });
    await expect(startGameBtn).toBeDisabled();

    // Helper to join a guest
    const joinGuest = async (page: Page, guestName: string) => {
      await page.goto('/join');
      await page.fill('input[placeholder="What\'s your nickname?"]', guestName);
      
      // Refresh to ensure lobby appears
      await page.locator('button', { hasText: 'Refresh' }).click();
      
      // Find the lobby row and click Join
      const lobbyCard = page.locator('.group', { hasText: lobbyName }).first();
      const joinBtn = lobbyCard.locator('button', { hasText: 'Join' });
      await joinBtn.click();
      
      // Verify reached waiting room
      await page.waitForURL(/\/lobby\/\d+\/waiting/);
      await expect(page.locator(`text=${lobbyName}`)).toBeVisible();
    };

    // 2. Guests join the lobby
    await joinGuest(guest1Page, `Guest1_${Math.floor(Math.random() * 100000)}`);
    await joinGuest(guest2Page, `Guest2_${Math.floor(Math.random() * 100000)}`);
    await joinGuest(guest3Page, `Guest3_${Math.floor(Math.random() * 100000)}`);

    // 3. Verify all players are connected
    // By this point, the host should see no "Waiting..." slots
    await expect(hostPage.locator('text=Waiting...')).toHaveCount(0);
    
    // Start game button should now be enabled for host
    await expect(startGameBtn).not.toBeDisabled();

    // 4. Host starts the game
    await startGameBtn.click();

    // 5. Verify transition to Game Board (bidding phase) for ALL players
    const verifyGameBoard = async (page: Page) => {
      // Assuming GameBoard renders "bidding" somewhere, or we can check the status bar
      await expect(page.locator('text=bidding')).toBeVisible({ timeout: 15000 });
    };

    await Promise.all([
      verifyGameBoard(hostPage),
      verifyGameBoard(guest1Page),
      verifyGameBoard(guest2Page),
      verifyGameBoard(guest3Page),
    ]);
  });

});
