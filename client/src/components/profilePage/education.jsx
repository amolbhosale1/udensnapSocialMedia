import { delEducation } from "../../features/profile/profileSlice";
import { useDispatch } from "react-redux";
import { Box, Divider, Image } from '@chakra-ui/react'
const Education = ({ edu }) => {
  const dispatch = useDispatch();
  return (
      <> <Box maxHeight={"5rem"} marginBottom={3} overflow='hidden' className="row"   >
              <div className='profile  d-flex  m-1 align-items-center' >
                  {/* {console.log(exp._id)} */}
                  <Image
                      boxSize='4rem'
                      objectFit='cover'
                      src='https://media-exp1.licdn.com/dms/image/C4E0BAQEFsIyAZyuMwA/company-logo_100_100/0/1519904707827?e=1654732800&v=beta&t=pqRDKDu6VTiqIW1JXN1peNzulsYm6YogGOpyubUQeM8'
                      alt='School'
                      className="col-1 me-3"
                      borderRadius="full"
                  />
                  <div className="d-flex flex-column flex-nowrap col-6 col-md-8 col-lg-10">
                      <h2 className='fs-4'>{edu.title}</h2>
                      <h6>{edu.company}</h6>
                      <h6 className='small'>{edu.from}</h6>
                  </div>
                  <button
                      // onClick={async () => await dispatch(delExp(edu._id))}
                      className="btn btn-danger col-3 col-md-2 col-lg-1"
                      onClick={async()=>await dispatch(delEducation(edu._id))}
                  >Delete
                  </button>
              </div>
              <Divider color={"grey"} />
          </Box>
      </>
  )
}


export default Education;

