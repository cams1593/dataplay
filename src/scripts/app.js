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
    .catch(error => console.error("Erreur du fetch :", error));

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
    
    const root = document.querySelector(":root");
    const style = getComputedStyle(root);
    const rotate = style.getPropertyValue("--rotateValue");
    
    if (mousePosition > click) {
        console.log("tu vas à gauche");
        
    }
    if (mousePosition < click) {
        console.log("tu vas à droite");

        document.documentElement.style.setProperty("--textColor", "1deg");
        console.log(rotate);
    }
    mousePosition = click;
}
