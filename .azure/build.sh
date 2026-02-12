#!/bin/bash
set -e

echo "Running post-build script..."

# Install frontend dependencies and build
echo "Building frontend..."
npm ci --prefer-offline --no-audit
npm run build

# Install server dependencies  
echo "Installing server dependencies..."
cd server
npm ci --prefer-offline --no-audit --omit=dev
cd ..

echo "Post-build complete!"
