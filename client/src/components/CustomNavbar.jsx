
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

function CustomNavbar() {
  const style = {
    backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  };
  return (
    <Navbar
      bg="light"
      variant="light"
      data-bs-theme="light"
      expand="lg"
      style={style}
    >
      <Navbar.Brand href="/" style={{ paddingLeft: "30px" }}>
        LibMS
      </Navbar.Brand>
      <Navbar.Toggle
        id="navbarSupportedContentToggle"
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="ml-auto">
          <Nav.Link href ="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/recent">Recent</Nav.Link>
        </Nav>
        <Button
          variant="primary"
          style={{ marginLeft: "auto", marginRight: "30px" }}
        >
          Sign In
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
