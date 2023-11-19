# Use an official Nginx image as the base image
FROM nginx:latest

# Copy the HTML file into the Nginx default HTML directory
COPY header.html /usr/share/nginx/html/header.html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
