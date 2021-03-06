import React from 'react';
import { Formik } from "formik";
import * as yup from "yup";

import SignInForm from '../SignInForm';
import useSignIn from '../../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const initialValues = {
  username: "",
  password: ""
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
});

export const SignInContainer = ({onSubmit}) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async values => {
    const {username, password} = values;

    try {
      const data = await signIn({username, password});
      history.push("/");
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit}/>
  );
};

export default SignIn;