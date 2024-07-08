async function search() {
    const query = document.getElementById('search-query').value;
    const response = await fetch(`https://kgsearch.googleapis.com/v1/entities:search?query=${query}&key=YOUR_API_KEY&limit=5&indent=True`);
    const data = await response.json();

    const nodes = [];
    const links = [];

    data.itemListElement.forEach(item => {
        const entity = item.result;
        nodes.push({ id: entity.name, group: 1 });

        if (entity.detailedDescription) {
            links.push({ source: query, target: entity.name });
        }
    });

    drawGraph(nodes, links);
}
