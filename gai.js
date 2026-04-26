#!/usr/bin/env node

const { chromium } = require('playwright-extra');
const { NodeHtmlMarkdown } = require('node-html-markdown');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

const url = 'https://www.google.com/search?udm=50&hl=en&q=' + process.argv[2];
const textMessage = '.pWvJNd';
const footer = '[data-xid="Gd7Hsc"]';
const userDataDir = __dirname + '/.headless-chromium'
const timer = 1000;
const timeout = 30000;

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
  let previousHtml = '';
  while (true) {
    const stop = page.locator(footer);
    const currentHtml = await page.locator(textMessage).evaluate((el) => {
      const clone = el.cloneNode(true);
      clone.querySelectorAll('[data-xid="Gd7Hsc"], .rBl3me').forEach(node => node.remove());
      return clone.innerHTML;
    });

    if (currentHtml !== previousHtml) {
      const markdown = NodeHtmlMarkdown.translate(currentHtml);
      process.stdout.write('\x1B\[2J\x1B\[3J\x1B\[H');
      console.log(markdown || 'loading ...');
      previousHtml = currentHtml;
    }

    await stop.count() > 0 && process.exit(0)
    await page.waitForTimeout(timer);
  }
});
