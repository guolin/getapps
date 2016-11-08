import { crawlDomain } from './domain';
import { crawlIP } from './ip';
import { crawlMX } from './mx';
import { crawlPage } from './page';

function getApps(domain) {
	const d = crawlDomain(domain);
	const ip = crawlIP(domain);
	const mx = crawlMX(domain);
	const page = crawlPage(domain);
	return Promise
		.all([d, ip, mx, page])
		.then(([p1, p2, p3, p4]) => {
			return p1.concat(p2, p3, p4);
		})
}

export { getApps, crawlDomain, crawlIP, crawlMX, crawlPage };

