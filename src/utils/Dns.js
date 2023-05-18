const dns = require('dns');

const resolveDomain = (domain) => {
    return new Promise((resolve, reject) => {
        dns.resolve(domain, (err, records) => {
            if (err) {
                reject(err);
            } else {
                resolve(records);
            }
        });
    });
}

module.exports = {
    resolveDomain,
};
