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

export default function Sentbox() {
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
    const response = await fetch(`${baseURL}/${mailid}/Sentbox.json`);
    const data = await response.json();
    //console.log(data);

    const sentMails = [];
    for (const key in data) {
      sentMails.push({
        ID: key,
        from: data[key].from,
        to: data[key].to,
        subject: data[key].subject,
        body: data[key].body,
        read: data[key].read,
      });
    }
    setMails(sentMails);
    mailCtx.sentUpdate(sentMails.length);
  }, []);

  useEffect(() => {
    fetchHandler(userModEmail);
  }, [fetchHandler, userModEmail]);

  //DELETE-------------------------------------------------
  const deleteHandler = (obj) => {
    fetch(`${baseURL}/${userModEmail}/Sentbox/${obj.ID}.json`, {
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
  };

  return (
    <>
      <Card p="3">
        <CardHeader>
          <Heading size="md" textAlign="center">
            SENTBOX
          </Heading>
        </CardHeader>
        <CardBody>
          <List>
            {mails.map((ele) => (
              <ListItem key={ele.ID} my="3">
                <Flex gap="2" p="1" border="0.4px solid lightblue">
                  <Text mx="3" fontWeight="bold">
                    {ele.to}
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
                To: {selectedItem.to}
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
