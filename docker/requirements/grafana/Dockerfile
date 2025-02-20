FROM grafana/grafana:9.3.6

COPY grafana.db /var/lib/grafana/grafana.db
USER root
RUN chown 472:472 /var/lib/grafana/grafana.db
USER grafana
