# 
# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set build-time arguments
ARG API_CLIENT_ID
ARG API_CLIENT_SECRET
ARG API_REDIRECT_URI
ARG CERTIFICATE_PATH
ARG VALUE
ARG GUNICORN_WD_BACKEND_MICRO

# Install necessary packages
RUN apt-get update && \
    apt-get install -y nginx supervisor openssl && \
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
