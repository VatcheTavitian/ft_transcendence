
# FROM python:3.10-slim

# # Set build-time arguments
# ARG API_CLIENT_ID
# ARG API_CLIENT_SECRET
# ARG API_REDIRECT_URI

# # Install necessary packages
# RUN apt-get update && \
#     apt-get install -y nginx supervisor && \
#     rm -rf /var/lib/apt/lists/*

# # Set the working directory in the container
# WORKDIR /app

# # Copy requirements file to the working directory
# COPY requirements.txt .

# # Install the necessary packages
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of your application code to the container
# COPY . .

# # Expose the port the app runs on
# EXPOSE 80

# # Set environment variables
# ENV PYTHONUNBUFFERED 1
# ENV API_CLIENT_ID=${API_CLIENT_ID}
# ENV API_CLIENT_SECRET=${API_CLIENT_SECRET}
# ENV API_REDIRECT_URI=${API_REDIRECT_URI}

# # Copy the Nginx configuration file
# COPY config/nginx.conf /etc/nginx/sites-available/default

# # Copy supervisord configuration
# COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# # Ensure Nginx logs are sent to stdout and stderr
# RUN ln -sf /dev/stdout /var/log/nginx/access.log \
#     && ln -sf /dev/stderr /var/log/nginx/error.log

# # Command to run supervisord
# CMD ["/usr/bin/supervisord"]


# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set build-time arguments
ARG API_CLIENT_ID
ARG API_CLIENT_SECRET
ARG API_REDIRECT_URI
ARG CERTIFICATE_PATH
ARG VALUE
ARG GUNICORN_WD_BACKEND
ARG PYTHONPATH
ENV PYTHONPATH=${PYTHONPATH}
ENV EMAIL_HOST_USER=${EMAIL_HOST_USER}
ENV EMAIL_HOST_PASSWORD=${EMAIL_HOST_PASSWORD}

# Install necessary packages
RUN apt-get update && \
    apt-get install -y nginx supervisor openssl tree && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy requirements file to the working directory
COPY requirements.txt .

# Install the necessary packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code to the container
COPY . .

# Copy the Nginx configuration file
COPY config/nginx.conf /etc/nginx/sites-available/default

# Copy supervisord configuration
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy the SSL generation script
COPY ./tools/script.sh /init_script.sh

# Generate SSL certificates
RUN chmod +x /init_script.sh && \
    /init_script.sh && \
    rm /init_script.sh 

# Ensure Nginx logs are sent to stdout and stderr
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# Expose the port for the backend
EXPOSE 80

# Command to run supervisord
CMD ["/usr/bin/supervisord"]
