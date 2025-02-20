FROM prom/prometheus:v2.42.0

WORKDIR /etc/prometheus

COPY configs/rules.yml .
COPY configs/prometheus.yml .

RUN /bin/promtool check rules rules.yml

CMD ["--config.file=/etc/prometheus/prometheus.yml", "--web.listen-address=:9090"]