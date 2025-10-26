#!/bin/bash

echo "Building the React app..."
cd client
npm install
npm run build

echo "Build complete! You can now deploy the 'build' folder."
echo "To preview locally: npm install -g serve && serve -s build"

