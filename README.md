# Survive in China

The network in China is totally unusable. The GFW list is too long for
mantainence, and you can never guess which website would be blocked soon
or later.

It's time for a new white list proxy. And it seems that GFW is using white
list right now.

This project is inspired by (gfw_whitelist)[https://github.com/n0wa11/gfw_whitelist].

## Help

You can generate the proxy file with command:

```
$ ./gen.py -p "SOCKS5 127.0.0.1:9999" -o "proxy.pac"
```
