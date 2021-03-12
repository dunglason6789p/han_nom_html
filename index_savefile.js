require('dotenv').config();

const fs = require('fs');
const pathModule = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const APP_ROOT_PATH = require('./root.js').APP_ROOT_PATH;

const HANNOM_WEB_ROOT_URL = 'http://hvdic.thivien.net/whv/';
const WRITE_FILE_TARGET_FOLDER = pathModule.join(APP_ROOT_PATH, 'nts_folder');

const WORD_TO_FIND = '検';
const urlFull = HANNOM_WEB_ROOT_URL + encodeURIComponent(WORD_TO_FIND);
axios.get(urlFull).then(result=>{
  const html = result.data;
  console.log(html);
  const filePath = pathModule.join(WRITE_FILE_TARGET_FOLDER, WORD_TO_FIND);
  fs.writeFile(filePath, html, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log("The file was saved!");
    }
  });
}, rejectReason=>{
  console.error(rejectReason);
});
