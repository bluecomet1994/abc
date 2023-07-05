import { Container } from '@mui/material';
import ListCard from '@/components/ListCard';
import checklist, { ChecklistType } from '@/utils/data';

export default function Home() {
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