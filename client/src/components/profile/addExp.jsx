import React, { useState } from "react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, Input, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import { Formik, Form, Field, connect, FieldArray } from 'formik';
import { useDispatch } from "react-redux";
import { addExp } from "../../features/profile/profileSlice";
import DatePicker from 'react-datepicker'
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'
import "../../assest/css/login.css"
import redux from "../../assest/img/redux.png";
import Fromto from "../compnent/fromto";
import InpField from "../compnent/inpfield";
import { format,parse } from "date-fns";
//title,company, location, from,to, current,description
const AddExp = ({exp}) => {
   ///parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {  locale: eo})
   //Wed Jun 01 2022 00:00:00 GMT+0530 (India Standard Time)
    const dispatch = useDispatch();
    function validateName(value) {
        let error
        if (!value) {
            error = `This Field is required`
        }
        return error
    }

    return (
        <>
            <div className="container ">
                <Formik
                    initialValues={{ title:exp===undefined? "":exp.title, company:exp===undefined? "":exp.company,
                     fromVal: exp===undefined? "":parse((format(new Date(exp.from), 'MM/dd/yyyy')).toString(), 'MM/dd/yyyy', new Date()),
                      toVal: exp===undefined? "":parse((format(new Date(exp.to), 'MM/dd/yyyy')).toString(), 'MM/dd/yyyy', new Date()), 
                     current: exp===undefined? false:exp.current, location:exp===undefined? "":exp.location, description: exp===undefined? "":exp.description }}
                    onSubmit={
                        (values, actions) => {
                            const {title,company,fromVal,toVal,current,location,description}=values
                            console.log(values);
                            let from =values.fromVal.toLocaleString('default', { month: 'long' }) +" "+ values.fromVal.getFullYear()
                            let to = values.toVal.toLocaleString('default', { month: 'long' }) +" "+ values.toVal.getFullYear()
                            dispatch(addExp({title,company,from,to,current,location,description}));
                            actions.resetForm();
                            actions.setSubmitting(false);
                        }
                    }
                >
                    {(props) => (
                        <Form>
                            <InputGroup className=" d-flex flex-column flex-md-row ">
                                <div className="w-100 me-md-3">
                                <Field  name='company' validate={validateName}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.company && form.touched.company}>
                                            <FormLabel htmlFor='company'>company</FormLabel>
                                            <Input type={"company"}{...field} id='company' placeholder='company' />
                                            <FormErrorMessage>{form.errors.company}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                </div>
                                <div className="w-100 mt-1">
                                <Field name='title' validate={validateName}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.title && form.touched.title} >
                                            <FormLabel htmlFor='title'>title</FormLabel>
                                            <Input type={"title"}{...field} id='title' placeholder='title' />
                                            <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                </div>
                            </InputGroup>
                            <Field name='location' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl>
                                        <FormLabel htmlFor='location'>location</FormLabel>
                                        <Input  {...field} id='location' placeholder='location' />
                                        {/* <FormErrorMessage>{form.errors.location}</FormErrorMessage> */}
                                    </FormControl>
                                )}
                            </Field>
                            <div className=" d-flex flex-column flex-md-row pb-4 ">
                                <div className="fromlabel dateFir mb-4 mt-2 mb-md-0 mt-md-1">
                                    <Fromto data={{ fromto: "fromVal", fromtoVal: "fromVal" }} />
                                </div>
                                <div className="dateFir mt-md-1">
                                <Fromto data={{fromto:"toVal",fromtoVal:"toVal" }}/>   
                                </div>
                            </div>
                            <div className="d-flex  mt-3">
                                <Field type="checkbox" name="current" className="checkbox d-flex " />
                                <FormLabel className="ms-3" htmlFor='current'>Is Currently Studying</FormLabel></div>
                            <Field name='description' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl>
                                        <FormLabel htmlFor='description'>description</FormLabel>
                                        <Input  {...field} id='description' placeholder='description' />
                                        {/* <FormErrorMessage>{form.errors.location}</FormErrorMessage> */}
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                colorScheme='teal'
                                isLoading={props.isSubmitting}
                                type='submit'
                                width={"100%"}
                                marginTop={10}

                            >
                                Submit
                            </Button>

                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default AddExp