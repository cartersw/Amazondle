import puppeteer from 'puppeteer';

async function scrapeAmazonCarousel(): Promise<void>
{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.amazon.com/gp/bestsellers/", { waitUntil: 'networkidle0' }) ;

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
}

scrapeAmazonCarousel().catch(console.error);
