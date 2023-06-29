const express = require('express');
const axios = require('axios');
const app = express();
const cheerio = require('cheerio');
const { default: puppeteer } = require('puppeteer');

app.get('/api/framedata', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://wiki.supercombo.gg/w/Street_Fighter_6/" + req["query"]["name"];
    console.log(url)
    await page.goto(url); // Replace with the URL of the page you want to scrape
  
    // Wait for the desired dynamic content to be rendered
    await page.waitForSelector('.movedata-container');
  
    const elementsWithClass = await page.$$eval('.movedata-container', (elements) =>
      elements.map((element) => element.textContent)
    );
  
  
    await browser.close();
    

    // Return the scraped/fetched data
    res.json(elementsWithClass);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
const port = process.env.PORT || 3009;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
