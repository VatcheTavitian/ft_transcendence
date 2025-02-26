GREEN := \033[0;32m
RED := \033[0;31m
RESET := \033[0m

all:
	@echo "$(GREEN)Running make all!$(RESET)"
	docker compose -f ./docker/docker-compose-elk.yml --env-file ./docker/.env up -d --build
	docker exec -it es01 sh /usr/share/elasticsearch/config/setup_ilm.sh
	@sleep 5 
	docker compose -f ./docker/docker-compose.yml --env-file ./docker/.env up -d --build

down:
	docker compose -f ./docker/docker-compose-elk.yml down
	docker compose -f ./docker/docker-compose.yml down

re: down all 

clean: down
	docker system prune -a

fclean: clean
	docker network prune --force
	docker volume rm -f $$(docker volume ls -q)
	@echo  "$(RED)All docker images and networks and volumes removed$(RESET)"

.PHONY: all down re clean fclean
