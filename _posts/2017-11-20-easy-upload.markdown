---
layout: post
title:  "Easy Upload"
date:   2017-11-20 2:30:00 -0400
categories: go file tansfer
---

![Screenshot]({{ site.url }}/static/posts/easy_upload/main_screen.png) 

So, this is a pretty small utility I wrote mostly because I had heard a lot about Go, and wanted to see what all of the hubub was about. It also provides a solution to the problem of "I want this file, over on this computer. Shit, I don't have my usb key." I have a number of little machines in my abode, one of them being plugged into the TV and acting as a media center. This script makes it way easier to transfer files over.

So what does it do?

Assuming `go` is already configured, running a one-liner `go get https://github.com/AlecRosenbaum/easy-upload` will download ane make `easy-upload` available. The `easy-upload` command will start a file upload server exposed to other machines on the same LAN, and will pop open a browser tab to show the site. Then, navitaging to the url on one of the other computers on LAN will let you upload files to the host. Files will be put into `~/Downloads/`.

There's not too much more to say other than that I'm pretty impressed with `Go`. This was pretty easy to code (having never worked in `Go` before), and has been able to handle every large file I've thrown at it. Much easier to use than having to run `man scp` and `ip addr` every time I want to send a file.

Source code is available [here][source].

[source]: https://github.com/AlecRosenbaum/easy-upload
