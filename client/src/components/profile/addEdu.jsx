import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, Input, InputGroup, InputRightElement, InputLeftElement, useColorMode } from '@chakra-ui/react';
import { Formik, Form, Field, connect, FieldArray } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { addEducation } from "../../features/profile/profileSlice";
import DatePicker from 'react-datepicker'
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'
import "../../assest/css/login.css"
import redux from "../../assest/img/redux.png";
import Fromto from "../compnent/fromto";

//school,degree,fieldOfStudy,from,to,current,description
const AddEducation = () => {
    const dispatch = useDispatch();
    // const { profile, isLoading, isSuccess } = useSelector(
    //     (state) => state.profile
    // )
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
                    initialValues={{ school: '', degree: '', fromVal: '', toVal: "", current: false, fieldOfStudy: "" }}
                    onSubmit={
                        (values, actions) => {
                            //   console.log(values);
                            const { school, degree, fromVal, toVal, current, fieldOfStudy } = values
                            let from = (fromVal.toDateString().split(' ').slice(1).join(' ').toString())
                            let to = (toVal.toDateString().split(' ').slice(1).join(' ').toString())
                      //      console.log(to);
                              console.log(from);
                            dispatch(addEducation({ school, degree, from, to, current, fieldOfStudy }));
                            // actions.resetForm();
                            actions.setSubmitting(false);
                        }
                    }
                >
                    {(props) => (
                        <Form>
                            <Field name='school' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl>
                                        <FormLabel htmlFor='school'>school</FormLabel>
                                        <Input  {...field} id='school' placeholder='school' />
                                        {/* <FormErrorMessage>{form.errors.school}</FormErrorMessage> */}
                                    </FormControl>
                                )}
                            </Field>
                            <InputGroup className=" d-flex flex-column flex-md-row my-md-1 align-content-md-center align-items-md-center">
                                <Field name='degree' validate={validateName}>
                                    {({ field, form }) => (
                                        <FormControl className="pe-md-3" >
                                            <FormLabel htmlFor='degree'>degree</FormLabel>
                                            <Input marginRight="2" type={"degree"}{...field} id='degree' placeholder='degree' />
                                            {/* <FormErrorMessage>{form.errors.password}</FormErrorMessage> */}
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='fieldOfStudy' validate={validateName}>
                                    {({ field, form }) => (
                                        <FormControl >
                                            <FormLabel htmlFor='fieldOfStudy'>fieldOfStudy</FormLabel>
                                            <Input type={"fieldOfStudy"}{...field} id='fieldOfStudy' placeholder='fieldOfStudy' />
                                            {/* <FormErrorMessage>{form.errors.password}</FormErrorMessage> */}
                                        </FormControl>
                                    )}
                                </Field>
                            </InputGroup>
                            <div className=" d-flex flex-column flex-md-row pb-4 align-content-md-center align-items-md-center">
                                <div className="fromlabel dateFir mb-4 mt-2 mb-md-0 mt-md-0">
                                <Fromto data={{fromto:"from",fromtoVal:"fromVal" }}/>
                                    </div>
                                <div className="dateFir ">
                                <Fromto data={{fromto:"to",fromtoVal:"toVal" }}/>
                                  </div>
                            </div>
                            <div className="d-flex mt-3">
                                <Field type="checkbox" name="current" className="checkbox d-flex " />
                                <FormLabel className="ms-3" htmlFor='current'>Is Currently Studying</FormLabel></div>
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

export default AddEducation