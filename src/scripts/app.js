//Je pense qu'on peut supprimer cette partie prce qu'elle est dans une fonction (en bas)
import Chart from 'chart.js/auto'
import { color } from 'chart.js/helpers';
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
let isDragging = false;
let choosenYear = 'y_1970';

let mousePosition = 0;
let rotation = 0;

knob.addEventListener("mousedown", onKnobClick);
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    onMouseMove(e);
  }
});
document.addEventListener("mouseup", () => {
  getInputNumber();
  isDragging = false;
});

function onKnobClick (event) {
    event.preventDefault();
    isDragging = true;
}

function onMouseMove(event) {
    const click = event.clientX;
    const rootStyle = getComputedStyle(document.documentElement);
    const rotateValue = rootStyle.getPropertyValue('--rotateValue');

    if (mousePosition > click) {
        rotation -= 4;
        document.documentElement.style.setProperty("--rotateValue", rotation + "deg");

        if (rotation % 30 === 0){
            input.stepDown(1);
        }    
    }
    if (mousePosition < click) {
        rotation += 4;
        document.documentElement.style.setProperty("--rotateValue", rotation + "deg");

        if (rotation % 30 === 0){
            input.stepUp(1); 
        }  
    }


    

    document.documentElement.style.setProperty("--rotateValue", rotation + "deg"); // cette ligne ne sert à rien
    mousePosition = click;

    
}



//------------Input et changer le texte selon la date choisie


const input = document.querySelector(".inputnumber");
input.addEventListener("blur", getInputNumber);


function getInputNumber () {
    const userInputValue = parseInt(input.value);

if (userInputValue >= 2023) {
    input.value = 2025;
} 
else if (userInputValue >= 2018 && userInputValue <= 2022) {
    input.value = 2020;
}
else if (userInputValue >= 2013 && userInputValue <= 2017) {
    input.value = 2015;
}
else if (userInputValue >= 2008 && userInputValue <= 2012) {
    input.value = 2010;
}
else if (userInputValue >= 2003 && userInputValue <= 2007) {
    input.value = 2005;
}
else if (userInputValue >= 1998 && userInputValue <= 2002) {
    input.value = 2000;
}
else if (userInputValue >= 1993 && userInputValue <= 1997) {
    input.value = 1995;
}
else if (userInputValue >= 1988 && userInputValue <= 1992) {
    input.value = 1990;
}
else if (userInputValue >= 1983 && userInputValue <= 1987) {
    input.value = 1985;
}
else if (userInputValue >= 1978 && userInputValue <= 1982) {
    input.value = 1980;
}
else if (userInputValue >= 1973 && userInputValue <= 1977) {
    input.value = 1975;
}
else {
    // Si c'est en dessous de 1973
    input.value = 1970;
}
    const url = '../Json/annees.json';
    choosenYear = `y_${userInputValue}`;
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
const allColors = ["#00DDFF","#4DFF00","#FF49AA","#FFAE00", "#00FFD9","#E375FF","#7A6EFF","#FFA8D6","#DDFF6E","#FF292C"];

const createColor = (i) => {
  return allColors[i % allColors.length];
}

const colorWords = (data, choosenYear, elId) => {
  const topWords = data[choosenYear].top_10[elId - 1].topwords;
  let paroles = data[choosenYear].top_10[elId - 1].lyrics;

  topWords.forEach((word, i) => {
    const regex = new RegExp(`\\b${word.mot}\\b`, 'gi');
    

    const currentColor = createColor(i);
    
    const coloredWord = `<span style="color:${currentColor};">${word.mot}</span>`;
    paroles = paroles.replace(regex, coloredWord);
  });

  const lyricsParagraphe = document.querySelector(".songinfos__paragraphe");
  if (lyricsParagraphe) {
    lyricsParagraphe.innerHTML = paroles;
  }
}

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

        listeLi.forEach((li) => {
            li.addEventListener("click", () => showLyrics(li, data));
        })
    })
    .catch(error => console.error("Erreur du fetch, l'année choisie n'est pas disponible :", error));



function showLyrics (li, data) {
  const elId = li.id;

  generateGraph(data, choosenYear, elId);
  colorWords(data, choosenYear, elId);
  const songActive = document.querySelector(".songinfos__el--active");
  if (songActive){
    songActive.classList.remove("songinfos__el--active");  
  }
  li.classList.add("songinfos__el--active");
}

//--------------Le Graphique chartjs-----------------
            
async function generateGraph(data, choosenYear, elId) {
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
    const canvasElement = document.getElementById('myChart'); // On récupère le canvas

    if (myGraph) {
        // Mise à jour si déjà existant
        myGraph.data.labels = newLabels;
        myGraph.data.datasets[0].data = newValue;
        myGraph.update();
    } 
    else {
        // Création initiale (Correction de l'argument id)
      myGraph = new Chart(canvasElement, { 
          type: 'bar',
          options: {
              scales: {
                  y: { beginAtZero: true }
              }
          },
          data: {
              labels: newLabels,
              datasets: [{
                  label: 'Récurrence du mot',
                  data: newValue,
                  backgroundColor: allColors,

              }]
          }
      });
  }
};


//----------------Graphique Donnut---------------------

const urlYears = '../Json/every_years.json';
const anneeChoisie = `tw_${userInputValue}`;
fetch(urlYears)
    .then(response => response.json())
    .then((data) => {
        console.log(data[anneeChoisie]);
    })
    .catch(error => console.error("Erreur :", error));
}

