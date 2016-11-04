import nslookup from 'nslookup';
import MX_CONFIG from '../config/MX.json';

function passRules(addrs) {
  if (!addrs) return '';
  const products = new Set();
  addrs.forEach(addr => {
    if (!addr) return Promise.reject(`地址不可用${addr}`);
    MX_CONFIG.forEach(config => {
      config.regulars.forEach(reg => {
        var pattern = new RegExp(reg, 'ig')
        if(pattern.exec(addr)) products.add(config.slug);
      })
    })
    return true;
  });
  return Array.from(products);
}

function crawlMX(domain) {
  return new Promise((resolve, reject) => {
    nslookup(domain)
      .server('8.8.8.8')
      .type('mx')
      .timeout(10 * 1000)
      .end((err, addrs) => {
        if (err) reject(err);
        const products = passRules(addrs);
        resolve(products);
      });
  });
}

export {crawlMX};
