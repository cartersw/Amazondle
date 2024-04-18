const axios = require("axios");
const { parse } = require("node-html-parser");

const fetchPage = async (url, item) => {
  const headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"};

  try
  {
    const response = await axios.get(url + "/s?k=" + encodeURIComponent(item), { headers, maxRedirects: 5 });
    console.log(response.data);
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

  const ret = [];

  const selectors = {
    "title":["div.p13n-sc-truncated", "span.a-text-normal.a-color-base"],
    "price": ["span.a-size-base span", "span.a-price span.a-offscreen"],
    "picture": ["img", "img.s-image[srcset]"]
  }

  let rootNode = root.querySelectorAll("div.p13n-sc-uncoverable-faceout"); // Book Grid format

  let selectorIndex = rootNode.length == 0 ? 1 : 0;

  rootNode = rootNode.length == 0 ? root.querySelectorAll("div.s-card-container") : rootNode; // Default format

  /*
  const visibleElements = rootNode.filter(el => {
    console.log(el);
    const style = el.getAttribute('style');
    console.log(style);
  return el.offsetParent !== null && (!style || !style.includes("display: none"));
  });
  */

  rootNode.map(node => {
    try
    {
      ret.push({"title": node.querySelector(selectors.title[selectorIndex]).innerText,
                "price": node.querySelector(selectors.price[selectorIndex]).innerText,
                "picture": node.querySelector(selectors.picture[selectorIndex]).getAttribute("src")});
    }
    catch(e)
    {
      // Skipping if one of the options are missing
    }
  });

  return ret;
};

const scrapeSearch = async (item) => {
  const html = await fetchPage("https://www.amazon.com", item);

  if (!html) return [];
  //return JSON.stringify(scrape(html), null, 2);
  return scrape(html);
};

const main = async () => {
  const result = await scrapeSearch("Books");
  console.log(result);
}

main();
