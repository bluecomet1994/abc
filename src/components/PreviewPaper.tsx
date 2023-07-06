import { Container, Paper } from '@mui/material';

const PreviewPaper = (data: any) => {
  return (
    <Container maxWidth="xl" className='flex justify-center py-20'>
      <Paper className="p-12">
        <h1>Your Application</h1>
      </Paper>
    </Container>
  )
}

export default PreviewPaper;