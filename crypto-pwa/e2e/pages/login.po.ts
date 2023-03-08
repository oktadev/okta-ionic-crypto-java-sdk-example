import { browser, by, element } from 'protractor';
import { Page } from './app.po';

export class LoginPage extends Page {
  username = element(by.name('username'));
  password = element(by.name('password'));
  oktaLoginButton = element(by.css('input[type=submit]'));
  loginButton = element(by.css('#login'));
  logoutButton = element(by.css('#logout'));
  header = element(by.css('ion-title'));

  getHeader() {
    return this.header.getText();
  }

  setUserName(username) {
    this.username.sendKeys(username);
  }

  getUserName() {
    return this.username.getAttribute('value');
  }

  clearUserName() {
    this.username.clear();
  }

  setPassword(password) {
    this.password.sendKeys(password);
  }

  getPassword() {
    return this.password.getAttribute('value');
  }

  clearPassword() {
    this.password.clear();
  }

  async login(username: string, password: string) {
    // Entering non angular site, tell webdriver to switch to synchronous mode.
    browser.waitForAngularEnabled(false);
    await this.username.isPresent();
    await this.username.sendKeys(username);
    await this.password.sendKeys(password);
    await this.oktaLoginButton.click();
  }

  clickLoginButton() {
    return this.loginButton.click();
  }

  logout() {
    return this.logoutButton.click();
  }
}
