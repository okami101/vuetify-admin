import Admin from "./components/Core/Admin";
import Resource from "./components/Core/Resource";
import Field from "./components/Core/Field";

import List from "./components/Actions/List";
import Show from "./components/Actions/Show";
import Create from "./components/Actions/Create";
import Edit from "./components/Actions/Edit";

import {
  Datagrid,
  SimpleShow,
  TabbedShow,
  Tab,
  SimpleForm,
  TextField,
  RichTextField,
  TextInput,
  DateInput,
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  SaveButton,
  ExportButton
} from "./components/UI";

const components = [
  Admin,
  Resource,
  Field,
  List,
  Show,
  Create,
  Edit,
  Datagrid,
  SimpleShow,
  TabbedShow,
  Tab,
  SimpleForm,
  TextField,
  RichTextField,
  TextInput,
  DateInput,
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  SaveButton,
  ExportButton
];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(`Va${component.name}`, component);
    });
  }
};
