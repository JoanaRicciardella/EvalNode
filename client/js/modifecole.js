//Je récupère l'ensemble des informations de mon formulaire
var nom = document.querySelector('#name');
var adress = document.querySelector('#adress');
var departement = document.querySelector('#departement');


var url = window.location;
//J'utilise la proprièté hash de mon url pout récupérer l'identifiant
var ecoleId = url.hash;

ecoleId = ecoleId.substring(1);

var xhttp = new XMLHttpRequest ();

xhttp.open('GET', '/ecole/' + ecoleId, true);
xhttp.send();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(this.responseText);
        nom.value = data.name;
        adress.value = data.adress;
        departement.value = data.departement;
    }
};

function modifyecole() {
    var tempo = {
        name : nom.value,
        adress : adress.value,
        departement : departement.value
    };
    xhttp.open('PUT', '/ecole/' + ecoleId, true);
    //Comme je vais envoyer des informations je dois comme pour le post précisé une entête
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tempo));
}

var btn = document.querySelector('#modif');
btn.addEventListener('click', (e) =>{
    e.preventDefault();
    modifyecole();
    // Je me redirige vers la liste des jeux
     window.location.href = '/pages/ecole.html';
});