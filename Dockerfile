# Use official Node.js image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 5000

# Start the server with nodemon
CMD ["npx", "nodemon", "index.js"]
