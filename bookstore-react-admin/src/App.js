import React from "react";
import {Admin, Resource} from "react-admin";
import jwtAuthProvider from "./providers/jwtAuthProvider";
import laravelDataProvider from "./providers/laravelDataProvider";
import polyglotI18nProvider from "ra-i18n-polyglot";
import frenchMessages from "./locales/fr";

import {PublisherList} from "./resources/publishers";
import {BookList} from "./resources/books";
import {ReviewList, ReviewCreate, ReviewShow, ReviewEdit} from "./resources/reviews";

console.log(frenchMessages);

const authProvider = jwtAuthProvider(process.env.REACT_APP_API_ENTRYPOINT);
const dataProvider = laravelDataProvider(process.env.REACT_APP_API_ENTRYPOINT);
const i18nProvider = polyglotI18nProvider(() => frenchMessages, "fr");

const App = () => (
  <Admin
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="publishers" list={PublisherList} />
    <Resource name="books" list={BookList} />
    <Resource
      name="reviews"
      list={ReviewList}
      create={ReviewCreate}
      show={ReviewShow}
      edit={ReviewEdit}
    />
  </Admin>
);

export default App;
