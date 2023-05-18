let annee = document.querySelector('#annee');
let zone = document.querySelector('#zone');
let result = document.querySelector('.result');
let valider = document.querySelector('#btn');



let date = new Date();


for (let i = 0; i <= 3; i++) {
    annee.innerHTML += ` <option value="${date.getFullYear() + i}">${date.getFullYear() + i}</option>`;
}

const moisEnLettres = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const joursEnLettres = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

valider.addEventListener('click', () => {
    fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&facet=description&facet=population&facet=start_date&facet=end_date&facet=location&facet=zones&facet=annee_scolaire&refine.zones=Zone+${zone.value}&refine.end_date=${annee.value}`)
        .then(response => response.json())
        .then(data => {

            result.innerHTML = '';
            data.records.forEach(element => {
                let start_date = new Date(element.fields.start_date);
                let end_date = new Date(element.fields.end_date);
                let today = `${joursEnLettres[start_date.getDay()]} ${start_date.getDate()} ${moisEnLettres[start_date.getMonth()]} ${start_date.getFullYear()}`;
                let today2 = `${joursEnLettres[end_date.getDay()]} ${end_date.getDate()} ${moisEnLettres[end_date.getMonth()]} ${end_date.getFullYear()}`;

                result.innerHTML += `<div class="card w-50 mx-auto my-2">
            <div class="card-body">
              <h5 class="card-title">${element.fields.description}</h5>
              <p class="card-text">Date de début: ${today}</p>
              <p class="card-text">Date de fin: ${today2}</p>
              <p class="card-text">Zone: ${element.fields.zones}</p>
            </div>
          </div>`
            });
        });

   
});

