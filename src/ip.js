import nslookup from 'nslookup';
import libqqwry from 'lib-qqwry';
import IP_CONFIG from '../config/Ip.json';

const qqwry = libqqwry.init();
qqwry.speed();

function passRules(addrs) {
  if (!addrs) return [];
  const products = new Set();
  addrs.forEach(addr => {
    if (!addr) return null;
    const { Area } = qqwry.searchIP(addr);
    if (!Area) return null;
    IP_CONFIG.forEach(config => {
      config.regulars.forEach(reg => {
        var pattern = new RegExp(reg, 'ig')
        if(pattern.exec(Area)) products.add(config.slug);
      })
    })
    return true;
  });
  return Array.from(products);
}

function crawlIP(domain) {
  return new Promise((resolve, reject) => {
    nslookup(domain)
      .server('114.114.114.114')
      .type('a')
      .timeout(10 * 1000)
      .end((err, addrs) => {
        if (err) reject(err);
        const products = passRules(addrs);
        resolve(products);
      });
  });
}

export { crawlIP };
