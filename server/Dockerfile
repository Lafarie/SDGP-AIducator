# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application's dependencies inside the Docker image
RUN npm install

# Copy the rest of the application's code to the working directory
COPY . .

# Expose port 8080 to have it mapped by the Docker daemon
EXPOSE 3002

# Define the command to run the application
CMD [ "node", "server.js" ]