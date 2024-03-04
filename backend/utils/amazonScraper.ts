import puppeteer from 'puppeteer';

async function scrapeBestSellers(): Promise<string[]>
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
  return itemLinks;
}

async function scrapeItemLink(link: string): Promise<string[]>
{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link, { waitUntil: 'networkidle0', timeout: 0 }) ;

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
//scrapeItemLink("https://www.amazon.com/Quencher-FlowState-Stainless-Insulated-Smoothie/dp/B0BW2LD72T/ref=zg_bs_c_home-garden_d_sccl_1/141-9578934-4854767?pd_rd_w=KMUux&content-id=amzn1.sym.309d45c5-3eba-4f62-9bb2-0acdcf0662e7&pf_rd_p=309d45c5-3eba-4f62-9bb2-0acdcf0662e7&pf_rd_r=639YK1K4VMJQE2596309&pd_rd_wg=th1M8&pd_rd_r=b61c9941-4235-4491-83ef-9ac6a436a914&pd_rd_i=B0CRMZ7TFZ&th=1").catch(console.error);
