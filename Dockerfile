# Base Image
FROM node:16


# Application Port
ENV PORT 3000

ENV NODE_ENV production

ENV REDIS_HOST redis

ENV REDIS_PORT 6397

ENV REDIS_PASSWORD RineuDthI1c38pVDkNPcOmrBLYKkaFgW


# Copying package.json and package-lock.json
COPY ./package*.json ./

# Installing dependencies
RUN npm ci

# Copying sources
COPY . .

# Building app
RUN npm run build

# Exposing application port
EXPOSE ${PORT}

# Entry point
CMD [ "npm", "run", "start:prod" ]