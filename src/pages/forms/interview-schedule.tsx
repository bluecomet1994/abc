import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { yupResolver } from '@hookform/resolvers/yup';
import form1ValidationSchema from '@/utils/validations/form1';
import dayjs from 'dayjs';

export default function InterviewSchedule() {
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  const formOptions = { resolver: yupResolver(form1ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <div className='w-full h-full overflow-auto'>
      <Container maxWidth="xl" className="w-full h-full p-4">
        <h1 className="font-bold text-3xl text-center text-teal-500 my-8">ABC Assessment & Interview Schedule</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
          <div className='flex w-full'>
            <TextField
              label="Name & Surname"
              color='primary'
              variant="standard"
              {...register('name')}
              className='w-full m-2'
              helperText={errors.name?.message}
              error={errors.name?.message ? true : false}
              required
            />
            <TextField
              label="Contact Number"
              color='primary'
              variant="standard"
              {...register('phone')}
              placeholder='+0 000 000 0000'
              className='w-full m-2'
              helperText={errors.phone?.message}
              error={errors.phone?.message ? true : false}
              required
            />
          </div>

          <div className='flex w-full'>
            <TextField
              label="ID Number"
              color='primary'
              variant="standard"
              {...register('id')}
              className='w-full m-2'
              helperText={errors.id?.message}
              error={errors.id?.message ? true : false}
              required
            />
            <TextField
              label="Area applied for"
              color='primary'
              variant="standard"
              {...register('area')}
              className='w-full m-2'
              helperText={errors.area?.message}
              error={errors.area?.message ? true : false}
              required
            />
          </div>

          <div className='flex w-full'>
            <TextField
              label="Interviewer"
              color='primary'
              variant="standard"
              {...register('interviewer')}
              className='w-full m-2'
              helperText={errors.interviewer?.message}
              error={errors.interviewer?.message ? true : false}
              required
            />
            
          </div>

          <div className='mt-8 text-center'>
            <Button
              type='submit'
              color="primary"
              variant='contained'
              className='w-96 h-12 bg-teal-500 font-bold text-lg'
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}