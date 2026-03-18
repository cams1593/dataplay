const url = '../Json/annees.json';

fetch(url)
    .then(response => response.json())
    .then((data) => {
//        console.log(data.top_10[0].title);
//        console.log(data.top_10[0].rang);

        console.log(data.year);



        // Pour lister tous les titres du top_10
//        data.top_10.forEach(chanson => {
//            console.log(`Rang ${chanson.rang} : ${chanson.title}`);
//        });
    })
    .catch(error => console.error("Erreur du fetch :", error));