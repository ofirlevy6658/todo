import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoType } from "../Types";

export interface IProps {
  todos: TodoType[];
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
}
export const CheckboxList = ({ todos, onDelete, onToggle }: IProps) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo._id}`;

        return (
          <ListItem
            key={todo._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => onDelete(todo._id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => onToggle(todo._id, !todo.done)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={todo.desc} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
