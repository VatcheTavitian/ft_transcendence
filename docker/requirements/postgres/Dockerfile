# FROM alpine:3.18

# ARG DB_NAME
# ARG DB_USER
# ARG DB_PASS
# ARG DB_HOST
# # ARG ROOT_PASS

# RUN apk update && apk add --no-cache postgresql postgresql-client su-exec 

# RUN su-exec postgres initdb -D /var/lib/postgresql/data

# RUN chown -R postgres:postgres /var/lib/postgresql/data && \
#     chmod 700 /var/lib/postgresql/data

# RUN mkdir -p /run/postgresql && chown -R postgres:postgres /run/postgresql


# USER postgres

# RUN /usr/bin/pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/data/logfile start && \
# 	psql -c "ALTER USER ${DB_USER} WITH PASSWORD '${DB_PASS}';" && \
#     psql -c "CREATE DATABASE ${DB_NAME};" && \
#     psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};" && \
#     /usr/bin/pg_ctl -D /var/lib/postgresql/data stop


# # Copy custom initialization script
# # COPY custom-init-and-run.sh /usr/local/bin/
# # RUN chmod +x /usr/local/bin/custom-init-and-run.sh

# EXPOSE 5432

# # COPY ./tools/create_db.sh .

# # RUN chmod +x /create_db.sh

# # RUN sh create_db.sh && \
# #    rm create_db.sh

# # Initialize the database if it doesn't exist (this can be part of a startup script)
# # RUN /usr/bin/initdb -D /var/lib/postgresql/data

# CMD ["postgres", "-D", "/var/lib/postgresql/data"]


FROM alpine:3.18

ARG DB_NAME
ARG DB_NAME2
ARG DB_USER
ARG DB_PASS
ARG DB_HOST


RUN apk update && apk add --no-cache postgresql postgresql-client su-exec

# Create the PostgreSQL data directory with the correct ownership and permissions
RUN mkdir -p /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql/data && \
    chmod 700 /var/lib/postgresql/data

USER postgres

# Initialize the database
RUN initdb -D /var/lib/postgresql/data

# Change back to root to set permissions and create necessary directories
USER root
RUN mkdir -p /run/postgresql && chown -R postgres:postgres /run/postgresql

# Set the PostgreSQL user as the user for running PostgreSQL
USER postgres

# Start PostgreSQL, create the user, database, and grant privileges
RUN pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/data/logfile start && \
    psql -c "ALTER USER ${DB_USER} WITH PASSWORD '${DB_PASS}';" && \
    psql -c "CREATE DATABASE ${DB_NAME};" && \
    psql -c "CREATE DATABASE ${DB_NAME2};" && \
    psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};" && \
    psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME2} TO ${DB_USER};" && \
    pg_ctl -D /var/lib/postgresql/data stop

# Allow all IP addresses to connect
RUN echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf && \
    echo "host    all             all             0.0.0.0/0               md5" >> /var/lib/postgresql/data/pg_hba.conf

EXPOSE 5432

CMD ["postgres", "-D", "/var/lib/postgresql/data"]


# CHANGE!!! in config
# listen_addresses = '*'		# what IP address(es) to listen on;
# 					# comma-separated list of addresses;
# 					# defaults to 'localhost'; use '*' for all
# 					# (change requires restart)
# port = 5432			
#add this to pg_hba.conf
#host    userapp         postgres        172.18.0.0/16          md5