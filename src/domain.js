import whois from 'whois';
import DOMAIN_CONFIG from '../config/Domain.json';

function passRules(data) {
  const products = new Set();
  DOMAIN_CONFIG.forEach(config => {
      config.regulars.forEach(reg => {
        var pattern = new RegExp(reg, 'ig')
        if(pattern.exec(data)) products.add(config.slug);
      })
    }) 
  return products;
}

function crawlDomain(domain) {
  return new Promise((resolve) => {
    whois.lookup(domain, (err, data) => {
      if (err) return resolve({ type: 'error', error: err });
      return resolve({ type: 'done', result: passRules(data) });
    });
  });
}

export { crawlDomain };
