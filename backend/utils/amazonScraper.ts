import puppeteer from 'puppeteer';

async function scrapeBestSellers(): Promise<string[]>
{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.amazon.com/gp/bestsellers/", { waitUntil: 'networkidle2' }) ;

  const itemLinks: string[] = await page.evaluate(() => {
    const links: string[] = [];
    const linkElements = document.querySelectorAll('.a-carousel-card .a-link-normal[href]');
    
    linkElements.forEach((linkElement: Element) => {
      const href = (linkElement as HTMLAnchorElement).href;

      if (href && !links.includes(href) && !href.includes("product-reviews"))
        links.push(href);
    });

    return links;
  });

  console.log(itemLinks);

  await browser.close();
  return itemLinks;
}

async function scrapeItemLink(link: string): Promise<string[]>
{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link, { waitUntil: 'networkidle2' });

  const itemLinks: string[] = await page.evaluate(() => {
    const title = document.querySelector("#productTitle")?.textContent?.trim() || "Title Not Found";
    const price = document.querySelector(".aok-offscreen")?.textContent?.trim() || "Price Not Found";
    const imgLink = (document.querySelector(".a-dynamic-image") as HTMLImageElement).src || "Image Not Found";
    
    return [title, price, imgLink];
  });

  console.log(itemLinks);

  await browser.close();
  return itemLinks;
}

async function main()
{
  try
  {
    const bestSellers = await scrapeBestSellers();
    if (bestSellers.length > 0)
      await scrapeItemLink(bestSellers[0]);
    else
      console.log("List not found.");
  }
  catch (error)
  {
    console.error(error);
  }
}

main().catch(console.error);
