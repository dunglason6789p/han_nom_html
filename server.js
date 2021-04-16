require('dotenv').config();

const fs = require('fs');
const pathModule = require('path');
const axios = require('axios');

const APP_ROOT_PATH = require('./root.js').APP_ROOT_PATH;
const CACHE_FOLDER_PATH = pathModule.join(APP_ROOT_PATH, 'cache_hvdic');
const HANNOM_WEB_ROOT_URL = 'http://hvdic.thivien.net/whv/';

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors()); // Disable all CORS restrictions.

app.get('/test', function (req, res) {
  const queryParam = req.query;
  res.send('You requested: ' + JSON.stringify(queryParam) + ' at ' + new Date());
});

/**Query format: /lookup?kanji=<..> */
app.get('/lookup', async function (req, res) {
  if (!req.query.kanji) {
    return res.status(500).send(`Invalid query param: ${JSON.stringify(req.query)}`);
  }
  const kanji = decodeURIComponent(req.query.kanji);
  console.log('Client looking-up kanji '+kanji);
  const filePath = pathModule.join(CACHE_FOLDER_PATH, kanji);
  const isCachedBefore = await isFileExist(filePath);
  if (isCachedBefore) {
    console.log(`Found cache-file ${filePath} for kanji ${kanji}`);
    const fileContent = await readFile(filePath);
    res.send(fileContent);
  } else {
    console.log(`Not found cache-file ${filePath} for kanji ${kanji}, now looking-up from hvdic!`);
    const html = await lookupHvdic(kanji);
    res.send(html);
  }
});

app.listen(4300);

async function isFileExist(filePath) {
  return new Promise((resolve, reject) => {
    try {
      fs.exists(filePath, exists => {
        resolve(exists);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function readFile(filePath) {
  return new Promise(((resolve, reject) => {
    try {
      fs.readFile(filePath, {encoding: 'utf-8'}, function(err, fileContent){
        if (!err) {
            resolve(fileContent);
        } else {
            reject(err);
        }
      });
    } catch (e) {
      reject(e);
    }
  }));
}

async function lookupHvdic(kanji) {
  const urlFull = HANNOM_WEB_ROOT_URL + encodeURIComponent(kanji);
  return new Promise((resolve, reject) => {
    console.log("Sending GET: "+urlFull);
    try {
      axios.get(urlFull).then(result => {
        console.log("Received from: "+urlFull);
        const html = result.data;
        if (!html || html.indexOf('<html') < 0) {
          reject(new Error('Invalid response from HVDIC !'));
        } else {
          resolve(html);
          // Write to cache.
          const filePath = pathModule.join(CACHE_FOLDER_PATH, kanji);
          fs.writeFile(filePath, html, function(err) {
            if (err) {
              console.error(err);
            } else {
              console.log(`Saved ${filePath}`);
            }
          });
        }
      }, rejectReason => {
        console.error(rejectReason);
        reject(rejectReason);
      });
    } catch (e) {
      reject(e);
    }
  });
}

console.log("Server is now running!");

