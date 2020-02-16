import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteButton
} from "react-admin";

export const PublisherList = props => (
  <List {...props}>
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
