#!/usr/bin/env sh
set -eu

# Ensure writable runtime directories have strict bind ownership and permissions
chown -R bind:bind /run/named /var/cache/bind /var/log/named
chmod 0750 /run/named /var/cache/bind /var/log/named

exec /usr/sbin/named -u bind -f -c /etc/bind/named.conf
