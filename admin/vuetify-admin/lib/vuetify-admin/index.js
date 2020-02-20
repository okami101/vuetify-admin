import {
  Admin,
  Resource,
  Field,
  Input,
  List,
  Show,
  Create,
  Edit
} from "./components/Core";

import {
  Datagrid,
  SimpleShow,
  TabbedShow,
  Form,
  FormSave,
  SimpleForm,
  TabbedForm,
  AsideContent,
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
  Input,
  List,
  Show,
  Create,
  Edit,
  Datagrid,
  Form,
  FormSave,
  SimpleShow,
  TabbedShow,
  SimpleForm,
  TabbedForm,
  AsideContent,
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
