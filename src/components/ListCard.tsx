import { Paper, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function ListCard(props: any) {
  const { data } = props;
  const router = useRouter();

  return (
    <Paper className='my-3'>
      <Button
        className='relative flex justify-between w-full h-24 p-6 bg-slate-50 cursor-pointer transition-all hover:bg-slate-200'
        onClick={() => router.push(data.link)}
      >
        <span className={`absolute top-0 left-0 w-1 h-full bg-${data.status.color}`} />

        <h1 className='font-bold text-xl'>
          {data.title}
        </h1>

        <div className='flex items-center font-sans'>
          <div className={`w-3 h-3 rounded-full bg-${data.status.color} mx-2`}></div>
          <p>{data.status.text}</p>
        </div>
      </Button>
    </Paper>
  )
}