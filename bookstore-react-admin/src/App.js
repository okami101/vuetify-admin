import React from "react";
import {Admin, Resource} from "react-admin";
import jwtAuthProvider from "./providers/jwtAuthProvider";
import laravelDataProvider from "./providers/laravelDataProvider";
import polyglotI18nProvider from "ra-i18n-polyglot";
import frenchMessages from "./locales/fr";

import {
  PublisherList,
  PublisherCreate,
  PublisherEdit,
  PublisherShow
} from "./resources/publishers";
import {BookList, BookCreate, BookEdit, BookShow} from "./resources/books";
import {ReviewList, ReviewCreate, ReviewEdit, ReviewShow} from "./resources/reviews";

const authProvider = jwtAuthProvider(process.env.REACT_APP_API_ENTRYPOINT);
const dataProvider = laravelDataProvider(process.env.REACT_APP_API_ENTRYPOINT);
const i18nProvider = polyglotI18nProvider(() => frenchMessages, "fr");

const App = () => (
  <Admin
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name="publishers"
      list={PublisherList}
      create={PublisherCreate}
      show={PublisherShow}
      edit={PublisherEdit}
    />
    <Resource
      name="books"
      list={BookList}
      create={BookCreate}
      show={BookShow}
      edit={BookEdit}
    />
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
