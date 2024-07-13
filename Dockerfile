###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Install npm
RUN apk add --no-cache npm

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

# Create app directory
WORKDIR /usr/src/app

# Install npm
RUN apk add --no-cache npm

COPY package*.json ./

# Copy over the node_modules directory from the development image
COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Remove the existing node_modules directory and reinstall only production dependencies
RUN rm -rf node_modules && npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Create app directory
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expose the application port
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]

# Build command example:
# docker build --platform linux/amd64 -t choosic-api .
# docker save choosic-api:latest | ssh -C root@185.118.141.141 docker load