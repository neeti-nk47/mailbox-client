import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import MailsContext from "../store/mails-context";

export default function Inbox() {
  const mailCtx = useContext(MailsContext);
  const [mails, setMails] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseURL = "https://mailbox-204ed-default-rtdb.firebaseio.com";

  const userModEmail = localStorage
    .getItem("Email")
    .replace("@", "")
    .replace(".", "");

  const fetchHandler = useCallback(async (mailid) => {
    const response = await fetch(`${baseURL}/${mailid}/Inbox.json`);
    const data = await response.json();
    //console.log(data);

    const inboxMails = [];
    for (const key in data) {
      inboxMails.push({
        ID: key,
        from: data[key].from,
        to: data[key].to,
        subject: data[key].subject,
        body: data[key].body,
        read: data[key].read,
      });
    }
    setMails(inboxMails);
    mailCtx.inboxUpdate(inboxMails.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHandler(userModEmail);
      //console.log("Running useEffect every 2 seconds");
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchHandler, userModEmail]);

  //DELETE-------------------------------------------------
  const deleteHandler = (obj) => {
    fetch(`${baseURL}/${userModEmail}/Inbox/${obj.ID}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res.statusText);
        fetchHandler(userModEmail);
      })
      .catch((err) => console.log(err));
  };

  //VIEW----------------------------------------------------
  const openModal = (obj) => {
    setSelectedItem(obj);
    setIsModalOpen(true);

    const updatedData = {
      ...obj,
      read: true, // Update
    };

    fetch(`${baseURL}/${userModEmail}/Inbox/${obj.ID}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchHandler(userModEmail);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Card p="3">
        <CardHeader>
          <Heading size="md" textAlign="center">
            INBOX
          </Heading>
        </CardHeader>
        <CardBody>
          <List>
            {mails.map((ele) => (
              <ListItem key={ele.ID} my="3">
                <Flex gap="2" p="1" border="0.4px solid lightblue">
                  <Text mx="3" fontWeight="bold">
                    {!ele.read && <InfoIcon mx="2" boxSize={3} color="blue" />}
                    {ele.from}
                  </Text>
                  <Text mx="3" fontWeight="bold">
                    {ele.subject}
                  </Text>
                  <Spacer />
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => openModal(ele)}
                  >
                    VIEW
                  </Button>

                  <Button
                    size="sm"
                    mx="5"
                    colorScheme="red"
                    onClick={() => deleteHandler(ele)}
                  >
                    DELETE
                  </Button>
                </Flex>
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedItem && (
          <>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Subject: {selectedItem.subject}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                From: {selectedItem.from}
                <Text>{selectedItem.body}</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => deleteHandler(selectedItem)}
                >
                  DELETE
                </Button>
              </ModalFooter>
            </ModalContent>
          </>
        )}
      </Modal>
    </>
  );
}
