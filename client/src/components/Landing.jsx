import React,{useEffect} from "react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, Input } from '@chakra-ui/react';
import { Formik, Form, Field, connect } from 'formik';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {login  } from "../features/auth/authSlice";


const Landing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
      const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    function validateName(value) {
        let error
        if (!value) {
            error = `This Field is required`
        }
        return error
    }
   
    return (
        <React.Fragment>
            <div className="container">
            {/* <Alert/> */}
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={
                        (values, actions) => {
                        // dispatch(
                        //     alertActions.CreateAlert({
                        //       message: "We are off to a good start! 🤗",
                        //       type: "success"
                        //     })
                        //   );
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2))
                        //     actions.setSubmitting(false)
                        // })
                       dispatch(login({email:values.email,password:values.password}))
                        // navigate('/ho');
                        actions.setSubmitting(false);
                    }
                }
                >
                    {(props) => (
                        <Form>
                            <Field name='name' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor='name'>First name</FormLabel>
                                        <Input  {...field} id='name' placeholder='name' />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='email' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor='email'>Email</FormLabel>
                                        <Input type={"email"}{...field} id='email' placeholder='email' />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='password' validate={validateName
                            // , (value) => {
                            //     let error;
                            //     let pattern = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"/;
                            //     if (value !== pattern) {
                            //         error = `aaa`
                            //     }
                            //     return error
                            // }
                            }>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel htmlFor='password'>Password</FormLabel>
                                        <Input type={"password"}{...field} id='password' placeholder='password' />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                colorScheme='teal'
                                isLoading={props.isSubmitting}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    );
};

export default Landing;