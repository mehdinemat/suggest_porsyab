import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Select,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";

import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import MiniHeader from "@/components/profile/miniHeader";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import RightSidebar from "../rightSidebar";

const patchRequest = (url, { arg: { id, ...data } }) => {
  return axios.patch(baseUrl + url + id);
}

const Index = () => {
  const { t } = useTranslation();

  const currentSize = useBreakpointValue({ base: "base", md: "md", lg: "lg" });


  const { dataMe } = useUser()

  const router = useRouter()

  const { data: dataFollowing, mutate: mutateFollowing } = useSWR(dataMe?.data?.[0]?.id && `user/client/follows/${dataMe?.data?.[0]?.id}?query_type=following`)

  const { data: dataClientsList, isLoading: isLoadingClientList } = useSWR(`user/client?page=1&size=10`)

  const { trigger: triggerFollow, isLoading: isLoadingFollow } = useSWRMutation(`user/client/flow-action/`, patchRequest, {
    onSuccess: () => {
      mutateFollowing()
    }
  })

  const [type, setType] = useState(false)

  const handleResizeQuestions = () => {
    setType(!type)
  }

  const handleFollow = (id) => {
    triggerFollow({ id: id })
  }

  const handleClickProfile = () => {
    router.replace('/dashboard/profile')
  }
  const handleClickFollowing = () => {
    router.push(`/dashboard/followings`)
  }
  const handleClickFollower = () => {
    router.push(`/dashboard/followers`)
  }

  return (
    <MainLayout menuDefault={true}>
      <Box
        scrollSnapAlign="start"
        w={{ base: '100%', md: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
        // maxW="container.xl"
        px={{ base: "14px", md: '34px' }}
        // p={{ base: "20px", md: "60px" }}
        my={"34px"}
        mt={{ base: "40px", md: "10px" }}
      >
        {currentSize == 'base' && <MiniHeader handleClickProfile={handleClickProfile} handleClickFollower={handleClickFollower} handleClickFollowing={handleClickFollowing} />}
        <Grid mt={{ base: '10px', md: '80px' }}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
          w={"100%"}
        >
          <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
            <RightSidebar />
          </GridItem>
          <GridItem as={VStack} gap={"8px"} colSpan={7} mr={{ base: '0px', md: "8px" }} bgColor={'#F3F3F3'} padding={'12px'} borderRadius={'15px'}>
            <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
              <HStack>
                <Text fontSize={{ base: '10px', md: '18px' }} fontWeight={'600'} color={'#979797'}>مرتبط سازی بر اساس</Text>
                <Select w={{ base: '89px', md: '120px' }} bgColor={'white'} color={'#3646B3'} height={{ base: '25px', md: '40px' }} borderRadius={'13px'}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Select>
              </HStack>
              <HStack color={'white'} borderRadius={'10px'}>
                <Button bgColor={'#C2C2C2'} borderRadius={'10px'} h={{ base: '24px', md: '40px' }} fontSize={{ base: '7px', md: '14px' }}>دنبال شونده ها</Button>
                <Button bgColor={'#C2C2C2'} borderRadius={'10px'} h={{ base: '24px', md: '40px' }} fontSize={{ base: '7px', md: '14px' }}>دنبال کننده ‌ها</Button>
                <Button bgColor={'#3646B3'} borderRadius={'10px'} h={{ base: '24px', md: '40px' }} fontSize={{ base: '7px', md: '14px' }}>همه</Button>
              </HStack>
            </HStack>
            <Grid templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }} gap={{ base: '12px', md: '70px' }} w={'100%'} mt={'30px'}>
              {
                dataClientsList?.data?.result?.map((item) => (
                  <Card bgColor={'white'} height={'fit-content'} as={VStack} padding={'5px'} justifyContent={'space-between'} boxShadow={`
        0px 11px 24px 0px #0000000D,
        0px 43px 43px 0px #0000000A,
        0px 96px 58px 0px #00000008,
        0px 171px 69px 0px #00000003,
        0px 268px 75px 0px #00000000
      `} borderRadius={'13px'}>
                    <VStack w={'100%'}>
                      <Avatar height={{ base: '90px', md: '195px' }} w={{ base: '88px', md: '205px' }} />
                      <Text fontSize={{ base: '10px', md: '15px' }} fontWeight={'bold'}>{item?.first_name || 'نامشخص'} {item?.last_name}</Text>
                      {/* <Text>mohammadi@gmail.com</Text> */}
                    </VStack>
                    {
                      dataFollowing?.data?.find((user) => (
                        user?.id == item?.id
                      ))
                        ? <Button color={'#29CCCC'} w={'100%'} height={'30px'} fontSize={{ base: '10px', md: '14px' }} borderRadius={'10px'} onClick={e => handleFollow(item?.id)} variant={'outline'}>لغو دنبال کردن</Button>
                        :
                        <Button bgColor={'#29CCCC'} w={'100%'} height={'30px'} fontSize={{ base: '10px', md: '14px' }} borderRadius={'10px'} onClick={e => handleFollow(item?.id)}>دنبال کردن</Button>
                    }
                  </Card>
                ))
              }
            </Grid>
          </GridItem>
        </Grid>
      </Box >
    </MainLayout>
  );
};

export default Index;
