import { test, expect } from "@playwright/test";

test("login test", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "gemuel.dev@gmail.com");
  await page.fill('input[name="password"]', "Gemuel222003");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("http://localhost:3000/customer/dashboard");

  await page.pause();
});
