const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;

const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");

const { clickElement, getText, getAttribute } = require("../../lib/commands.js");

setDefaultTimeout(300000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  this.timeout = 150000;
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", {timeout: 150000}, async function (string) {
  return await this.page.goto(`${string}`);
});

When('user clicks on 7th filmdate', async function () {
  return await clickElement(this.page, "a:nth-child(7)");
  });

When('user clicks on 11.00 filmtime', async function () {    
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='198']");
  });

When('user goes to {string} page', {timeout: 150000}, async function (string) {
  return await this.page.goto(`${string}`);
});

When('user clicks on row 8 seat 5', async function () {
  return await clickElement(this.page, "div:nth-child(8) span:nth-child(5)");
  });

When('user clicks on row 8 seat 6', async function () {
  return await clickElement(this.page, "div:nth-child(8) span:nth-child(6)");
   });

When('user presses order button', async function () {
   return await clickElement(this.page, ".acceptin-button");
  });

Then('user goes to next {string} page', {timeout: 150000}, async function (string) {
   return await this.page.goto(`${string}`);
});

Then('user sees tickets order confirmation {string}', {timeout: 90000}, async function (string) {
    const headerText = await getText(this.page, ".ticket__check-title");
    expect(headerText).equal(string);
  });
  
Then('user sees Micky mouse film confirmation {string}', {timeout: 90000}, async function (string) {
    const filmConfirmation = await getText(this.page, "body main p:nth-child(1)");
    expect(filmConfirmation).equal(string);
  });

When('user clicks on 5th filmdate', async function () {
    return await clickElement(this.page, "a:nth-child(5)");
  });

When('user clicks on 17.00 filmtime', {timeout: 90000}, async function () {    
    return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='190']");
  });

When('user clicks on row 10 seat 8', async function () {
    return await clickElement(this.page, "div:nth-child(10) span:nth-child(8)");
  });

Then('user sees Gone with the Wind film confirmation {string}', {timeout: 90000}, async function (string) {
    const filmConfirmation = await getText(this.page, "body main p:nth-child(1)");
    expect(filmConfirmation).equal(string);
  });
  
Then('user sees chair confirmation {string}', {timeout: 90000}, async function (string) {
    const chairConfirmation = await getText(this.page, "body main p:nth-child(2)");
    expect(chairConfirmation).equal(string);
  });

When('user clicks on 4th filmdate', async function () {
    return await clickElement(this.page, "a:nth-child(4)");
  });

When('user clicks on 18.00 filmtime', {timeout: 90000}, async function () {    
    return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='199']");
  });

When('user clicks on row 9 seat 3', async function () {
    return await clickElement(this.page, "div:nth-child(9) span:nth-child(3)");
  }); 

Then('user cannot choose this seat', {timeout: 90000}, async function () {
    const actual = await getAttribute(this.page, "div:nth-child(9) span:nth-child(3)");
    expect(actual).equal("buying-scheme__chair buying-scheme__chair_disabled");
  });
  
  
  
  