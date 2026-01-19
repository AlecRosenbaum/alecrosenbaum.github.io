# Hugo Migration

This directory contains a Hugo site structure ready to replace the Jekyll site.

## Key Features

### 1. Image Processing Pipeline
Hugo's built-in image processing provides:
- **Automatic resizing**: Images are resized to multiple sizes for srcset
- **WebP generation**: Modern browsers get WebP versions automatically
- **Lazy loading**: All images use `loading="lazy"` for better performance
- **Responsive images**: srcset and sizes attributes for optimal loading

Two ways to use images:

**A) Standard Markdown (render hook)**
```markdown
![Alt text](image.jpg)
![Alt text](image.jpg?width=600)  <!-- specify max width -->
```

**B) Gallery shortcode (side-by-side images)**
```markdown
{{</* gallery */>}}
![First image](image1.jpg)
![Second image](image2.jpg)
{{</* /gallery */>}}
```

**C) Advanced shortcode**
```markdown
{{</* img src="image.jpg" alt="Description" width="600" */>}}
```

### 2. Pagination
- Configured for 10 posts per page (adjustable in `hugo.toml`)
- Pagination navigation included on home and list pages
- URL structure: `/`, `/page/2/`, `/page/3/`, etc.

### 3. Page Bundles
Posts use Hugo's page bundle feature for better organization:
```
content/posts/my-post/
├── index.md          # Post content
├── image1.jpg        # Images bundled with post
├── image2.jpg
└── ...
```

## Directory Structure

```
hugo/
├── hugo.toml              # Main configuration
├── archetypes/            # Templates for new content
│   └── posts.md
├── assets/
│   └── sass/
│       └── main.scss      # Minima-style stylesheet
├── content/
│   ├── posts/             # Blog posts (page bundles)
│   ├── recipes/           # Recipes page
│   └── resume/            # Resume page
├── data/                  # Data files (optional)
├── layouts/
│   ├── _default/
│   │   ├── baseof.html    # Base template
│   │   ├── list.html      # List template
│   │   ├── single.html    # Single post template
│   │   └── _markup/
│   │       └── render-image.html  # Image render hook
│   ├── partials/
│   │   ├── head.html
│   │   ├── header.html
│   │   └── footer.html
│   ├── shortcodes/
│   │   ├── gallery.html   # Side-by-side images
│   │   └── img.html       # Advanced image shortcode
│   ├── recipes/
│   │   └── list.html      # Recipes page layout
│   └── resume/
│       └── list.html      # Resume page layout
├── static/
│   ├── hn/                # HN reader (standalone HTML)
│   ├── hn-comments/       # HN comments (standalone HTML)
│   ├── recipes.json       # Recipe data
│   └── CNAME              # GitHub Pages domain
└── scripts/
    └── migrate-jekyll.sh  # Migration helper script
```

## Migration Steps

### Quick Start
```bash
cd hugo

# Install Hugo (if not installed)
# brew install hugo  # macOS
# apt install hugo   # Ubuntu

# Run development server
hugo server -D

# Build for production
hugo --minify
```

### Migrating Posts

**Option 1: Manual migration**
1. Create page bundle: `mkdir -p content/posts/my-post`
2. Copy post content to `content/posts/my-post/index.md`
3. Update front matter (see below)
4. Copy images to the same directory
5. Update image paths to be relative
6. Convert `![](path1) | ![](path2)` to `{{</* gallery */>}}` shortcodes

**Option 2: Use migration script**
```bash
cd scripts
./migrate-jekyll.sh
```
Note: The script handles basic conversion but you'll need to manually:
- Convert side-by-side image tables to gallery shortcodes
- Update image paths from absolute to relative

### Front Matter Changes

**Jekyll:**
```yaml
---
layout: post
title:  "My Post"
date:   2024-06-29 00:12:00 -0400
categories: woodworking
---
```

**Hugo:**
```yaml
---
title: "My Post"
date: 2024-06-29T00:12:00-04:00
categories:
  - woodworking
summary: "Brief description for excerpts"
---
```

### Image Syntax Changes

**Jekyll (side-by-side with table):**
```markdown
![](/static/posts/my_post/image1.jpg) | ![](/static/posts/my_post/image2.jpg)
```

**Hugo (gallery shortcode):**
```markdown
{{</* gallery */>}}
![Description](image1.jpg)
![Description](image2.jpg)
{{</* /gallery */>}}
```

## Configuration

Key settings in `hugo.toml`:

```toml
# Pagination
paginate = 10  # Posts per page

# Image processing
[imaging]
  quality = 85
  resampleFilter = "Lanczos"

# Enable raw HTML in markdown
[markup.goldmark.renderer]
  unsafe = true
```

## Differences from Jekyll

| Feature | Jekyll | Hugo |
|---------|--------|------|
| Config file | `_config.yml` | `hugo.toml` |
| Posts location | `_posts/` | `content/posts/` |
| Post filename | `YYYY-MM-DD-slug.markdown` | `slug/index.md` (page bundle) |
| Layouts | `_layouts/` | `layouts/` |
| Includes | `_includes/` | `layouts/partials/` |
| Sass | `_sass/` | `assets/sass/` |
| Static files | `static/` | `static/` |
| Data files | `_data/` | `data/` |
| Template language | Liquid | Go templates |

## Benefits of Hugo

1. **Speed**: Hugo builds sites in milliseconds vs Jekyll's seconds
2. **Image Processing**: Built-in resizing, cropping, WebP conversion
3. **No Dependencies**: Single binary, no Ruby/gems to manage
4. **Page Bundles**: Keep content and images together
5. **Taxonomies**: Better category/tag handling
6. **Modern Markdown**: Better support for modern markdown features

## Next Steps

1. Complete migration of all posts
2. Test all pages and features
3. Set up GitHub Actions for deployment
4. Update CNAME if needed
5. Switch DNS/deployment to Hugo build output
