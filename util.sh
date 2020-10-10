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

rotate_clock () {
  for f in $@; do
	backup_file $f;
    ffmpeg -i "$f" -vf "transpose=2" -y "$1";
  done
}

rotate_cclock () {
  for f in $@; do
	backup_file $f;
    ffmpeg -i "$f" -vf "transpose=2" -y "$1";
  done
}
