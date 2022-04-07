import React, { useEffect, useState } from "react";
import { myProfile } from "../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Education from "../components/profilePage/education";
import Experiance from "../components/profilePage/experiance";
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { TiUserDelete } from 'react-icons/ti';
import AddEducation from "../components/profile/addEdu";
import AddExp from "../components/profile/addExp";
import { deleteProfileAndUser } from "../features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modelS, setModelS] = useState();
  const [editB, setEditB] = useState(false)
  const { profile, isError, isloading, isSuccess } = useSelector(
    (state) => state.profile);
  const { user } = useSelector(
    (state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    dispatch(myProfile());
    console.log("useeffe");
  }, [])
//user, navigate, dispatch
  const modelSheetClick = (names) => {
    setModelS(names)
    onOpen()
  }
  const { experiance, education } = profile || {};
  // console.log(profile);

  return (
    <>
      {user ?
        <>
          {profile !== null ?
            <>
              <h1>DashBoard</h1>
              {/* <h2>Welcome {user.name}</h2>
              {!profile ? <h1>Create Profile</h1> : <h1>{profile.user.name}</h1>} */}

              {/* <div  className="d-flex flex-column align-content-center justify-content-center">
               <h1 className="h5">Education</h1>
                <Education /></div> */}
              {/* rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px */}
              <div className=" ps-md-4 pe-md-5" >
                <div className="d-flex justify-content-between">
                  <h1 className="h5 pt-2">Experiance</h1>
                  <div className="px-md-2 px-lg-3 px-xxl-5  " >
                    <IconButton className="me-3 " variant='ghost' icon={<MdEdit size={"25"} />} onClick={() => { setEditB((s) => !s) }} />
                    <IconButton className="me-md-4 me-xxl-5" variant='ghost' icon={<FaPlus size={"25"} />} onClick={() => modelSheetClick("Add Experiance")} />
                  </div>
                </div>
                {
                  experiance ? experiance.map(exp => (<Experiance key={exp._id} exp={exp} isEdi={editB} />)) : ""
                }</div>
              <div className=" ps-md-4 pe-md-5" >
                <div className="d-flex justify-content-between">
                  <h1 className="h5 pt-2">Education</h1>
                  <div className="px-md-2 px-lg-3 px-xxl-5 " >
                    <IconButton className="me-3" variant='ghost' icon={<MdEdit size={"25"} />} />
                    <IconButton className="me-md-4 me-xxl-5" variant='ghost' icon={<FaPlus size={"25"} />} onClick={() => modelSheetClick("Add Education")} />
                  </div>
                </div>
                {
                  education ? education.map(edu => (<Education key={edu._id} edu={edu} />)) : ""
                }</div>
              <Button onClick={async () => {

                dispatch(deleteProfileAndUser());
              }} leftIcon={<TiUserDelete />} colorScheme='pink' variant='solid'>
                Settings
              </Button>

            </> : ""}
        </>
        :
        <>
          <h1>Create Account</h1>
        </>
      }
      <Modal allowPinchZoom closeOnEsc="true" closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered size={"xl"} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modelS}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modelS === "Add Education" ? <AddEducation /> : <AddExp />
            }          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;


