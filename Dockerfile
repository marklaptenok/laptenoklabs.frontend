FROM oven/bun:1-alpine

WORKDIR /app

COPY server/index.ts ./server/index.ts
COPY site ./site

ENV SITE_ROOT=/app/site
ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "--smol", "server/index.ts"]
