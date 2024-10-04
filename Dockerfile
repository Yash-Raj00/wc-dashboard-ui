FROM node:20 AS base

RUN apt-get update
RUN rm -rf .parcel-cache/ && rm -rf .cache/ && rm -rf dist/

WORKDIR /wc-dashboard-ui
COPY . .
# Build project
RUN npm install && npm run build


# ---- Prod ----
FROM nginx:latest
# Copy needed files
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base /wc-dashboard-ui/dist /usr/share/nginx/html

EXPOSE 8080
CMD [ "nginx", "-g", "daemon off;" ]