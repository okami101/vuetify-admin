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
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  SaveButton,
  ExportButton,
  CloneButton,
  TextField,
  DateField,
  NumberField,
  RatingField,
  RichTextField,
  BooleanField,
  TextInput,
  DateInput,
  NumberInput,
  PasswordInput,
  RatingInput,
  BooleanInput
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
  ListButton,
  CreateButton,
  ShowButton,
  EditButton,
  DeleteButton,
  SaveButton,
  ExportButton,
  CloneButton,
  TextField,
  DateField,
  NumberField,
  RatingField,
  RichTextField,
  BooleanField,
  TextInput,
  DateInput,
  NumberInput,
  PasswordInput,
  RatingInput,
  BooleanInput
];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(`Va${component.name}`, component);
    });
  }
};
