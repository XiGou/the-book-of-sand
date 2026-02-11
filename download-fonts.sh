#!/bin/bash
# Script to download font files from Google Fonts
# This script runs automatically before build to ensure fonts are included in the build output

set -e

FONT_DIR="public/fonts"
mkdir -p "$FONT_DIR"

# Define required font files
REQUIRED_FONTS=(
  "cormorant-garamond-400.woff2"
  "cormorant-garamond-400-italic.woff2"
  "cormorant-garamond-600.woff2"
  "noto-serif-sc-400.woff2"
  "noto-serif-sc-600.woff2"
)

# Check if all fonts already exist
ALL_EXIST=true
for font in "${REQUIRED_FONTS[@]}"; do
  if [ ! -f "$FONT_DIR/$font" ]; then
    ALL_EXIST=false
    break
  fi
done

if [ "$ALL_EXIST" = true ]; then
  echo "All font files already exist, skipping download..."
  exit 0
fi

echo "Downloading missing font files for build..."

# Download Cormorant Garamond fonts
if [ ! -f "$FONT_DIR/cormorant-garamond-400.woff2" ]; then
  echo "Downloading Cormorant Garamond 400..."
  curl -L -f -o "$FONT_DIR/cormorant-garamond-400.woff2" \
    "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2" || {
    echo "Error: Failed to download Cormorant Garamond 400"
    exit 1
  }
fi

if [ ! -f "$FONT_DIR/cormorant-garamond-400-italic.woff2" ]; then
  echo "Downloading Cormorant Garamond 400 Italic..."
  curl -L -f -o "$FONT_DIR/cormorant-garamond-400-italic.woff2" \
    "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-iNM8A_6pUKz9.woff2" || {
    echo "Error: Failed to download Cormorant Garamond 400 Italic"
    exit 1
  }
fi

if [ ! -f "$FONT_DIR/cormorant-garamond-600.woff2" ]; then
  echo "Downloading Cormorant Garamond 600..."
  curl -L -f -o "$FONT_DIR/cormorant-garamond-600.woff2" \
    "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYrEtLm7P37U5N.woff2" || {
    echo "Error: Failed to download Cormorant Garamond 600"
    exit 1
  }
fi

# Download Noto Serif SC fonts
# Note: Noto Serif SC uses subset fonts, so we'll use a comprehensive subset URL
if [ ! -f "$FONT_DIR/noto-serif-sc-400.woff2" ]; then
  echo "Downloading Noto Serif SC 400..."
  # Use a comprehensive subset that covers most Chinese characters
  curl -L -f -o "$FONT_DIR/noto-serif-sc-400.woff2" \
    "https://fonts.gstatic.com/s/notoserifsc/v35/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.21.woff2" || \
  curl -L -f -o "$FONT_DIR/noto-serif-sc-400.woff2" \
    "https://fonts.gstatic.com/s/notoserifsc/v35/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.22.woff2" || \
  curl -L -f -o "$FONT_DIR/noto-serif-sc-400.woff2" \
    "https://fonts.gstatic.com/s/notoserifsc/v35/H4chBXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.23.woff2" || {
    echo "Error: Failed to download Noto Serif SC 400"
    exit 1
  }
fi

if [ ! -f "$FONT_DIR/noto-serif-sc-600.woff2" ]; then
  echo "Downloading Noto Serif SC 600..."
  # Try multiple URLs for Noto Serif SC 600
  curl -L -f -o "$FONT_DIR/noto-serif-sc-600.woff2" \
    "https://fonts.gstatic.com/s/notoserifsc/v35/H4c8BXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.21.woff2" || \
  curl -L -f -o "$FONT_DIR/noto-serif-sc-600.woff2" \
    "https://fonts.gstatic.com/s/notoserifsc/v35/H4c8BXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.22.woff2" || \
  curl -L -f -o "$FONT_DIR/noto-serif-sc-600.woff2" \
    "https://fonts.gstatic.com/s/notoserifsc/v35/H4c8BXePl9DZ0Xe7gG9cyOj7oqP0dTpxZbB9E9gjjmzKvaeKHUTtJDWv3z-us4bxD8F5og.23.woff2" || {
    echo "Warning: Failed to download Noto Serif SC 600, using 400 weight as fallback"
    if [ -f "$FONT_DIR/noto-serif-sc-400.woff2" ]; then
      cp "$FONT_DIR/noto-serif-sc-400.woff2" "$FONT_DIR/noto-serif-sc-600.woff2"
    else
      echo "Error: Cannot create fallback, Noto Serif SC 400 not found"
      exit 1
    fi
  }
fi

echo "Font files download completed!"
