async function search() {
    const query = document.getElementById('search-query').value;

    const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
        return;
    }

    const scrapedData = await response.json();

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
