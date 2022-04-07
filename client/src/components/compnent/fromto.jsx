import { InputGroup, InputLeftElement, useColorMode } from '@chakra-ui/react';
import { IoCalendarClear } from 'react-icons/io5';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import "../../assest/css/login.css"

const Fromto = ({ data }) => {
    // console.log(data);
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <label htmlFor={data.fromtoVal} >{data.fromto}</label>
            <Field name={data.fromtoVal}  >
                {({ field, form }) => {
                    const { setFieldValue } = form
                    const { value } = field
                    return (
                        <>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    fontSize='1.2em'
                                    children={<IoCalendarClear />}
                                />
            
                                <DatePicker
                                autoComplete="off"
                                    className={colorMode === 'light' ? "date" : "inpbg"}
                                    id={colorMode === 'light' ? data.fromto : data.fromto + "dark"}
                                    {...field}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    showFullMonthYearPicker
                                    selected={value}
                                    onChange={val => setFieldValue(data.fromtoVal, val)}
                                />
{/* {console.log(...field)}     */}
                        </InputGroup>
                       {/* {console.log(field)} */}
                        </>
                    )
                    console.log(field);
                }}
            </Field>
        </>
    )
}

export default Fromto