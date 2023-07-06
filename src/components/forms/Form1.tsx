import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import {
  Container,
  TextField,
  Checkbox,
  CircularProgress,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import form1ValidationSchema from '@/utils/validations/form1';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { STATUS_TEXT } from '@/utils/enums';

const Form1 = () => {
  const [date1, setDate1] = useState(dayjs());
  const [date2, setDate2] = useState(dayjs());
  const [qualify1, setQualify1] = useState('yes');
  const [qualify2, setQualify2] = useState('yes');
  const [qualify3, setQualify3] = useState('yes');
  const [qualify4, setQualify4] = useState('yes');
  const [observation1, setObservation1] = useState('good');
  const [observation2, setObservation2] = useState('good');
  const [observation3, setObservation3] = useState('good');
  const [observation4, setObservation4] = useState('good');
  const [observation5, setObservation5] = useState('good');
  const [observation6, setObservation6] = useState('good');
  const [observation7, setObservation7] = useState('good');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [outcome, setOutcome] = useState('accept');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form1ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (yupData: any) => {
    const application = {
      "User info": [
        { question: "Full Name", answer: yupData.name },
        { question: "Contact Number", answer: yupData.phone },
        { question: "ID Number", answer: yupData.id },
        { question: "Area applied for", answer: yupData.area },
        { question: "Interviewer", answer: yupData.interviewer },
        { question: "Date", answer: date1.toString() }
      ],
      "Qualifying questions": [
        { question: "Pass Matric/grade 12?", answer: qualify1 },
        { question: "Do you have a criminal record?", answer: qualify2 },
        { question: "Are you over the age of 22?", answer: qualify3 },
        { question: "Are you a South Africa Citizen?", answer: qualify4 },
        { question: "Where do you stay?", answer: yupData.qualify5 }
      ],
      "Interview observations & questions": [
        { question: 'Confidence', answer: observation1 },
        { question: 'Speaking', answer: observation2 },
        { question: 'Reading', answer: observation3 },
        { question: 'Listening', answer: observation4 },
        { question: 'Sales Ability', answer: observation5 },
        { question: 'Attitude', answer: observation6 },
        { question: 'Overall', answer: observation7 },
        { question: 'Tell me about your previous work experience', answer: yupData.observation8 },
        { question: 'What motivated you to apply for this position?', answer: yupData.observation9 },
        { question: "What do you understand about the position you've applied for?", answer: yupData.observation10 },
        { question: "What would you say are the core competencies required for this position?", answer: yupData.observation11 },
        { question: "General Question", answer: yupData.observation12 },
        { question: "Comment", answer: yupData.observationComment },
      ],
      "Interviewer checklist & outcome": [
        { question: "Salary, Commission structure & Pro-rata", answer: check1 },
        { question: "Working hours & training hours", answer: check2 },
        { question: "CV, bank details, Certified copy of ID, Matric", answer: check3 },
        { question: "If successful, training date confirmed?", answer: check4 },
        { question: "Outcome", answer: outcome }
      ],
      "Confirm": [
        { question: "Training Date", answer: date2.toString() },
        { question: "Do you give ABC permission to do: Reference, Criminal, ID and Qualifications check?", answer: confirm },
        { question: "Interviewer Sign", answer: yupData.interviewerSign },
        { question: "Candidate Sign", answer: yupData.candidateSign }
      ]
    };

    const data = {
      title: "ABC Assessment & Interview Schedule",
      type: 1,
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
          .then((docRef) => {
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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">ABC Assessment & Interview Schedule</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
        <div className='flex w-full'>
          <TextField
            label="Name & Surname"
            color='primary'
            variant="outlined"
            {...register('name')}
            className='w-full m-2'
            helperText={errors.name?.message}
            error={errors.name?.message ? true : false}
          />
          <TextField
            label="Contact Number"
            color='primary'
            variant="outlined"
            {...register('phone')}
            placeholder='+0 000 000 0000'
            className='w-full m-2'
            helperText={errors.phone?.message}
            error={errors.phone?.message ? true : false}
          />
        </div>

        <div className='flex w-full'>
          <TextField
            label="ID Number"
            color='primary'
            variant="outlined"
            {...register('id')}
            className='w-full m-2'
            helperText={errors.id?.message}
            error={errors.id?.message ? true : false}
          />
          <TextField
            label="Area applied for"
            color='primary'
            variant="outlined"
            {...register('area')}
            className='w-full m-2'
            helperText={errors.area?.message}
            error={errors.area?.message ? true : false}
          />
        </div>

        <div className='flex w-full'>
          <TextField
            label="Interviewer"
            color='primary'
            variant="outlined"
            {...register('interviewer')}
            className='w-full m-2'
            helperText={errors.interviewer?.message}
            error={errors.interviewer?.message ? true : false}
          />

          <div className='flex w-full m-2'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date1}
                onChange={date => setDate1(date)}
                className='w-full'
                views={['year', 'month', 'day']}
                disablePast
              />
            </LocalizationProvider>
          </div>
        </div>

        <br />

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Passed Matric / Grade 12?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            row
            value={qualify1}
            onChange={({ target: { value } }) => setQualify1(value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Do you have a criminal record?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={qualify2}
            onChange={({ target: { value } }) => setQualify2(value)}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Are you over the age of 22?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={qualify3}
            onChange={({ target: { value } }) => setQualify3(value)}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl className='mx-4 my-2'>
          <FormLabel id="matric">
            Are you a South Africa citizen?
          </FormLabel>
          <RadioGroup
            aria-labelledby="matric"
            value={qualify4}
            onChange={({ target: { value } }) => setQualify4(value)}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Where do you stay?"
          color='primary'
          variant="outlined"
          {...register('qualify5')}
          className='w-full my-2'
          helperText={errors.qualify5?.message}
          error={errors.qualify5?.message ? true : false}
        />

        <div className="my-8">
          <h1 className="font-bold text-lg underline">Interview Observations & Questions</h1>

          <div className='flex items-center w-full'>
            <div className='w-full'>
              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Confidence
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={observation1}
                  onChange={({ target: { value } }) => setObservation1(value)}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" />
                </RadioGroup>
              </FormControl>
              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Speaking
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={observation2}
                  onChange={({ target: { value } }) => setObservation2(value)}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Reading
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={observation3}
                  onChange={({ target: { value } }) => setObservation3(value)}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Listening
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={observation4}
                  onChange={({ target: { value } }) => setObservation4(value)}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Sales Ability
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={observation5}
                  onChange={({ target: { value } }) => setObservation5(value)}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Attitude
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={observation6}
                  onChange={({ target: { value } }) => setObservation6(value)}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" />
                </RadioGroup>
              </FormControl>

              <FormControl className='flex flex-row items-center m-2'>
                <FormLabel id="matric" className='w-24 mr-8'>
                  Overall
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={observation7}
                  onChange={({ target: { value } }) => setObservation7(value)}
                  row
                >
                  <FormControlLabel value="good" control={<Radio />} label="Good" />
                  <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                  <FormControlLabel value="poor" control={<Radio />} label="Poor" />
                </RadioGroup>
              </FormControl>
            </div>

            <TextField
              label="Comments"
              color='primary'
              variant="outlined"
              {...register('observationComment')}
              className='w-full m-2'
              placeholder="Type here..."
              helperText={errors.observationComment?.message}
              error={errors.observationComment?.message ? true : false}
              rows={10}
              multiline
            />
          </div>
        </div>

        <TextField
          label="Tell me about your previous work experience"
          color='primary'
          variant="outlined"
          {...register('observation8')}
          className='w-full my-4'
          placeholder="Type here..."
          helperText={errors.observation8?.message}
          error={errors.observation8?.message ? true : false}
          rows={3}
          multiline
        />

        <TextField
          label="What motivated you to apply for this position?"
          color='primary'
          variant="outlined"
          {...register('observation9')}
          className='w-full my-4'
          placeholder="Type here..."
          helperText={errors.observation8?.message}
          error={errors.observation8?.message ? true : false}
          rows={3}
          multiline
        />

        <TextField
          label="What do you understand about the position you've applied for?"
          color='primary'
          variant="outlined"
          {...register('observation10')}
          className='w-full my-4'
          placeholder="Type here..."
          helperText={errors.observation8?.message}
          error={errors.observation8?.message ? true : false}
          rows={3}
          multiline
        />

        <TextField
          label="What would you say are the  for this position?"
          color='primary'
          variant="outlined"
          {...register('observation11')}
          className='w-full my-4'
          placeholder="Type here..."
          helperText={errors.observation8?.message}
          error={errors.observation8?.message ? true : false}
          rows={3}
          multiline
        />

        <TextField
          label="General Questions"
          color='primary'
          variant="outlined"
          {...register('observation12')}
          className='w-full my-4'
          placeholder="Type here..."
          helperText={errors.observation8?.message}
          error={errors.observation8?.message ? true : false}
          rows={3}
          multiline
        />

        <div className='w-full my-8'>
          <h1 className="font-bold text-lg underline">Interview Checklist & Outcome</h1>

          <div className='flex w-full'>
            <div className='flex flex-col w-full'>
              <div className="flex justify-between items-center w-full">
                <p>Salary, Commission structure & Pro-rata</p>
                <Checkbox checked={check1} onChange={() => setCheck1(!check1)} />
              </div>
              <div className="flex justify-between items-center w-full">
                <p>Working hours & training hours</p>
                <Checkbox checked={check2} onChange={() => setCheck2(!check2)} />
              </div>
              <div className="flex justify-between items-center w-full">
                <p>CV, bank details, Certified copy of ID, Matric</p>
                <Checkbox checked={check3} onChange={() => setCheck3(!check3)} />
              </div>
              <div className="flex justify-between items-center w-full">
                <p>If successful, training date confirmed?</p>
                <Checkbox checked={check4} onChange={() => setCheck4(!check4)} />
              </div>
            </div>

            <div className='flex flex-col justify-center items-center w-2/3'>
              <h1 className="text-xl">Outcome</h1>

              <RadioGroup
                aria-labelledby="matric"
                value={outcome}
                onChange={({ target: { value } }) => setOutcome(value)}
                row
              >
                <FormControlLabel value="accept" control={<Radio />} label="Accept" />
                <FormControlLabel value="decline" control={<Radio />} label="Decline" />
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center">
          <Checkbox checked={confirm} onChange={() => setConfirm(!confirm)} />
          <p>Do you give ABC permission to do: Reference, Criminal, ID and Qualifications check?</p>
        </div>

        <div className="flex items-center w-full my-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className='w-full m-2'
              value={date2}
              onChange={date => setDate2(date)}
              views={['year', 'month', 'day']}
              disablePast
            />
          </LocalizationProvider>

          <TextField
            label="Interviewer Sign"
            color='primary'
            variant="outlined"
            {...register('interviewerSign')}
            className='w-full m-2'
            helperText={errors.name?.message}
            error={errors.name?.message ? true : false}
          />

          <TextField
            label="Candidate Sign"
            color='primary'
            variant="outlined"
            {...register('candidateSign')}
            className='w-full m-2'
            helperText={errors.name?.message}
            error={errors.name?.message ? true : false}
          />
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

export default Form1;