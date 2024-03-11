FROM amd64/node:20-alpine3.18 AS base
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm config set -g registry https://registry.npmmirror.com
RUN pnpm config set -g sharp_binary_host https://npmmirror.com/mirrors/sharp
RUN pnpm config set -g sharp_libvips_binary_host https://npmmirror.com/mirrors/sharp-libvips
# RUN apk --no-cache add curl
# RUN apk update

FROM base AS dependencies
WORKDIR /app
RUN pnpm install turbo --global
COPY . .
RUN turbo prune orders --docker
# no .npmrc for now
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install

FROM base AS build
WORKDIR /app
COPY --from=dependencies /app/out/json/ .
COPY --from=dependencies /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# RUN cd packages/sharp && npm install --registry=https://registry.npmmirror.com/
# RUN cd packages/sharp && npm install ./sharp --save --cpu=arm64 --os=linux --libc=musl
RUN pnpm install
COPY --from=dependencies /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo build --filter=orders...

FROM base AS deploy
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=build /app/apps/orders/next.config.js .
COPY --from=build /app/apps/orders/package.json .
COPY --from=build --chown=nextjs:nodejs /app/apps/orders/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/orders/.next/static ./apps/orders/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/orders/public ./apps/orders/public

USER nextjs

ENV PORT 3300
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"
EXPOSE ${PORT}
RUN echo 'set ENV with HOST=${HOST} PORT=${PORT}'

CMD ["node", "apps/orders/server.js"]
