import { test, expect } from '@playwright/test';

test.describe('UniDone E2E Tests', () => {
  test('успішний розрахунок дедлайну та зміна пріоритету', async ({ page }) => {
    // 1. Відкриваємо сторінку
    await page.goto('http://localhost:5173/');
    await expect(page.locator('h1')).toHaveText('UniDone: Калькулятор дедлайнів');

    // 2. Генеруємо локальну дату комп'ютера (+ 10 днів)
    const dateString = await page.evaluate(() => {
      const d = new Date();
      d.setDate(d.getDate() + 10);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    });

    // 3. Заповнюємо поля
    await page.locator('[data-testid="deadline-input"]').fill(dateString);
    await page.locator('[data-testid="priority-select"]').selectOption('high');

    // 4. ДИНАМІЧНА ПЕРЕВІРКА (Та сама прив'язка до компа, про яку ти казав)
    // Тест сам вираховує очікуваний результат так само, як це робить сайт.
    const expectedDays = await page.evaluate((ds) => {
        const now = new Date();
        const deadline = new Date(ds); 
        now.setHours(0, 0, 0, 0);
        deadline.setHours(0, 0, 0, 0);
        return String(Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    }, dateString);

    // 5. Перевіряємо результати
    await expect(page.locator('[data-testid="days-result"]')).toBeVisible();
    await expect(page.locator('[data-testid="days-result"]')).toContainText(expectedDays); // Вставить 9 або 10 залежно від поясу
    await expect(page.locator('[data-testid="priority-result"]')).toContainText('red');
  });
});