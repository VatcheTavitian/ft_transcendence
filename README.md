# ft_transcendence
Last project in Ecole 42 main curriculum

# Refer to project instructions file for further information
IMPORTANT: Read install instructions below to ensure it makes & runs correctly

The below major and minor modules are covered by this project

| Category         | Module | Description                                      |
|-----------------|--------|--------------------------------------------------|
| Web             | Major  | Use a Framework as backend.                      |
| Web             | Minor  | Use a front-end framework or toolkit.            |
| Web             | Minor  | Use a database for the backend.                  |
| User Management | Major  | Standard user management, authentication, users across tournaments. |
| User Management | Major  | Implementing a remote authentication.            |
| Gameplay and UX | Major  | Multiplayers (more than 2 in the same game).     |
| AI-Algo        | Major  | Introduce an AI Opponent.                        |
| DevOps          | Major  | Infrastructure Setup for Log Management.        |
| DevOps          | Minor  | Monitoring system.                               |
| DevOps          | Major  | Designing the Backend as Microservices.         |


# Installation Instructions
```sh
git clone https://github.com/VatcheTavitian/ft_transcendence.git
cd ft_transcendence

1. Open docker/.env file. Here you need to add your own API_CLIENT_ID, API_CLIENT_SECRET, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
2. Open docker/docker-compose.yml and uncomment EITHER line 23 OR 24 'gelf-address'. Refer to comments in file.
```
