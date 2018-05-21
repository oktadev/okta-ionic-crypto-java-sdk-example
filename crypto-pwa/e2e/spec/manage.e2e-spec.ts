import { browser, element, by, protractor, ExpectedConditions as ec, $ } from 'protractor';
import { LoginPage } from '../pages/login.po';
import { AddHoldingPage } from '../pages/add-holding.po';
import { HomePage } from '../pages/home.po';

fdescribe('Manage Holdings', () => {

  let loginPage, homePage, addHoldingPage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    addHoldingPage = new AddHoldingPage();
    await loginPage.navigateTo('/');
    browser.waitForAngular();
  });

  beforeEach(async () => {
    await loginPage.clickLoginButton();
    await browser.wait(ec.urlContains('oktapreview'));
    loginPage.login(process.env.E2E_USERNAME, process.env.E2E_PASSWORD);
    await loginPage.oktaLoginButton.click();
    await browser.wait(ec.urlContains('home'));
  });

  afterEach(async () => {
    await loginPage.logout();
  });

  it('should add and remove a holding', async () => {
    await homePage.clickAddCoinsButton();

    await browser.wait(ec.urlContains('add-holding'));

    addHoldingPage.setCryptoCode('BTC');
    addHoldingPage.setCurrency('USD');
    addHoldingPage.setAmount(3);
    await addHoldingPage.clickAddHoldingButton();

    // wait for everything to happen
    await browser.wait(ec.urlContains('home'));

    // verify message is removed and holding shows up
    const message = await element.all(by.css('.message'));
    expect(message.length).toBe(0);

    // wait for holding to show up
    const addedHolding = element.all(by.css('ion-item')).last();
    await browser.wait(ec.presenceOf(addedHolding));

    // delete the holding - https://forum.ionicframework.com/t/move-ion-item-sliding-by-protractor/106918
    await browser.actions().mouseDown(addedHolding)
      .mouseMove({x: -50, y: 0})
      .mouseMove({x: -50, y: 0})
      .mouseMove({x: -50, y: 0})
      .mouseUp()
      // workaround for async/await not working with browser.actions()
      // https://github.com/angular/protractor/issues/4578
      .perform().then(() => {
        browser.actions().perform();
      });

    await homePage.deleteButton.click();
    expect(message.length).toBe(1);
  });
});
