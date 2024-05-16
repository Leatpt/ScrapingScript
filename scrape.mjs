import axios from "axios";
import * as cheerio from "cheerio";

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const url = "https://www.smbc-comics.com/comic/";
const numComics = 10;

async function getLatestComics() {
  let currentUrl = url;

  for (let i = 0; i < numComics; i++) {
    const response = await axios.get(currentUrl);
    const $ = cheerio.load(response.data);

    const comic = $("img#cc-comic"); // Target by id "cc-comic"

    if (comic.length > 0) {
      // Check if element exists
      console.log(comic.attr("src"));
      console.log(comic.attr("title"));
      await delay(2000);
    }

    const previousComicLink = $("#navtop .cc-prev").attr("href");
    if (previousComicLink) {
      currentUrl = previousComicLink;
    } else {
      console.log("Reached the end of comics");
      break;
    }
  }
}

(async () => {
  await getLatestComics();
})();
