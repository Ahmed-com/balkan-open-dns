#!/usr/bin/env sh
set -eu

# 1. Verify BIND9 daemon status via loopback rndc
rndc -s 127.0.0.1 -p 953 status >/dev/null

# 2. Verify UDP listener responsiveness on internal container port 5353
dig @127.0.0.1 -p 5353 +time=2 +tries=1 +short chaos txt version.bind >/dev/null

# 3. Verify TCP listener responsiveness on internal container port 5353
dig @127.0.0.1 -p 5353 +tcp +time=2 +tries=1 +short chaos txt version.bind >/dev/null

exit 0
