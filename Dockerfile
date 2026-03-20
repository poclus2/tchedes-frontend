FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://api-tchedes.dartsia.app
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Build Next.js
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]
