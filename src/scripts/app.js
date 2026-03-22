//Je pense qu'on peut supprimer cette partie prce qu'elle est dans une fonction (en bas)
import Chart from 'chart.js/auto'
const url = '../Json/annees.json';
let myGraph = null;
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
let rotation = 0;
knob.addEventListener("mousedown", onKnobClick);

function onKnobClick (event) {
    event.preventDefault();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", knobStop);
    document.addEventListener("mouseup", getInputNumber);
}

function knobStop(){
    document.removeEventListener("mousemove", onMouseMove);
}
function onMouseMove (event) {
    const click = event.clientX;
    const rootStyle = getComputedStyle(document.documentElement);
    const rotateValue = rootStyle.getPropertyValue('--rotateValue');

    if (mousePosition > click) {
        rotation -= 3;
        input.stepDown(1);
    } else if (mousePosition < click) {
        rotation += 3;
        input.stepUp(1);
    }
    mousePosition = click;
    console.log(mousePosition);
}

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
            const songActive = document.querySelector(".songinfos__el--active");
            if (songActive){
               songActive.classList.remove("songinfos__el--active");  
            }
            li.classList.add("songinfos__el--active");
            const lyricsParagraphe = document.querySelector(".songinfos__paragraphe");
            lyricsParagraphe.innerHTML = data[choosenYear].top_10[elId - 1].lyrics;


            




//--------------Le Graphique chartjs-----------------
            
            (async function() {
                const donnees = [
                    { year: data[choosenYear].top_10[elId - 1].topwords[0].mot, count: data[choosenYear].top_10[elId - 1].topwords[0].occurences },
                    { year: data[choosenYear].top_10[elId - 1].topwords[1].mot, count: data[choosenYear].top_10[elId - 1].topwords[1].occurences },
                    { year: data[choosenYear].top_10[elId - 1].topwords[2].mot, count: data[choosenYear].top_10[elId - 1].topwords[2].occurences },
                    { year: data[choosenYear].top_10[elId - 1].topwords[3].mot, count: data[choosenYear].top_10[elId - 1].topwords[3].occurences },
                    { year: data[choosenYear].top_10[elId - 1].topwords[4].mot, count: data[choosenYear].top_10[elId - 1].topwords[4].occurences},
                    { year: data[choosenYear].top_10[elId - 1].topwords[5].mot, count: data[choosenYear].top_10[elId - 1].topwords[5].occurences},
                    { year: data[choosenYear].top_10[elId - 1].topwords[6].mot, count: data[choosenYear].top_10[elId - 1].topwords[6].occurences },
                    { year: data[choosenYear].top_10[elId - 1].topwords[7].mot, count: data[choosenYear].top_10[elId - 1].topwords[7].occurences },
                    { year: data[choosenYear].top_10[elId - 1].topwords[8].mot, count: data[choosenYear].top_10[elId - 1].topwords[8].occurences },
                    { year: data[choosenYear].top_10[elId - 1].topwords[9].mot, count: data[choosenYear].top_10[elId - 1].topwords[9].occurences },
                ];
                const newLabels = donnees.map(row => row.year);
                const newValue = donnees.map(row => row.count);
                if(myGraph){
                    myGraph.data.labels= newLabels;
                    myGraph.data.datasets[0].data = newValue;
                    myGraph.update();
                }
                else{
                 myGraph = new Chart(
                 document.getElementById('myChart'),
                {
                  type: 'bar',
                  options: {
                    tooltip: {
                        enabled: false
                    },
                  },
                  data: {
                    labels: newLabels,
                    datasets: [
                      {
                        label: 'Réccurence du mot dans la chanson',
                        data: newValue
                      }
                    ]
                  }
                }
              )}
            })();
        }


        })
    })
    .catch(error => console.error("Erreur du fetch, l'année choisie n'est pas disponible :", error));
}

