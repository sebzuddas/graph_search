const puppeteer = require('puppeteer');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.post('/scrape', async (req, res) => {
    const query = req.body.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        const data = await scrape(query);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

async function scrape(query) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://www.example.com/search?q=${query}`; // Replace with the actual URL you want to scrape
    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        const results = [];
        // Add your specific scraping logic here
        // Example: Scraping search results
        document.querySelectorAll('.result').forEach(item => {
            const name = item.querySelector('.title').innerText;
            const related = [];
            item.querySelectorAll('.related-item').forEach(rel => {
                related.push({ name: rel.innerText });
            });
            results.push({ name, related });
        });
        return results;
    });

    await browser.close();
    return data;
}

module.exports.handler = serverless(app);
