#!/bin/bash
# Migration script: Jekyll to Hugo
# Usage: ./migrate-jekyll.sh

set -e

JEKYLL_ROOT="../.."
HUGO_ROOT=".."

echo "=== Jekyll to Hugo Migration Script ==="
echo ""

# Create content directories
mkdir -p "$HUGO_ROOT/content/posts"

# Function to convert Jekyll post to Hugo page bundle
migrate_post() {
    local jekyll_file="$1"
    local filename=$(basename "$jekyll_file")

    # Extract date and slug from filename (YYYY-MM-DD-slug.markdown)
    local date_part=$(echo "$filename" | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}')
    local slug=$(echo "$filename" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//' | sed 's/.markdown$//' | sed 's/.md$//')

    echo "Migrating: $filename -> $slug"

    # Create page bundle directory
    local bundle_dir="$HUGO_ROOT/content/posts/$slug"
    mkdir -p "$bundle_dir"

    # Read the Jekyll file
    local content=$(cat "$jekyll_file")

    # Extract front matter
    local front_matter=$(echo "$content" | sed -n '/^---$/,/^---$/p' | head -n -1 | tail -n +2)

    # Extract body (everything after second ---)
    local body=$(echo "$content" | sed -n '/^---$/,/^---$/d;p' | tail -n +2)

    # Parse front matter fields
    local title=$(echo "$front_matter" | grep -E '^title:' | sed 's/title: *//' | sed 's/^"//' | sed 's/"$//')
    local date=$(echo "$front_matter" | grep -E '^date:' | sed 's/date: *//')
    local categories=$(echo "$front_matter" | grep -E '^categories:' | sed 's/categories: *//')

    # Convert date format for Hugo (YAML date to ISO)
    # Hugo accepts: 2024-06-29T00:12:00-04:00

    # Create Hugo front matter
    cat > "$bundle_dir/index.md" << EOF
---
title: "$title"
date: $date
EOF

    if [ -n "$categories" ]; then
        echo "categories:" >> "$bundle_dir/index.md"
        echo "  - $categories" >> "$bundle_dir/index.md"
    fi

    echo "---" >> "$bundle_dir/index.md"
    echo "" >> "$bundle_dir/index.md"

    # Convert body content
    # 1. Convert Jekyll markdown table image pairs to gallery shortcodes
    # Pattern: ![](img1) | ![](img2) or the :---:|:---: format

    local converted_body="$body"

    # For now, just append the body as-is (manual gallery conversion needed)
    echo "$converted_body" >> "$bundle_dir/index.md"

    # Find and copy associated images
    local static_dir="$JEKYLL_ROOT/static/posts/$slug"
    local static_dir_underscore="$JEKYLL_ROOT/static/posts/$(echo "$slug" | tr '-' '_')"

    if [ -d "$static_dir" ]; then
        echo "  Copying images from $static_dir"
        cp -r "$static_dir"/* "$bundle_dir/" 2>/dev/null || true
    elif [ -d "$static_dir_underscore" ]; then
        echo "  Copying images from $static_dir_underscore"
        cp -r "$static_dir_underscore"/* "$bundle_dir/" 2>/dev/null || true
    fi

    echo "  Done: $bundle_dir/index.md"
}

# Migrate all posts
echo "Migrating posts..."
echo ""

for post in "$JEKYLL_ROOT/_posts"/*.markdown "$JEKYLL_ROOT/_posts"/*.md; do
    [ -f "$post" ] || continue
    migrate_post "$post"
done

echo ""
echo "=== Migration Complete ==="
echo ""
echo "Next steps:"
echo "1. Review each post in content/posts/*/index.md"
echo "2. Convert side-by-side image tables to {{< gallery >}} shortcodes"
echo "3. Update image paths from /static/posts/... to relative paths"
echo "4. Test with 'hugo server'"
echo ""
echo "To convert image table syntax:"
echo "  FROM: ![](path1) | ![](path2)"
echo "  TO:   {{< gallery >}}"
echo "        ![Alt](image1.jpg)"
echo "        ![Alt](image2.jpg)"
echo "        {{< /gallery >}}"
