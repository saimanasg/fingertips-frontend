# Stage 1: Build the React app
FROM node:alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using a lightweight server
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the previous stage to the container
COPY --from=build /app/build ./build

# Install serve to serve the application
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "build", "-l", "3000"]
