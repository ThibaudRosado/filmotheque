var arrayTab = new Array();
var idUnique = 0;
var idSearch = 0;
var trieAnnee = 0;
var trieTitre = 0;
var variableAddFilm = 0;
addPleinDeFilm();

/**Permet de supprimer un film et sa card */
function dropOne(id) {
    var card = document.getElementById("n_" + id);
    var repUtilisateur = confirm("Voulez vous vraiment supprimer ce film ?");
    if (repUtilisateur) {
        for (var j = 0; j < arrayTab.length; j++) {
            if (arrayTab[j].id == id) {
                arrayTab.splice(j, 1);
            }
        }
        card.remove();
    }
}
/**Permet de supprimer toute les cards */
function dropAll() {
    for (var i = 0; i < idUnique + 1; i++) {
        if (document.getElementById("n_" + i)) {
            var aSupprimer = document.getElementById("n_" + i);
            aSupprimer.remove();
        }
    }
    for (var i = 0; i < idSearch + 1; i++) {
        if (document.getElementById("n_" + i)) {
            var aSupprimer = document.getElementById("n_" + i);
            aSupprimer.remove();
        }
    }
}
/** Permet d'afficher tout les films */
function afficheAll() {
    for (var i = 0; i < idUnique + 1; i++) {
        if (arrayTab[i]) {
            creerCard(arrayTab[i]);
        }
    }
}
/** Permet de créer une card en fonction d'un objet */
function creerCard(monObjet) {
    var divCards = document.getElementById("ListCard");
    // Création des différants elléments
    var divCard = document.createElement("div");
    divCard.className = "card";
    divCard.id = "n_" + monObjet.id;
    divCard.addEventListener('click', function () { dropOne(monObjet.id); });
    var divImage = document.createElement("div");
    divImage.className = "image";
    var img = document.createElement("img");
    img.src = monObjet.affiche;
    var divContent = document.createElement("div");
    divContent.className = "content";
    var divHeader = document.createElement("div");
    divHeader.className = "header";
    divHeader.innerText = monObjet.titre;
    var divMeta = document.createElement("div");
    divMeta.className = "meta";
    //divMeta.innerText = "Real : " + monObjet.realisateur + " - Sortie en " + monObjet.annee;
    //divMeta.innerText = "Real : " + monObjet.realisateur;
    var divDescription = document.createElement("div");
    divDescription.className = "description";
    divDescription.innerText = monObjet.description.slice(0, 150) + " ...";

    var divExtraContent = document.createElement("div");
    divExtraContent.className = "extra content";
    var spanFloated = document.createElement("span");
    spanFloated.className = "right floated"
    spanFloated.innerText = "Sortie en " + monObjet.annee;

    // Ajout des elléments dans la pages HTML
    divCards.appendChild(divCard);
    divCard.appendChild(divImage);
    divImage.appendChild(img);
    divCard.appendChild(divContent);
    divContent.appendChild(divHeader);
    divContent.appendChild(divMeta);
    divContent.appendChild(divDescription);
    divCard.appendChild(divExtraContent);
    divExtraContent.appendChild(spanFloated);
}
/** Permet de récupérer les informations d'un film avec le site www.themoviedb.org */
function callAPI(name, callback) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + name + "&language=en-US&api_key=9fc903c4778210ab5888655b84ac25d3",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(response => {
        res = response.results[0];
        callback(res);
    });

}
/** Ajoute un film */
function addFilm(titre) {
    callAPI(titre, saveFilm);
}
/** Sauvegarde un film dans l'array*/
function saveFilm(film) {
    idUnique++;
    arrayTab.push({ id: idUnique, titre: film.title, annee: parseInt(film.release_date.slice(0, 4), 10), realisateur: "", affiche: "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + film.poster_path, description: film.overview });
    creerOneCard(arrayTab[arrayTab.length - 1]);
}
/**Creer un formulaire d'ajout d'un film */
function createFormAddFilm() {
    if (variableAddFilm == 0) {
        var main = document.getElementById("add");

        var divInput = document.createElement("div");
        divInput.className = "ui input";
        divInput.id = "form";

        var input = document.createElement("input");
        input.type = "text";
        input.id = "titreAdd";
        input.placeholder = "Entrer titre";
        input.className = "ui input";

        var btnAdd = document.createElement("button");
        btnAdd.className = "ui blue big button";
        btnAdd.innerText = "Rechercher";
        btnAdd.addEventListener('click', function () {
            if (input.value.length > 1) {
                dropAll();
                btnFilmSearch(input.value);
            } else {
                alert("Un titre doit au moins avoir 2 lettres");
            }
        });

        var btnAnnuler = document.createElement("button");
        btnAnnuler.className = "ui grey big button";
        btnAnnuler.innerText = "Annuler";
        btnAnnuler.addEventListener('click', function () {
            dropFormAddFilm();
            dropAll();
            afficheAll();
            creerBtnTrie();
        });
        main.appendChild(divInput);
        divInput.appendChild(input);
        divInput.appendChild(btnAdd);
        divInput.appendChild(btnAnnuler);

        variableAddFilm = 1;
    }
}
/**Supprime le formulaire d'ajout */
function dropFormAddFilm() {
    document.getElementById("form").remove();
    variableAddFilm = 0;
}
/** Permet de créer une bouvelle card qui s'affiche en première */
function creerOneCard(monObjet) {
    var divCards = document.getElementById("ListCard");
    // Création des différants elléments
    var divCard = document.createElement("div");
    divCard.className = "card";
    divCard.id = "n_" + monObjet.id;
    divCard.addEventListener('click', function () { dropOne(monObjet.id); });
    var divImage = document.createElement("div");
    divImage.className = "image";
    var img = document.createElement("img");
    img.src = monObjet.affiche;
    var divContent = document.createElement("div");
    divContent.className = "content";
    var divHeader = document.createElement("div");
    divHeader.className = "header";
    divHeader.innerText = monObjet.titre;
    var divMeta = document.createElement("div");
    divMeta.className = "meta";
    var divDescription = document.createElement("div");
    divDescription.className = "description";
    divDescription.innerText = monObjet.description.slice(0, 150) + " ...";
    var divExtraContent = document.createElement("div");
    divExtraContent.className = "extra content";
    var spanFloated = document.createElement("span");
    spanFloated.className = "right floated"
    spanFloated.innerText = "Sortie en " + monObjet.annee;

    // Ajout des elléments dans la pages HTML
    var collNoeuds = divCards.childNodes;
    divCards.insertBefore(divCard, collNoeuds[0]);
    divCard.appendChild(divImage);
    divImage.appendChild(img);
    divCard.appendChild(divContent);
    divContent.appendChild(divHeader);
    divContent.appendChild(divMeta);
    divContent.appendChild(divDescription);
    divCard.appendChild(divExtraContent);
    divExtraContent.appendChild(spanFloated);
}
/** Ajoute un jeu de film test suplémentaire*/
function addPleinDeFilm() {
    addFilm('Jumanji : next level');
    addFilm('Rambo: Last Blood');
    addFilm('The Irishman');
    addFilm('Joker');
    addFilm('Venom');
    addFilm('Wonder Woman');
    addFilm('Avengers : L\'Ère d\'Ultron');
    addFilm('James Bond');
    addFilm('Aquaman');
    addFilm('Fury');
    addFilm('Casino Royale');
    addFilm('Iron Man');
    addFilm("La Reine des neiges 2");
    addFilm('Code 8');
    addFilm("Boulevard du crépuscule");
    addFilm("Notre-Dame de Paris");
    addFilm("Le Loup de Wall Street");
    addFilm("Midnight Express");
    addFilm("Harry Potter");
    addFilm("teddy");
}
/**Trie par titre */
function trieParTitre() {
    if (trieTitre == 0) {
        dropAll();
        arrayTab.sort(compareTitreASC);
        afficheAll();
        trieTitre = 1;
        titreDown();
    } else {
        dropAll();
        arrayTab.sort(compareTitreDESC);
        afficheAll();
        trieTitre = 0;
        titreUp();
    }
}
/**Trie par annee */
function trieParAnnee() {
    if (trieAnnee == 0) {
        dropAll();
        arrayTab.sort(compareAnneeASC);
        afficheAll();
        trieAnnee = 1;
        anneeDown();
    } else {
        dropAll();
        arrayTab.sort(compareAnneeDESC);
        afficheAll();
        trieAnnee = 0;
        anneeUp();
    }
}
function compareTitreASC(a, b) {
    const A = a.titre.toUpperCase();
    const B = b.titre.toUpperCase();

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
}
function compareTitreDESC(a, b) {
    const A = a.titre.toUpperCase();
    const B = b.titre.toUpperCase();

    let comparison = 0;
    if (A < B) {
        comparison = 1;
    } else if (A > B) {
        comparison = -1;
    }
    return comparison;
}
function compareAnneeASC(a, b) {
    const A = a.annee;
    const B = b.annee;

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
}
function compareAnneeDESC(a, b) {
    const A = a.annee;
    const B = b.annee;

    let comparison = 0;
    if (A < B) {
        comparison = 1;
    } else if (A > B) {
        comparison = -1;
    }
    return comparison;
}
function titreDown() {
    supprimerFleche();
    let icon = document.createElement("i");
    icon.className = "caret down icon";
    icon.id = "caret";
    document.getElementById("titre").insertAdjacentElement('beforeend', icon);
}
function anneeDown() {
    supprimerFleche();
    let icon = document.createElement("i");
    icon.className = "caret down icon";
    icon.id = "caret";
    document.getElementById("annee").insertAdjacentElement('beforeend', icon);
}
function titreUp() {
    supprimerFleche();
    let icon = document.createElement("i");
    icon.className = "caret up icon";
    icon.id = "caret";
    document.getElementById("titre").insertAdjacentElement('beforeend', icon);
}
function anneeUp() {
    supprimerFleche();
    let icon = document.createElement("i");
    icon.className = "caret up icon";
    icon.id = "caret";
    document.getElementById("annee").insertAdjacentElement('beforeend', icon);
}
function supprimerFleche() {
    if (document.getElementById("caret")) {
        document.getElementById("caret").remove();
    }
}
function rechercherFilm() {
    createFormAddFilm();
    dropAll();
    supprimerFleche();

    let titre = document.getElementById("titre");
    let annee = document.getElementById("annee");
    titre.remove();
    annee.remove();
}
function btnFilmSearch(titre) {
    callAPIsearch(titre, listSearch);
}
function listSearch(rep) {
    let i = 0;
    if (rep.results.length != 0) {
        while (i < rep.results.length) {
            idSearch++;
            film = rep.results[i];
            objetSearch = { id: idSearch, titre: film.title, annee: parseInt(film.release_date.slice(0, 4), 10), realisateur: "", affiche: "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + film.poster_path, description: film.overview }
            creerOneCardForAdd(objetSearch, film);
            i++;
        }
    } else { alert("Pas de résultat pour cette recherche.") }
}
/** Permet de récupérer les informations d'un film avec le site www.themoviedb.org */
function callAPIsearch(name, callback2) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + name + "&language=en-US&api_key=9fc903c4778210ab5888655b84ac25d3",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(response => {
        callback2(response);
    });

}
function creerOneCardForAdd(monObjet, film) {
    var divCards = document.getElementById("ListCard");
    // Création des différants elléments
    var divCard = document.createElement("div");
    divCard.className = "card";
    divCard.id = "n_" + monObjet.id;
    divCard.addEventListener('click', function () {
        var bool = confirm("Voulez vous ajouter ce film a votre filmotèque ?")
        if (bool) {
            saveFilm(film);
            dropAll();
            afficheAllNew();
            dropFormAddFilm();
            window.scroll(0, 0);
            creerBtnTrie();
            alert("Film ajoutée avec succé!");
        }
    });
    var divImage = document.createElement("div");
    divImage.className = "image";
    var img = document.createElement("img");
    img.src = monObjet.affiche;
    var divContent = document.createElement("div");
    divContent.className = "content";
    var divHeader = document.createElement("div");
    divHeader.className = "header";
    divHeader.innerText = monObjet.titre;
    var divMeta = document.createElement("div");
    divMeta.className = "meta";
    var divDescription = document.createElement("div");
    divDescription.className = "description";
    divDescription.innerText = monObjet.description.slice(0, 150) + " ...";
    var divExtraContent = document.createElement("div");
    divExtraContent.className = "extra content";
    var spanFloated = document.createElement("span");
    spanFloated.className = "right floated"
    spanFloated.innerText = "Sortie en " + monObjet.annee;

    // Ajout des elléments dans la pages HTML
    divCards.appendChild(divCard);
    divCard.appendChild(divImage);
    divImage.appendChild(img);
    divCard.appendChild(divContent);
    divContent.appendChild(divHeader);
    divContent.appendChild(divMeta);
    divContent.appendChild(divDescription);
    divCard.appendChild(divExtraContent);
    divExtraContent.appendChild(spanFloated);
}
function afficheAllNew() {
    for (var i = 0; i < idUnique - 1; i++) {
        if (arrayTab[i]) {
            creerCard(arrayTab[i]);
        }
    }
    creerOneCard(arrayTab[idUnique - 1])
}
function creerBtnTrie() {
    let titre = document.createElement("a");
    titre.id = "titre"
    titre.className = "item"
    titre.onclick = trieParTitre
    titre.innerHTML = "Titre"

    let annee = document.createElement("a")
    annee.id = "annee"
    annee.className = "item"
    annee.onclick = trieParAnnee
    annee.innerHTML = "Année"

    let nav = document.getElementById("nav")
    var collNoeuds = nav.childNodes;
    nav.insertBefore(annee, collNoeuds[0]);
    nav.insertBefore(titre, annee);
}