import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import React from 'react'
import '../assest/css/land.css';
import { icons } from 'react-icons/lib';
const Land = () => {
  return (
    <>
      <div className="main mt-4">
        <div className="first ">
          <div className="details  border p-1"  >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates nisi accusantium vitae ratione laboriosam veniam veritatis sit mollitia, quasi quod?</div>
          <div className="recent mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, doloremque.</div>
        </div>
        <div className="center  ">
          <div className="search  border p-1 d-flex align-items-center"  >
            <FaUserCircle size={25}/>
            <InputGroup className='m-2'>
              <Input placeholder='Enter amount' />
              <InputRightElement children={<GoSearch color='green.500' height={"30%"} />} />
            </InputGroup>
          </div>
          <div className="post mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, doloremque.</div>
        </div>
        <div className="sec">
          <div className="news  border p-1 "  >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates nisi accusantium vitae ratione laboriosam veniam veritatis sit mollitia, quasi quod?</div>
          <div className="follow mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, doloremque.</div>
          <div className="about  border p-1"  >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates nisi accusantium vitae ratione laboriosam veniam veritatis sit mollitia, quasi quod?</div>

        </div>
      </div>
    </>
  )
}

export default Land