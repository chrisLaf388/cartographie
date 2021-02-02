// ajouter dans texte area la liste des suggestion de v;lle
// placer un pointeur sur area
const textArea = document.querySelector('#villesSuggestion');


const searchAlgoliaPlaces = (event) => {
    fetch("https://places-dsn.algolia.net/1/places/query", {
    method: "POST",
    body: JSON.stringify({ query: event.currentTarget.value })
    })
    .then(response => response.json())
    .then((data) => {
    //console.log(data.hits); // Look at local_names.default
    //affiche la liste
    textArea.innerHTML = '';
    villes = data.hits;    
    villes.forEach(ville => {
        // console.log(ville.locale_names.default[0]);
        textArea.insertAdjacentHTML('beforeend',
        `<option value="${ville.locale_names.default[0]}">`)

       
    });
    });
   };
   //Evenement clic pour autoCompletion
   const input = document.querySelector("input");
   input.addEventListener("keyup", searchAlgoliaPlaces);

   var latitude = 51.508;
   var longitude = -0.11;

   console.log(latitude);
   //View + marker avec géolocalisation
   var mymap = L.map('mapid').setView([latitude, longitude], 13);
   var marker = L.marker([latitude, longitude]).addTo(mymap);

   // recupère le valeur du clic sur datalist
    input.addEventListener('change', (event)=>{
        //récupere le premier mot de string grace a split
        villeClic = input.value;
        villeClic = villeClic.split(' ');
        console.log(villeClic[0]);
        //Appelle à l'api pour comparer le string a la base de donnée
        // et retourne la bonne latitude et longitude
        fetch("https://places-dsn.algolia.net/1/places/query", {
            method: "POST",
            body: JSON.stringify({ query: event.currentTarget.value })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data.hits); 
                latitude = data.hits[0]._geoloc.lat;
                // console.log(latitude);
                longitude = data.hits[0]._geoloc.lng;
                console.log(longitude);
                mymap.remove();
                mymap = L.map('mapid').setView([latitude, longitude], 13);
                marker = L.marker([latitude, longitude]).addTo(mymap);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiY2hyaXNsYWYiLCJhIjoiY2trbnNxNHFzMTE0ajJxcnFqcG5jY3VvMCJ9.zpMc4eAOLGxjWPXEUSQ_zA'
            }).addTo(mymap);
            })
     })

   
   
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2hyaXNsYWYiLCJhIjoiY2trbnNxNHFzMTE0ajJxcnFqcG5jY3VvMCJ9.zpMc4eAOLGxjWPXEUSQ_zA'
}).addTo(mymap);

   


    



