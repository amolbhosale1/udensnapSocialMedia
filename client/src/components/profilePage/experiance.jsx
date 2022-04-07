import { delExp } from "../../features/profile/profileSlice";
import { useDispatch } from "react-redux";
import { Box, Button, Divider, Image, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import AddExp from "../profile/addExp";
const Experiance = ({ exp, isEdi, getData }) => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <> <Box maxHeight={"5rem"} marginBottom={3} overflow='hidden' className="row"  >
            <div className='d-flex  m-1 align-items-center pe-lg-4 ' >
                {/* {console.log(exp._id)} */}
                <Image
                    boxSize='4rem'
                    objectFit='cover'
                    src='https://media-exp1.licdn.com/dms/image/C4E0BAQEFsIyAZyuMwA/company-logo_100_100/0/1519904707827?e=1654732800&v=beta&t=pqRDKDu6VTiqIW1JXN1peNzulsYm6YogGOpyubUQeM8'
                    alt='School'
                    className="col-1 me-3"
                    borderRadius="full"
                />
                <div className="d-flex flex-column flex-nowrap col-5 col-sm-6 col-md-8 col-lg-9 col-xl-9">
                    <h2 className='fs-4'>{exp.title}</h2>
                    <h6>{exp.company}</h6>
                    <h6 className='small'>{exp.from}-{exp.to}</h6>
                </div>
                <button
                    className={isEdi ? "btn btn-outline-danger col-2 p-0  col-md-1 p-lg-1 p-xl-2 col-xl-1 " : "d-none"}
                    onClick={() => onOpen()}
                >Edit
                </button>
                <button
                    // onClick={async () => await dispatch(delExp(exp._id))}
                    className={isEdi ? "btn  btn-outline-danger p-0  ms-2 col-2 col-md-1 p-lg-1 p-xl-2  col-xl-1  " : "d-none"}
                    onClick={async () => await dispatch(delExp(exp._id))}
                >Delete
                </button>
            </div>
            <Divider size={"small"} color={"grey"} />
        </Box>
            <Modal allowPinchZoom closeOnEsc="true" closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered size={"xl"} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddExp exp={exp} />
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button onClick={onClose}>Close</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Experiance;