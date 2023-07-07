import {
  Container,
  TextField,
  Button,
  Typography,
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
import form6ValidationSchema from '@/utils/validations/form6';

const Form6 = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const router = useRouter();
  const formOptions = { resolver: yupResolver(form6ValidationSchema) };

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (yupData: any) => {
    const application = {
      "Representative Name and Surname": yupData.dearname,
      "Representative Identity Number": yupData.dearidentify,
      "Commerce Date": yupData.date1,
      "Terminate Date": yupData.date2,
      "Acceptance Name": yupData.signame,
      "Acceptance Identify Number": yupData.sigidentify,
      "Signature": yupData.signature,
      "Date": yupData.date,
    }

    const data = {
      title: "Fixed Term Contact",
      type: 6,
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
      <h1 className="font-bold text-3xl text-center text-teal-500 my-8">Fixed Term Contact</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
        <div className="my-4 px-4">
          <h1 className="font-semibold my-4">PRIVATE AND CONFIDENTAL</h1>
          <div className='flex w-full my-2'>
            <p className="w-full">Dear, (Representative Name and Surname): </p>
            <TextField
              color='primary'
              variant='standard'
              className='w-full'
              {...register('dearname')}
            />
          </div>
          <div className='flex w-full my-2'>
            <p className="w-full">(Representative Identity Number): </p>
            <TextField
              color='primary'
              variant='standard'
              className='w-full'
              {...register('dearidentify')}
            />
          </div>
        </div>

        <div className="my-4 px-4">
          <h1 className="font-semibold my-4">LETTER OF APPOINTMENT CONSTITUTING AN EMPLOYMENT AGREEMENT ONCE SIGNED</h1>

          <div className='leading-10'>
            We have pleasure in confirming your appointment as a <b>Field Sales</b> Representative within Affordable Benefits Company Pty (Ltd) (hereafter “ABC”). This contract will commence on: <TextField color='primary' variant='standard' placeholder="MM/DD/YYYY" {...register('date1')} /> for a fixed term of three consecutive months and will terminate on: <TextField color='primary' variant='standard' placeholder="MM/DD/YYYY" {...register('date2')} /> based on the Terms and Conditions of employment listed below:
          </div>

          <div className="my-4">
            <ol>
              <li>Duties
                <ol>
                  <li>
                    You will be reporting to your designed Team Leader / Sales Manager and will be expected to perform the minimum duties and meet such performance criteria as detailed in the attached Remuneration Annexure.
                  </li>
                  <li>
                    Due to the nature of your appointment, you acknowledge and agree that you may be required to undertake duties and responsibilities which fall outside of those duties and responsibilities as contained in this employment agreement or any Annexure hereto.
                  </li>
                  <li>
                    You undertake:
                    <ol>
                      <li>
                        to diligently perform all such duties and exercise such powers consistent with the position to which you are appointed;
                      </li>
                      <li>
                        to carry out to the best of your ability and under the control of ABC, such duties and functions as may reasonably be assigned to you from time to time by ABC by any person delegated by ABC for such purpose;
                      </li>
                      <li>
                        to devote your full time, attention, skill and abilities to the affairs of ABC and promotion of the business, interests and welfare of ABC;
                      </li>
                      <li>
                        to obey and observe all lawful regulations and reasonable instructions issued by ABC;
                      </li>
                      <li>
                        not to devote any time or attention to any other concern or business not related to the business of ABC without the prior written consent of an ABC Executive, which consent shall not be unreasonably withheld;
                      </li>
                      <li>
                        to exercise the utmost good faith towards ABC both in carrying out your duties hereunder and also in all your dealings with ABC and to make full disclosure of any other interest that could, in the widest sense, create or result in any possible conflict of interest between you and ABC;
                      </li>
                      <li>
                        that you shall at all times be answerable to such person appointed by ABC as you Team Leader and/or Manager; and
                      </li>
                      <li>
                        not to engage in any activities that would detract from the proper performance of your obligations hereunder nor to be engaged in any other kind of business in competition with or conflicting with the business of ABC.
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>

              <li>Remuneration
                <ol>
                  <li>
                    You shall be remunerated for your employment services monthly in arrears, on or before the last working day of each month, in accordance with the attached Remuneration Annexure.
                  </li>
                  <li>
                    You authorise ABC to deduct from your monthly salary all deductions as may be required by law (e.g. Pay-AsYou-Earn tax) or as are mutually agreed to between yourself and ABC from time-to-time.
                  </li>
                  <li>
                    In the event of your absence from work for any reason other than authorised sick leave, authorised family responsibility leave, authorised annual leave or any other authorised leave, ABC will not remunerate your for such days as you may be absent from work.
                  </li>
                </ol>
              </li>
              
              <li>
                Location of employment
                <p>
                    You are employed in the capacity of a Field Sales Representative, and you are accordingly not assigned to a set place of work, but instead required to travel to different designated client premises and/or locations (as may be directed by ABC on behalf of ABC from time to time). 
                </p>
              </li>

              <li>
                Limitation of authority
                <ol>
                  <li>
                    You are not entitled, without the prior written consent of ABC, to:
                    <ol>
                      <li>
                        enter into any agreements for and on behalf of ABC with any third party whomsoever, whether natural or juristic;
                      </li>
                      <li>
                        waive any rights of ABC;
                      </li>
                      <li>
                        make any endorsement or alteration on any policy document or and other product of whatsoever nature generated by ABC;
                      </li>
                      <li>
                        give any guarantee relating to the policies or products of ABC;
                      </li>
                      <li>
                        in any manner whatsoever bind or purport to bind ABC; or
                      </li>
                      <li>
                        act in any capacity whatsoever without written permission from the ABC HR executive.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Subject to any relevant legislation and/or regulation and in the event that you are found guilty of an offence which caused ABC to suffer any expense, loss or damages of whatsoever nature, you agree to ABC automatically deducting the same from your relevant monthly remuneration.
                  </li>
                  <li>
                    For the purposes of this clause, reference to ABC shall include any other person, whether natural or juristic, for whom ABC acts or with whom ABC is associated.
                  </li>
                </ol>
              </li>

              <li>
                Financial Advisory and Intermediary Services Act
                <ol>
                  <li>
                    As per the latest requirements imposed by the Fit and Proper determinations issued under the Financial Advisory and Intermediary Services Act, 37 of 2002 (“FAIS”), your employment role, as a Field Sales Representative, within ABC means that you must be registered as a FAIS representative for execution of scripted sales only, and that you must at all times throughout your employment tenure with ABC remain Fit and Proper. 
                  </li>
                  <li>
                    In order to be registered as a FAIS representative you will be required to sign and attest to certain declarations and you accordingly undertake to sign same as soon as reasonably possible upon presentation thereof to you by ABC.
                  </li>
                  <li>
                    You shall at all times only act as a representative rendering “scripted sales execution” services (as defined in FAIS) and you are accordingly barred from providing any advice to any clients or policyholders (potential or existing) of ABC.
                  </li>
                  <li>
                    You acknowledge that it remains your sole responsibility to familiarise yourself with the applicable provision of FAIS and to comply therewith in all relevant respects throughout your employment tenure with ABC.
                  </li>
                </ol>
              </li>

              <li>
                Working hours
                <p>
                  You are required to work a minimum of 10 (ten) days per month (during Monday’s to Saturday’s, as may be directed by ABC on behalf of ABC from time to time), for a total number of hours not exceeding 59 (fifty nine) hours during any given month
                </p>
              </li>

              <li>
                Leave
                <p>
                  You are granted annual leave on full pay at an accrued rate of 1 (one) day for every 17 (seventeen) working days actually worked during a 12 (twelve) month leave cycle
                </p>
              </li>

              <li>
                Termination of Employment
                <ol>
                  <li>
                    This contract shall automatically terminate upon the expiry of the 3 months period referred to above without either party having to notify the other party in advance. 
                  </li>
                  <li>
                    Notwithstanding anything to the contrary contained herein, this employment agreement (and the employment relationship) may, in due accordance with the provisions of the Labour Relations Act and any other relevant legislation, be terminated at any time by ABC for any reason related to your conduct, incapacity or due to ABC&apos;s operational requirements.
                    <ol>
                      <li>
                        (one) weeks&apos; written notice if you have been employed for 6 (six) months or less;
                      </li>
                    </ol>
                  </li>
                  <li>
                    ABC reserves the right to pay you the equivalent of the remuneration due for your above notice period in lieu of notice
                  </li>
                </ol>
              </li>

              <li>
                Confidentiality
                <p>
                  You undertake not to, at any time during or after termination of your employment with ABC, divulge to any person any confidential information relating to ABC&apos;s business affairs and/or trade secrets.
                </p>
              </li>

              <li>
                Conditions of Service
                <ol>
                  <li>
                    As part of your induction training a link to the copies of ABC&apos;s latest company Policy and Procedure manual is supplied to you which contains, inter alia, ABC&apos;s Code of Conduct and Disciplinary Code. 
                  </li>
                  <li>
                    You agree that it remains your sole responsibility to familiarise yourself with all of ABC&apos;s in force company Policies and Procedures - a full set of which can be obtained, upon request, from ABC&apos;s HR Department.
                  </li>
                  <li>
                    You acknowledge that all information and/or documentation provided to ABC in support of your employment application (e.g. academic qualifications, employment references, criminal history etc.) were material to ABC’s determination whether or not to appoint you in your above employment role. Should it at any time post your employment commencement date be found that any of the aforementioned information and/or documentation that you provided to ABC was falsified and/or contained incorrect or inaccurate information, same would be regarded as a material misrepresentation on your part and could lead to summary dismissal.
                  </li>
                </ol>
              </li>

              <li>
                Polygraph testing
                <p>
                  You agree that ABC may, at any time and for any reason whatsoever, require you to undergo a polygraph tests and that your failure to adhere to such instruction may result in disciplinary action being instituted against you.
                </p>
              </li>

              <li>
                Acceptance of risks
                <ol>
                  <li>
                    Subject to any relevant legislation and/or regulation, the employee agrees that the company, their representative, employees, volunteers, directors, officers and/or representatives are not responsible for any death, illness, injury, loss or damage of any kind sustained by any person or employee while on duty or field/road trip and related activities, caused in any matter whatsoever. This includes:
                    <ol>
                      <li>
                        the risk associated with travel and all related activities including transport by public or private motor vehicle (company motor vehicles);
                      </li>
                      <li>
                        any injury, illness, death, loss or damage resulting from exposure to weather elements; or
                      </li>
                      <li>
                        physical injuries such as muscular injuries, bruises, scrapes, cuts, sprains, dislocations, broken bones and head, facial or dental injuries which might result from an accidental injury; illness resulting from food poisoning or parasites: and the possibilities of physical confrontation whether caused by myself or some other person resulting in injuries and/or death
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>

              <li>
                Processing and Protection of Personal Information
                <ol>
                  <li>
                    Your privacy is important to ABC and we will use reasonable efforts in order to ensure that any information, including personal information, provided by you, or which is collected from you, is stored in a secure manner. 
                  </li>
                  <li>
                    You agree to give (where applicable) honest, accurate and current information about yourself to ABC and to maintain and update such information. 
                  </li>
                  <li>
                    Your personal information collected by ABC may be used for the following reasons:
                    <ol>
                      <li>The provision of references;</li>
                      <li>Fraud prevention;</li>
                      <li>Performance appraisal; and</li>
                      <li>SARS reporting.</li>
                    </ol>
                  </li>
                  <li>
                    You acknowledge that any information supplied to ABC in terms of this employment agreement is provided voluntarily.
                  </li>
                  <li>
                    By submitting any information to ABC in any form you further acknowledge that such conduct constitutes an unconditional, specific and voluntary consent to the processing of such information by ABC under any applicable law in the manner contemplated in clause 14.3 above, which consent shall, in the absence of any written objection received from you, be indefinite and/or for the period otherwise required in terms of any applicable law. 
                  </li>
                </ol>
              </li>

              <li>
                General
                <ol>
                  <li>
                    This fixed term contract and any Annexure attached hereto contains the entire agreement between you and ABC and ABC shall not be bound by any undertakings, representations, warranties, promises or the like not recorded herein.
                  </li>
                  <li>
                    No indulgence, leniency or extension of time which ABC may give or allow to you in respect of the performance of any of your obligations hereunder, shall in any way prejudice ABC or preclude ABC from exercising any of its rights of enforcing your obligations in terms of this employment agreement.
                  </li>
                  <li>
                    No expectation has been created of any permanent employment at the expiry of the period of this contract.
                  </li>
                </ol>
              </li>
            </ol>

            <p className='my-20'>Yours sincerely,</p>

            <div>
              <h1 className='font-bold underline mb-8'>ACCEPTANCE OF CONDITIONS</h1>
              <div className="leading-10">
                I, <TextField color='primary' variant='standard' placeholder="Your name" {...register('signame')} />, with identity number: <TextField color='primary' variant='standard' {...register('sigidentify')} />, hereby agree to the terms and conditions of employment as contained and detailed in this employment agreement as well as Annexures A,B and C hereto. 
              </div>
            </div>
          </div>

          <div className='flex my-16'>
            <div className="w-full">
              <p>Signature</p>
              <TextField color='primary' variant='standard' {...register('signature')} />
            </div>

            <div className="w-full">
              <p>Date</p>
              <TextField color='primary' variant='standard' placeholder='MM/DD/YYYY' {...register('date')} />
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

export default Form6;