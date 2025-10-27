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
  VStack
} from "@chakra-ui/react";

import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import { useUser } from "@/context/UserContext";
import axios from "axios";
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

  const { dataMe } = useUser()

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

  return (
    <MainLayout menuDefault={true}>
      <Box
        scrollSnapAlign="start"
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        // maxW="container.xl"
        px="34px"
        // p={{ base: "20px", md: "60px" }}
        my={"34px"}
        mt={{ base: "40px", md: "120px" }}
      >
        <Grid mt={'80px'}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
          w={"100%"}
        >
          <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
            <RightSidebar />
          </GridItem>
          <GridItem as={VStack} gap={"8px"} colSpan={7} mr={"8px"} bgColor={'#F3F3F3'} padding={'12px'} borderRadius={'15px'}>
            <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
              <HStack>
                <Text fontSize={'18px'} fontWeight={'bold'} color={'#979797'}>مرتبط سازی بر اساس</Text>
                <Select w={'120px'} bgColor={'white'} color={'#3646B3'} height={'40px'} borderRadius={'13px'}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Select>
              </HStack>
              <HStack color={'white'} borderRadius={'10px'}>
                <Button bgColor={'#C2C2C2'} borderRadius={'10px'}>دنبال شونده ها</Button>
                <Button bgColor={'#C2C2C2'} borderRadius={'10px'}>دنبال کننده ‌ها</Button>
                <Button bgColor={'#3646B3'} borderRadius={'10px'}>همه</Button>
              </HStack>
            </HStack>
            <Grid templateColumns='repeat(4, 1fr)' gap={'70px'} w={'auto'} mt={'30px'}>
              {
                dataClientsList?.data?.result?.map((item) => (
                  <Card bgColor={'white'} height={'300px'} as={VStack} padding={'5px'} justifyContent={'space-between'}>
                    <VStack w={'100%'}>
                      <Avatar height={'195px'} w={'205px'} />
                      <Text fontSize={'15px'} fontWeight={'bold'}>{item?.first_name} {item?.last_name}</Text>
                      {/* <Text>mohammadi@gmail.com</Text> */}
                    </VStack>
                    {
                      dataFollowing?.data?.find((user) => (
                        user?.id == item?.id
                      ))
                        ? <Button color={'#29CCCC'} w={'100%'} height={'30px'} borderRadius={'10px'} onClick={e => handleFollow(item?.id)} variant={'outline'}>لغو دنبال کردن</Button>
                        :
                        <Button bgColor={'#29CCCC'} w={'100%'} height={'30px'} borderRadius={'10px'} onClick={e => handleFollow(item?.id)}>دنبال کردن</Button>
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
