# Alec's Personal Site

## Snippets

**Optimize a bunch of jpegs with ffmpeg**

```bash
for f in *.jpg;
    do ffmpeg -y -i "$f" -q:v 5 "${f%.jpg}.jpg";
done
```

**Run jekyll in docker**

```bash
docker run -p 8080:4000 -v $(pwd):/site bretfisher/jekyll-serve
```

