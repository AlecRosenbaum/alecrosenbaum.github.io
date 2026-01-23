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

**Run hugo locally**

```bash
hugo server
```

Or with drafts:

```bash
hugo server -D
```

### Create a new post

```bash
hugo new posts/my-post-name/index.md
```

Then add images to the `content/posts/my-post-name/` directory.

### Build

```bash
hugo --gc --minify
```

