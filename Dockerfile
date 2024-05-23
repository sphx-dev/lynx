FROM node:18 as lynx-builder


WORKDIR /home/lynx
COPY .yarn /home/lynx/.yarn

COPY package.json yarn.lock .yarnrc.yml index.html tsconfig.json tsconfig.node.json vite.config.ts /home/lynx/
RUN yarn install

COPY server.js /home/lynx/
COPY scripts/build.server.js scripts/webpack.server.config.js /home/lynx/scripts/
RUN yarn build_server

COPY public /home/lynx/public
COPY .storybook /home/lynx/.storybook
COPY src /home/lynx/src

RUN yarn build

FROM node:18-alpine

ARG BUILD_DATE
ARG VERSION
ARG GIT_COMMIT
LABEL maintainer="lynx"

RUN addgroup -S app \
    && adduser -S -G app app

WORKDIR /home/lynx

COPY --from=lynx-builder /home/lynx/build ./build
COPY --from=lynx-builder /home/lynx/server-comp.cjs .

RUN echo -n $GIT_COMMIT > git_commit
RUN echo -n $GIT_TAG > git_tag

RUN chown -R app:app ./
USER app

CMD [ "node", "server-comp.cjs" ]
