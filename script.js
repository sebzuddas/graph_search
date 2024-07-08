async function search() {
    const query = document.getElementById('search-query').value;

    // Simulate web scraping
    const scrapedData = await mockWebScraping(query);

    const nodes = [];
    const links = [];

    scrapedData.forEach(item => {
        nodes.push({ id: item.name, group: 1 });

        item.related.forEach(relatedItem => {
            nodes.push({ id: relatedItem.name, group: 2 });
            links.push({ source: item.name, target: relatedItem.name });
        });
    });

    drawGraph(nodes, links);
}

async function mockWebScraping(query) {
    // This is a mock function. Replace with actual web scraping logic.
    return [
        {
            name: query,
            related: [
                { name: `${query} Related 1` },
                { name: `${query} Related 2` },
            ]
        },
        {
            name: `${query} Related 1`,
            related: [
                { name: `${query} Related 1.1` },
                { name: `${query} Related 1.2` },
            ]
        },
        {
            name: `${query} Related 2`,
            related: [
                { name: `${query} Related 2.1` },
                { name: `${query} Related 2.2` },
            ]
        }
    ];
}
