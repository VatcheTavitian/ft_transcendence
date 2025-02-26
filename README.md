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
```
1. Open docker/.env file. Here you need to add your own API_CLIENT_ID, API_CLIENT_SECRET, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
2. Open docker/docker-compose.yml and uncomment EITHER line 23 OR 24 'gelf-address'. Refer to comments in file.
3. In folder root (ft_trancendence/) write the following command. 
```sh
make
```
The program will take a while to download and build as the requirements for monitoring services are large.

4. After it is built in your browser navigate to https://localhost/main - Accept the certicate.
   On the main page you will notice no menu is visible.
   As the front end communicates to the backend over https you will need to open another web browser and navigate to
https://localhost:8008/api/test/ and accept the certificate.
After doing so everything on https://localhost/main should work correctly
