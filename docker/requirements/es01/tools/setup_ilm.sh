#!/bin/bash

echo "--- waiting for availability Elasticsearch ---"
until curl --cacert "/usr/share/elasticsearch/config/certs/ca/ca.crt" -u "elastic:${ELASTIC_PASSWORD}" "https://localhost:9200/_cluster/health" | grep -q '"status":"\(green\|yellow\)"' ; do
  sleep 5
done
echo "--- Elasticsearch is available ---"

echo "--- Adding ILM policy ---"

curl -X PUT "https://localhost:9200/_ilm/policy/logs_retention_policy" \
  -H 'Content-Type: application/json' \
  --cacert /usr/share/elasticsearch/config/certs/ca/ca.crt \
  -u "elastic:${ELASTIC_PASSWORD}" \
  -d '{
        "policy": {
          "phases": {
            "hot": {
              "min_age": "0ms",
              "actions": {
                "rollover": {
                  "max_primary_shard_size": "1gb",
                  "max_age": "30m"
                }
              }
            },
            "delete": {
              "min_age": "30m",
              "actions": {
                "delete": {}
              }
            }
          }
        }
      }'

echo "--- ILM policy has been added ---"

echo "--- Adding ILM policy to index template ---"

curl -X PUT "https://localhost:9200/_index_template/nginx_template" \
  -H 'Content-Type: application/json' \
  --cacert /usr/share/elasticsearch/config/certs/ca/ca.crt \
  -u "elastic:${ELASTIC_PASSWORD}" \
  -d '{
        "index_patterns": ["nginx-*"], 
        "template": {
          "settings": {
            "index.lifecycle.name": "logs_retention_policy",
            "index.lifecycle.rollover_alias": "nginx-logs"
          }
        }
      }'

echo "--- Index template has been added ---"
