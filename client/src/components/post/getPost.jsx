import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../features/post/postSlice';

const GetPost = () => {
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector(
    (state) => state.post);
  const getProfile = async () => {
    await dispatch(getPost());
}
console.log(isLoading);
useEffect(() => {
  getProfile();
   },[isLoading]);
  // console.log(post);
  return (
    <div>GetPost</div>
  )
}

export default GetPost