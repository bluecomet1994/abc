import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from '@mui/material';
import Form5 from "@/components/forms/Form5";
import { app } from "@/config/firebase";
import { getApplications } from "@/store/actions/application.action";
import { DocumentData, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { STATUS_TEXT } from "@/utils/enums";
import Form5Preview from "@/components/preview/Form5Preview";

export default function InterviewSchedule() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({user}) => user);
  const { checklist } = useSelector(({application}) => application);
  const fireStore = getFirestore(app);

  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState<DocumentData>();
  const [documentId, setDocumentId] = useState('');

  useEffect(() => {
    getDocs(query(collection(fireStore, 'applications'), where('email', '==', currentUser.email)))
      .then(({ docs }) => {
        dispatch(getApplications(docs));
        setIsLoading(false);
        docs.map(doc => {
          if(doc.data().type === 5) {
            setDetail(doc.data());
            setDocumentId(doc.id);
          }
        });
      });
  }, [currentUser, dispatch, fireStore]);

  return isLoading ? (
    <div className='flex justify-center items-center w-full h-full'>
      <CircularProgress size={72} />
    </div>
  ) : (
    <div className='w-full h-full overflow-auto'>
      {
        checklist[4].status.text === STATUS_TEXT.PENDING ?
          <Form5Preview detail={detail} id={documentId} />
          :
          <Form5 />
      }
    </div>
  )
}