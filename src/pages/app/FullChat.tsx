import React from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media } from 'react-bulma-components';
import Chat from '../../components/chat';

function FullChat() {
  return (
    <Hero
    style={{
      backgroundColor: '#A7C6ED'
    }} >
    <div
    style={{
      marginTop: 40
    }}
    >
      <Chat 
        width={400} 
      />
    </div>
    </Hero>
  );
}

export default FullChat;