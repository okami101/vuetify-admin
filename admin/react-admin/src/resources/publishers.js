import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteButton,
  Show,
  SimpleShowLayout,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  Filter
} from "react-admin";

const PublisherFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="q" alwaysOn />
    <TextInput source="name" />
    <TextInput source="founder" />
    <TextInput source="headquarter" />
    <DateInput source="opening_date" />
  </Filter>
);

export const PublisherList = props => (
  <List {...props} title="Liste des éditeurs" filters={<PublisherFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="founder" />
      <TextField source="headquarter" />
      <TextField source="opening_date" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
      <DeleteButton></DeleteButton>
    </Datagrid>
  </List>
);

export const PublisherShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="founder" />
      <TextField source="headquarter" />
      <TextField source="opening_date" />
    </SimpleShowLayout>
  </Show>
);

export const PublisherEdit = props => (
  <Edit {...props} undoable="false">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="founder" />
      <TextInput source="headquarter" />
      <DateInput source="opening_date" />
    </SimpleForm>
  </Edit>
);

export const PublisherCreate = props => (
  <Create {...props} undoable="false">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="founder" />
      <TextInput source="headquarter" />
      <DateInput source="opening_date" />
    </SimpleForm>
  </Create>
);
