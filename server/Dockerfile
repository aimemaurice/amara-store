FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy source files
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "src/server.js"]
