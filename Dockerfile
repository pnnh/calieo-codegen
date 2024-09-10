FROM node:21

ENV NODE_ENV=production
ENV PORT=8002

WORKDIR /data

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

CMD ["node", "server.js"]
