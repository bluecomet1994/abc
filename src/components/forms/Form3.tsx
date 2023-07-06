import {
  Container,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import form3ValidationSchema from '@/utils/validations/form3';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { STATUS_TEXT } from '@/utils/enums';
import Swal from 'sweetalert2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';

const Form3 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form3ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [date1, setDate1] = useState<any>(dayjs());
  const [select1, setSelect1] = useState("The Reserve Bank");
  const [select2, setSelect2] = useState("Compliance Officer; Key Individual, FAIS Ombud");
  const [select3, setSelect3] = useState("Clients can dispute policies at the bank; Clients must cancel in the 30-day cooling off period");
  const [select4, setSelect4] = useState("When he/she needs to obtain more experience on the products he/she is selling");
  const [select5, setSelect5] = useState("Employment + Matric = Fit & Proper");
  const [select6, setSelect6] = useState("When the Representatives don't meet their targets");
  const [select7, setSelect7] = useState("to combat money laundering activities and the financing of terrorist and related activities. It is aimed at identifying suspicious transactions");

  const qaData = {
    circle: [
      {
        question: "1. Who is the market conduct Regulator of Financial Institutions? (1)",
        answer: [
          "The Reserve Bank",
          "The Financial Sector Conduct Authority",
          "The Compliance Officer",
          "The Financial Intelligence Centre"
        ],
        value: select1,
        method: ({target:{value}}: any) => setSelect1(value)
      },
      {
        question: "2. Three other Key Role-players in the Financial Sector are (1)",
        answer: [
          "Compliance Officer; Key Individual, FAIS Ombud",
          "Key Individual; Clients; QA Team",
          "Telecommunications; VeriCredit; DebiCheck",
          "FSCA; FIC; Regional Manager"
        ],
        value: select2,
        method: ({target:{value}}: any) => setSelect2(value)
      },
      {
        question: "3. Two principles of Treating Customers Fairly are (1)",
        answer: [
          "Clients can dispute policies at the bank; Clients must cancel in the 30-day cooling off period",
          "Fair treatment of customers is central to the culture of FSP; Disclosures must be clear & customers must understand the disclosures",
          "Clients must take the policy and the Rewards program; FSP's must send the policy documents to clients withing 60 days of the sale",
          "Clients can complain to Clientèle; Financial services providers must be online all the time"
        ],
        value: select3,
        method: ({target:{value}}: any) => setSelect3(value)
      },
      {
        question: "4. When does a representative need to work under FAIS supervision? (1)",
        answer: [
          "When he/she needs to obtain more experience on the products he/she is selling",
          "When the representative provides advice to clients",
          "When the representative does not make his/her performance targets",
          "When the representative does not have matric"
        ],
        value: select4,
        method: ({target:{value}}: any) => setSelect4(value)
      },
      {
        question: "5. Please select the correct statement (1)",
        answer: [
          "Employment + Matric = Fit & Proper",
          "Matric + Experience = Fit & Proper",
          "Being a nice person + Honesty & Integrity = Fit & Proper",
          "Honesty & Integrity + Competence = Fit & Proper"
        ],
        value: select5,
        method: ({target:{value}}: any) => setSelect5(value)
      },
      {
        question: "6. Debarment of Representatives is (1)",
        answer: [
          "When the Representatives don't meet their targets",
          "When the Representatives abscond from work",
          "When the Representative or Key Individual no longer meets the Fit and Proper criteria",
          "When the Representatives and Key Individuals pose a financial risk"
        ],
        value: select6,
        method: ({target:{value}}: any) => setSelect6(value)
      },
      {
        question: "7. What is the purpose of FICA? (1)",
        answer: [
          "to combat money laundering activities and the financing of terrorist and related activities. It is aimed at identifying suspicious transactions",
          "To stop criminals from gaining access to the FSCA computer systems",
          "To regulate the way Financial institutions administer claims",
          "To assist clients with complaints and disputes in the Financial Services Industry"
        ],
        value: select7,
        method: ({target:{value}}: any) => setSelect7(value)
      },
    ],
    qa: [
      {
        question: "8. In your role and conduct as a Representative you will be required to do certain things and behave in a certain manner when dealing with clients. Name three things you must always do as a representative. (3)",
        method: {...register('qa1')}
      },
      {
        question: "9. What does FAIS stand for? (1)",
        method: {...register('qa2')}
      },
      {
        question: "10. In your own words explain what it means to work under supervision (2)",
        method: {...register('qa3')}
      },
      {
        question: "11. In your own words explain Intermediary Scripted Services. (2)",
        method: {...register('qa4')}
      },
      {
        question: "12. What are the consequences if you commit fraud? (3)",
        method: {...register('qa5')}
      },
      {
        question: "13. If you were a client, how would you want to be treated by a person selling you an insurance policy? (2)",
        method: {...register('qa6')}
      }
    ]
  }

  const onSubmit = (yupData: any) => {
    const application = {
      "User Info": [
        {question:"Learners Name", answer: yupData.name},
        {question:"Learners ID", answer: yupData.id},
        {question:"Area", answer: yupData.area},
        {question:"Trainer", answer: yupData.trainer},
        {question:"Date", answer: date1.toString()}
      ],
      "Circle the answer": [
        {question: "1. Who is the market conduct Regulator of Financial Institutions?", answer: select1},
        {question: "2. Three other Key Role-players in the Financial Sector are", answer: select2},
        {question: "3. Two principles of Treating Customers Fairly are", answer: select3},
        {question: "4. When does a representative need to work under FAIS supervision?", answer: select4},
        {question: "5. Please select the correct statement", answer: select5},
        {question: "6. Debarment of Representatives is", answer: select6},
        {question: "7. What is the purpose of FICA?", answer: select7},
      ],
      "Answer the questions": [
        {
          question: "8. In your role and conduct as a Representative you will be required to do certain things and behave in a certain manner when dealing with clients. Name three things you must always do as a representative.",
          answer: yupData.qa1
        },
        {
          question: "9. What does FAIS stand for?",
          answer: yupData.qa2
        },
        {
          question: "10. In your own words explain what it means to work under supervision",
          answer: yupData.qa3
        },
        {
          question: "11. In your own words explain Intermediary Scripted Services.",
         answer: yupData.qa4
        },
        {
          question: "12. What are the consequences if you commit fraud?",
          answer: yupData.qa5
        },
        {
          question: "13. If you were a client, how would you want to be treated by a person selling you an insurance policy?",
          answer: yupData.qa6
        }
      ]
    }

    const data = {
      title: "Financial Services Assessment",
      type: 3,
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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Financial Services Assessment</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
      <div className='flex w-full'>
          <TextField
            label="Learners Name"
            color='primary'
            variant="outlined"
            {...register('name')}
            className='w-full m-2'
            helperText={errors.name?.message}
            error={errors.name?.message ? true : false}
          />
          <TextField
            label="Learners ID"
            color='primary'
            variant="outlined"
            {...register('id')}
            className='w-full m-2'
            helperText={errors.id?.message}
            error={errors.id?.message ? true : false}
          />
        </div>

        <div className='flex w-full'>
          <TextField
            label="Area"
            color='primary'
            variant="outlined"
            {...register('area')}
            className='w-full m-2'
            helperText={errors.area?.message}
            error={errors.area?.message ? true : false}
          />

          <TextField
            label="Area"
            color='primary'
            variant="outlined"
            {...register('trainer')}
            className='w-full m-2'
            helperText={errors.trainer?.message}
            error={errors.trainer?.message ? true : false}
          />
        </div>

        <div className='flex w-1/2 p-2'>
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

        <br />

        <div className='w-full font-semibold px-2 py-8'>
          <h1>Circle the correct answer(s).</h1>

          {
            qaData.circle.map((item: any, index: number) => (
              <FormControl key={index} className='w-full mx-4 my-4'>
                <FormLabel id="matric">
                  {item.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="matric"
                  value={item.value}
                  onChange={item.method}
                  className='flex w-full justify-between px-8'
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

        <div className='w-full font-semibold px-2 py-8'>
          <h1>Answer the questions.</h1>

          {
            qaData.qa.map((item: any, index: number) => (
              <TextField
                key={index}
                label={item.question}
                {...item.method}
                color='primary'
                variant='outlined'
                className='w-full my-4'
                rows={5}
                multiline
              />
            ))
          }
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

export default Form3;