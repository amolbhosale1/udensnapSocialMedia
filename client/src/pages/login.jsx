import React, { useEffect } from "react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, Input, InputGroup, InputRightElement, Flex, Image, Box, useColorModeValue } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { login } from "../features/auth/authSlice";
import redux from "../assest/img/redux.png";
import "../assest/css/login.css"
import * as Yup from "yup";

const Login = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    const loginSchema=Yup.object().shape({
        email:Yup.string().email("Invalid email").required('Required'),
        password:Yup.string().min(6,"Atleast 6").required("Required")
    })
    function validateName(value) {
        let error
        if (!value) {
            error = `This Field is required`
        }
        return error
    }
useEffect(() => {
  if(user){
    navigate('/ho')
}
   
//   return () => {
//     second
//   }
}, [])
    return (
        <React.Fragment>
           
            <h1 className=" display-2 pb-5">Welcome to your<br></br> professional community</h1>
            <div className="container d-flex">
                {/* <Alert/> */}             
                    <Formik
                        initialValues={{  email: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={
                          async  (values, actions) => {
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
                                    dispatch(login({ email: values.email, password: values.password })).then( (onResolved) => {
                                        console.log("reso");
                                        navigate("/ho")
                                    },
                                    (onRejected) => {
console.log("reje");                                    })
                              
                                 setTimeout(() => {
                                     actions.setSubmitting(false)                         
                                 }, 1000);


                            }
                        }
                    >
                        {(props) => (
                            <Form>
                                <Field name='email' validate={validateName}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel htmlFor='email'>Email</FormLabel>
                                            <Input
                                                    pr='4.5rem'
                                                    type={"email"}{...field} id='email' placeholder='email'
                                                    width={{base:"80vw", md:"30vw"}}
                                                    size={"lg"}
                                                    borderColor={"black"}
                                                />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password' validate={validateName
                                }>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel htmlFor='password'>Password</FormLabel>
                                            {/* // <Input type={"password"}{...field} id='password' placeholder='password' /> */}
                                            <InputGroup size='lg'>
                                                <Input
                                                    pr='4.5rem'
                                                    type={show ? 'text' : 'password'}
                                                    {...field} id='password'
                                                    placeholder='Enter password'
                                                    width={{base:"80vw", md:"30vw"}}
                                                    borderColor={"black"}
                                                />
                                                <InputRightElement width='4.5rem'>
                                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    //px={4}
                                    colorScheme='teal'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>              
            
                    <Image className="d-none d-md-block" src={redux} alt="logoRedux"
                    objectFit='cover'
                    paddingLeft={"30vw"}
                    ></Image>
                    </div>
         
            <Box bg={useColorModeValue("rgba(243, 242, 240,1)","#212735")} className="logoimg d-flex flex-column flex-md-row">
                <div className=" fs-1 explore fw-light">Explore</div>
            <div className="row">
            <div className="exploreTab col-3 ">fsf</div>
            <div className="exploreTab col-3">fsf</div>
            <div className="exploreTab col-3">fsf</div>
            <div className="exploreTab col-3">fsf</div>
            <div className="exploreTab col-3">fsf</div>
            </div>
            </Box>
        </React.Fragment>
    );
};

export default Login;