COMPOSE_FILE = docker-compose.yml

all: up

up:
	docker compose -f $(COMPOSE_FILE) up --build -d

re: fclean all

logs:
	docker compose -f $(COMPOSE_FILE) logs

clean:
	docker compose -f $(COMPOSE_FILE) down

fclean:
	docker compose -f $(COMPOSE_FILE) down -v

.PHONY: all up re clean fclean
