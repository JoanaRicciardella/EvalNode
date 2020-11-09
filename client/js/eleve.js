var xhttp = new XMLHttpRequest();

function addeleve(){

    var name = document.querySelector('#name');
    var prenom = document.querySelector('#prenom');
    var date = document.querySelector('#date');
    var niveau = document.querySelector('#niveau');
    var adress = document.querySelector('#adresse');
    
    

    //Objet temporaire respectant la même structure que le schéma du model
    var tempo = {
        name: name.value,
        prenom: prenom.value,
        date: date.value,
        niveau: niveau.value,
        adress: adress.value,
        
    };

    xhttp.open('POST', '/eleve', true);
    xhttp.setRequestHeader('Content-type', 'Application/json');
    xhttp.send(JSON.stringify(tempo)); // methode qui converti un objet en string

    addOneLine(tempo);
    document.forms['formSpe'].reset();

};

function deleteeleve(id){
    xhttp.open('DELETE', '/eleve/' + id,true);
    xhttp.send();
    window.location.href = '/pages/eleve.html'; // recharge la page
}

function addOneLine(data) {
    var tab = document.querySelector('#eleve');
    var newLine = document.createElement('tr');
    for (const key in data){
        if(key != '_id' && key != '__v') {
            var tempo = document.createElement('td');
            tempo.innerText = data[key];
            newLine.appendChild(tempo)
        }
    }

    var tdLink = document.createElement('td');
    var link = document.createElement('a'); //Cree la balise
    link.href = '/pages/modifeleve.html#' + data._id; // Le lien qu'on veut que cette ligne accède
    link.innerText = 'Modification'; // Rajoute du texte dans le lien
    tdLink.appendChild(link); // ajoute le lien dans la celulle
    newLine.appendChild(tdLink);

    //Je créé le bouton suppression
    var tdSuppr = document.createElement('td');
    var btnSuppr = document.createElement('button');
    btnSuppr.innerText = 'Suppression';
    btnSuppr.classList.add('btn', 'btn-outline-danger');
    tdSuppr.appendChild(btnSuppr);
    newLine.appendChild(tdSuppr);

    btnSuppr.addEventListener('click', (e) => {
        deleteeleve(data._id);
    });

    tab.appendChild(newLine);
}

var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => { 
    // je stop l'action par defaut du bouton
    e.preventDefault();

    addeleve(); //on prevoit du coup de rajouté add eleve
});

xhttp.open('GET', '/eleve', true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(this.responseText);
        data.forEach(elt => {
            addOneLine(elt);
        });
    }
};
