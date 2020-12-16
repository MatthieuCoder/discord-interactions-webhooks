FROM node as build
WORKDIR /build
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM node
COPY package.json .
COPY --from=build /build/build build
COPY --from=build /build/node_modules node_modules

ENTRYPOINT yarn start
