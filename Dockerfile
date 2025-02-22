# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["node", "server.js"]
