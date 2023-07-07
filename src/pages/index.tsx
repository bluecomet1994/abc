import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { Container, CircularProgress } from '@mui/material';
import ListCard from '@/components/ListCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChecklistType } from '@/utils/data';
import { app } from "@/config/firebase";
import { getApplications } from "@/store/actions/application.action";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({user}) => user);
  const { checklist } = useSelector(({application}) => application);
  const fireStore = getFirestore(app);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!currentUser) {
      router.push('/auth/login');
    } else {
      getDocs(query(collection(fireStore, 'applications'), where('email', '==', currentUser.email)))
        .then(({ docs }) => {
          dispatch(getApplications(docs));
          setIsLoading(false);
        });
    }
  }, [dispatch, fireStore, currentUser, router]);

  return isLoading ? (
    <div className='flex justify-center items-center w-full h-full'>
      <CircularProgress size={72} />
    </div>
  ) : (
    <Container maxWidth="xl" className='flex flex-col h-full p-8 overflow-auto'>
      {
        checklist.map((list: ChecklistType) => (
          <ListCard key={list.id} data={list} />
        ))
      }
    </Container>
  )
}