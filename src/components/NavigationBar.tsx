import * as React from "react";
import { Navbar } from "react-bulma-components";
import logo from '../media/logo.svg';
export const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
   <Navbar>
    <Navbar.Brand>
      <Navbar.Item renderAs="a" href="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Navbar.Item>
      <Navbar.Burger 
        className={`navbar-burger burger ${menuOpen ? "is-active" : ""}`}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        pull="right"
      />
    </Navbar.Brand>
    <Navbar.Menu pull="left" 
        style={{
          position: menuOpen? 'absolute' : 'unset',
        }}
          className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
      <Navbar.Container align="right">
        <Navbar.Item href="/">Home</Navbar.Item>
        <Navbar.Item href="#">Full Screen Chat</Navbar.Item>
      </Navbar.Container>
      <Navbar.Container align="left">
        <Navbar.Item href="/manage">Manage</Navbar.Item>
      </Navbar.Container>
    </Navbar.Menu>
  </Navbar>
  );
}