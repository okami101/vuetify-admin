import Admin from "./components/Core/Admin";
import Resource from "./components/Core/Resource";

import List from "./components/Actions/List";
import Show from "./components/Actions/Show";
import Create from "./components/Actions/Create";
import Edit from "./components/Actions/Edit";

import {
  Datagrid,
  SimpleShow,
  TabbedShow,
  SimpleForm,
  TextField,
  RichTextField,
  DateInput,
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  ExportButton
} from "./components/UI";

const components = [
  Admin,
  Resource,
  List,
  Show,
  Create,
  Edit,
  Datagrid,
  SimpleShow,
  TabbedShow,
  SimpleForm,
  TextField,
  RichTextField,
  DateInput,
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  ExportButton
];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(`Va${component.name}`, component);
    });
  }
};
