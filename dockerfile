# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Remix app
RUN npm run build

# Set environment variables
ENV BLUEMAP_ADDRESS={BLUEMAP_ADDRESS}
ENV JAVA_SERVER_ADDRESS={JAVA_SERVER_ADDRESS}
ENV JAVA_SERVER_PORT={JAVA_SERVER_PORT}
ENV BEDROCK_SERVER_ADDRESS={BEDROCK_SERVER_ADDRESS}
ENV BEDROCK_SERVER_PORT={BEDROCK_SERVER_PORT}

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
