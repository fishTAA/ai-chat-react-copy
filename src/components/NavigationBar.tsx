import * as React from "react";
import { Navbar } from "react-bulma-components";
import logo from '../media/logo.svg';
export const NavigationBar = () => {
  return (
   <Navbar>
    <Navbar.Brand>
      <Navbar.Item renderAs="a" href="#">
        <img src={logo} className="App-logo" alt="logo" />
      </Navbar.Item>
      <Navbar.Burger />
    </Navbar.Brand>
    <Navbar.Menu>
      <Navbar.Container>
        <Navbar.Item hoverable={true} href="#">
          <Navbar.Link arrowless={false}>First</Navbar.Link>
          <Navbar.Dropdown up={false} right={false} boxed={false}>
            <Navbar.Item href="#">Subitem 1</Navbar.Item>
            <Navbar.Item href="#">Subitem 2</Navbar.Item>
            <Navbar.Divider />
            <Navbar.Item href="#">After divider</Navbar.Item>
          </Navbar.Dropdown>
        </Navbar.Item>
        <Navbar.Item href="#">Second</Navbar.Item>
      </Navbar.Container>
      <Navbar.Container align="right">
        <Navbar.Item href="#">At the end</Navbar.Item>
      </Navbar.Container>
    </Navbar.Menu>
  </Navbar>
  );
}