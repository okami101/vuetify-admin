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
  NumberInput,
  Filter
} from "react-admin";

const ReviewFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="q" alwaysOn />
    <NumberInput source="rating" />
    <TextInput source="author" />
    <DateInput source="published_before" />
    <DateInput source="published_after" />
  </Filter>
);

export const ReviewList = props => (
  <List {...props} filters={<ReviewFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="rating" />
      <TextField source="author" />
      <TextField source="publication_date" />
      <ShowButton></ShowButton>
      <EditButton></EditButton>
      <DeleteButton></DeleteButton>
    </Datagrid>
  </List>
);

export const ReviewShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="rating" />
      <TextField source="author" />
      <TextField source="publication_date" />
    </SimpleShowLayout>
  </Show>
);

export const ReviewEdit = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <NumberInput source="rating" />
      <TextInput source="author" />
      <DateInput source="publication_date" />
    </SimpleForm>
  </Edit>
);

export const ReviewCreate = props => (
  <Create {...props} undoable="false">
    <SimpleForm>
      <NumberInput source="rating" />
      <TextInput source="author" />
      <DateInput source="publication_date" />
    </SimpleForm>
  </Create>
);
