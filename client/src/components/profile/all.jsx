import React from 'react'
import { useAllprosQuery } from "../../features/profile/profileSlice";

const All = () => {
    const {data}=useAllprosQuery();
    console.log(data);
  return (
    <div>All</div>
  )
}

export default All