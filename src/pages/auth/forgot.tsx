import React, { useState } from 'react';
import ErrorText from '../../components/errorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { Button, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

const ForgotPasswordPage: React.FunctionComponent<IPageProps> = props => {
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const resetPasswordRequest = () => {
        if (error !== '') setError('');

        setSending(true);

        auth.sendPasswordResetEmail(email)
        .then(() => {
            logging.info('Email sent.');
            setSent(true);
            setSending(false);
        })
        .catch(error => {
            logging.error(error);
            setError(error.message);
            setSending(false);
        });
    }

    return (
        <Container component="main" maxWidth="xs">
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {sent ?
                (<><p style={{color: 'black'}}>A link has been sent to your email with instructions.</p>
                <Link to="/login">Click here to login</Link></>)
            :
                <>
                    <h1>Reset Password</h1>
                    <TextField fullWidth style={{marginBottom: '0.5rem'}} label="Email Address"  type="email"
                name='email'
                id='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                    <Button variant="contained" endIcon={<SendIcon />}
                        onClick={() => resetPasswordRequest()}>Send Reset Link</Button>
                    <ErrorText error={error} />
                    <small>
                        <p style={{color: 'black'}}>Click Here <Link to='/login'>Login Here</Link></p>
                    </small>
                </>
                
            }
        </Box>
        </Container>
    );
}

export default ForgotPasswordPage;