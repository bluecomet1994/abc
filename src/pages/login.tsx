import Head from "next/head";
import { Card, TextField, Checkbox, Button, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex justify-center items-center w-full h-screen bg-teal-400">
        <Card className="flex flex-col w-96 px-8 py-12 fadeup">
          <h1 className="font-bold text-2xl text-center mb-4 text-teal-600">
            <AccountCircleIcon color="primary" fontSize="large" />&nbsp;Sign in
          </h1>

          <TextField
            label="Email Address"
            variant="standard"
            className="mt-4"
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            className="mt-4"
          />

          <div className="flex justify-between items-center my-4">
            <div>
              <Checkbox />Remember Me
            </div>
            <Link href={'/'} className="text-center text-teal-600 underline">Forget Password?</Link>
          </div>

          <Button color="primary" variant="contained" className="h-12 bg-teal-500 font-bold text-lg">Sign in</Button>

          <Link href={'/register'} className="text-center mt-4 text-teal-600 underline">Don&apos;t have an account? Sign up</Link>

          <Typography className="text-center mt-6">
            Copyright@
            <Link href={'/'} className="text-center mt-2 text-teal-600 underline">Affordable</Link>&nbsp;
            2023
          </Typography>
        </Card>
      </div>
    </>
  )
}