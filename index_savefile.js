require('dotenv').config();

const fs = require('fs');
const pathModule = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const APP_ROOT_PATH = require('./root.js').APP_ROOT_PATH;
const KANJIS_TEST = require('./kanji_test1').KANJIS_TEST;

const HANNOM_WEB_ROOT_URL = 'http://hvdic.thivien.net/whv/';
const WRITE_FILE_TARGET_FOLDER = pathModule.join(APP_ROOT_PATH, 'nts_folder');

function sleep(timeMs) {
  return new Promise(resolve => setTimeout(resolve, timeMs));
}

async function main() {
  let count = 0;
  for (const kanji of KANJIS_TEST) {
    try {
      let count = KANJIS_TEST.indexOf(kanji);
      const urlFull = HANNOM_WEB_ROOT_URL + encodeURIComponent(kanji);
      console.log("Sending GET: "+urlFull);
      axios.get(urlFull).then(result => {
        console.log("Received from: "+urlFull);
        const html = result.data;
        const filePath = pathModule.join(WRITE_FILE_TARGET_FOLDER, kanji);
        fs.writeFile(filePath, html, function(err) {
          if (err) {
            console.error(err);
          } else {
            console.log(`Saved ${filePath}, ${++count}/${KANJIS_TEST.length}`);
          }
        });
      }, rejectReason=>{
        console.error(rejectReason);
      });
    } catch (e) {
      console.error(e);
    }
    await sleep(1000);
  }
}

main().then(r => {
  console.log('Main finished!');
});
