//Je pense qu'on peut supprimer cette partie prce qu'elle est dans une fonction (en bas)

const url = '../Json/annees.json';
fetch(url)
    .then(response => response.json())
    .then((data) => {
//        console.log(data.top_10[0].title);
//        console.log(data.top_10[0].rang);

//        console.log(data.y_1980.top_10[6].topwords[2]);



        // Pour lister tous les titres du top_10
//        data.top_10.forEach(chanson => {
//            console.log(`Rang ${chanson.rang} : ${chanson.title}`);
//        });
    })
    .catch(error => console.error("Erreur du fetch, l'année choisie n'est pas disponible:", error));

//----------------Le Bouton Qui Tourne-------------------

const knob = document.querySelector(".bigknob__center");
const knobRect = knob.getBoundingClientRect();
const knobX = knobRect.left + knobRect.width / 2 ;

let mousePosition = 0;

knob.addEventListener("mousedown", onKnobClick);

function onKnobClick () {
    document.addEventListener("mousemove", onMouseMove);
}
function onMouseMove (event) {
    const click = event.clientX;
    
    if (mousePosition > click) {
        console.log("tu vas à gauche");
        
    }
    if (mousePosition < click) {
        console.log("tu vas à droite");
        
    }
    mousePosition = click;
}
//------------Input et changer le texte selon la date choisie


const input = document.querySelector(".inputnumber");
input.addEventListener("blur", getInputNumber);


function getInputNumber () {
    const userInputValue = input.value;
    const url = '../Json/annees.json';
    const choosenYear = `y_${userInputValue}`;
//-------------------Les li------------------
    const top1 = document.getElementById("1");
    const top2 = document.getElementById("2");
    const top3 = document.getElementById("3");
    const top4 = document.getElementById("4");
    const top5 = document.getElementById("5");
    const top6 = document.getElementById("6");
    const top7 = document.getElementById("7");
    const top8 = document.getElementById("8");
    const top9 = document.getElementById("9");
    const top10 = document.getElementById("10");
//-----------------------------------------------
    
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        top1.innerText = "#1 " + data[choosenYear].top_10[0].title;
        top2.innerText = "#2 " + data[choosenYear].top_10[1].title;
        top3.innerText = "#3 " + data[choosenYear].top_10[2].title;
        top4.innerText = "#4 " + data[choosenYear].top_10[3].title;
        top5.innerText = "#5 " + data[choosenYear].top_10[4].title;
        top6.innerText = "#6 " + data[choosenYear].top_10[5].title;
        top7.innerText = "#7 " + data[choosenYear].top_10[6].title;
        top8.innerText = "#8 " + data[choosenYear].top_10[7].title;
        top9.innerText = "#9 " + data[choosenYear].top_10[8].title;
        top10.innerText = "#10 " + data[choosenYear].top_10[9].title;



        const listeLi = document.querySelectorAll(".songinfos__el");

        listeLi.forEach(function(li){
            li.addEventListener("click", showLyrics);

            function showLyrics () {
            const elId = li.id;
            const lyricsParagraphe = document.querySelector(".songinfos__paragraphe");
            
            lyricsParagraphe.innerHTML = data[choosenYear].top_10[elId - 1].lyrics;
        }


        })
        
        
    })
    .catch(error => console.error("Erreur du fetch, l'année choisie n'est pas disponible :", error));
}