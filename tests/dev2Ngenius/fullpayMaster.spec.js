import { test, expect } from '@playwright/test';
test.setTimeout(150000);

test('test', async ({ page }) => {

  await page.goto('https://app-dev2.qlub.cloud/qr/ae/Auto_Ngenius/2/_/_/85b64d15df');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Pay fully' }).click();

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Wait for card iframe 
  const cardIframe = page.frameLocator('iframe[name="ni-card-input"]');
  await cardIframe.locator('input[placeholder="Card number"]').waitFor({ state: 'visible' });

  // Enter Card Number
  await cardIframe.getByPlaceholder('Card number').click();
  await cardIframe.getByPlaceholder('Card number').fill('5457210001000019');
  await cardIframe.getByPlaceholder('MM/YY').click();
  await cardIframe.getByPlaceholder('MM/YY').fill('03/29');
  await cardIframe.getByPlaceholder('CVV').click();
  await cardIframe.getByPlaceholder('CVV').fill('222');
  await cardIframe.getByPlaceholder('Card Holder Name').click();
  await cardIframe.getByPlaceholder('Card Holder Name').fill('test');

  // Click Pay Now
  const payNowButton = page.locator('span.wrapper:has-text("Pay Now")');
  await payNowButton.click();

  // Wait for 3DS iframe 
  const threeDsIframe = page.frameLocator('iframe[name="three-ds-two-frame"]').frameLocator('[data-testid="\\33 ds_iframe"]');
  await threeDsIframe.getByRole('textbox').waitFor({ state: 'visible' });

  await threeDsIframe.getByRole('textbox').click();
  await threeDsIframe.getByRole('textbox').fill('12345');
  await threeDsIframe.getByRole('button', { name: 'Submit' }).click();

   // Assertions
   await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf').waitFor({ state: 'visible' });
   await expect(page.locator('p.MuiTypography-root.MuiTypography-body1.css-1dbb4wf')).toHaveText('Payment was successful!');
 
   await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc').waitFor({ state: 'visible' });
   await expect(page.locator('p.MuiTypography-root.MuiTypography-body1.css-1ih4cbc')).toHaveText('Fully paid');
 
   await page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj').waitFor({ state: 'visible' });
   await expect(page.locator('p.MuiTypography-root.MuiTypography-body1.css-1xyuldj')).toHaveText('Table 2 (Table 1)');

});
