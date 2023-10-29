import {
  Button, CircularProgress, FormGroup, FormLabel,
} from '@mui/material';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../store/api';
import './styles.css';

function Login() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUsersQuery();

  const SignInSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

  if (isLoading) {
    return (
      <CircularProgress />
    );
  } return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values, formikBag) => {
          const foundUser = data.find((user) => user.password === values.password && user.email === values.email);
          if (foundUser && foundUser.id) {
            navigate(`/users/${foundUser.id}/dashboard`);
          } else formikBag.setStatus({ error: 'Invalid email or password. Please try again.' });
        }}
      >
        {({ status }) => (
          <Form className="form">
            <FormGroup>
              <FormLabel
                htmlFor="email"
              >
                Email
              </FormLabel>
              <Field
                type="text"
                name="email"
                className="field"
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                type="password"
                name="password"
                className="field"
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </FormGroup>
            {status && status.error && <Typography color="error" sx={{ textAlign: 'center' }}>{status.error}</Typography>}
            <Box sx={{
              justifyContent: 'center', display: 'flex',
            }}
            >
              <Button variant="contained" color="secondary" type="submit">Submit</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

export default Login;
