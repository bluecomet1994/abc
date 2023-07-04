import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="static" className='z-50'>
      <Container maxWidth="xl">
        <Toolbar disableGutters className='flex justify-between p-1'>
          <Box>
            <Image alt='logo' src={'/images/logo.png'} width={128} height={64} priority />
          </Box>
          
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}