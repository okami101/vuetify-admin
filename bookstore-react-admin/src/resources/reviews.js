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
  NumberInput
} from "react-admin";

export const ReviewList = props => (
  <List {...props}>
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
      <TextField source="id" />
      <TextField source="rating" />
      <TextField source="author" />
      <TextField source="publication_date" />
    </SimpleShowLayout>
  </Show>
);

export const ReviewEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput source="rating" />
      <TextInput source="author" />
      <DateInput source="publication_date" />
    </SimpleForm>
  </Edit>
);

export const ReviewCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="rating" />
      <TextInput source="author" />
      <DateInput source="publication_date" />
    </SimpleForm>
  </Create>
);
