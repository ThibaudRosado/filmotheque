var arrayTab = new Array();
var idSearch = 0;
var trieAnnee = 0;
var trieTitre = 0;

/**Permet de supprimer un film et son affichage */
function dropOneCard(id) {
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
/**Permet de supprimer l'affichage toute les cards */
function dropAllCard() {
    document.getElementById("ListCard").innerHTML = "";
}
/** Permet d'afficher tout les films */
function showAllCard(newCard) {
    for (let i = 0; i < arrayTab.length; i++) {
        if (arrayTab[i]) {
            let divCards = document.getElementById("ListCard");
            // Création des différants elléments
            let divCard = document.createElement("div");
            divCard.className = "card";
            divCard.id = "n_" + arrayTab[i].id;
            let divImage = document.createElement("div");
            divImage.className = "image";
            let img = document.createElement("img");
            img.src = arrayTab[i].affiche; 
            divImage.addEventListener('click', function () { getVideo(arrayTab[i].id, vidInNewWindow); });
            let divContent = document.createElement("div");
            divContent.className = "content";
            let divHeader = document.createElement("div");
            divHeader.className = "header";
            divHeader.innerText = arrayTab[i].titre;
            let divMeta = document.createElement("div");
            divMeta.className = "meta";
            let divDescription = document.createElement("div");
            divDescription.className = "description";
            divDescription.innerText = arrayTab[i].description.slice(0, 150) + " ...";
            let divExtraContent = document.createElement("div");
            divExtraContent.className = "extra content";
            let spanFloated = document.createElement("span");
            spanFloated.className = "right floated"
            spanFloated.innerText = "Sortie en " + arrayTab[i].annee;
            let trash = document.createElement("i");
            trash.className = "trash alternate outline icon"
            trash.addEventListener('click', function () { dropOneCard(arrayTab[i].id); });

            // Ajout des elléments dans la pages HTML
            let collNoeuds = divCards.childNodes;
            if (newCard) {
                divCards.insertBefore(divCard, collNoeuds[0]);
            } else {
                divCards.appendChild(divCard);
            }
            divCard.appendChild(divImage);
            divImage.appendChild(img);
            divCard.appendChild(divContent);
            divContent.appendChild(divHeader);
            divContent.appendChild(divMeta);
            divContent.appendChild(divDescription);
            divCard.appendChild(divExtraContent);
            divExtraContent.appendChild(trash);
            divExtraContent.appendChild(spanFloated);
        }
    }
}

function createOneCard(video){
    var divCards = document.getElementById("ListCard");
    // Création des différants elléments
    var divCard = document.createElement("div");
    divCard.className = "card";
    divCard.id = "n_" + video.id;
    var divImage = document.createElement("div");
    divImage.className = "image";
    var img = document.createElement("img");
    img.src = video.affiche; 
    divImage.addEventListener('click', function () { getVideo(video.id, vidInNewWindow); });
    var divContent = document.createElement("div");
    divContent.className = "content";
    var divHeader = document.createElement("div");
    divHeader.className = "header";
    divHeader.innerText = video.titre;
    var divMeta = document.createElement("div");
    divMeta.className = "meta";
    var divDescription = document.createElement("div");
    divDescription.className = "description";
    divDescription.innerText = video.description.slice(0, 150) + " ...";

    var divExtraContent = document.createElement("div");
    divExtraContent.className = "extra content";
    var spanFloated = document.createElement("span");
    spanFloated.className = "right floated"
    spanFloated.innerText = "Sortie en " + video.annee;

    var trash = document.createElement("i");
    trash.className = "trash alternate outline icon"
    trash.addEventListener('click', function () { dropOneCard(video.id); });

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
    divExtraContent.appendChild(trash);
    divExtraContent.appendChild(spanFloated);
}
/** Permet d'afficher tout les résultats de la recherche */
function showAllCardSearch(rep) {
    let i = 0;
    if (rep.results.length != 0) {
        while (i < rep.results.length) {
            idSearch++;
            film = rep.results[i];
            objetSearch = { id: idSearch, titre: film.title, annee: parseInt(film.release_date.slice(0, 4), 10), realisateur: "", affiche: "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + film.poster_path, description: film.overview }
            creerCardForSearch(objetSearch, film);
            i++;
        }
    } else { alert("Pas de résultat pour cette recherche.") }
}
/**Creer un formulaire d'ajout d'un film */
function createFormAddFilm() {
    //On créé tout les composants du formulaire de recherche
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
            dropAllCard();
            callAPIsearch(input.value, showAllCardSearch);
        } else {
            alert("Un titre doit au moins avoir 2 lettres");
        }
    });

    var btnAnnuler = document.createElement("button");
    btnAnnuler.className = "ui grey big button";
    btnAnnuler.innerText = "Annuler";
    btnAnnuler.addEventListener('click', function () {
        dropFormAddMovie();
        dropAllCard();
        showAllCard(false);
        resetMenu();
    });
    //On les relis a notre page html
    main.appendChild(divInput);
    divInput.appendChild(input);
    divInput.appendChild(btnAdd);
    divInput.appendChild(btnAnnuler);


}
/**Supprime le formulaire d'ajout */
function dropFormAddMovie() {
    document.getElementById("form").remove();
    variableAddFilm = 0;
}
/** Permet d'initialiser la page de recherche de film */
function menuSearchMovie() {
    //On supprimer la possiblité d'ouvrire a nouveau un formulaire
    document.getElementById("search").onclick = null;
    //On crée le formulaire de recherche
    createFormAddFilm();
    //On enlève toute les films qui pourait être la 
    dropAllCard();
    //On supprime la flèche qui indique les sens de tries
    supprimerFleche();
    // On supprimer les onglets de trie
    let titre = document.getElementById("titre");
    let annee = document.getElementById("annee");
    titre.remove();
    annee.remove();
}
/** Permet de réinitialiser le menu */
function resetMenu() {
    let titre = document.createElement("a");
    titre.id = "titre";
    titre.className = "item";
    titre.onclick = trieParTitre;
    titre.innerHTML = "Titre";

    let annee = document.createElement("a");
    annee.id = "annee";
    annee.className = "item";
    annee.onclick = trieParAnnee;
    annee.innerHTML = "Année";

    let nav = document.getElementById("nav");
    var collNoeuds = nav.childNodes;
    nav.insertBefore(annee, collNoeuds[0]);
    nav.insertBefore(titre, annee);

    let search = document.getElementById("search");
    search.onclick = menuSearchMovie;
}
/** Permet de récupérer les informations d'un film avec le site www.themoviedb.org */
function callAPIsearch(name, callback2) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + name + "&language=fr-FR&api_key=9fc903c4778210ab5888655b84ac25d3",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(response => {
        callback2(response);
    });

}
/** Sauvegarde un film dans l'array */
function saveMovie(film) {
    arrayTab.push({id: film.id, titre: film.title, annee: parseInt(film.release_date.slice(0, 4), 10), realisateur: "", affiche: "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + film.poster_path, description: film.overview});
    createOneCard(arrayTab[arrayTab.length-1])
}
/** Permet de créer une card qui s'enregistre quand on click dessus */
function creerCardForSearch(monObjet, film) {
    var divCards = document.getElementById("ListCard");
    // Création des différants elléments
    var divCard = document.createElement("div");
    divCard.className = "card";
    divCard.id = "n_" + monObjet.id;
    divCard.addEventListener('click', function () {
        var bool = confirm("Voulez vous ajouter ce film a votre filmotèque ?")
        if (bool) {
            saveMovie(film);
            dropAllCard();
            showAllCard(true);
            dropFormAddMovie();
            window.scroll(0, 0);
            resetMenu();
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
/**Trie par titre */
function trieParTitre() {
    dropAllCard();
    arrayTab.sort(compareTitre);
    if (trieTitre == 0) {
        supprimerFleche();
        // créé une flèche pour indiquer le sens du trie
        let icon = document.createElement("i");
        icon.className = "caret down icon";
        icon.id = "caret";
        document.getElementById("titre").insertAdjacentElement('beforeend', icon);
        trieTitre = 1;
    } else {
        supprimerFleche();
        // créé une flèche pour indiquer le sens du trie
        let icon = document.createElement("i");
        icon.className = "caret up icon";
        icon.id = "caret";
        document.getElementById("titre").insertAdjacentElement('beforeend', icon);
        trieTitre = 0;
    }
    showAllCard(false);
}
/**Trie par annee */
function trieParAnnee() {
    dropAllCard();
    arrayTab.sort(compareAnnee);
    if (trieAnnee == 0) {
        supprimerFleche();
        // créé une flèche pour indiquer le sens du trie
        let icon = document.createElement("i");
        icon.className = "caret down icon";
        icon.id = "caret";
        document.getElementById("annee").insertAdjacentElement('beforeend', icon);
        trieAnnee = 1;
    } else {
        supprimerFleche();
        // créé une flèche pour indiquer le sens du trie
        let icon = document.createElement("i");
        icon.className = "caret up icon";
        icon.id = "caret";
        document.getElementById("annee").insertAdjacentElement('beforeend', icon);
        trieAnnee = 0;
    }
    showAllCard(false);
}
/**Argument pour le .sort de trieParTitre() */
function compareTitre(a, b) {
    const A = a.titre.toUpperCase();
    const B = b.titre.toUpperCase();
    if (trieTitre == 0) {
        if (A > B) {
            return 1;
        } else if (A < B) {
            return -1;
        }
        return 0;
    } else {
        if (A < B) {
            return 1;
        } else if (A > B) {
            return -1;
        }
        return 0;

    }
}
/**Argument pour le .sort de trieParAnnee() */
function compareAnnee(a, b) {
    if (trieAnnee == 0) {
        return a.annee - b.annee;
    } else {
        return b.annee - a.annee;
    }
}
/**Permet de supprimer l'affichage de la flèche indiquant le sens de trie */
function supprimerFleche() {
    if (document.getElementById("caret")) {
        document.getElementById("caret").remove();
    }
}
/**Permet de récupérer une vidéo en fonction de l'id du film TMDB */
function getVideo(id, callbackVideo) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/" + id + "/videos?language=fr-FR&api_key=9fc903c4778210ab5888655b84ac25d3",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(function (response) {
        try {
            callbackVideo("https://www.youtube.com/embed/" + response.results[0].key);

        } catch (exeption) {
            alert("Pas de video disponible pour le moment.");
        }
    });
}
/**Ouvre un ouvel onglet avec une vidéo de présentation du film */
function vidInNewWindow(url) {
    window.open(url);
}


//Portion d'initialisation de la page
/** Ajoute un jeu de film test*/
function addPleinDeFilm() {
    callAPI('Jumanji : next level', saveMovie);
    callAPI('Rambo: Last Blood', saveMovie);
    callAPI('The Irishman', saveMovie);
    callAPI('Joker', saveMovie);
    callAPI('Venom', saveMovie);
    callAPI('Wonder Woman', saveMovie);
    callAPI('Avengers : L\'Ère d\'Ultron', saveMovie);
    callAPI('James Bond', saveMovie);
    callAPI('Aquaman', saveMovie);
    callAPI('Fury', saveMovie);
    callAPI('Casino Royale', saveMovie);
    callAPI('Iron Man', saveMovie);
    callAPI("La Reine des neiges 2", saveMovie);
    callAPI('Code 8', saveMovie);
    callAPI("Boulevard du crépuscule", saveMovie);
    callAPI("Notre-Dame de Paris", saveMovie);
    callAPI("Le Loup de Wall Street", saveMovie);
    callAPI("Midnight Express", saveMovie);
    callAPI("Harry Potter", saveMovie);
    callAPI("teddy", saveMovie);
}
/** Permet de récupérer les informations d'un film avec le site www.themoviedb.org pour le jeu de test */
function callAPI(name, callback) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + name + "&language=fr-FR&api_key=9fc903c4778210ab5888655b84ac25d3",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(response => {
        res = response.results[0];
        callback(res);
    });

}
addPleinDeFilm();
document.getElementById("titre").onclick= trieParTitre;
document.getElementById("annee").onclick= trieParAnnee;
document.getElementById("search").onclick= menuSearchMovie;