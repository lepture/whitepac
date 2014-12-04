
// http://en.wikipedia.org/wiki/Reserved_IP_addresses#Reserved_IPv4_addresses
var DIRECT_NET = [
  "0.0.0.0/8",
  "10.0.0.0/8",
  "100.64.0.0/10",
  "127.0.0.0/8",
  "169.254.0.0/16",
  "172.16.0.0/12",
  "192.0.0.0/29",
  "192.0.2.0/24",
  "192.88.99.0/24",
  "192.168.0.0/16",
  "198.18.0.0/15",
  "198.51.100.0/24",
  "203.0.113.0/24",
  "224.0.0.0/4",
  "240.0.0.0/4",
  "255.255.255.255"
];


function validateIp(ipaddr) {
  var test = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ipaddr);
  return !((test == null) || (test[1] > 255 || test[2] > 255 || test[3] > 255 || test[4] > 255));
}

function isInNet(ipaddr, pattern) {
  var tmp = pattern.split("/");
  pattern = tmp[0];
  if (validateIp(pattern)) {
    var host = convertAddr(ipaddr),
    pat = convertAddr(pattern),
    mask;
    if (typeof tmp[1] !== "undefined") {
      mask = 32 - tmp[1];
      mask = ((0xffffffff >> mask) << mask) >>> 0;
    }
    else {
      mask = 0xffffffff >>> 0;
    }
    return ((host & mask) == (pat & mask));
  }
  return false;
}

function isInDomains(host, domains) {
  if (domains[host]) {
    return true;
  }
  var names = host.split('.').slice(1);
  while (names.length > 1) {
    if (domains[names.join('.')]) {
      return true;
    }
    names = names.slice(1);
  }
  return false;
}

function FindProxyForURL(url, host) {
  if (isPlainHostName(host)) {
    return "DIRECT";
  }
  if (/\.cn$/.test(host)) {
    return "DIRECT";
  }
  if (~url.indexOf('?direct=')) {
    return "DIRECT";
  }

  if (validateIp(host)) {
    return "DIRECT";
  }

  if (isInDomains(host, DIRECT_DOMAIN)) {
    return "DIRECT";
  }

  return PROXY;
}
