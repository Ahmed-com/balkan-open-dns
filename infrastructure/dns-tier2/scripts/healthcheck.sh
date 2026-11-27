#!/usr/bin/env sh
set -eu

# 1. Verify BIND9 daemon status via loopback rndc
rndc -s 127.0.0.1 -p 953 status >/dev/null

# 2. Verify UDP resolution for OpenNIC service glue
dig @127.0.0.1 -p 53 +time=2 +tries=1 +short dns.opennic.glue SOA >/dev/null

# 3. Verify TCP fallback resolution
dig @127.0.0.1 -p 53 +tcp +time=2 +tries=1 +short opennic.glue NS >/dev/null

exit 0
