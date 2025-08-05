# Install dependencies
RUN npm ci --only=production
 
# Copy application code
COPY . .
 
# Expose port (change if your app uses different port)
EXPOSE 8000
 
# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs
 
# Change ownership of the app directory to nodejs user
RUN chown -R nodejs:nodejs /app
 
# Switch to the nodejs user
USER nodejs
 
# Start the application
CMD ["npm", "start"]
