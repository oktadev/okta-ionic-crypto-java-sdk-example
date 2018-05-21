import { browser, element, by, protractor, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../pages/login.po';

describe('Login', () => {

  let loginPage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    await loginPage.navigateTo('/');
    await browser.waitForAngular();
  });

  it('should show a login button', async () => {
    expect(await loginPage.getHeader()).toMatch(/Login/);
    expect(await loginPage.loginButton.isPresent());
  });

  it('should fail to log in with bad password', async () => {
    await loginPage.clickLoginButton();
    loginPage.login('admin', 'foo');
    const error = element.all(by.css('.infobox-error')).first();
    await browser.wait(ec.visibilityOf(error));
    expect(await error.getText()).toMatch("Sign in failed!");
  });

  it('should log in successfully with demo account', async () => {
    loginPage.clearUserName();
    loginPage.setUserName(process.env.E2E_USERNAME);
    loginPage.clearPassword();
    loginPage.setPassword(process.env.E2E_PASSWORD);
    await loginPage.oktaLoginButton.click();

    const welcome = /Welcome/; // Use /Welcome, First Last/ if you want to verify full name
    const success = element.all(by.css('h1')).first();
    await browser.wait(ec.visibilityOf(success));
    expect(await success.getText()).toMatch(welcome);
  });

  it('should log out successfully', async () => {
    await loginPage.logout();
    await browser.wait(ec.urlContains('/#/login'));
    expect(await loginPage.loginButton.isPresent());
  })
});
