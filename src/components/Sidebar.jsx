import { CalendarIcon, ChatIcon, EmailIcon } from "@chakra-ui/icons";
import { List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List fontSize="1.2rem" spacing="3">
      <ListItem p="2">
        <NavLink to="/mailbox/Compose">
          <EmailIcon m="3" />
          Compose
        </NavLink>
      </ListItem>
      <ListItem p="2">
        <NavLink to="/mailbox">
          <ChatIcon m="3" />
          Inbox
        </NavLink>
      </ListItem>
      <ListItem p="2">
        <NavLink to="/mailbox/Sentmail">
          <CalendarIcon m="3" />
          Sent
        </NavLink>
      </ListItem>
    </List>
  );
}
