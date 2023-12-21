import { Page, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test11@gmail.com');
  await page.getByPlaceholder('Password').fill('test11');
  await page.getByRole('button', { name: "Let's Go!" }).click();
});

test('Create post', async ({ page }) => {
  await createPost(page);
});

test('Edit post', async ({ page }) => {
  await createPost(page);
  await page
    .locator(
      'body > main > section > article:nth-child(1) > header > section > svg'
    )
    .click();
  await page.getByRole('button', { name: 'Edit post' }).click();
  await page.getByPlaceholder('Write your post here').fill('Edit post test');
  await page.getByRole('button', { name: 'Edit' }).click();
});

test('Like post', async ({ page }) => {
  await createPost(page);
  await page.locator('button').first().click();
});

test('Delete post', async ({ page }) => {
  await createPost(page);
  await page
    .locator(
      'body > main > section > article:nth-child(1) > header > section > svg'
    )
    .click();
  await page.getByRole('button', { name: 'Delete post' }).click();
});

async function createPost(page: Page) {
  await page.getByText('What do you want to share today, test11?').click();
  await page.getByPlaceholder('Write your post here').fill('Create post test');
  await page.getByRole('button', { name: 'Create' }).click();
}
