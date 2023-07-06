import {
  Container,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import form2ValidationSchema from '@/utils/validations/form2';
import { useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Typography } from '@mui/material';
import { STATUS_TEXT } from '@/utils/enums';
import Swal from 'sweetalert2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';
const Form2 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form2ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [date1, setDate1] = useState<any>(dayjs());

  const [section1_1, setSection1_1] = useState('R210.00');
  const [section1_2, setSection1_2] = useState('R133.00');
  const [section1_3, setSection1_3] = useState('R100.00');
  const [section1_4, setSection1_4] = useState('R125.85');
  const [section1_5, setSection1_5] = useState('R250.00');
  const [section1_6, setSection1_6] = useState('R83.25');
  const [section1_7, setSection1_7] = useState('R2880.00');
  const [section1_8, setSection1_8] = useState('R125 000.00');
  const [section1_9, setSection1_9] = useState('R250.00');
  const [section1_10, setSection1_10] = useState('R20 000.00');

  const [section2_1, setSection2_1] = useState('accredited');
  const [section2_2, setSection2_2] = useState('autorised');
  const [section2_3, setSection2_3] = useState('compatency');
  const [section2_4, setSection2_4] = useState('requirrements');
  const [section2_5, setSection2_5] = useState('comperisons');
  const [section2_6, setSection2_6] = useState('Yes');
  const [section2_7, setSection2_7] = useState('Yes');
  const [section2_8, setSection2_8] = useState('Yes');
  const [section2_9, setSection2_9] = useState('Yes');
  const [section2_10, setSection2_10] = useState('Yes');
  const [section2_11, setSection2_11] = useState('Yes');
  const [section2_12, setSection2_12] = useState('Yes');
  const [section2_13, setSection2_13] = useState('Yes');
  const [section2_14, setSection2_14] = useState('Yes');
  const [section2_15, setSection2_15] = useState('Yes');

  const [section3_1, setSection3_1] = useState('automobile');
  const [section3_2, setSection3_2] = useState('sympathetic');
  const [section3_3, setSection3_3] = useState('morald');
  const [section3_4, setSection3_4] = useState('instrument');
  const [section3_5, setSection3_5] = useState('selling');

  const selectData = {
    section1: [
      {
        question: "1. Mrs. X takes out a policy on April 23rd, 2017 and pays a monthly contribution of R150.00.  Her contribution increases by R20 on the 1st of August every year. What is her monthly contribution for September 2019?",
        answer: ["R210.00", "R190.00", "R170.00", "None of these options"],
        value: section1_1,
        method: ({target:{value}}: any) => setSection1_1(value)
      },
      {
        question: "2. Mrs. X takes out a policy on the 20th of February, 2017 and pays a monthly contribution of R100.00.  Her contribution increases by 10% of the original contribution amount in January every year. What will Mrs X&apos;s contribution be in September 2020?",
        answer: ["R133.00", "R140.00", "R130.00", "None of these options"],
        value: section1_2,
        method: ({target:{value}}: any) => setSection1_2(value)
      },
      {
        question: "3. Mr Y takes out a policy in March 2017 with a monthly contribution of R1000.00 His monthly contribution is reduced by 10% in January 2018. What will Mr Y&apos;s contribution be in April 2018?",
        answer: ["R100.00", "R1100.00", "R900.00", "None of these options"],
        value: section1_3,
        method: ({target:{value}}: any) => setSection1_3(value)
      },
      {
        question: "4. Miss Z takes out a life policy with a monthly contribution of R100.35.  She takes out additional accident cover with a monthly contribution of R15.50 and a funeral benefit of R10.00 monthly contribution. What is Miss Z's total contribution?",
        answer: ["R125.85", "R177.34", "R77.35", "None of these options"],
        value: section1_4,
        method: ({target:{value}}: any) => setSection1_4(value)
      },
      {
        question: "5. Mr A takes out a savings plan with a contribution of a R1000 per month.  He then indicates that he can't afford it and wants to reduce his contribution by 25% once off.  What will his new contribution be?",
        answer: ["R250.00", "R750.00", "R800.00", "None of these options"],
        value: section1_5,
        method: ({target:{value}}: any) => setSection1_5(value)
      },
      {
        question: "6. Ms X has a policy with a monthly contribution of R65.00.  She wants an additional funeral benefit with a monthly contribution of R18.25.  What is the total monthly contribution?",
        answer: ["R83.25", "R91.00", "R88.25", "None of these options"],
        value: section1_6,
        method: ({target:{value}}: any) => setSection1_6(value)
      },
      {
        question: "7. Ms L has a savings plan with a monthly contribution of R128 per month.  How much will she have saved on this plan over the course of 9months, assuming there is no contribution increase?",
        answer: ["R2880.00", "R1152.00", "R1158.00", "None of these options"],
        value: section1_7,
        method: ({target:{value}}: any) => setSection1_7(value)
      },
      {
        question: "8. Mr D buys a disability cover that pays out a maximum R100 000 if he is left completely disabled due to an accident. This policy however only pays 50% of the maximum benefit for the loss of one leg and 25% for an arm What is the rand value of the pay-out when he loses two legs and an arm in an accident?",
        answer: ["R125 000.00", "R750 000.00", "R100 000.00", "None of these options"],
        value: section1_8,
        method: ({target:{value}}: any) => setSection1_8(value)
      },
      {
        question: "9. If Miss Z has a policy with a monthly contribution of R1000.00.  She takes out a second policy with a monthly contribution equal to 25% of the first policy.  What is the Rand value of her monthly contribution on the second policy?",
        answer: ["R250.00", "R20.00", "R1250.00", "None of these options"],
        value: section1_9,
        method: ({target:{value}}: any) => setSection1_9(value)
      },
      {
        question: "10. Mr K takes out a funeral policy that covers himself and his wife for R10 000 each and his children for R5000 each. His wife and two children die in a freak accident. How much will Mr K claim on his policy?",
        answer: ["R20 000.00", "R22 000.00", "R30 000.00", "None of these options"],
        value: section1_10,
        method: ({target:{value}}: any) => setSection1_10(value)
      },
    ],
    section2: {
      first: [
        {
          question: "QUESTION 1",
          answer: ["accredited", "acredited", "accredeted", "accrited", "acredited"],
          value: section2_1,
          method: ({target:{value}}: any) => setSection2_1(value)
        },
        {
          question: "QUESTION 2",
          answer: ["autorised", "authorised", "athorised", "authorized", "ahtorised"],
          value: section2_2,
          method: ({target:{value}}: any) => setSection2_2(value)
        },
        {
          question: "QUESTION 3",
          answer: ["compatency", "competency", "compitency", "comppetancy", "comipitncy"],
          value: section2_3,
          method: ({target:{value}}: any) => setSection2_3(value)
        },
        {
          question: "QUESTION 4",
          answer: ["requirrements", "requirent", "requiriments", "requreiments", "requirements"],
          value: section2_4,
          method: ({target:{value}}: any) => setSection2_4(value)
        },
        {
          question: "QUESTION 5",
          answer: ["comperisons", "comparissons", "comperissons", "comparisons", "comparrisons"],
          value: section2_5,
          method: ({target:{value}}: any) => setSection2_5(value)
        },
      ],
      second: [
        {
          question: "QUESTION 6 - Verificasion",
          answer: ["Yes", "No"],
          value: section2_6,
          method: ({target:{value}}: any) => setSection2_6(value),
          input: {...register('correct1')}
        },
        {
          question: "QUESTION 7 - Programe",
          answer: ["Yes", "No"],
          value: section2_7,
          method: ({target:{value}}: any) => setSection2_7(value),
          input: {...register('correct2')}
        },
        {
          question: "QUESTION 8 - Financial",
          answer: ["Yes", "No"],
          value: section2_8,
          method: ({target:{value}}: any) => setSection2_8(value),
          input: {...register('correct3')}
        },
        {
          question: "QUESTION 9 - Complience",
          answer: ["Yes", "No"],
          value: section2_9,
          method: ({target:{value}}: any) => setSection2_9(value),
          input: {...register('correct4')}
        },
        {
          question: "QUESTION 10 - Interacction",
          answer: ["Yes", "No"],
          value: section2_10,
          method: ({target:{value}}: any) => setSection2_10(value),
          input: {...register('correct5')}
        },
        {
          question: "QUESTION 11 - Objective",
          answer: ["Yes", "No"],
          value: section2_11,
          method: ({target:{value}}: any) => setSection2_11(value),
          input: {...register('correct6')}
        },
        {
          question: "QUESTION 12 - Recomendation",
          answer: ["Yes", "No"],
          value: section2_12,
          method: ({target:{value}}: any) => setSection2_12(value),
          input: {...register('correct7')}
        },
        {
          question: "QUESTION 13 - Successfully ",
          answer: ["Yes", "No"],
          value: section2_13,
          method: ({target:{value}}: any) => setSection2_13(value),
          input: {...register('correct8')}
        },
        {
          question: "QUESTION 14 - Representative",
          answer: ["Yes", "No"],
          value: section2_14,
          method: ({target:{value}}: any) => setSection2_14(value),
          input: {...register('correct9')}
        },
        {
          question: "QUESTION 15 - Immediately",
          answer: ["Yes", "No"],
          value: section2_15,
          method: ({target:{value}}: any) => setSection2_15(value),
          input: {...register('correct10')}
        },
      ]
    },
    section3: [
      {
        question: "QUESTION 1 - Drive is to car, as fly is to",
        answer: ["automobile", "bird", "eagle", "plane", "truck"],
        value: section3_1,
        method: ({target:{value}}: any) => setSection3_1(value)
      },
      {
        question: "QUESTION 2 - Creative is the same as",
        answer: ["sympathetic", "Heart-warming", "sentimental", "artistic", "unemotional"],
        value: section3_2,
        method: ({target:{value}}: any) => setSection3_2(value)
      },
      {
        question: "QUESTION 3 - Ethical is the same as",
        answer: ["moral", "Free-spirited", "humorous", "immoral", "determined"],
        value: section3_3,
        method: ({target:{value}}: any) => setSection3_3(value)
      },
      {
        question: "QUESTION 4 - Paintbrush is to artistic, as violin is to",
        answer: ["instrument", "comedy", "theatre", "musical", "songs"],
        value: section3_4,
        method: ({target:{value}}: any) => setSection3_4(value)
      },
      {
        question: "QUESTION 5 - Which word is the odd one out?",
        answer: ["selling", "promoting", "servicing", "marketing", "advertising"],
        value: section3_5,
        method: ({target:{value}}: any) => setSection3_5(value)
      },
    ]
  }

  const onSubmit = (yupData: any) => {
    const application = {
      "Section 1": [
        {
          question: "1. Mrs. X takes out a policy on April 23rd, 2017 and pays a monthly contribution of R150.00. Her contribution increases by R20 on the 1st of August every year. What is her monthly contribution for September 2019?",
          answer: section1_1
        },
        {
          question: "2. Mrs. X takes out a policy on the 20th of February, 2017 and pays a monthly contribution of R100.00. Her contribution increases by 10% of the original contribution amount in January every year. What will Mrs X&apos;s contribution be in September 2020?",
          answer: section1_2
        },
        {
          question: "3. Mr Y takes out a policy in March 2017 with a monthly contribution of R1000.00 His monthly contribution is reduced by 10% in January 2018. What will Mr Y&apos;s contribution be in April 2018?",
          answer: section1_3
        },
        {
          question: "4. Miss Z takes out a life policy with a monthly contribution of R100.35. She takes out additional accident cover with a monthly contribution of R15.50 and a funeral benefit of R10.00 monthly contribution. What is Miss Z's total contribution?",
          answer: section1_4
        },
        {
          question: "5. Mr A takes out a savings plan with a contribution of a R1000 per month. He then indicates that he can't afford it and wants to reduce his contribution by 25% once off. What will his new contribution be?",
          answer: section1_5
        },
        {
          question: "6. Ms X has a policy with a monthly contribution of R65.00. She wants an additional funeral benefit with a monthly contribution of R18.25. What is the total monthly contribution?",
          answer: section1_6
        },
        {
          question: "7. Ms L has a savings plan with a monthly contribution of R128 per month. How much will she have saved on this plan over the course of 9months, assuming there is no contribution increase?",
          answer: section1_7
        },
        {
          question: "8. Mr D buys a disability cover that pays out a maximum R100 000 if he is left completely disabled due to an accident. This policy however only pays 50% of the maximum benefit for the loss of one leg and 25% for an arm What is the rand value of the pay-out when he loses two legs and an arm in an accident?",
          answer: section1_8
        },
        {
          question: "9. If Miss Z has a policy with a monthly contribution of R1000.00. She takes out a second policy with a monthly contribution equal to 25% of the first policy. What is the Rand value of her monthly contribution on the second policy?",
          answer: section1_9
        },
        {
          question: "10. Mr K takes out a funeral policy that covers himself and his wife for R10 000 each and his children for R5000 each. His wife and two children die in a freak accident. How much will Mr K claim on his policy?",
          answer: section1_10
        },
      ],
      "Section 2-1": [
        { question: "Question 1", answer: section2_1 },
        { question: "Question 2", answer: section2_2 },
        { question: "Question 3", answer: section2_3 },
        { question: "Question 4", answer: section2_4 },
        { question: "Question 5", answer: section2_5 }
      ],
      "Section 2-2": [
        { question: "Question 6 - Verificasion", answer: section2_6 },
        { question: "Question 7 - Programe", answer: section2_7 },
        { question: "Question 8 - Financial", answer: section2_8 },
        { question: "Question 9 - Complience", answer: section2_9 },
        { question: "Question 10 - Interacction", answer: section2_10 },
        { question: "Question 11 - Objective", answer: section2_11 },
        { question: "Question 12 - Recomendation", answer: section2_12 },
        { question: "Question 13 - Successfully", answer: section2_13 },
        { question: "Question 14 - Representative", answer: section2_14 },
        { question: "Question 15 - Immediately", answer: section2_15 }
      ],
      "Section 3": [
        { question: "Question 1 - Drive is to car, as fly is to", answer: section3_1 },
        { question: "Question 2 - Creative is the same as", answer: section3_2 },
        { question: "Question 3 - Ethical is the same as", answer: section3_3 },
        { question: "Question 4 - Paintbrush is to artistic, as violin is to", answer: section3_4 },
        { question: "Question 5 - Which word is the odd one out?", answer: section3_5 },
      ]
    };

    const data = {
      title: "ABC Selection Assessment",
      type: 2,
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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">ABC Selection Assessment</h1>

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

        <div className='m-2'>
          <h1 className='font-semibold text-lg'>SECTION 1 - Choose the correct answer by marking the correct block with an X</h1>

          {
            selectData.section1.map((item: any, index: number) => (
              <FormControl key={index} className='mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='flex w-full justify-between px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} />
                  <FormControlLabel value={item.answer[2]} control={<Radio />} label={item.answer[2]} />
                  <FormControlLabel value={item.answer[3]} control={<Radio />} label={item.answer[3]} />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <div className='mx-2 my-16'>
          <h1 className='font-semibold text-lg'>
            SECTION 2.1 - Choose the word that is spelt correctly by marking the correct block with an X.
          </h1>

          {
            selectData.section2.first.map((item: any, index: number) => (
              <FormControl key={index} className='mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='flex w-full justify-between px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} />
                  <FormControlLabel value={item.answer[2]} control={<Radio />} label={item.answer[2]} />
                  <FormControlLabel value={item.answer[3]} control={<Radio />} label={item.answer[3]} />
                  <FormControlLabel value={item.answer[4]} control={<Radio />} label={item.answer[4]} />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <div className='mx-2 my-8'>
          <h1 className='font-semibold text-lg'>
            SECTION 2.2 - Indicate if the word is spelt correctly (Yes) or if the word is spelt incorrectly (No). If the word is spelt incorrectly write the correct spelling next to it.
          </h1>

          {
            selectData.section2.second.map((item: any, index: number) => (
              <FormControl key={index} className='mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='w-full px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} />
                  <TextField
                    label="If not, correct spelling"
                    color='primary'
                    variant='outlined'
                    {...item.input}
                  />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <div className='mx-2 my-8'>
          <h1 className='font-semibold text-lg text-left'>
            SECTION 3 - Choose the word that has the correct association by marking the correct box with an X.
          </h1>

          {
            selectData.section3.map((item: any, index: number) => (
              <FormControl key={index} className='w-full mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='w-full px-8'
                  row
                >
                  <FormControlLabel value={item.answer[0]} control={<Radio />} label={item.answer[0]} />
                  <FormControlLabel value={item.answer[1]} control={<Radio />} label={item.answer[1]} />
                  <FormControlLabel value={item.answer[2]} control={<Radio />} label={item.answer[2]} />
                  <FormControlLabel value={item.answer[3]} control={<Radio />} label={item.answer[3]} />
                  <FormControlLabel value={item.answer[4]} control={<Radio />} label={item.answer[4]} />
                </RadioGroup>
              </FormControl>
            ))
          }
        </div>

        <TextField
          label="Assessor Sign"
          color='primary'
          variant="outlined"
          {...register('sign')}
          className='w-full'
          helperText={errors.sign?.message}
          error={errors.sign?.message ? true : false}
        />

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

export default Form2;