import * as React from "react";
import { Navbar } from "react-bulma-components";
import logo from '../media/Trajector Main Logo_Color.png';


export const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
 
  return (
   <Navbar
   style={{
    position: menuOpen? 'absolute': 'fixed',
    width: '-webkit-fill-available' ,
    margin: 10 ,
    borderRadius: 6,
    zIndex: 100,
    boxShadow: '0px 0px 5px #888888',
    backgroundColor: 'white'
   }}>
    <Navbar.Brand>
      <Navbar.Item renderAs="a" href="/">
        <img src={logo} className="App-logo" alt="logo"
        style={{ width: '200px', height: 'auto' }} />

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
        {/* <Navbar.Item href="/full-chat">Full Screen Chat</Navbar.Item> */}
      </Navbar.Container>
      <Navbar.Container align="left">
        <Navbar.Item 
          style={{
            borderRadius: "6px"
          }}
          href="/manage"
        >
          Manage
        </Navbar.Item>
        <Navbar.Item 
          style={{
            borderRadius: "6px"
          }}
          href="/login"
        >
          Login Test
        </Navbar.Item>
      </Navbar.Container>
    </Navbar.Menu>
  </Navbar>
  );
}