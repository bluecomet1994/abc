import { Container } from '@mui/material';
import ListCard from '@/components/ListCard';
import checklist, { ChecklistType } from '@/utils/data';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();
  const { currentUser } = useSelector(({user}) => user);

  useEffect(() => {
    if(!currentUser) {
      router.push('/auth/login');
    }
  }, [currentUser, router]);

  return (
    <Container maxWidth="xl" className='flex flex-col h-full p-8 overflow-auto'>
      {
        checklist.map((list: ChecklistType) => (
          <ListCard key={list.id} data={list} />
        ))
      }
    </Container>
  )
}