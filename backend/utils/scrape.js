const axios = require("axios");
const { parse } = require("node-html-parser");

const fetchPage = async (url, item) => {
  const headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"};

  try
  {
    const response = await axios.get(url + "/s?k=" + encodeURIComponent(item), { headers });
    return response.data;
  }
  catch (error)
  {
    console.error("Error fetching page:", error);
    return null;
  }
};

const scrape = (html) => {
  const root = parse(html);

  // Gather product titles
  let titleNodes = root.querySelectorAll("div.a-section.a-spacing-base h2 span.a-color-base.a-text-normal");
  titleNodes = titleNodes.length == 0 ? root.querySelectorAll("div.a-section.a-spacing-small span.a-size-medium.a-color-base.a-text-normal") : titleNodes;
  const titles = titleNodes.map(node => node.innerText);

  // Gather prices
  let priceNodes = root.querySelectorAll('div.a-section.a-spacing-base span.a-price[data-a-color="base"] span.a-offscreen');
  priceNodes = priceNodes.length == 0 ? root.querySelectorAll("div.a-section span.a-price span.a-offscreen") : priceNodes;
  const prices = priceNodes.map(node => node.innerText);

  // Gather pictures
  let pictureNodes = root.querySelectorAll("div.a-section.a-spacing-base img.s-image[srcset]");
  pictureNodes = pictureNodes.length == 0 ? root.querySelectorAll("div.a-section.aok-relative.s-image-fixed-height img") : pictureNodes;
  const pictures = pictureNodes.map(node => node.getAttribute("src"));

  // Put data together
  const products = titles.map((title, index) => {
    if (title && prices[index] && pictures[index])
      return { title, price: prices[index], picture: pictures[index] };

    return null;
  }).filter(item => item !== null);

  return products;
};

const scrapeSearch = async (item) => {
  const html = await fetchPage("https://www.amazon.com", item);

  if (!html) return [];
  return JSON.stringify(scrape(html), null, 2);
  //return scrape(html);
};

const main = async () => {
  const result = await scrapeSearch("Laptop");
  console.log(result);
}

main();
