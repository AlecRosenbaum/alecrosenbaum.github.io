# Alec's Personal Site

## Snippets

**Optimize and scale a bunch of jpegs with ffmpeg**

```bash
scale () {
	for f in $@;
		do ffmpeg -y -i "$f" -q:v 1 -vf scale=-1:555 "${f%.jpg}.jpg";
	done
}
```

**Rotate an image with ffmpeg**

```bash
rotate () {
  cp $1 $1.bak;
  ffmpeg -i $1 -vf "transpose=clock" -y $1
}
```

**Run jekyll in docker**

```bash
docker run -p 8080:4000 -v $(pwd):/site bretfisher/jekyll-serve
```

