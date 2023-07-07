import React, { useState } from 'react';
import {
  Container,
  CircularProgress,
  Typography,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import form7ValidationSchema from '@/utils/validations/form7';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { STATUS_TEXT } from '@/utils/enums';
import Swal from 'sweetalert2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';

const steps = ['PERSONAL DETAILS (1)', 'PERSONAL DETAILS (2)'];

const Form7 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form7ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [dob, setDob] = useState<any>(dayjs());
  const [engaged, setEngaged] = useState<any>(dayjs());
  const [language, setLanguage] = useState('English');
  const [group, setGroup] = useState('African');
  const [gender, setGender] = useState('Male');
  const [marital, setMarital] = useState('Single');
  const [holderRel, setHolderRel] = useState('Own');
  const [tStatus, setTStatus] = useState('Statutory');
  const [uif, setUif] = useState('UIF');

  const qaData = [
    [
      { label: "Title", method: { ...register('title') } },
      { label: "Initials", method: { ...register('initials') } },
      { label: "Surname", method: { ...register('surname') } },
      { label: "ID number", method: { ...register('id') } },
      { label: "First name", method: { ...register('firstname') } },
      { label: "Second name", method: { ...register('lastname') } },
      { label: "Known as", method: { ...register('known') } },
      { label: "Spouses names", method: { ...register('spouses') } },
    ],
    [
      { label: "Passport number", method: { ...register('pnumber') } },
      { label: "Passport country", method: { ...register('pcountry') } },
    ],
    [
      { label: "Language", answer: ["English", "Alternate"], value: language, method: ({ target: { value } }: any) => setLanguage(value) },
      { label: "Group", answer: ["African", "Indian", "Coloured", "White"], value: group, method: ({ target: { value } }: any) => setGroup(value) },
      { label: "Gender", answer: ["Male", "Female"], value: gender, method: ({ target: { value } }: any) => setGender(value) },
      { label: "Marital status", answer: ["Single", "Married", "Divorced", "Windowed", "Separated"], value: marital, method: ({ target: { value } }: any) => setMarital(value) },
    ],
    [
      { label: "Emergency contact name", method: { ...register('emergency') } },
      { label: "Cell number", method: { ...register('cell') } },
      { label: "Landline", method: { ...register('landline') } },
    ],
    [
      { label: "Cell number", method: { ...register('ecell') } },
      { label: "Home number", method: { ...register('ehome') } },
      { label: "Business number", method: { ...register('ebusiness') } },
      { label: "Fax number", method: { ...register('efax') } },
    ],
    [
      { label: "Email address", method: { ...register('email') } },
      { label: "Account holder name", method: { ...register('holdername') } }
    ],
    [
      { label: "Bank name", method: { ...register('bankname') } },
      { label: "Account number", method: { ...register('number') } },
      { label: "Branch code", method: { ...register('branch') } },
      { label: "Type of account", method: { ...register('type') } },
    ],
    [
      { label: "Unit number", method: { ...register('runit') } },
      { label: "Complex", method: { ...register('rcomplex') } },
      { label: "Street number", method: { ...register('rsnumber') } },
      { label: "Street name", method: { ...register('rsname') } },
      { label: "Suburb", method: { ...register('rsuburb') } },
      { label: "City", method: { ...register('rcity') } },
      { label: "Postal code", method: { ...register('rpostal') } },
    ],
    [
      { label: "Floor number", method: { ...register('wfnumber') } },
      { label: "Complex", method: { ...register('wcomplex') } },
      { label: "Street number", method: { ...register('wsnumber') } },
      { label: "Street name", method: { ...register('wsname') } },
      { label: "Suburb", method: { ...register('wsuburb') } },
      { label: "City", method: { ...register('wcity') } },
      { label: "Postal code", method: { ...register('wpostal') } },
    ],
    [
      { label: "Postal number", method: { ...register('ppnumber') } },
      { label: "Postal city", method: { ...register('ppcity') } },
      { label: "Postal code", method: { ...register('ppcode') } },
    ],
    [
      { label: "Tax office", method: { ...register('toffice') } },
      { label: "Tax number", method: { ...register('tnumber') } },
    ],
    [
      { label: "Directive %", method: { ...register('directive') } },
      { label: "Directive number", method: { ...register('dnumber') } },
    ]
  ]

  const onSubmit = (yupData: any) => {
    const application = {
      ...yupData,
      dob: dob.format('MM/DD/YYYY'),
      engaged: engaged.format('MM/DD/YYYY'),
      language,
      group,
      gender,
      marital,
      holderRel,
      tStatus,
      uif
    }

    const data = {
      title: "Personal Details",
      type: 7,
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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-4">Personal Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
        <div className="flex flex-wrap w-full my-20">
          {
            qaData[0].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }

          <div className='flex w-full p-2'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dob}
                onChange={date => setDob(date)}
                className='w-1/2'
                views={['year', 'month', 'day']}
                disablePast
              />
            </LocalizationProvider>
          </div>

          {
            qaData[1].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }

          <div className='my-8'>
            {
              qaData[2].map((item: any, index: number) => (
                <FormControl key={index} className='w-full px-4 my-4'>
                  <FormLabel id="matric">
                    {item.label}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="matric"
                    value={item.value}
                    onChange={item.method}
                    className='w-full px-8'
                    row
                  >
                    {
                      item.answer.map((ans: any, index: number) => (
                        <FormControlLabel key={index} value={ans} control={<Radio />} label={ans} />
                      ))
                    }
                  </RadioGroup>
                </FormControl>
              ))
            }
          </div>

          <div className='flex w-full p-2'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={engaged}
                onChange={date => setEngaged(date)}
                className='w-1/2'
                views={['year', 'month', 'day']}
                disablePast
              />
            </LocalizationProvider>
          </div>

          {
            qaData[3].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }

          <div className='w-full my-8'>
            <h1 className='font-bold'>Employee contact numbers:</h1>
            {
              qaData[4].map((item, index) =>
                <div key={index} className='flex w-1/2 p-2'>
                  <TextField
                    label={item.label}
                    color='primary'
                    variant="outlined"
                    {...item.method}
                    className='w-full'
                  />
                </div>
              )
            }
          </div>

          <div className='w-full my-8'>
            {
              qaData[5].map((item, index) =>
                <div key={index} className='flex w-1/2 p-2'>
                  <TextField
                    label={item.label}
                    color='primary'
                    variant="outlined"
                    {...item.method}
                    className='w-full'
                  />
                </div>
              )
            }
            <FormControl className='w-full px-4 my-4'>
              <FormLabel id="matric">
                Account holder relationship
              </FormLabel>
              <RadioGroup
                aria-labelledby="matric"
                value={holderRel}
                onChange={({ target: { value } }) => setHolderRel(value)}
                className='w-full px-8'
                row
              >
                <FormControlLabel value="Own" control={<Radio />} label="Own" />
                <FormControlLabel value="Joined" control={<Radio />} label="Joined" />
                <FormControlLabel value="Third Party" control={<Radio />} label="Third Party" />
              </RadioGroup>
            </FormControl>
          </div>

          {
            qaData[6].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }
        </div>

        <div className='w-full my-8'>
          <h1 className='font-bold'>Residential address:</h1>
          {
            qaData[7].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }
        </div>

        <div className='w-full my-8'>
          <h1 className='font-bold'>Work address:</h1>
          {
            qaData[8].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }
        </div>

        <div className='w-full my-8'>
          <h1 className='font-bold'>Postal address:</h1>
          {
            qaData[9].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }
        </div>

        <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Statutory Details</h1>

        <div className='flex w-full'>
          {
            qaData[10].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }
        </div>

        <FormControl className='w-full px-4 my-4'>
          <FormLabel id="matric">
            Tax status
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={tStatus}
            onChange={({ target: { value } }) => setTStatus(value)}
            className='w-full px-8'
            row
          >
            <FormControlLabel value="Statutory" control={<Radio />} label="Statutory" />
            <FormControlLabel value="Directive %" control={<Radio />} label="Directive %" />
            <FormControlLabel value="Temp" control={<Radio />} label="Temp" />
            <FormControlLabel value="Legally retired" control={<Radio />} label="Legally retired" />
          </RadioGroup>
        </FormControl>

        <div className='flex w-full'>
          {
            qaData[11].map((item, index) =>
              <div key={index} className='flex w-1/2 p-2'>
                <TextField
                  label={item.label}
                  color='primary'
                  variant="outlined"
                  {...item.method}
                  className='w-full'
                />
              </div>
            )
          }
        </div>

        <FormControl className='w-full px-4 my-4'>
          <FormLabel id="matric">
            UIF Status
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={uif}
            onChange={({ target: { value } }) => setUif(value)}
            className='w-full px-8'
            row
          >
            <FormControlLabel value="UIF" control={<Radio />} label="UIF" />
            <FormControlLabel value="Learner" control={<Radio />} label=" Learner" />
            <FormControlLabel value="Temp" control={<Radio />} label="Temp" />
          </RadioGroup>
        </FormControl>

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
  );
}

export default Form7;