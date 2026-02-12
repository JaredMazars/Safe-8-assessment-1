#!/bin/sh
set -e

echo "=== SAFE-8 Application Startup ==="
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current directory: $(pwd)"

# Azure always uses /home/site/wwwroot
WORKDIR="/home/site/wwwroot"
cd "$WORKDIR"

echo "Working directory: $(pwd)"

# Check if server directory exists
if [ ! -d "server" ]; then
    echo "❌ Error: Cannot find server directory"
    echo "Contents of current directory:"
    ls -la
    exit 1
fi

echo "✓ Server directory found"

# Check if server/index.js exists
if [ ! -f "server/index.js" ]; then
    echo "❌ Error: Cannot find server/index.js"
    echo "Contents of server directory:"
    ls -la server/
    exit 1
fi

echo "✓ server/index.js found"

# Set environment and start server
export NODE_ENV=production
export PORT=${PORT:-8080}

echo "Starting Node.js server on port $PORT..."

# Start from root directory, pointing to server/index.js
cd "$WORKDIR"
exec node server/index.js
