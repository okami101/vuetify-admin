import Admin from "./components/Core/Admin";
import Resource from "./components/Core/Resource";

import Page from "./components/Layouts/PageLayout";
import List from "./components/Actions/List";
import Show from "./components/Actions/Show";
import Create from "./components/Actions/Create";
import Edit from "./components/Actions/Edit";

import {
  Datagrid,
  SimpleShowLayout,
  TabbedShowLayout,
  TextField,
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  ExportButton,
  Confirm
} from "./components/UI";

const components = [
  Admin,
  Resource,
  Page,
  List,
  Show,
  Create,
  Edit,
  Datagrid,
  SimpleShowLayout,
  TabbedShowLayout,
  TextField,
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  ExportButton,
  Confirm
];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(`Va${component.name}`, component);
    });
  }
};
