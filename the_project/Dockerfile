FROM oven/bun AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
# install with --production (exclude devDependencies)
FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--target bun \
	--minify-whitespace \
	--minify-syntax \
	--outfile server \
	src/index.ts

# copy only the production dependencies and the built server file into the final image
# FROM gcr.io/distroless/base AS release
FROM oven/bun AS release

WORKDIR /usr/src/app

# copy node_modules from temp directory
COPY --from=install /temp/prod/node_modules node_modules

# copy public directory
COPY --from=prerelease /usr/src/app/public public

# copy server file
COPY --from=prerelease /usr/src/app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000/tcp