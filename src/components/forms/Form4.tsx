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
import form4ValidationSchema from '@/utils/validations/form4';

const Form4 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form4ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [date1, setDate1] = useState<any>(dayjs());
  const [select1, setSelect1] = useState("True");
  const [select2, setSelect2] = useState("Member & Family with Extended family (max 10 extended members)");
  const [select3, setSelect3] = useState("True");
  const [select4, setSelect4] = useState("Receipt of the first premium");
  const [select5, setSelect5] = useState("True");
  const [select6, setSelect6] = useState("Month 0-6 = no cover; month 7onward = 100% of the cover");
  const [select7, setSelect7] = useState("There will be no waiting period applicable");
  const [select8, setSelect8] = useState("18 - 81 (Current Age)");
  const [select9, setSelect9] = useState("0 - 81 (Current Age)");
  const [select10, setSelect10] = useState("Pre - Existing medical conditions & 24 months suicide");
  const [select11, setSelect11] = useState("During underwriting");
  const [select12, setSelect12] = useState("Inclusive of the cover amount");
  const [select13, setSelect13] = useState("The benefit can only be paid by a voucher");
  const [select14, setSelect14] = useState("R1 000");
  const [select15, setSelect15] = useState("Airtime will be transferred to pre-paid cell phones only");
  const [select16, setSelect16] = useState("10%");
  const [select17, setSelect17] = useState("24 Hour Funeral Assist helpline");

  const qaData = {
    circle: [
      {
        question: "1. The Clientele Funeral Plans can provide cover for non-South African citizens (1)",
        answer: [
          "True",
          "False"
        ],
        value: select1,
        method: ({target:{value}}: any) => setSelect1(value)
      },
      {
        question: "2. What plan types are available on the Clientèle Funeral Plans? (4)",
        answer: [
          "Member & Family with Extended family (max 10 extended members)",
          "Member & Family with Extended family (max 8 extended members)",
          "Member & Extended Family (max 8 extended members)",
          "Member & Family (max 3 children)",
          "Member & Spouse",
          "Member only"
        ],
        value: select2,
        method: ({target:{value}}: any) => setSelect2(value)
      },
      {
        question: "3. Premiums on the Clientèle Funeral Plans will increase by 10% and the Death benefit amount by 6%? (1)",
        answer: [
          "True",
          "False"
        ],
        value: select3,
        method: ({target:{value}}: any) => setSelect3(value)
      },
      {
        question: "4. Death due to an accident is covered from… (1)",
        answer: [
          "Receipt of the first premium",
          "Once the customer signs the application form",
          "Once the customer receives a welcome SMS from Clientèle",
          "Once the customer leaves the kiosk"
        ],
        value: select4,
        method: ({target:{value}}: any) => setSelect4(value)
      },
      {
        question: "5. There is a Premium Payback Benefit on the Clientèle Funeral Dignity Plan? (1)",
        answer: [
          "True",
          "False"
        ],
        value: select5,
        method: ({target:{value}}: any) => setSelect5(value)
      },
      {
        question: "6. Death due to natural causes for the main member, spouse and children are covered as follows (1)",
        answer: [
          "Month 0-6 = no cover; month 7onward = 100% of the cover",
          "There is a full 12-month waiting period",
          "There is no waiting period for death due to natural causes",
          "Pre-existing conditions are excluded"
        ],
        value: select6,
        method: ({target:{value}}: any) => setSelect6(value)
      },
      {
        question: "7. Should a customer increase the cover level at a later stage, then (1)",
        answer: [
          "There will be no waiting period applicable",
          "There will be a new waiting period for the full cover (existing plus increased portion)",
          "There will be a waiting period for the increased portion only",
          "The policy will lapse"
        ],
        value: select7,
        method: ({target:{value}}: any) => setSelect7(value)
      },
      {
        question: "8. On the Clientèle Funeral Plan, what is the entry age for the Main Insured Life? (1)",
        answer: [
          "18 - 81 (Current Age)",
          "18 - 80 (Current Age)",
          "18 - 71 (Current Age)",
          "18 - 70 (Current Age)"
        ],
        value: select8,
        method: ({target:{value}}: any) => setSelect8(value)
      },
      {
        question: "9. On the Clientèle Funeral Plan, what is the entry age for the Extended Family Members? (1)",
        answer: [
          "0 - 81 (Current Age)",
          "0 - 80 (Current Age)",
          "0 - 71 (Current Age)",
          "0 - 70 (Current Age)"
        ],
        value: select9,
        method: ({target:{value}}: any) => setSelect9(value)
      },
      {
        question: "10. What is the exclusion on the Clientèle Funeral Dignity Plan? (1)",
        answer: [
          "Pre - Existing medical conditions & 24 months suicide",
          "Violent criminal matter",
          "24 months suicide",
          "Pre-Existing medical conditions"
        ],
        value: select10,
        method: ({target:{value}}: any) => setSelect10(value)
      },
      {
        question: "11. Under which of the following events can the Clientèle Funeral Dignity Plan be terminated? (3)",
        answer: [
          "During underwriting",
          "Death of both adults",
          "If we did not receive the DOC",
          "Cancellation due to the policy terms and conditions",
          "Notice provided by the policyholder"
        ],
        value: select11,
        method: ({target:{value}}: any) => setSelect11(value)
      },
      {
        question: "12. The Grocery, Unveiling and Transport benefits are… (1)",
        answer: [
          "Inclusive of the cover amount",
          "Paid over and above the cover amount"
        ],
        value: select12,
        method: ({target:{value}}: any) => setSelect12(value)
      },
      {
        question: "13. Select the 2 correct options applicable for the Grocery Benefit: (2)",
        answer: [
          "The benefit can only be paid by a voucher",
          "The benefit can be paid either by cash or vouchers",
          "The beneficiary will receive R2 000 of this benefit as a once off or R1000 per month for 2 months",
          "The beneficiary will receive R3 000 of this benefit as a once off or R1000 per month for 3 months"
        ],
        value: select13,
        method: ({target:{value}}: any) => setSelect13(value)
      },
      {
        question: "14. What is the cash amount for the Unveiling benefit? (1)",
        answer: [
          "R1 000",
          "R2 000",
          "R3 000",
          "R4 000"
        ],
        value: select14,
        method: ({target:{value}}: any) => setSelect14(value)
      },
      {
        question: "15. On the Clientèle Funeral Plan, how will the nominated beneficiary receive the Airtime Benefit amount? (1)",
        answer: [
          "Airtime will be transferred to pre-paid cell phones only",
          "Airtime will be transferred to contract cell phones only",
          "Airtime will be transferred to pre-paid or contract cell phones",
          "Only Vodacom networks"
        ],
        value: select15,
        method: ({target:{value}}: any) => setSelect15(value)
      },
      {
        question: "16. What is annual increase applicable to the airtime benefit on the Ultimate Dignity Plan? (1)",
        answer: [
          "10%",
          "6%",
          "20%",
          "11%"
        ],
        value: select16,
        method: ({target:{value}}: any) => setSelect16(value)
      },
      {
        question: "17. Name 3 EASA benefits on the funeral plan (3)",
        answer: [
          "24 Hour Funeral Assist helpline",
          "Repatriation of mortal remains",
          "Free bus service to graveyard",
          "Funeral concierge services",
          "EASA Discounted partners",
          "R10 000 road accident cover"
        ],
        value: select17,
        method: ({target:{value}}: any) => setSelect17(value)
      },
    ],
    qa: [
      {
        question: "18. In your own words explain the premium payback benefit (in full) on the Ultimate Funeral Plan. (2)",
        method: {...register('qa1')}
      },
      {
        question: "19. In your own word explain the rules for covering children under the Funeral Policy. Include the age brackets and maximum cover amounts per age bracket (2)",
        method: {...register('qa2')}
      },
      {
        question: "20. In your own words, explain the consequences if you submit fraudulent sales. (1)",
        method: {...register('qa3')}
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
        {question:"Date", answer: date1.format('MM/DD/YYYY')}
      ],
      "Circle the answer": [
        {question: "1. The Clientele Funeral Plans can provide cover for non-South African citizens",answer: select1},
        {question: "2. What plan types are available on the Clientèle Funeral Plans?",answer: select2},
        {question: "3. Premiums on the Clientèle Funeral Plans will increase by 10% and the Death benefit amount by 6%?",answer: select3},
        {question: "4. Death due to an accident is covered from…",answer: select4},
        {question: "5. There is a Premium Payback Benefit on the Clientèle Funeral Dignity Plan?",answer: select5},
        {question: "6. Death due to natural causes for the main member, spouse and children are covered as follows",answer: select6},
        {question: "7. Should a customer increase the cover level at a later stage, then",answer: select7},
        {question: "8. On the Clientèle Funeral Plan, what is the entry age for the Main Insured Life?",answer: select8},
        {question: "9. On the Clientèle Funeral Plan, what is the entry age for the Extended Family Members?",answer: select9},
        {question: "10. What is the exclusion on the Clientèle Funeral Dignity Plan?",answer: select10},
        {question: "11. Under which of the following events can the Clientèle Funeral Dignity Plan be terminated?",answer: select11},
        {question: "12. The Grocery, Unveiling and Transport benefits are…",answer: select12},
        {question: "13. Select the 2 correct options applicable for the Grocery Benefit:",answer: select13},
        {question: "14. What is the cash amount for the Unveiling benefit?",answer: select14},
        {question: "15. On the Clientèle Funeral Plan, how will the nominated beneficiary receive the Airtime Benefit amount?",answer: select15},
        {question: "16. What is annual increase applicable to the airtime benefit on the Ultimate Dignity Plan?",answer: select16},
        {question: "17. Name 3 EASA benefits on the funeral plan",answer: select17},
      ],
      "Answer the questions": [
        {
          question: "18. In your own words explain the premium payback benefit (in full) on the Ultimate Funeral Plan.",
          answer: yupData.qa1
        },
        {
          question: "19. In your own word explain the rules for covering children under the Funeral Policy. Include the age brackets and maximum cover amounts per age bracket",
          answer: yupData.qa2
        },
        {
          question: "20. In your own words, explain the consequences if you submit fraudulent sales.",
          answer: yupData.qa3
        }
      ]
    }

    const data = {
      title: "Clientèle Funeral Plans Assessment",
      type: 4,
      email: currentUser.email,
      status: STATUS_TEXT.PENDING,
      date: new Date(Date.now()).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      application
    }

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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Clientèle Funeral Plans Assessment</h1>

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
            label="Area"
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

export default Form4;