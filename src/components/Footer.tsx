import React, {useState} from 'react';
import { Box, Block, Icon, Form, Button, Hero, Footer, Container, Content } from "react-bulma-components";

export const FooterSection =() => {
    

return(
    <div style={{

    }}
     >
    <Hero 
    // size="halfheight"
    style={{
        width: '-webkit-fill-available' 
    }}>
      <Hero.Header renderAs="footer" />
      <Hero.Footer>
        <Footer style={{
          background: '#307FE2'
        }}>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <p style={ {
                color: 'black'
              }}> 
              The website is created through a collaboration of Globaltek interns at 
              <a href="https://www.feutech.edu.ph/"
              style={{
                color: 'green'
              }}>
                  {' '}
                  FEU Institute of Technology. <br/>
                </a>
                <div style={{ paddingTop: '50px' }}>© Copyright 2023 Trajector. All Rights Reserved.</div>
                {/* <strong>Bulma</strong> by{' '}
                <a href="http://jgthms.com">Jeremy Thomas</a>. The source code
                is licensed under
                <a href="http://opensource.org/licenses/mit-license.php">
                  {' '}
                  MIT
                </a>
                . The website content is licensed{' '}
                <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                  CC BY NC SA 4.0
                </a>
                . */}
              </p>
            </Content>
          </Container>
        </Footer>
      </Hero.Footer>
    </Hero>
  </div>

);

}