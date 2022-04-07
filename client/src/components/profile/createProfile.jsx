import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, Input, InputGroup, InputRightElement, InputLeftElement, Checkbox, Box } from '@chakra-ui/react';
import { GrFacebook, GrInstagram, GrTwitter, GrYoutube } from 'react-icons/gr'
import { Formik, Form, Field } from 'formik';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { createProfile } from "../../features/profile/profileSlice";
//   website, skills, youtube, twitter, instagram, linkedin, facebook,
//company, location, status, bio
import "../../assest/css/login.css"

const CreateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    function validateName(value) {
        let error
        if (!value) {
            error = `This Field is required`
        }
        return error
    }
    return (
        <>
            {/* <div className="container"> */}
                <Formik
                    initialValues={{
                        website: '', skills: '', bio: '', status: false,
                    }}
                    onSubmit={
                        (values, actions) => {
                            dispatch(createProfile(values));
                            actions.resetForm();
                            actions.setSubmitting(false);
                        }
                    }
                >
                    {(props) => (
                        <Form>
                            <Field name='website' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl>
                                        <FormLabel htmlFor='website'>website</FormLabel>
                                        <Input  {...field} id='website' placeholder='website' />
                                        {/* <FormErrorMessage>{form.errors.website}</FormErrorMessage> */}
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='skills' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl >
                                        <FormLabel htmlFor='skills'>skills</FormLabel>
                                        <Input type={"skills"}{...field} id='skills' placeholder='skills' />
                                        {/* <FormErrorMessage>{form.errors.skills}</FormErrorMessage> */}
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='bio' validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl >
                                        <FormLabel htmlFor='bio'>bio</FormLabel>
                                        <Input
                                            pr='4.5rem'
                                            type={"bio"}{...field} id='bio'
                                            placeholder='bio'
                                        // width={{base:"80vw", md:"30vw"}}
                                        />
                                        {/* <FormErrorMessage>{form.errors.password}</FormErrorMessage> */}
                                    </FormControl>
                                )}
                            </Field>
                            <InputGroup className=" d-flex flex-column flex-md-row my-md-1 align-content-md-center align-items-md-center">
                                <Field name='youtube'>
                                    {({ field, form }) => (
                                        <FormControl >
                                            <FormLabel htmlFor='youtube'>youtube</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    color='black'
                                                    fontSize='1.2em'
                                                    children={<GrYoutube />}
                                                />
                                                <Input marginRight="2" type={"text"}{...field} id='youtube' placeholder='youtube' />
                                            </InputGroup>
                                            {/* <FormErrorMessage>{form.errors.youtube}</FormErrorMessage> */}
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='instagram'>
                                    {({ field, form }) => (
                                        <FormControl >
                                            <FormLabel htmlFor='instagram'>instagram</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    color='black'
                                                    fontSize='1.2em'
                                                    children={<GrInstagram />}
                                                />
                                                <Input marginRight="2" type={"instagram"}{...field} id='instagram' placeholder='instagram' />
                                            </InputGroup>
                                            {/* <FormErrorMessage>{form.errors.instagram}</FormErrorMessage> */}
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='facebook'>
                                    {({ field, form }) => (
                                        <FormControl >
                                            <FormLabel htmlFor='facebook'>facebook</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    color='black'
                                                    fontSize='1.2em'
                                                    children={<GrFacebook />}
                                                />
                                                <Input marginRight="2" type={"text"}{...field} id='facebook' placeholder='facebook' />

                                            </InputGroup>
                                            {/* <FormErrorMessage>{form.errors.facebook}</FormErrorMessage> */}
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='twitter'>
                                    {({ field, form }) => (
                                        <FormControl >
                                            <FormLabel htmlFor='twitter'>twitter</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    color='black'
                                                    fontSize='1.2em'
                                                    children={<GrTwitter />}
                                                />
                                                <Input type={"text"}{...field} id='twitter' placeholder='twitter' />

                                            </InputGroup>
                                            {/* <FormErrorMessage>{form.errors.twitter}</FormErrorMessage> */}
                                        </FormControl>
                                    )}
                                </Field>
                            </InputGroup>
                          
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
            {/* </div> */}
        </>
    );
};

export default CreateProfile;