
all: up

up:
	docker compose up --build -d

down:
	docker compose down

fclean:
	docker compose down -v --rmi all

re:
	make fclean
	make up