# google-ai-search-cli

> Google search with [AI mode](https://google.com/search?udm=50) in the terminal, no need login or API key

## Table of Contents

- [Dependency](#dependency)
- [How to use](#how-to-use)
  - [Node.js script](#nodejs-script)
  - [Bash + Python script](#bash--python-script)
- [Note](#note)

## Dependency

- Node.js script
  - [playwright-core](https://github.com/microsoft/playwright)
  - [cloakbrowser](https://github.com/CloakHQ/CloakBrowser)
  - [node-html-markdown](https://github.com/crosstype/node-html-markdown)
  - [jsdiff](https://github.com/kpdecker/jsdiff)

- Bash + Python script
  - [camoufox](https://github.com/daijro/camoufox)
  - [python-markdownify](https://github.com/matthewwithanm/python-markdownify)
  - [htmlq](https://github.com/mgdm/htmlq)

## How to use

There are 2 scripts available. The Node.js script is faster and recommended as primary option. If it fails due to Google reCAPTCHA, the Bash + Python script can be used as a second choice.

### Node.js script

- Installation

```bash
npm i playwright-core cloakbrowser node-html-markdown diff
```

- Usage

```bash
$ ./gai.js "never gonna give you Up, give me youtube link, dont let me down"

I’ve got you covered—no letting down here! You can find the iconic music video for Rick Astley's **"Never Gonna Give You Up"** at its famous [official YouTube link](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

Here is the legendary video that started it all:
...
```

### Bash + Python script

```bash
$ ./gai.sh "never gonna give you Up, give me youtube link, dont let me down"

Here is the YouTube link for the official music video of "Never Gonna Give You Up" by Rick Astley:

You can watch the 4K remastered official video on [YouTube (dQw4w9WgXcQ)](https://www.youtube.com/watch?v=dQw4w9WgXcQ "https://www.youtube.com/watch?v=dQw4w9WgXcQ").
```

## Note

This script is designed to process one question and answer at a time, delivering in plain text format. It is optimized for command-line use, enabling users to rapidly retrieve answers directly in the terminal, without having to engage in a conversation with Google Search AI mode.

---

<a href="https://www.buymeacoffee.com/kevcui" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60px" width="217px"></a>
