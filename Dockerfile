FROM arturoalcaniz/node-image:latest
USER root
RUN --mount=type=secret,id=env \
    git clone "https://$(grep TOKEN_GIT /run/secrets/env | cut -d'=' -f 2-)@github.com/ArturoAlcaniz/FrontService.git" /app/FrontService/ && \
    git clone "https://$(grep TOKEN_GIT /run/secrets/env | cut -d'=' -f 2-)@github.com/ArturoAlcaniz/certs.git" /app/certs/ && \
    git clone "https://$(grep TOKEN_GIT /run/secrets/env | cut -d'=' -f 2-)@github.com/ArturoAlcaniz/entities-lib.git" /app/entities-lib/
RUN chown -R node:node /app/FrontService /app/certs /app/entities-lib
RUN chmod -R 755 /app/FrontService /app/certs /app/entities-lib
RUN chown -R node:node /usr/bin/dpkg
RUN apt-get install -y sudo
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node
USER node
RUN cd /app/FrontService && \
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && \
    sudo dpkg -i cloudflared.deb && \
    sudo cloudflared service install eyJhIjoiOGI3ZjY1YTgxY2E3ZmM1NGFhZDZjNWU2NWQyMzUwNzMiLCJ0IjoiMmY0MTVhNjMtYTIxNy00ZGZlLWI0M2MtNGY3MGY0OWY2MGE3IiwicyI6Ik5ETmxZakV3TldJdE56STBPQzAwWlRnd0xXRTVNbVF0WkdGa01XUmpZV0kwTXpJMSJ9 && \
    sudo cp -R ~/.cloudflared /home/node/.cloudflared && \
    sudo chown -R node:node /home/node/.cloudflared
USER root
RUN chown -R root:root /usr/bin/dpkg
RUN rm /etc/sudoers.d/node
USER node
RUN cd /app/certs/ && bash ./generate-certs.sh
EXPOSE 443