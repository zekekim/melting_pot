FROM oven/bun:1.0

WORKDIR /app

COPY package.json .

COPY bun.lockb .

RUN bun install

COPY . .

CMD [ "bun", "run", "dev"]
