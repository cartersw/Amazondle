const puppeteer = require("puppeteer");
const fs = require("fs");

const scrape = async (page) =>{
  // Gather product title
  const title = await page.$$eval("div.a-section.a-spacing-base h2 span.a-color-base", (nodes) =>
    nodes.map((n) => n.innerText)
  );

  // Gather price
  const price = await page.$$eval(
    "div.a-section.a-spacing-base span.a-price[data-a-color='base'] span.a-offscreen",
    (nodes) => nodes.map((n) => n.innerText)
  );

  // Gather picture
  const picture = await page.$$eval(
    'div.a-section.a-spacing-base img.s-image[srcset]',
    (nodes) => nodes.map((n) => n.src)
  );

  // Put data together
  const amazonSearchArray = title.map((_, index) => {
    if (title[index] && price[index] && picture[index]) {
      return {
        title: title[index],
        price: price[index],
        picture: picture[index],
      };
    }
    else return null;  // Return null for items that do not contain all three
}).filter(item => item !== null);  // Filter out the null entries

  return amazonSearchArray;
}

const scrapeSearch = async (item) => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.goto("https://www.amazon.com");

  try
  {
    await page.type("#twotabsearchtextbox", item);
    await page.click("#nav-search-submit-button");
  }
  catch(e)
  {
    // Fallback case, cause apparently Amazon has 2 sites...?
    await page.type('input[type="text"]', item);
    await page.click('input[type="submit"]');
  }
  await page.waitForSelector(".s-pagination-next");

  //await new Promise(resolve => setTimeout(resolve, 10000000));

  // Go to next results page
  //await page.click(".s-pagination-next");
  //await page.waitForSelector(".s-pagination-next");

  ret = await scrape(page);

  await browser.close();

  return ret;
};
