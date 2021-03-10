require('dotenv').config();
//console.log(process.env);

const fetch = require('node-fetch');

const fetchRequest = fetch("https://hvdic.thivien.net/whv/%E6%A4%9C", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "_ga=GA1.2.931400591.1598924848; orig_aid=0huuatkdzr90nhq8.1598924852; __gads=ID=cef237a9ab4f5da7-22db94b144c300ce:T=1598924846:RT=1598924846:R:S=ALNI_MZ9NZPzJ6kVdDnlc9V9U5GRdBIFIQ; fosp_aid=kk2a7lw2hk1vg2ks.1596518154; PHPSESSID=d2opjueqsb5f1duddrdslkgjor; _gid=GA1.2.763037092.1615287403; fosp_location_zone=2"
  },
  "referrer": "https://hvdic.thivien.net/whv/%E5%9B%A0",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
});

fetchRequest.then(result=>{
  console.log(result);
}, rejectReason=>{
  console.error(rejectReason);
});
