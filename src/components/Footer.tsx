import { relative } from 'path';
import React, { useState } from 'react';
import { Hero, Footer, Container, Content } from "react-bulma-components";

export const FooterSection = () => {
  return (
    // <div>
    //   <Hero
    //     marginless
    //     style={{
    //       flexGrow: 1,
    //       width: '-webkit-fill-available'
    //       }}>
    //     <Hero.Footer>
    //       <Footer
    //         style={{
    //           background: '#071D49'
    //           }}>
    //         <Container>
    //           <Content
    //             style={{
    //               textAlign: 'center'
    //               }}>
    //             <p
    //               style={{
    //                 color: 'white'
    //                 }}>

    //               The website is created through a collaboration of Globaltek interns at{' '}

    //               <a
    //                 href="https://www.feutech.edu.ph/"
    //                 style={{ color: 'green' }}
    //               >
    //                 FEU Institute of Technology.

    //               </a>
    //               <div
    //                 style={{
    //                   paddingTop: '10px'
    //                   }}>
    //                     © Copyright 2023 Trajector. All Rights Reserved.
    //               </div>
    //             </p>
    //           </Content>
    //         </Container>
    //       </Footer>
    //     </Hero.Footer>
    //   </Hero>
    // </div>
    <div>
      <Hero>
        <Hero.Footer>
          <Footer className='has-background-white-ter' style={{padding: '15px'}}>
            <Container>
              <Content style={{ textAlign: 'center' }}>
                <div style={{ color: 'black' }}>
                  <div>
                    The website is created through a collaboration of Globaltek interns at{' '}
                    <a href="https://www.feutech.edu.ph/" style={{ color: 'green' }} >
                      <strong>FEU Institute of Technology.</strong>
                    </a>
                  </div>
                  <div style={{ paddingTop: '10px' }}>
                    © Copyright 2023 Trajector. All Rights Reserved.
                  </div>
                </div>
              </Content>
            </Container>
          </Footer>
        </Hero.Footer>
      </Hero>
    </div>
  );
}