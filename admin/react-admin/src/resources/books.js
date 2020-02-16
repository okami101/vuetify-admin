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
  DateInput
} from "react-admin";

export const BookList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="isbn" />
      <TextField source="title" />
      <TextField source="author" />
      <TextField source="publication_date" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
      <DeleteButton></DeleteButton>
    </Datagrid>
  </List>
);

export const BookShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="isbn" />
      <TextField source="title" />
      <TextField source="author" />
      <TextField source="publication_date" />
    </SimpleShowLayout>
  </Show>
);

export const BookEdit = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="isbn" />
      <TextInput source="title" />
      <TextInput source="author" />
      <DateInput source="publication_date" />
    </SimpleForm>
  </Edit>
);

export const BookCreate = props => (
  <Create {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="isbn" />
      <TextInput source="title" />
      <TextInput source="author" />
      <DateInput source="publication_date" />
    </SimpleForm>
  </Create>
);
