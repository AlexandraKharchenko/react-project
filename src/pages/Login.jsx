import {
  Button, CircularProgress, FormGroup, FormLabel,
} from '@mui/material';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../store/api';

function Login() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUsersQuery();
  if (isLoading) {
    return (
      <CircularProgress />
    );
  }
  return (

    <div>

      {/*  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button variant="text" onClick={handleSubmit}>Submit</Button> */}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
                // validationSchema={TodoSchema}
        onSubmit={(values, formikBag) => {
          console.log(formikBag);
          const foundUser = data.find((user) => user.password === values.password && user.email === values.email);
          if (foundUser.id) {
            navigate(`/users/${foundUser.id}/dashboard`);
          }
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                type="text"
                name="email"
                className={`form-control ${touched.title && errors.title ? 'is-invalid' : ' '}`}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                type="password"
                name="password"
                className={`form-control ${touched.title && errors.title ? 'is-invalid' : ' '}`}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </FormGroup>
            <Button variant="text" type="submit">Submit</Button>

          </Form>
        )}
      </Formik>
    </div>

  );
}

export default Login;
