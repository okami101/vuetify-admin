import Admin from "./components/Core/Admin";
import Resource from "./components/Core/Resource";

import Page from "./components/Layouts/PageLayout";
import List from "./components/Actions/List";
import Show from "./components/Actions/Show";
import Create from "./components/Actions/Create";
import Edit from "./components/Actions/Edit";

import {
  Datagrid,
  TextField,
  ListButton,
  ShowButton,
  EditButton,
  DeleteButton,
  Confirm,
  Title
} from "./components/UI";

const components = [
  Admin,
  Resource,
  Page,
  List,
  Show,
  Create,
  Edit,
  Title,
  Datagrid,
  TextField,
  ListButton,
  ShowButton,
  EditButton,
  DeleteButton,
  Confirm
];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(`Va${component.name}`, component);
    });
  }
};
