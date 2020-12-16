FROM node as build
WORKDIR /build
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM node
COPY package.json .
COPY --from=build /build/build build

ENTRYPOINT yarn start
