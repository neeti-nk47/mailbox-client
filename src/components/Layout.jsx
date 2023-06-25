import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
        <GridItem
          as="aside"
          colSpan="1"
          bg="blue.200"
          minHeight="100vh"
          p="30px"
        >
          <Sidebar />
        </GridItem>
        <GridItem as="main" colSpan="5" p="20px">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
}
