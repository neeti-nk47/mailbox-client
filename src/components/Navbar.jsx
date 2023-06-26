import { Button, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const email = localStorage.getItem("Email");
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("Email");
    localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <Flex
      as="nav"
      p="10px"
      alignItems="center"
      gap="10px"
      bg="blue.300"
      borderBottom="1px solid blue"
    >
      <Heading size="xl" mx="10">
        MailBox
      </Heading>
      <Spacer />
      <HStack spacing="20px">
        <Text> {email} </Text>
        {email && (
          <Button colorScheme="red" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
