import React, { Fragment } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogger } from "react-use";
import { useUserDispatch, useUserStore } from "../context/user.context";

export default function CustomNavbar() {
  useLogger("Navbar");
  const store = useUserStore();
  const { logoutUser } = useUserDispatch();
  const { isAuth, user } = store;

  const handleLogout = () => {
    logoutUser();
  };

  console.log(store);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Company Logo</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isAuth ? (
              <Fragment>
                <Navbar.Text>
                  Welcome back <a href="#login">{user.data.displayName}</a> !
                </Navbar.Text>
                <Button
                  className="m-3"
                  variant="outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Button as={Link} to="/login" variant="outline-light">
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
