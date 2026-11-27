# Pinned supported ISC BIND 9.20 image by immutable SHA256 digest (linux/amd64)
FROM internetsystemsconsortium/bind9:9.20@sha256:978201d91548ec63c3b1c1befd5e6a3c9fa127f79f9058fd82d8e3493fe90ce1

LABEL org.opencontainers.image.title="balkan-open-dns-tier2" \
      org.opencontainers.image.description="Lightweight OpenNIC Tier 2 BIND9 resolver for Balkan Open DNS" \
      org.opencontainers.image.vendor="GuardNovaX" \
      org.opencontainers.image.licenses="MIT"

# Apply upstream Alpine security patches (e.g., libxml2/OpenSSL) and prepare bind directories
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/* && \
    mkdir -p /etc/bind /var/cache/bind /var/log/named && \
    chown -R bind:bind /var/cache/bind /var/log/named && \
    chmod 0750 /var/cache/bind /var/log/named

# Copy hardened BIND9 configuration files (read-only mount enforced in Compose)
COPY --chown=root:bind --chmod=0640 config/named.conf /etc/bind/named.conf
COPY --chown=root:bind --chmod=0640 config/named.conf.options /etc/bind/named.conf.options
COPY --chown=root:bind --chmod=0640 config/named.conf.keys /etc/bind/named.conf.keys
COPY --chown=root:bind --chmod=0640 config/named.conf.opennic-zones /etc/bind/named.conf.opennic-zones
COPY --chown=root:bind --chmod=0640 config/named.conf.logging /etc/bind/named.conf.logging
COPY --chmod=0755 scripts/healthcheck.sh /usr/local/bin/healthcheck.sh

# Validate configuration syntax during image build and generate ephemeral loopback rndc key
RUN named-checkconf /etc/bind/named.conf && \
    rndc-confgen -a -c /etc/bind/rndc.key && \
    chown root:bind /etc/bind/rndc.key && \
    chmod 0640 /etc/bind/rndc.key

# Run strictly as unprivileged non-root 'bind' user on unprivileged port 5353
USER bind

EXPOSE 5353/udp 5353/tcp

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD ["/usr/local/bin/healthcheck.sh"]

ENTRYPOINT ["/usr/sbin/named"]
CMD ["-f", "-c", "/etc/bind/named.conf"]
