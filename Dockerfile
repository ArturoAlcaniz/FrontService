FROM arturoalcaniz/node-image:latest
USER root
RUN pip install --upgrade stdlib
RUN --mount=type=secret,id=env \
    git clone "https://$(grep TOKEN_GIT /run/secrets/env | cut -d'=' -f 2-)@github.com/ArturoAlcaniz/FrontService.git" /app/FrontService/ && \
    git clone "https://$(grep TOKEN_GIT /run/secrets/env | cut -d'=' -f 2-)@github.com/ArturoAlcaniz/certs.git" /app/certs/ && \
    git clone "https://$(grep TOKEN_GIT /run/secrets/env | cut -d'=' -f 2-)@github.com/ArturoAlcaniz/entities-lib.git" /app/entities-lib/
RUN chown -R node:node /app/FrontService /app/certs /app/entities-lib
RUN chmod -R 755 /app/FrontService /app/certs /app/entities-lib
RUN cd /app/FrontService && \
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && \
    dpkg -i cloudflared.deb
USER node
RUN cd /app/certs/ && bash ./generate-certs.sh
EXPOSE 443