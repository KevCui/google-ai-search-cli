# google-ai-search-cli

> Google search with [AI mode](https://google.com/search?udm=50) in terminal, no login, no API key

# Table of Contents

- [Dependency](#dependency)
- [Installation](#installation)
- [How to use](#how-to-use)
- [Note](#note)

## Dependency

- [mitmproxy](https://github.com/mitmproxy/mitmproxy)
- [htmlq](https://github.com/mgdm/htmlq)
- [python-markdownify](https://github.com/matthewwithanm/python-markdownify)
- (X11 only)[xvfb](https://x.org/releases/X11R7.7/doc/man/man1/Xvfb.1.xhtml)

## Installation

- Install mitmproxy cert in Chromium: [Document link](https://docs.mitmproxy.org/stable/concepts-certificates/#installing-the-mitmproxy-ca-certificate-manually)

## How to use

- Basic usage:

```bash
$ ./gai.sh "never gonna give you Up, give me youtube link, dont let me down"

Here is the YouTube link for the official music video of "Never Gonna Give You Up" by Rick Astley:

You can watch the 4K remastered official video on [YouTube (dQw4w9WgXcQ)](https://www.youtube.com/watch?v=dQw4w9WgXcQ "https://www.youtube.com/watch?v=dQw4w9WgXcQ").
```

## Note

This script is designed to process one question and answer at a time, delivering in plain text format. It is optimized for command-line use, enabling users to rapidly retrieve answers directly in the terminal, without having to engage in a conversation with Google Search AI mode.

---

<a href="https://www.buymeacoffee.com/kevcui" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60px" width="217px"></a>
