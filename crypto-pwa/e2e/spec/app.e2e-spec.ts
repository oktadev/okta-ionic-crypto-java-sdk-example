import { Page } from '../pages/app.po';
import { browser, ExpectedConditions as ec } from 'protractor';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(async () => {
      await page.navigateTo('/#/home');
    });

    it('should redirect to login', async () => {
      await browser.wait(ec.urlContains('/#/login'));
    });

    it('should have the correct title', async () => {
      await expect(page.getTitle()).toEqual('Cryptocurrency PWA with Authentication');
    });
  });
});
