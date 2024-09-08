#!/bin/bash

# Define paths relative to the script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."
ANGULAR_APP_DIR="$PROJECT_ROOT"
DEST_DIR="$PROJECT_ROOT/docs"
TMP_DIR="$PROJECT_ROOT/tmp"
CNAME_FILE="$DEST_DIR/CNAME"
TMP_CNAME_FILE="$TMP_DIR/CNAME"

# Ensure the temporary directory exists
mkdir -p "$TMP_DIR"

# Build the Angular application with a base-href of '/'
echo "Building Angular application..."
cd "$ANGULAR_APP_DIR"
ng build

# Preserve the CNAME file if it exists
if [ -f "$CNAME_FILE" ]; then
  echo "Preserving CNAME file..."
  cp "$CNAME_FILE" "$TMP_CNAME_FILE"
fi

# Clear the docs directory but keep the CNAME file
echo "Clearing $DEST_DIR..."
rm -rf "$DEST_DIR/*"

# Restore the CNAME file if it was preserved
if [ -f "$TMP_CNAME_FILE" ]; then
  echo "Restoring CNAME file..."
  mkdir -p "$DEST_DIR"
  mv "$TMP_CNAME_FILE" "$CNAME_FILE"
fi

# Copy the build output to the docs directory
echo "Copying build output to $DEST_DIR..."
cp -r "$ANGULAR_APP_DIR/dist/qr-code-generator/browser/"* "$DEST_DIR/"

# Clean up the temporary directory
echo "Cleaning up temporary files..."
rm -rf "$TMP_DIR"

echo "Build and copy completed successfully."
