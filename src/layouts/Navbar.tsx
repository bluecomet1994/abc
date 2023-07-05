import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import {
  AppBar,
  Avatar,
  Toolbar,
  Container,
  Button,
  Box,
  Hidden
} from '@mui/material';

export default function Navbar() {
  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <AppBar position="static" className='z-50'>
      <Container maxWidth="xl">
        <Toolbar disableGutters className='flex justify-between p-1'>
          <Box className="flex items-center">
            <Link href={'/'}>
              <Image alt='logo' src={'/images/logo.png'} width={128} height={64} priority />
            </Link>
            <Hidden smDown>
              <h1 className='font-bold text-xl mx-2'>Employment Staff Checklist</h1>
            </Hidden>
          </Box>
          
          {
            isLogged ?
              <Box className="flex">
                <div className='flex items-center mx-2'>
                  <Avatar className='mx-2' />
                  <h1>Morgan Mastrangelo</h1>
                </div>

                <Link href={'/logout'}>
                  <Button
                    color="inherit"
                    className='w-24 h-10'
                  >
                    LOGOUT
                  </Button>
                </Link>
              </Box>
              :
              <Box>
                <Link href={'/login'}>
                  <Button
                    color="inherit"
                    className='w-24 h-10'
                  >
                    LOGIN
                  </Button>
                </Link>
    
                <Link href={'/register'}>
                  <Button
                    color="inherit"
                    className='w-24 h-10'
                  >
                    SIGNUP
                  </Button>
                </Link>
              </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}