
FROM python:3.10-slim


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

ARG DB_NAME
ARG DB_USER
ARG DB_PASS
ARG DB_HOST

ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_HOST=${DB_HOST}


RUN apt-get update && \
    apt-get install -y nginx supervisor openssl tree  postgresql-client && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /app


COPY requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt


COPY . .

COPY config/nginx.conf /etc/nginx/sites-available/default


COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf


COPY ./tools/script.sh /init_script.sh
COPY ./tools/entry.sh .


RUN chmod +x /init_script.sh && \
    chmod +x entry.sh && \
    /init_script.sh && \
    rm /init_script.sh 


RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log


EXPOSE 80


ENTRYPOINT [ "./entry.sh" ]
