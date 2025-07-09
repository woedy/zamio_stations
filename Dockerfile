# Use the official Node.js image.
FROM node:16

# Set the working directory.
WORKDIR /zamio_stations_pro

# Copy package.json and package-lock.json (if available).
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application files.
COPY . .

# Expose the port the app runs on.
#EXPOSE 5173

# Command to run the app.
CMD ["npm", "run", "dev"]
