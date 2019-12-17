# Travail demander

Dans le dossier vous trouverez 3 fichiers :
- index.html
- app.css
- app.js

## 1. HTML
---

- Concevoir la page HTML qui nous permettra de visualiser un tableau avec toutes les informations des films.

- Concevoir un formulaire nous permettant d'ajouter un film dans la liste

- Plus, un champ de sélection afin de filtrer les films par leur titre ou par leur année

## 2. CSS
---

- Pour la mise en forme, vous pouvez utiliser n'importe quelle framework sauf Boostrap !

## 3. JavaScript
---

- Dans le fichier *app.js* vous trouverez un tableau d'objets avec 4 valeurs qui sera votre base de données à afficher lors de l'ouverture de votre page HTML.

- Aucun script ou attribut javascript dois être présent dans le fichier HTML !

- Tâche à accomplir :
    - [ ] Afficher les films dans un tableau
    - [ ] Créer un bouton *"Ajouter"* qui nous fera apparaître un formulaire
        - Une zone de saisie pour le titre
        - Une zone de saisie pour l'année
        - Une zone de saisie pour l'auteur
    - [ ] Vérifier les données saisi par l'utilisateur dans le formulaire d'ajout
        - Titre : minimum 2 caratères
        - Année : format de l'année 4 chiffres compris entre 1900 et l'année en cours
        - Auteur : minimum de 5 caractères 
    - [ ] Si le formulaire est valide ajouter le film dans le tableau
        - Afficher un message d'alerte pendant 3s : "Film ajouter avec succès"
    - [ ] Sinon on affichera un message d'erreur
        - Afficher un message d'alerte pandant 3s : "Erreur dans le formulaire " + zone d'erreur
    - [ ] Pour le filtre :
        - Si l'option filtre par titre est sélection on affichera les films par ordre alphabétique
        - Si l'option filtre par année est sélection on affichera les films par ordre croissant
    - [ ] Enfin, pour chaque film on ajoutera un bouton *"Supprimer"* qui me permettra de retirer le film de ma liste

## 4. Liens utiles
---
### Framework CSS

- [Foundation](https://foundation.zurb.com/)
- [Bulma](https://bulma.io/)
- [Semantic](https://semantic-ui.com/)
- [Materialize](http://materializecss.com/)
- [KNACSS](https://knacss.com/)
- [MaterialUI](http://www.material-ui.com/#/)
- [Tailwin](https://tailwindcss.com/)
---

### Doc JavaScript
- [Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [Create Elements](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function)
- [Walking the DOM](https://javascript.info/dom-navigation)
- [Methods DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#See_also)
---

### jQuery
- [jQuery](https://jquery.com/)
- [Selector](https://api.jquery.com/category/selectors/)
---
