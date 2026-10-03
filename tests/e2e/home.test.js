const { Builder, By, until } = require('selenium-webdriver');
 
// In Jenkins these come from the Jenkinsfile "environment" block.
// The defaults let you run the test from your own Windows machine.
const SELENIUM_URL = process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub';
const APP_URL = process.env.APP_URL || 'http://host.docker.internal:3000';
 
jest.setTimeout(60000); // browsers are slow to start; give the test 60 seconds
 
describe('Home page', () => {
  let driver;
 
  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .usingServer(SELENIUM_URL)
      .build();
  });
 
  afterAll(async () => {
    if (driver) await driver.quit();
  });
 
  test('shows the welcome heading', async () => {
    await driver.get(APP_URL);
    const txtHeading = await driver.wait(
      until.elementLocated(By.id('txtHeading')),
      10000
    );
    expect(await txtHeading.getText()).toBe('Hello DevOps');
  });
});
