import { List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2rem" spacing={4}>
      <ListItem>
        <NavLink to="/">Inbox</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/">Sent</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/">New Email</NavLink>
      </ListItem>
    </List>
  );
}
