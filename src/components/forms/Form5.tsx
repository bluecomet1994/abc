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
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { STATUS_TEXT } from '@/utils/enums';
import Swal from 'sweetalert2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';
import form5ValidationSchema from '@/utils/validations/form5';

const Form5 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form5ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [date1, setDate1] = useState<any>(dayjs());
  const [select1, setSelect1] = useState("16 to 51");
  const [select2, setSelect2] = useState("Member & Family with Extended family (max 10 extended members)");

  const qaData = {
    circle: [
      {
        question: "2. What are the entry ages for someone who would like to join this cover? (1 mark)",
        answer: [
          "16 to 51",
          "18 to 65",
          "18 to 71",
          "18 Years and older"
        ],
        value: select1,
        method: ({ target: { value } }: any) => setSelect1(value)
      },
      {
        question: "3. What is the waiting period on legal matters to be covered on the Legal plans? (1 mark)",
        answer: [
          "Member & Family with Extended family (max 10 extended members)",
          "Member & Family with Extended family (max 8 extended members)",
          "Member & Extended Family (max 8 extended members)",
          "Member & Family (max 3 children)",
          "Member & Spouse",
          "Member only"
        ],
        value: select2,
        method: ({ target: { value } }: any) => setSelect2(value)
      }
    ],
    qa: [
      {
        question: "4. Name the three types of matters the Legal Plan cover you for. (3 marks)",
        method: { ...register('qa1') }
      },
      {
        question: "5. Explain the waiting period in your own words? (1 marks)",
        method: { ...register('qa2') }
      },
      {
        question: "6. What is the waiting period for the Bail benefit? (1 mark)",
        method: { ...register('qa3') }
      },
      {
        question: "7. Explain the Retrenchment Benefit? (1 mark)",
        method: { ...register('qa4') }
      },
      {
        question: "8. If a customer has a pre-existing case/matter what would Clientèle do to assist the customer? (2 marks)",
        method: { ...register('qa5') }
      },
      {
        question: "9. Name three exclusions or matters where the customer will not be covered. (3 marks)",
        method: { ...register('qa6') }
      },
      {
        question: "10. If a customer gives you a scenario of a matter or case and needs you to confirm that Clientèle will cover such matter, how will you respond? (1 marks)",
        method: { ...register('qa7') }
      },
      {
        question: "11. Explain what is Prospects of success? (1 marks)",
        method: { ...register('qa8') }
      },
      {
        question: "12. Mr Vee says he is an independent renovations company and there are some people who hired him and have not paid him for work he has done. He wants to know if Clientele Legal can cover him to recover the money owed to him? (2 marks)",
        method: { ...register('qa9') }
      },
      {
        question: "13. Mr Nzo and Mrs Nzo decide to get a divorce because they can't live with each other anymore. They want to know if Clientele Legal will cover them for a divorce. (2 marks)",
        method: { ...register('qa10') }
      },
      {
        question: "14. Mrs Mzizi wants to buy a house and should this house in the future have problems with the structure that the seller didn't tell her about, would Clientele Legal cover her. (2 marks)",
        method: { ...register('qa11') }
      },
      {
        question: "15. Chris buys a PlayStation from James for R3 500.00. He says that the James has not delivered the PlayStation and 4 months have passed. He wants to know if Clientele Legal will help him sue the seller. (2 marks)",
        method: { ...register('qa12') }
      }
    ]
  }

  const onSubmit = (yupData: any) => {
    const application = {
      "User Info": [
        { question: "Learners Name", answer: yupData.name },
        { question: "Learners ID", answer: yupData.id },
        { question: "Area", answer: yupData.area },
        { question: "Trainer", answer: yupData.trainer },
        { question: "Date", answer: date1.format('MM/DD/YYYY') }
      ],
      "Circle the answer": [
        {question: "2. What are the entry ages for someone who would like to join this cover? (1 mark)", answer: select1},
        {question: "3. What is the waiting period on legal matters to be covered on the Legal plans? (1 mark)", answer: select2}
      ],
      "Answer the questions": [
        {question: "4. Name the three types of matters the Legal Plan cover you for. (3 marks)", answer: yupData.qa1},
        {question: "5. Explain the waiting period in your own words? (1 marks)", answer: yupData.qa2},
        {question: "6. What is the waiting period for the Bail benefit? (1 mark)", answer: yupData.qa3},
        {question: "7. Explain the Retrenchment Benefit? (1 mark)", answer: yupData.qa4},
        {question: "8. If a customer has a pre-existing case/matter what would Clientèle do to assist the customer? (2 marks)", answer: yupData.qa5},
        {question: "9. Name three exclusions or matters where the customer will not be covered. (3 marks)", answer: yupData.qa6},
        {question: "10. If a customer gives you a scenario of a matter or case and needs you to confirm that Clientèle will cover such matter, how will you respond? (1 marks)", answer: yupData.qa7},
        {question: "11. Explain what is Prospects of success? (1 marks)", answer: yupData.qa8},
        {question: "12. Mr Vee says he is an independent renovations company and there are some people who hired him and have not paid him for work he has done. He wants to know if Clientele Legal can cover him to recover the money owed to him? (2 marks)", answer: yupData.qa9},
        {question: "13. Mr Nzo and Mrs Nzo decide to get a divorce because they can't live with each other anymore. They want to know if Clientele Legal will cover them for a divorce. (2 marks)", answer: yupData.qa10},
        {question: "14. Mrs Mzizi wants to buy a house and should this house in the future have problems with the structure that the seller didn't tell her about, would Clientele Legal cover her. (2 marks)", answer: yupData.qa11},
        {question: "15. Chris buys a PlayStation from James for R3 500.00. He says that the James has not delivered the PlayStation and 4 months have passed. He wants to know if Clientele Legal will help him sue the seller. (2 marks)", answer: yupData.qa12}
      ]
    }

    const data = {
      title: "Clientèle Legal Plans Assessment",
      type: 5,
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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Clientèle Legal Plans Assessment</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
        <div className='flex flex-col md:flex-row w-full'>
          <TextField
            label="Learners Name"
            color='primary'
            variant="outlined"
            {...register('name')}
            className='w-full my-1 md:m-2'
            helperText={errors.name?.message}
            error={errors.name?.message ? true : false}
          />
          <TextField
            label="Learners ID"
            color='primary'
            variant="outlined"
            {...register('id')}
            className='w-full my-1 md:m-2'
            helperText={errors.id?.message}
            error={errors.id?.message ? true : false}
          />
        </div>

        <div className='flex flex-col md:flex-row w-full'>
          <TextField
            label="Area"
            color='primary'
            variant="outlined"
            {...register('area')}
            className='w-full my-1 md:m-2'
            helperText={errors.area?.message}
            error={errors.area?.message ? true : false}
          />

          <TextField
            label="Trainer"
            color='primary'
            variant="outlined"
            {...register('trainer')}
            className='w-full my-1 md:m-2'
            helperText={errors.trainer?.message}
            error={errors.trainer?.message ? true : false}
          />
        </div>

        <div className='flex w-full my-1 md:w-1/2 md:p-2'>
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

        <div className='w-full my-8'>
          <h1>1. Please complete the table below (7 marks)</h1>

          <table className="w-full">
            <tbody>
              <tr className="font-bold">
                <td></td>
                <td>STANDARD LEGAL NAME</td>
                <td>CLASSIC LEGAL NAME</td>
              </tr>

              <tr>
                <td>PREMIUM</td>
                <td>8200 per month</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    {...register('table1')}
                  />
                </td>
              </tr>

              <tr>
                <td>WHO IS COVERED?</td>
                <td>Main member only</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    {...register('table2')}
                  />
                </td>
              </tr>

              <tr>
                <td>LIFETIME COVER</td>
                <td>R200 000 per year</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    {...register('table3')}
                  />
                </td>
              </tr>

              <tr>
                <td>EXCESS</td>
                <td>3 X Premium</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    {...register('table4')}
                  />
                </td>
              </tr>

              <tr>
                <td>ACCIDENTAL DEATH</td>
                <td>Not applicable on Standard Legal</td>
                <td>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    {...register('table5')}
                  />
                </td>
              </tr>

              <tr>
                <td>ADDITIONAL MEMBERS</td>
                <td colSpan={2}>
                  <TextField
                    color="primary"
                    variant="standard"
                    className="w-full"
                    {...register('table6')}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='w-full font-semibold px-2 py-4'>
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

        <div className='w-full font-semibold px-2 py-4'>
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

export default Form5;