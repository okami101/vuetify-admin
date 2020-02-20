import frenchMessages from "ra-language-french";

export default {
  resources: {
    publishers: {
      name: "Editeur |||| Editeurs",
      fields: {
        name: "Nom",
        founder: "Fondateur",
        headquarter: "Siège",
        description: "Description",
        opening_date: "Date d'ouverture"
      }
    },
    books: {
      name: "Livre |||| Livres",
      fields: {
        title: "Titre",
        description: "Description",
        summary: "Résumé",
        author: "Auteur",
        publication_date: "Date de publication",
        published_before: "Publié avant",
        published_after: "Publié après"
      }
    },
    reviews: {
      name: "Commentaire |||| Commentaires",
      fields: {
        rating: "Note",
        body: "Corps",
        author: "Auteur",
        publication_date: "Date de publication",
        published_before: "Publié avant",
        published_after: "Publié après"
      }
    }
  },
  ...frenchMessages
};
