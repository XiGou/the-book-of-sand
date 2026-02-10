#!/bin/bash
# Script to download font files from Google Fonts
# This script runs automatically before build to ensure fonts are included in the build output

set -e

FONT_DIR="public/fonts"
mkdir -p "$FONT_DIR"

# Check if fonts already exist
if [ -f "$FONT_DIR/cormorant-garamond-400.woff2" ] && \
   [ -f "$FONT_DIR/cormorant-garamond-400-italic.woff2" ] && \
   [ -f "$FONT_DIR/cormorant-garamond-600.woff2" ] && \
   [ -f "$FONT_DIR/noto-serif-sc-400.woff2" ] && \
   [ -f "$FONT_DIR/noto-serif-sc-600.woff2" ]; then
  echo "Font files already exist, skipping download..."
  exit 0
fi

echo "Downloading font files for build..."

echo "Downloading Cormorant Garamond fonts..."
curl -L -f -o "$FONT_DIR/cormorant-garamond-400.woff2" \
  "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2" || {
  echo "Warning: Failed to download Cormorant Garamond 400"
}

curl -L -f -o "$FONT_DIR/cormorant-garamond-400-italic.woff2" \
  "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-iNM8A_6pUKz9.woff2" || {
  echo "Warning: Failed to download Cormorant Garamond 400 Italic"
}

curl -L -f -o "$FONT_DIR/cormorant-garamond-600.woff2" \
  "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2" || {
  echo "Warning: Failed to download Cormorant Garamond 600"
}

echo "Downloading Noto Serif SC fonts..."
curl -L -f -o "$FONT_DIR/noto-serif-sc-400.woff2" \
  "https://fonts.gstatic.com/s/notoserifsc/v35/H4chBXePl9DZ0Xe7gG9cyOj7oqOcaThrVMcaeccjhXXDsOyAEEmuIi6j7j64sLjgBtMI1z49XW4.woff2" || {
  echo "Warning: Failed to download Noto Serif SC 400"
}

# For weight 600, try multiple URLs
curl -L -f -o "$FONT_DIR/noto-serif-sc-600.woff2" \
  "https://fonts.gstatic.com/s/notoserifsc/v35/H4c8BXePl9DZ0Xe7gG9cyOj7oqOcaThrVMcaeccjhXXDsOyAEEmuIi6j7j64sLjgBtMI1z49XW4.woff2" || \
curl -L -f -o "$FONT_DIR/noto-serif-sc-600.woff2" \
  "https://fonts.gstatic.com/s/notoserifsc/v35/H4chBXePl9DZ0Xe7gG9cyOj7oqOcaThrVMcaeccjhXXDsOyAEEmuIi6j7j64sLjgBtMI1z49XW4.woff2" || {
  echo "Warning: Failed to download Noto Serif SC 600, using 400 weight as fallback"
  cp "$FONT_DIR/noto-serif-sc-400.woff2" "$FONT_DIR/noto-serif-sc-600.woff2" 2>/dev/null || true
}

echo "Font files download completed!"
