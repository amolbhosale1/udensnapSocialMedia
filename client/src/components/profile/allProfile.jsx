import { Link } from "react-router-dom";
import { useAllprosQuery } from "../../features/profile/profileSlice";
import { Image, Center, InputGroup, InputLeftElement, Input, Box, Flex, IconButton, Spacer, Grid, GridItem } from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
const AllProfile = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useAllprosQuery();
  //console.log(profile!==null? profile[2]:"");
  console.log(data);
  const educations = data !== null ? data?.map((edu) => (
    <Center >
      <Grid width={{ base: "100%", lg: "75%", xl: "55%" }} padding={4} margin={2} bgGradient='linear(#e2e8f0 0%, #e2e8f0 25%, yellow.100 50%)' >
        <GridItem colStart={1} colEnd={13} >
          <Link to={`/profile/${edu.user._id}`} key={edu._id}  >
            <Grid >
              <GridItem  colSpan={1}>
                <Image borderRadius={"full"} boxSize={70} src={edu.user.avator} />
              </GridItem>
              <GridItem colStart={2} colEnd={6} ><Flex direction={"column"}>
                <h2 className="h3">{edu.user.name}</h2>
                <h3 >{edu.skills[0] + ",..."} &ensp; {(edu.experiance[0])?.title}</h3>
              </Flex></GridItem>
            </Grid>
          </Link>
        </GridItem>
        <GridItem colStart={13} colEnd={13} alignSelf="center" >
          <IconButton
            alignSelf={"center"}
            colorScheme='blue'
            aria-label='Search database'
            icon={<AiOutlineUserAdd size={25} />}
          /></GridItem>
      </Grid>
    </Center>
  )) : "";

  return (
    <>
      {/* //    <h1>{arr['0'].date}</h1> */}
      <Center>
        <InputGroup marginY={4} width={{ base: "100%", lg: "55%" }}>
          <InputLeftElement
            pointerEvents='none'
            children={<FiSearch color='gray.300' />}
          />
          <Input variant={"filled"} type='search' placeholder='Search' />
        </InputGroup>
      </Center>
      {educations}

    </>
  );
}

export default AllProfile;
{/* //  View Profile */ }
{/* <ul >
            {edu.skills.slice(0, 3).map((skill, index) => (
              <li key={index} className='text-primary d-inline' >
                {skill+","} 
              </li>
            ))}
          </ul> */}