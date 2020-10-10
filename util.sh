#! bin/bash

BACKUP_DIR=.bak

backup_file () {
	mkdir -p .bak
	cp $1 .bak
}


scale () {
    # scale images down to 555px wide
    for f in $@; do
	    backup_file $f;
        ffmpeg -y -i "$f" -q:v 1 -vf scale=-1:555 "${f%.jpg}.jpg";
    done
}

process-image () {
    # process images without scaling them. This usually reduces the file size
    # quite significantly from the right-off-the-phone version.
    for f in $@; do
	    backup_file $f;
        ffmpeg -y -i "$f" "${f%.jpg}.jpg";
    done
}

rotate_clock () {
  for f in $@; do
	backup_file $f;
    ffmpeg -i "$f" -vf "transpose=clock" -y "$f";
  done
}

rotate_cclock () {
  for f in $@; do
	backup_file $f;
    ffmpeg -i "$f" -vf "transpose=2" -y "$f";
  done
}
