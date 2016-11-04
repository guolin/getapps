import superagent from 'superagent';

function passRules(data) {
  if (!data || !data.text) return [];
  const content = data.text;
  const products = [];
  // 服务器软件
  if (data.headers && data.headers.server) {
    const server = data.headers.server;
    if (/^nginx/g.exec(server)) products.push('nginx');
    if (/apache/ig.exec(server)) products.push('apache');
    if (/Tengine/g.exec(server)) products.push('Tengine');
    if (/openresty/g.exec(server)) products.push('openresty');
    if (/iis/ig.exec(server)) products.push('ms-iis');
  }
  // 应用服务器
  if (data.headers && data.headers['x-powered-by']) {
    const poweredBy = data.headers['x-powered-by'];
    if (/express/ig.exec(poweredBy)) products.push('expressjs');
    if (/php/ig.exec(poweredBy)) products.push('php');
    if (/asp/ig.exec(poweredBy)) products.push('asp');
  }
  if (/google-analytics.com/g.exec(content)) products.push('ga');
  if (/window.BWEUM/g.exec(content)) products.push('oneapm');
  if (/window.NREUM/i.exec(content)) products.push('newrelic');
  if (/NREUMQ.push/ig.exec(content)) products.push('newrelic');
  if (/js\/rich_apm/i.exec(content)) products.push('richapm');
  if (/js.users.51.la/g.exec(content)) products.push('51la');
  if (/tongji.cnzz.com\//g.exec(content)) products.push('cnzz');
  if (/zgsdk.zhugeio.com/i.exec(content)) products.push('zhugeio');
  if (/sensorsdata.cn\/sdk/i.exec(content)) products.push('sensorsdata');
  if (/hm.baidu.com/g.exec(content)) products.push('baidutongji');
  if (/upaiyun/g.exec(content)) products.push('upyun');
  if (/qiniu/g.exec(content)
    || /qbox.me/g.exec(content)
    || /clouddn.com/g.exec(content)) {
    products.push('qiniu');
  }
  if (/dn-growing.qbox.me/g.exec(content)) products.push('growingio');
  // 客服系统
  if (/meiqia.js/g.exec(content)) products.push('meiqia');
  if (/.qq.com\/webc.htm/i.exec(content)) products.push('b-qq');
  if (/qiao.baidu.com/i.exec(content)) products.push('qiao-baidu');
  if (/qiyukf.com/g.exec(content)) products.push('qiyukf');
  if (/ysf.open\(\)/g.exec(content)) products.push('qiyukf');
  if (/sobot.com\/chat/g.exec(content)) products.push('sobot');
  if (/zoosnet.net\/JS\/Ls/i.exec(content)) products.push('zoosnet-net');
  if (/live800.com\/(\w)*\/chatClient/i.exec(content)) products.push('live800');
  if (/web.jiaxincloud.com\/mcs.js/i.exec(content)) products.push('jiaxincloud-com');
  if (/udesk.cn\/im_client/i.exec(content)) products.push('udesk');
  if (/assets.kf5.com\/supportbox\/main.js/i.exec(content)) products.push('kf5');
  return products;
}

function crawlPage(u) {
  return new Promise((resolve) => {
    let url = u;
    if (!url.startsWith('http')) {
      url = `http://www.'${url}`;
    }
    superagent.get(url)
      .timeout(8000)
      .end((err, data) => {
        if (!err && data) {
          const products = passRules(data);
          resolve({ type: 'done', result: products });
        } else {
          resolve({ error: { message: '无数据' }, type: 'error' });
        }
      });
  });
}

export { crawlPage };
