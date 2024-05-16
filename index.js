const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = "https://www.smbc-comics.com/comic";

const comicData = {};

async function getHTML () {
    const { data: html} = await axios.get(url);
    return html;
}

getHTML().then((res) => {
    const $ = cheerio.load(res);
    $()
});