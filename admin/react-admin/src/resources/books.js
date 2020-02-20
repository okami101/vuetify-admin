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

import {Typography} from "@material-ui/core";

const Aside = () => (
  <div style={{width: 200, margin: "1em"}}>
    <Typography variant="h6">Post details</Typography>
    <Typography variant="body2">
      Posts will only be published one an editor approves them
    </Typography>
  </div>
);

const BookFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="q" alwaysOn />
    <TextInput source="title" />
    <TextInput source="author" />
    <DateInput source="published_before" />
    <DateInput source="published_after" />
  </Filter>
);

export const BookList = props => (
  <List {...props} filters={<BookFilter />} aside={<Aside />}>
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
  <Create {...props} undoable="false">
    <SimpleForm>
      <TextInput source="isbn" />
      <TextInput source="title" />
      <TextInput source="author" />
      <DateInput source="publication_date" />
    </SimpleForm>
  </Create>
);
