const { clickElement, getAttribute, getText } = require("./lib/commands");

let page;

describe("Cinema tickets order", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  }, 150000);

  afterEach(() => {
    page.close();
  });

  test("2 tickets successful order", async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toEqual("ИдёмВКино");
    
    await clickElement(page, "a:nth-child(7)");
    const dateChosen = await getAttribute(page, "a:nth-child(7)");
    expect(dateChosen).toContain("page-nav__day_chosen");
    
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await page.goto("https://qamid.tmweb.ru/client/hall.php", 90000);
    
    const filmTitle = await getText(page, ".buying__info-title");
    expect(filmTitle).toEqual("Микки маус");
    const filmStart = await getText(page, ".buying__info-start");
    expect(filmStart).toEqual("Начало сеанса: 11:00");
    
    await clickElement(page, "div:nth-child(8) span:nth-child(5)");
    const chair1Selected = await getAttribute(page, "div:nth-child(8) span:nth-child(5)");
    expect(chair1Selected).toContain("buying-scheme__chair_selected");
    await clickElement(page, "div:nth-child(8) span:nth-child(6)");
    const chair2Selected = await getAttribute(page, "div:nth-child(8) span:nth-child(6)");
    expect(chair2Selected).toContain("buying-scheme__chair_selected");
    
    await clickElement(page, ".acceptin-button");
    await page.goto("https://qamid.tmweb.ru/client/payment.php", 90000);
    
    const headerText = await getText(page, ".ticket__check-title");
    expect(headerText).toEqual("Вы выбрали билеты:");
    const filmConfirmation = await getText(page, "body main p:nth-child(1)");
    expect(filmConfirmation).toEqual("На фильм: Микки маус");


  }, 300000);

  test("One ticket successful order", async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toEqual("ИдёмВКино");
    
    await clickElement(page, "a:nth-child(5)");
    const actual = await getAttribute(page, "a:nth-child(5)");
    expect(actual).toContain("page-nav__day_chosen");
    
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='191']");
    await page.goto("https://qamid.tmweb.ru/client/hall.php", 90000);
    
    const filmTitle = await getText(page, ".buying__info-title");
    expect(filmTitle).toEqual("Унесенные ветром.");
    const filmStart = await getText(page, ".buying__info-start");
    expect(filmStart).toEqual("Начало сеанса: 14:00");
    
    await clickElement(page, "div:nth-child(10) span:nth-child(8)");
    const chairSelected = await getAttribute(page, "div:nth-child(10) span:nth-child(8)");
    expect(chairSelected).toContain("buying-scheme__chair_selected");
       
    await clickElement(page, ".acceptin-button");
    await page.goto("https://qamid.tmweb.ru/client/payment.php", 90000);
    
    const filmConfirmation = await getText(page, "body main p:nth-child(1)");
    expect(filmConfirmation).toEqual("На фильм: Унесенные ветром.");
    const chairConfirmation = await getText(page, "body main p:nth-child(2)");
    expect(chairConfirmation).toEqual("Ряд/Место: 10/8");
    
  }, 300000);

  test("Ticket order failure", async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toEqual("ИдёмВКино");
    
    await clickElement(page, "a:nth-child(4)");
    const actual = await getAttribute(page, "a:nth-child(4)");
    expect(actual).toContain("page-nav__day_chosen");
    
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
    await page.goto("https://qamid.tmweb.ru/client/hall.php", 90000);
    
    const filmTitle = await getText(page, ".buying__info-title");
    expect(filmTitle).toEqual("Микки маус");
    const filmStart = await getText(page, ".buying__info-start");
    expect(filmStart).toEqual("Начало сеанса: 18:00");
    
    await clickElement(page, "div:nth-child(9) span:nth-child(3)");
    const chairSelected = await getAttribute(page, "div:nth-child(9) span:nth-child(3)");
    expect(chairSelected).toEqual("buying-scheme__chair buying-scheme__chair_disabled");

    await clickElement(page, "div:nth-child(9) span:nth-child(3)");
    expect(chairSelected).toEqual("buying-scheme__chair buying-scheme__chair_disabled");

         
  }, 300000);

});

