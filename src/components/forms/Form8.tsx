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
import form8ValidationSchema from '@/utils/validations/form8';

const Form8 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form8ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);
  const [check9, setCheck9] = useState(false);
  const [check10, setCheck10] = useState(false);
  const [check11, setCheck11] = useState(false);
  const [check12, setCheck12] = useState(false);
  const [check13, setCheck13] = useState(false);
  const [check14, setCheck14] = useState(false);
  const [check15, setCheck15] = useState(false);
  const [check16, setCheck16] = useState(false);
  const [check17, setCheck17] = useState(false);
  const [check18, setCheck18] = useState(false);
  const [check19, setCheck19] = useState(false);
  const [check20, setCheck20] = useState(false);
  const [check21, setCheck21] = useState(false);
  const [check22, setCheck22] = useState(false);
  const [check23, setCheck23] = useState(false);

  const qaData = [
    {
      question: [
        "been found guilty in any criminal proceedings or liable in any civil proceedings by a court under any law in any jurisdiction of-",
        "    (a) an offence under a law relating to the regulation or supervision of a financial institution as defined in the Financial Institutions (Protection of Funds) Act, 2001 (Act No. 28 of 2001) or a corresponding offence under the law of a foreign country;",
        "    (b) theft, fraud, forgery, uttering a forged document, perjury or an offence involving dishonesty, breach of fiduciary duty, dishonourable or unprofessional conduct; or",
        "    (c) an offence under the Prevention of Corruption Act, 1958 (Act No. 6 of 1958), the Corruption Act, 1992 (Act No. 94 of 1992) or Parts 1 to 4, or section 17, 20 or 21, of the Prevention and Combating of Corrupt Activities Act, 2004 (Act No. 12 of 2004), or a corresponding offence under the law of a foreign country?"
      ],
      value: check1,
      method: () => setCheck1(prev => !prev)
    },
    {
      question: [
        "been convicted of any other offence committed after the Constitution of the Republic of South Africa, 1996, took effect, where the penalty imposed for the offence was a significant fine?"
      ],
      value: check2,
      method: () => setCheck2(prev => !prev)
    },
    {
      question: [
        "accepted civil liability for, or has been the subject of a civil judgment in respect of, theft, fraud, forgery, uttering a forged document, perjury or an any conduct involving dishonesty, breach of fiduciary duty, misrepresentation, or negligent, dishonourable and unprofessional conduct?"
      ],
      value: check3,
      method: () => setCheck3(prev => !prev)
    },
    {
      question: [
        "been the subject of frequent or material preventative, remedial or enforcement actions by the Authority or a regulatory authority?"
      ],
      value: check4,
      method: () => setCheck4(prev => !prev)
    },
    {
      question: [
        "been removed from an office of trust for theft, fraud, forgery, uttering a forged document, misrepresentation, dishonesty, breach of fiduciary duty or business conduct?"
      ],
      value: check5,
      method: () => setCheck5(prev => !prev)
    },
    {
      question: [
        "breached a fiduciary duty?"
      ],
      value: check6,
      method: () => setCheck6(prev => !prev)
    },
    {
      question: [
        "been suspended, dismissed or disqualified from acting as a director, managing executive, public officer, auditor or statutory actuary (or his or her alternate) under any law or any action to achieve one of the aforementioned outcomes has been instituted against the person?"
      ],
      value: check7,
      method: () => setCheck7(prev => !prev)
    },
    {
      question: [
        "been refused a registration, approval, authorisation or licence to carry out a trade, business or profession, or has had that registration, approval, authorisation or licence suspended, revoked, withdrawn or terminated by a regulatory authority?"
      ],
      value: check8,
      method: () => setCheck8(prev => !prev)
    },
    {
      question: [
        "been denied registration or membership of any professional body or has had that registration or membership revoked, withdrawn or terminated by a professional body because of matters relating to honesty, integrity, or business conduct?"
      ],
      value: check9,
      method: () => setCheck9(prev => !prev)
    },
    {
      question: [
        "been disciplined, reprimanded, disqualified, or removed in relation to matters relating to honesty, integrity, incompetence or business conduct by a-",
        "    (a) professional body; or",
        "    (b) regulatory authority,",
        "or has any action to achieve one of the aforementioned outcomes been instituted against the applicant?"
      ],
      value: check10,
      method: () => setCheck10(prev => !prev)
    },
    {
      question: [
        "knowingly been untruthful or provided false or misleading information to, or been uncooperative in any dealings with, the Authority or a regulatory authority?"
      ],
      value: check11,
      method: () => setCheck11(prev => !prev)
    },
    {
      question: [
        "demonstrated a lack of readiness and willingness to comply with legal, regulatory or professional requirements and standards?"
      ],
      value: check12,
      method: () => setCheck12(prev => !prev)
    },
    {
      question: [
        "been found to be not fit and proper by the Authority or a regulatory authority in any previous assessments of fitness and propriety?"
      ],
      value: check13,
      method: () => setCheck13(prev => !prev)
    },
    {
      question: [
        "been involved or is the applicant involved as a director, trustee, member partner, controlling shareholder or managing executive, or is the applicant concerned in the management, of a business that has been-",
        "    (a) the subject of any matter referred to in questions 1 to 13 above, or",
        "    (b) placed in liquidation or business rescue;",
        "while the applicant has been connected with that organisation?"
      ],
      value: check14,
      method: () => setCheck14(prev => !prev)
    },
    {
      question: [
        "failed to disclose any information required to be disclosed in terms of the Act?"
      ],
      value: check15,
      method: () => setCheck15(prev => !prev)
    },
    {
      question: [
        "been prohibited, by the Authority or any other regulatory body or authority from operating in the financial services industry?"
      ],
      value: check16,
      method: () => setCheck16(prev => !prev)
    },
    {
      question: [
        "been involved with an entity which has been censured, disciplined, suspended or refused membership or registration by a stock exchange, futures exchange, other market or regulatory body or authority?"
      ],
      value: check17,
      method: () => setCheck17(prev => !prev)
    },
    {
      question: [
        "knowingly or negligently aided or abetted other persons in the breaching of any laws, regulations, exchange rules and/or codes of conduct?"
      ],
      value: check18,
      method: () => setCheck18(prev => !prev)
    },
    {
      question: [
        "been the subject of any investigation or disciplinary proceedings by any regulatory authority (whether in the Republic or elsewhere), exchange, professional body, government body or agency?"
      ],
      value: check19,
      method: () => setCheck19(prev => !prev)
    },
    {
      question: [
        "been or is its estate sequestrated or liquidated, either voluntarily or involuntarily?"
      ],
      value: check20,
      method: () => setCheck20(prev => !prev)
    },
    {
      question: [
        "been or currently is subject to any pending proceedings that may lead to a conviction of any offence or finding of any liability under any law in any jurisdiction?"
      ],
      value: check21,
      method: () => setCheck21(prev => !prev)
    },
    {
      question: [
        "been or currently is subject to any investigation or proceedings or pending proceedings or is the applicant aware of any investigations or proceedings that may commence?"
      ],
      value: check22,
      method: () => setCheck22(prev => !prev)
    },
    {
      question: [
        "been or currently is subject to any other proceedings that may result in any matter referred to in question 1 to 22?"
      ],
      value: check23,
      method: () => setCheck23(prev => !prev)
    },
  ]

  const onSubmit = (yupData: any) => {
    const application = {
      check1,
      check2,
      check3,
      check4,
      check5,
      check6,
      check7,
      check8,
      check9,
      check10,
      check11,
      check12,
      check13,
      check14,
      check15,
      check16,
      check17,
      check18,
      check19,
      check20,
      check21,
      check22,
      check23,
      name: yupData.name,
      date: yupData.date,
      signature: yupData.signature,
      number: yupData.number,
      team: yupData.team,
      id: yupData.id,
    }

    const data = {
      title: "Honesty, integrity and good standing - Declaration Questions",
      type: 8,
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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Honesty, integrity and good standing - Declaration Questions</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
        <div className='w-full my-8'>
          <table className="w-full">
            <tbody>
              <tr>
                <td colSpan={2}>Has the Representative ever-</td>
                <td>Answer</td>
              </tr>

              {
                qaData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className='whitespace-pre-wrap -indent-11 pl-16'>{
                      item.question.map((sentence, index) => (
                        <p key={index} className={index === 0 ? 'indent-0 -ml-12' : ''}>{sentence}</p>
                      ))
                    }</td>
                    <td className="text-center"><Checkbox checked={item.value} onChange={item.method} /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className='w-full my-8'>
          <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Declaration</h1>

          <div className="leading-10">
            <div>
              I, <TextField color='primary' variant='standard' placeholder="Your name" {...register('name')} /> the undersigned, being a duly appointed representative of:
            </div>
            <p>Affordable Benefits Company (Pty) Ltd FSP 47161.</p>
            <p className="my-4">Do hereby confirm:</p>
            <p>
              That I have confirmed in writing that I am competent to render financial services to clients considering the requirements stipulated in the Determination of Fit and Proper Requirements of Financial Services Providers relating to personal character qualities of honesty and integrity as well as the requisite qualifications;
            </p>
            <p className="my-4">
              I agree to abide always with the requirements of all the applicable requirements of FAIS Act 37 of 2002;
            </p>
            <p>
              That I will within 24 hours of any changes occurring in my circumstances as answered on the “honesty and integrity checklist” that may affect my competence to render financial services to clients, inform Affordable Benefits Company in writing of such changes.
            </p>

            <div className="my-6">
              Thus, done and signed at <TextField color='primary' variant='standard' placeholder="MM/DD/YYYY" {...register('date')} />
            </div>

            <div className="flex w-full">
              <p className="w-full">Signature of Representative:</p>
              <TextField color='primary' variant='standard' className="w-full" {...register('signature')} />
            </div>
            <div className="flex w-full">
              <p className="w-full">Representative Number:</p>
              <TextField color='primary' variant='standard' className="w-full" {...register('number')} />
            </div>
            <div className="flex w-full">
              <p className="w-full">Kiosk/Team:</p>
              <TextField color='primary' variant='standard' className="w-full" {...register('team')} />
            </div>
            <div className="flex w-full">
              <p className="w-full">Name and ID:</p>
              <TextField color='primary' variant='standard' className="w-full" {...register('id')} />
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

export default Form8;