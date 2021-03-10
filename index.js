require('dotenv').config();

const axios = require('axios');
const cheerio = require('cheerio');

const HANNOM_WEB_ROOT_URL = 'http://hvdic.thivien.net/whv/';

// const WORD_TO_FIND = '検';
const WORD_TO_FIND = '%E6%A4%9C';
axios.get(HANNOM_WEB_ROOT_URL + WORD_TO_FIND).then(result=>{
  const html = result.data;
  const $ = cheerio.load(html);
  const text = $('.hvres-meaning > a').first().text();
  console.log(text);
}, rejectReason=>{
  console.error(rejectReason);
});
