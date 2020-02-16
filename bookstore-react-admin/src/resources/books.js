import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteButton
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
