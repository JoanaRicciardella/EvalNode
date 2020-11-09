//Je récupère l'ensemble des informations de mon formulaire

    var nom = document.querySelector('#name');
    var prenom = document.querySelector('#prenom');
    var date = document.querySelector('#date');
    var niveau = document.querySelector('#niveau');
    var adress = document.querySelector('#adresse');

    var url = window.location;
    //J'utilise la proprièté hash de mon url pout récupérer l'identifiant
    var eleveId = url.hash;

    eleveId = eleveId.substring(1);

    var xhttp = new XMLHttpRequest ();

    xhttp.open('GET', '/eleve/' + eleveId, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);
            nom.value = data.name;
            prenom.value = data.prenom;
            date.value = data.date;
            niveau.value = niveau.value;
            adress.value = data.adress;
        }
    };


    function modifyeleve() {
        var tempo = {
            name : nom.value,
            prenom : prenom.value,
            date : date.value,
            niveau : niveau.value,
            adress : adress.value
        };
        xhttp.open('PUT', '/eleve/' + eleveId, true);
        //Comme je vais envoyer des informations je dois comme pour le post précisé une entête
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(tempo));
    }
    
    var btn = document.querySelector('#modif');
    btn.addEventListener('click', (e) =>{
        e.preventDefault();
        modifyeleve();
        // Je me redirige vers la liste des jeux
        window.location.href = '/pages/eleve.html';
    });