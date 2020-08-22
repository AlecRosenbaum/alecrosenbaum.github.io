# Alec's Personal Site

## Snippets

**Optimize and scale a bunch of jpegs with ffmpeg**

```bash
for f in *.jpg;
    do ffmpeg -y -i "$f" -q:v 1 -vf scale=-1:555 "${f%.jpg}.jpg";
done
```

**Rotate an image with ffmpeg**

```bash
ffmpeg -i input.jpg -vf "transpose=clock" -y output.jpg
```

**Run jekyll in docker**

```bash
docker run -p 8080:4000 -v $(pwd):/site bretfisher/jekyll-serve
```

