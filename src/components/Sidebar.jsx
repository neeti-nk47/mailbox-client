import { EditIcon, EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Badge, List, ListItem } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import MailsContext from "../store/mails-context";

export default function Sidebar() {
  const mailsCtx = useContext(MailsContext);

  return (
    <List fontSize="1.2rem" spacing="3">
      <ListItem p="2">
        <NavLink to="/mailbox/Compose">
          <EditIcon m="3" />
          Compose
        </NavLink>
      </ListItem>
      <ListItem p="2">
        <NavLink to="/mailbox">
          <EmailIcon m="3" />
          Inbox
        </NavLink>
        <Badge ml="8" variant="solid" colorScheme="blue">
          {mailsCtx.inboxCounter}
        </Badge>
      </ListItem>
      <ListItem p="2">
        <NavLink to="/mailbox/Sentmail">
          <ExternalLinkIcon m="3" />
          Sent
        </NavLink>
        <Badge ml="10" variant="solid" colorScheme="blue">
          {mailsCtx.sentCounter}
        </Badge>
      </ListItem>
    </List>
  );
}
