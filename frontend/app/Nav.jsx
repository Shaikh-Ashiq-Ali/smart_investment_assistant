import React from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";

export default function Nav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary border-bottom">
      <Container fluid>
        <NavbarBrand href="/dashboard">
          Smart Investment Assistant
        </NavbarBrand>
      </Container>
    </Navbar>
  )
}
