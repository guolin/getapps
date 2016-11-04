import nslookup from 'nslookup';
import libqqwry from 'lib-qqwry';

const qqwry = libqqwry.init();
qqwry.speed();

function passRules(addrs) {
  if (!addrs) return [];
  const products = new Set();
  addrs.forEach(addr => {
    if (!addr) return null;
    const { Area } = qqwry.searchIP(addr);
    if (!Area) return null;
    if (Area.includes('阿里')) {
      products.add('aliyun');
    }
    if (Area.includes('加速乐')) {
      products.add('yunaq');
    }
    if (/Amazon/i.exec(Area)) {
      products.add('amazon-aws');
    }
    if (Area.includes('世纪互联')) {
      products.add('21vianet');
    }
    if (Area.includes('互联港湾')) {
      products.add('idccun');
    }
    if (Area.includes('蓝汛')) {
      products.add('chinacache');
    }
    if (Area.includes('康盛新创')
      || Area.includes('腾讯')) {
      products.add('qcloud');
    }
    if (Area.includes('天地祥云')
      || Area.includes('众生网络')
      || Area.includes('广西视虎')) {
      products.add('cloudvsp');
    }
    if (/Azure/i.exec(Area)) {
      products.add('azure');
    }
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
