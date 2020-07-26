---
layout: post
title:  "ZSH Vim Bindings"
date:   2019-09-06 2:30:00 -0400
categories: zsh shell vim
excerpt_separator: <!--more-->
---

![Example]({{ site.url }}/static/posts/zsh_vim_bindings.gif)

<!--more-->

I was setting up a new computer, and realized when installing zsh that one of
the options was adding vim bindings! After a little playing around with config,
I ended up with some fancy cursor switching and a much happer shell
experience :)

Here's the relevant sourcecode:

```bash
# set vim mode
set -o vi

# Remove mode switching delay.
KEYTIMEOUT=5

# Change cursor shape for different vi modes.
function zle-keymap-select {
  if [[ ${KEYMAP} == vicmd ]] ||
    [[ $1 = 'block' ]]; then
      echo -ne '\e[1 q'

  elif [[ ${KEYMAP} == main ]] ||
    [[ ${KEYMAP} == viins ]] ||
    [[ ${KEYMAP} = '' ]] ||
    [[ $1 = 'beam' ]]; then
      echo -ne '\e[5 q'
  fi
zle -N zle-keymap-select

# Use beam shape cursor on startup.
echo -ne '\e[5 q'

# Use beam shape cursor for each new prompt.
_fix_cursor() {
  echo -ne '\e[5 q'
}
precmd_functions+=(_fix_cursor)
```

My full config files are available [here][source].

[source]: https://github.com/AlecRosenbaum/config
