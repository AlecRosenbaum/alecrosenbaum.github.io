# Alec's Personal Site

## Snippets

**Optimize a bunch of jpegs with ffmpeg**

```bash
for f in *.jpg;
    do ffmpeg -y -i "$f" -q:v 5 "${f%.jpg}.jpg";
done
```
