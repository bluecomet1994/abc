import Link from 'next/link';
import { Container, Paper, Chip, Button } from '@mui/material';
import { useEffect } from 'react';

const PreviewPaper = ({detail}: any) => {
  // useEffect(() => {
  //   console.log(detail);
  // }, [detail]);

  return (
    <Container maxWidth="xl" className='flex flex-col items-center py-12'>
      <h1 className='font-bold text-2xl text-center text-teal-700 my-8'>Your Application</h1>
      <Paper className="p-12 bg-gray-50">
        <h1 className="font-bold underline text-center text-xl">{detail.title}</h1>
        <div className='flex justify-between items-center my-2'>
          <p>Date: {detail.date}</p>
          <Chip label={detail.status} />
        </div>

        <div>
          {
            Object.keys(detail.application).map(key => (
              <div key={key} className='flex flex-col my-4'>
                  {
                    detail.application[key].map((item: any, index: number) => (
                      <div key={index}>
                        <span>{item.question}</span>
                        <span className="ml-4 font-sans font-semibold text-teal-600 text-sm">{item.answer}</span>
                      </div>
                    ))
                  }
              </div>
            ))
          }
        </div>
      </Paper>

      <Link href={'/'}>
        <Button
          color="primary"
          variant="contained"
          className='w-72 h-12 font-bold text-xl my-8 bg-teal-600'
        >
          Back to the List
        </Button>
      </Link>
    </Container>
  )
}

export default PreviewPaper;