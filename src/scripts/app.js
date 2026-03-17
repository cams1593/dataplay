const url = '../Json/annees.json';

const data = fetch(url).then(data => data.json()).then((response) =>{
    console.log(response.top_10[0].topwords[8].occurences);
})
