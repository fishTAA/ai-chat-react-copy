import React, {useState} from 'react';
import { Form, Button, Box, Hero, Heading } from 'react-bulma-components';


function Login() {


    return (
        <div style={{ background: 'linear-gradient(220deg,  #307FE2 0%, #EF3340 100%)', flexGrow: 1 }}>
            <Hero 
            size="fullheight"
            style={{
            display: 'flex' ,
            flexDirection: 'column',
            justifyContent: 'center',
     
            }}>
        <Box style={{ height: '300px', width: '300px' , margin: 'auto',
                display: 'flex' ,
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0px 0px 5px #2e2c29'
                 }}>
                <form>
                    <Heading style={{textAlign:'center'}}>
                        Login
                    </Heading>
                    <Button.Group align="center">
                    <Button style={{ backgroundColor: '#0078d4', color: 'white'}}>Microsoft Azure</Button>
                    </Button.Group>
                </form>
                </Box>
            </Hero>
         </div>
         
    );

}

export default Login;