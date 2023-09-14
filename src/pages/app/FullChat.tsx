import React from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media } from 'react-bulma-components';
import Chat from '../../components/chat';

function FullChat() {
  return (
    <div style={{marginTop: 40}}>
      <Chat 
        fullWidth
        fullHeight
        width={400}
      />
    </div>
  );
}

export default FullChat;
