import {
  Container,
  Checkbox,
  Button,
  Typography,
  TextField,
  CircularProgress
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { STATUS_TEXT } from '@/utils/enums';
import Swal from 'sweetalert2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';
import form9ValidationSchema from '@/utils/validations/form9';

const Form9 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form9ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (yupData: any) => {
    const application = {
      name: yupData.name,
      id: yupData.id,
      date: yupData.date,
      dname: yupData.dname,
      ddate: yupData.ddate,
      wname: yupData.wname,
      wdate: yupData.wdate
    }

    const data = {
      title: "Acknowledgement and Debt",
      type: 9,
      email: currentUser.email,
      status: STATUS_TEXT.PENDING,
      date: new Date(Date.now()).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      application
    }

    console.log(data);

    Swal.fire({
      icon: "question",
      text: "Are you sure you want to submit this application?",
      showCancelButton: true
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setIsLoading(true);

        const fireStore = getFirestore(app);
        addDoc(collection(fireStore, 'applications'), data)
          .then(() => {
            setIsLoading(false);
            Swal.fire({
              icon: "success",
              title: "You application has been submitted",
              text: "You will receive a status update in an email from Indeed within a few weeks of submitting your application."
            }).then(() => router.push('/'));
          }).catch(error => {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: "Please try again."
            });
          })
      }
    })
  }

  return (
    <Container maxWidth="xl" className="w-full h-full p-4">
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Acknowledgement and Debt</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
        <div className='w-full my-8'>
          <div className="leading-10">
            <div>
              This serves as an acknowledgement that I, <TextField color='primary' variant='standard' placeholder="Your name" {...register('name')} />, ID Number <TextField color='primary' variant='standard' {...register('id')} />, is indebted to Affordable Benefits Company for <b>R133.00</b> (Total amount) for the repayment of the Clientele uniform.
            </div>
            <p>
              I hereby agree to a repayment of R133.00 from my first month salary or the pro-rata portion thereof until the full amount is recovered. I also agree that should I leave the company prior settlement of this amount, Affordable Benefits Company will recover the outstanding amount from any monies due to me.Should I leave the employ of ABC before the full amount is recovered I will return the uniform to ABC.
            </p>

            <div className="my-6">
              Effective start date of repayment: <TextField color='primary' variant='standard' placeholder="MM/DD/YYYY" {...register('date')} />
            </div>

            <div className='flex w-full'>
              <div className="flex w-full">
                <p>Debtor:</p>
                <TextField color='primary' variant='standard' {...register('dname')} />
              </div>
              <div className="flex w-full">
                <p>Date:</p>
                <TextField color='primary' variant='standard' placeholder="MM/DD/YYYY" {...register('ddate')} />
              </div>
            </div>

            <div className='flex w-full'>
              <div className="flex w-full">
                <p>Witness:</p>
                <TextField color='primary' variant='standard' {...register('wname')} />
              </div>
              <div className="flex w-full">
                <p>Date:</p>
                <TextField color='primary' variant='standard' placeholder="MM/DD/YYYY" {...register('wdate')} />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 mb-12 text-center'>
          <Button
            type='submit'
            color="primary"
            variant='contained'
            className='w-96 h-12 bg-teal-500'
            onClick={handleSubmit(onSubmit)}
          >
            {
              isLoading ?
                <CircularProgress color="inherit" size={28} />
                :
                <Typography className='font-bold text-lg'>Submit</Typography>
            }
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default Form9;