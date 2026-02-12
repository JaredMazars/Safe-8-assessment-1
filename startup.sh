#!/bin/sh
set -e

echo "=== SAFE-8 Application Startup ==="
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Azure always uses /home/site/wwwroot
WORKDIR="/home/site/wwwroot"
cd "$WORKDIR"

echo "Working directory: $(pwd)"

# Build frontend on first startup if dist doesn't exist or is a placeholder
if [ ! -d "dist" ] || [ ! "$(ls -A dist 2>/dev/null)" ]; then
    echo "Building frontend (this happens once on first deployment)..."
    npm install
    npm run build
    echo "✓ Frontend built successfully"
else
    echo "✓ Frontend already built"
fi

# Check server directory
if [ ! -d "server" ]; then
    echo "❌ Error: Cannot find server directory"
    ls -la
    exit 1
fi

echo "✓ Server directory found"

# Check server/index.js
if [ ! -f "server/index.js" ]; then
    echo "❌ Error: Cannot find server/index.js"
    ls -la server/
    exit 1
fi

echo "✓ server/index.js found"

# Set environment and start
export NODE_ENV=production
export PORT=${PORT:-8080}

echo "Starting Node.js server on port $PORT..."
exec node server/index.js
