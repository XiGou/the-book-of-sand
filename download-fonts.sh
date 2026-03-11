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
  "amiri-400.woff2"
  "amiri-700.woff2"
  "frank-ruhl-libre-400.woff2"
  "frank-ruhl-libre-700.woff2"
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

# Download Amiri fonts (Arabic)
if [ ! -f "$FONT_DIR/amiri-400.woff2" ]; then
  echo "Downloading Amiri 400 (Arabic)..."
  # Get font URL from Google Fonts CSS API
  AMIRI_CSS=$(curl -s -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
    "https://fonts.googleapis.com/css2?family=Amiri:wght@400&display=swap" 2>/dev/null || echo "")
  AMIRI_400_URL=$(echo "$AMIRI_CSS" | grep -o 'https://fonts.gstatic.com[^)]*' | head -1)
  if [ -n "$AMIRI_400_URL" ]; then
    curl -L -f -o "$FONT_DIR/amiri-400.woff2" "$AMIRI_400_URL" || {
      echo "Warning: Failed to download Amiri 400, will use system Arabic fonts as fallback"
      touch "$FONT_DIR/amiri-400.woff2"
    }
  else
    # Fallback to known CDN URL
    curl -L -f -o "$FONT_DIR/amiri-400.woff2" \
      "https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHpUpvrIw74NL.woff2" || {
      echo "Warning: Failed to download Amiri 400, will use system Arabic fonts as fallback"
      touch "$FONT_DIR/amiri-400.woff2"
    }
  fi
fi

if [ ! -f "$FONT_DIR/amiri-700.woff2" ]; then
  echo "Downloading Amiri 700 (Arabic)..."
  AMIRI_CSS=$(curl -s -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
    "https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=swap" 2>/dev/null || echo "")
  AMIRI_700_URL=$(echo "$AMIRI_CSS" | grep -o 'https://fonts.gstatic.com[^)]*' | head -1)
  if [ -n "$AMIRI_700_URL" ]; then
    curl -L -f -o "$FONT_DIR/amiri-700.woff2" "$AMIRI_700_URL" || {
      echo "Warning: Failed to download Amiri 700, using 400 weight as fallback"
      if [ -f "$FONT_DIR/amiri-400.woff2" ] && [ -s "$FONT_DIR/amiri-400.woff2" ]; then
        cp "$FONT_DIR/amiri-400.woff2" "$FONT_DIR/amiri-700.woff2"
      else
        touch "$FONT_DIR/amiri-700.woff2"
      fi
    }
  else
    curl -L -f -o "$FONT_DIR/amiri-700.woff2" \
      "https://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHp2VkZY4xJ9CGyAa.woff2" || {
      echo "Warning: Failed to download Amiri 700, using 400 weight as fallback"
      if [ -f "$FONT_DIR/amiri-400.woff2" ] && [ -s "$FONT_DIR/amiri-400.woff2" ]; then
        cp "$FONT_DIR/amiri-400.woff2" "$FONT_DIR/amiri-700.woff2"
      else
        touch "$FONT_DIR/amiri-700.woff2"
      fi
    }
  fi
fi

# Download Frank Ruhl Libre fonts (Hebrew)
if [ ! -f "$FONT_DIR/frank-ruhl-libre-400.woff2" ]; then
  echo "Downloading Frank Ruhl Libre 400 (Hebrew)..."
  FRL_CSS=$(curl -s -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
    "https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400&display=swap" 2>/dev/null || echo "")
  FRL_400_URL=$(echo "$FRL_CSS" | grep -o 'https://fonts.gstatic.com[^)]*' | head -1)
  if [ -n "$FRL_400_URL" ]; then
    curl -L -f -o "$FONT_DIR/frank-ruhl-libre-400.woff2" "$FRL_400_URL" || {
      echo "Warning: Failed to download Frank Ruhl Libre 400, will use system Hebrew fonts as fallback"
      touch "$FONT_DIR/frank-ruhl-libre-400.woff2"
    }
  else
    # Fallback to known CDN URL
    curl -L -f -o "$FONT_DIR/frank-ruhl-libre-400.woff2" \
      "https://fonts.gstatic.com/s/frankruhllibre/v16/j8_36_fAw7jrcalD7oKYNX0QfAnPa7fv4hiGIbrA.woff2" || {
      echo "Warning: Failed to download Frank Ruhl Libre 400, will use system Hebrew fonts as fallback"
      touch "$FONT_DIR/frank-ruhl-libre-400.woff2"
    }
  fi
fi

if [ ! -f "$FONT_DIR/frank-ruhl-libre-700.woff2" ]; then
  echo "Downloading Frank Ruhl Libre 700 (Hebrew)..."
  FRL_CSS=$(curl -s -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
    "https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@700&display=swap" 2>/dev/null || echo "")
  FRL_700_URL=$(echo "$FRL_CSS" | grep -o 'https://fonts.gstatic.com[^)]*' | head -1)
  if [ -n "$FRL_700_URL" ]; then
    curl -L -f -o "$FONT_DIR/frank-ruhl-libre-700.woff2" "$FRL_700_URL" || {
      echo "Warning: Failed to download Frank Ruhl Libre 700, using 400 weight as fallback"
      if [ -f "$FONT_DIR/frank-ruhl-libre-400.woff2" ] && [ -s "$FONT_DIR/frank-ruhl-libre-400.woff2" ]; then
        cp "$FONT_DIR/frank-ruhl-libre-400.woff2" "$FONT_DIR/frank-ruhl-libre-700.woff2"
      else
        touch "$FONT_DIR/frank-ruhl-libre-700.woff2"
      fi
    }
  else
    curl -L -f -o "$FONT_DIR/frank-ruhl-libre-700.woff2" \
      "https://fonts.gstatic.com/s/frankruhllibre/v16/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEF8.woff2" || {
      echo "Warning: Failed to download Frank Ruhl Libre 700, using 400 weight as fallback"
      if [ -f "$FONT_DIR/frank-ruhl-libre-400.woff2" ] && [ -s "$FONT_DIR/frank-ruhl-libre-400.woff2" ]; then
        cp "$FONT_DIR/frank-ruhl-libre-400.woff2" "$FONT_DIR/frank-ruhl-libre-700.woff2"
      else
        touch "$FONT_DIR/frank-ruhl-libre-700.woff2"
      fi
    }
  fi
fi

echo "Font files download completed!"
