// ajouter dans texte area la liste des suggestion de v;lle
// placer un pointeur sur area
const textArea = document.querySelector('#villesSuggestion');
console.log(textArea);

const searchAlgoliaPlaces = (event) => {
    fetch("https://places-dsn.algolia.net/1/places/query", {
    method: "POST",
    body: JSON.stringify({ query: event.currentTarget.value })
    })
    .then(response => response.json())
    .then((data) => {
    console.log(data.hits); // Look at local_names.default
    //affiche la liste
    textArea.innerHTML = '';
    villes = data.hits;    
    villes.forEach(ville => {
        console.log(ville.locale_names.default[0]);
        textArea.insertAdjacentHTML('beforeend',
        `<option value="${ville.locale_names.default[0]}">`)

       
    });
    });
   };
   //Evenement clic pour autoCompletion
   const input = document.querySelector("input");
   input.addEventListener("keyup", searchAlgoliaPlaces)

//    //evement clic
//    const dataList = document.querySelector('datalist');
   
//    dataList.insertAdjacentHTML('click', (event)=>{
//        console.log(dataList);

//    })


   //View + marker avec géolocalisation
   var mymap = L.map('mapid').setView([51.505, -0.09], 13);
   var marker = L.marker([51.5, -0.09]).addTo(mymap);
   
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2hyaXNsYWYiLCJhIjoiY2trbnNxNHFzMTE0ajJxcnFqcG5jY3VvMCJ9.zpMc4eAOLGxjWPXEUSQ_zA'
}).addTo(mymap);
//marker
   


    



