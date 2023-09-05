FROM node:18.17.0-buster as build-stage

ARG REACT_APP_API_URL

WORKDIR /app
COPY . .
RUN npm ci
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf