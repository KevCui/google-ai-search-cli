#!/usr/bin/env node

const { chromium } = require('playwright-extra');
const { NodeHtmlMarkdown } = require('node-html-markdown');
const { diffWords } = require('diff');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

const url = 'https://www.google.com/search?udm=50&hl=en&q=' + process.argv[2];
const textMessage = '.pWvJNd';
const footer = '[data-xid="Gd7Hsc"]';
const userDataDir = __dirname + '/.headless-chromium'
const timer = 500;
const timeout = 30000;

function getDiffMarkdown(previous, currrent) {
  const diffResult = diffWords(previous, currrent);
  let output = '';

  diffResult.forEach((part) => {
    if (part.added) {
      output += part.value;
    }
  });
  return output
}

chromium.launch().then(async browser => {
    const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
    viewport: { width: 1280, height: 720 },
    timeout: timeout
  });
  const page = await context.newPage();

  // Start page
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Get reply
  let previousMarkdown= '';
  while (true) {
    const stop = page.locator(footer);
    const currentHtml = await page.locator(textMessage).evaluate((el) => {
      const clone = el.cloneNode(true);
      clone.querySelectorAll('[data-xid="Gd7Hsc"], .rBl3me').forEach(node => node.remove());
      return clone.innerHTML;
    });
    const currentMarkdown = NodeHtmlMarkdown.translate(currentHtml);

    if (currentMarkdown !== previousMarkdown ) {
      markdown = getDiffMarkdown(previousMarkdown, currentMarkdown)
      markdown && console.log(markdown);
      previousMarkdown= currentMarkdown;
    }

    await stop.count() > 0 && process.exit(0)
    await page.waitForTimeout(timer);
  }
});
