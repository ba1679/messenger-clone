import Image from 'next/image';
import { Box } from '@mui/material';
import AuthForm from './components/AuthForm';

export default function page() {
  return (
    <Box
      bgcolor='#f7f7f7'
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <Box
        width={400}
        p={4}
        bgcolor='white'
        borderRadius='6px'
        textAlign='center'>
        <Image src='/images/logo.png' width={48} height={48} alt='logo' />
        <AuthForm />
      </Box>
    </Box>
  );
}
