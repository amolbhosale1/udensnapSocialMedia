import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfilebyId } from "../../features/profile/profileSlice";
import { Box, Image, Spacer, Text } from '@chakra-ui/react'

const ProfilebyId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector(
    (state) => state.profile);
  const getProfile = async () => {
    await dispatch(getProfilebyId(id));
  }
  useEffect(() => {
    getProfile();
  }, []);
  console.log(profile);
  return (
    <>

      <Image height={36} width={"100%"} objectFit="fill" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
      <Image
        zIndex={1}
        position={"absolute"}
        marginLeft={"2rem"}
        top={36}
        boxSize='150px'
        objectFit='cover'
        src='https://bit.ly/dan-abramov'
        alt='Dan Abramov'
      />
      <Box bg='tomato' h='24' color='white'>
      </Box>
      <h1 className="fw-bolder  fs-2 lh-sm ">Amol Bhosale</h1>
      <h2 className="fw-normal fs-4">Mern Stack and Flutter developer</h2>

      <p className="font-monospace mt-4 ">New York, United states <span className='fs-5 fw-bold text-primary'>contact</span></p>
      <p className="font-monospace ">22 connections</p>

      <Box borderWidth='1px' marginTop={3} borderRadius='lg' >
        <h1 className=" fs-2 lh-sm ">About</h1>
        <Box p='5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic consectetur est ducimus distinctio debitis nihil fugiat mollitia dolorum eligendi vitae unde totam, id, doloribus animi dolore earum perferendis quidem harum.
        </Box>
      </Box>
      <Box></Box>
    </>
  )
}

export default ProfilebyId