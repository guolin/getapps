import fetch from 'node-fetch';
import PAGE_CONFIG from '../config/Page.json';

function passRules(res) {
  const headers = res.headers
  const products = new Set();
  // 服务器软件
  if (headers && headers.get('server')) {
    const server = headers.get('server');
    PAGE_CONFIG["headers-server"].forEach(config => {
      config.regulars.forEach(reg => {
        var pattern = new RegExp(reg, 'ig')
        if(pattern.exec(server)) products.add(config.slug);
      })
    })
  }
  // 应用服务器
  if (headers && headers.get('x-powered-by')) {
    const poweredBy = headers.get('x-powered-by');
    PAGE_CONFIG["headers-x-powered-by"].forEach(config => {
      config.regulars.forEach(reg => {
        var pattern = new RegExp(reg, 'ig')
        if(pattern.exec(poweredBy)) products.add(config.slug);
      })
    })
  }
  return Array.from(products);
}


function getFromContent(content){
  const products = new Set();
  PAGE_CONFIG["content"].forEach(config => {
    config.regulars.forEach(reg => {
      var pattern = new RegExp(reg, 'ig')
      if(pattern.exec(content)) products.add(config.slug);
    })
  })
  return Array.from(products);
}

function crawlPage(u) {
  let url = u;
  if (!url.startsWith('http')) {
    url = `http://www.${url}`;
  }

  let products = [];

  return fetch(url, { timeout: 8000})
  .then((res) => {
    products = products.concat(passRules(res));
    return res.text();
  })
  .then(content => {
    products = products.concat(getFromContent(content));
    return products;
  });
}

export { crawlPage };
