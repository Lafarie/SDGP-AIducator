# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for the server
RUN npm install

# Copy the rest of the application code into the Docker image
COPY . .

# Expose port for the server
EXPOSE 8080

# Set the command to start the server
CMD ["node", "server.js"]