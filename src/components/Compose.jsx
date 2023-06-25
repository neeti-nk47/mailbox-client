import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function Compose() {
  const baseURL = "https://mailbox-204ed-default-rtdb.firebaseio.com";

  const toast = useToast();

  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const mailbodyInputRef = useRef();

  const sendMailHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    const enteredMailBody = mailbodyInputRef.current.value;

    const modEmail = enteredEmail.replace("@", "").replace(".", "");

    const newEmail = {
      email: enteredEmail,
      subject: enteredSubject,
      body: enteredMailBody,
    };

    fetch(`${baseURL}/${modEmail}/Inbox.json`, {
      method: "POST",
      body: JSON.stringify(newEmail),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);

        toast({
          title: "Email Sent",
          status: "success",
          position: "top-right",
          duration: 2000,
        });

        //apna
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Card p="3">
      <CardHeader>
        <Heading size="md" textAlign="center">
          COMPOSE E-MAIL
        </Heading>
      </CardHeader>
      <CardBody>
        <FormControl isRequired>
          <HStack my="3">
            <FormLabel>To</FormLabel>
            <Input placeholder="Enter Email" type="email" ref={emailInputRef} />
          </HStack>
        </FormControl>
        <HStack my="3">
          <FormLabel>Subject</FormLabel>
          <Input placeholder="Enter Subject" ref={subjectInputRef} />
        </HStack>
        <Textarea
          my="3"
          height="300px"
          resize="vertical"
          ref={mailbodyInputRef}
        />
      </CardBody>

      <CardFooter>
        <Button colorScheme="blue" p="3" onClick={sendMailHandler}>
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}
