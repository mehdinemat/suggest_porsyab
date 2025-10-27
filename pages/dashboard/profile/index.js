import {
  Box,
  Grid,
  GridItem,
  HStack,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";

import Bookmarks from "@/components/dashboard/bookmarks";
import Friends from "@/components/dashboard/friends";
import MyQuestion from "@/components/dashboard/myQuestion";
import Scores from "@/components/dashboard/scores";
import MainLayout from "@/components/mainLayout";
import MobileUserPage from "@/components/profile/MobileUserPage";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiBookmark } from "react-icons/ci";
import { IoPeopleOutline, IoSettingsSharp } from "react-icons/io5";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";



const Index = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const isMobile = useBreakpointValue({ base: true, md: false });



  const { dataMe, isLoadingMe } = useUser();
  const { data: dataQuestions, isLoading: isLoadingQuestions } = useSWR(`user/question?lang=${locale}`)
  const { data: dataRank, isLoading: isLoadingRank } = useSWR(`user/client/my/rank?rate_type=1`)
  const { data: dataRank2, isLoading: isLoadingRank2 } = useSWR(`user/client/my/rank?rate_type=2`)
  const { data: dataRank3, isLoading: isLoadingRank3 } = useSWR(`user/client/my/rank?rate_type=3`)
  const { data: dataSaved, isLoading: isLoadingSaved } = useSWR(`user/action/me?type=save_message`)
  const { data: dataFollowers, isLoading: isLoadingFollowers } = useSWR(dataMe?.data?.[0]?.id && `user/client/follows/${dataMe?.data?.[0]?.id}?query_type=following`)

  const [type, setType] = useState(false)

  const handleResizeQuestions = () => {
    setType(!type)
  }

  return (
    <MainLayout menuDefault={true}>
      {isMobile
        ? <MobileUserPage dataSaved={dataSaved} />
        : <Box
          w="100%"
          alignItems={"center"}
          justifyContent={"center"}
          scrollSnapAlign="start"
          // maxW="container.xl"
          px="34px"
          // p={{ base: "20px", md: "60px" }}
          my={"34px"}
          mt={{ base: "40px", md: "120px" }}
        >
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
            w={"100%"}
            mt={'80px'}
          >
            <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
              <RightSidebar />
            </GridItem>
            <GridItem as={VStack} gap={"8px"} colSpan={7} mr={"8px"}>
              <Grid templateColumns="repeat(3, 1fr)" gap={2} h={"calc( 100% - 50px )"} w={'100%'} >
                <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={2} borderRadius={"15px"} >
                  <VStack w={'100%'} alignItems={'start'} >
                    <Grid templateColumns='repeat(2, 1fr)' gap={2} w={'100%'}>
                      <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'}>
                        <HStack alignItems={'center'} fontSize={'20px'}>
                          <IoSettingsSharp />
                          <Text fontWeight={'bold'}>امتیازات</Text>
                        </HStack>
                        <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={type ? '100%' : '320px'} gap={'10px'} overflowY={'scroll'} mt={'16px'}>
                          <Scores />

                        </Box>
                      </GridItem>
                      {/* <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'}>
                      <HStack alignItems={'center'} fontSize={'20px'}>
                        <HiOutlineBellAlert />
                        <Text fontWeight={'bold'}>اعلان ها</Text>
                      </HStack>
                      <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={type ? '100%' : '320px'} overflowY={'scroll'} mt={'25px'}>
                        <Info />
                        <Info />
                        <Info />

                      </Box>
                    </GridItem> */}
                      <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'}>
                        <HStack alignItems={'center'} fontSize={'20px'}>
                          <CiBookmark />
                          <Text fontWeight={'bold'}>ذخیره شده‌ ها</Text>
                        </HStack>
                        <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={type ? '100%' : '320px'} overflowY={'scroll'} mt={'25px'}>
                          {
                            dataSaved?.data?.actions?.map((item) => (
                              <Bookmarks item={item} />
                            ))
                          }

                        </Box>
                      </GridItem>
                      <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'}>
                        <HStack w={'100%'} justifyContent={'space-between'}>
                          <HStack alignItems={'center'} fontSize={'20px'}>
                            <IoPeopleOutline />
                            <Text fontWeight={'bold'}>دوستان</Text>
                          </HStack>
                          <Text color={'#3646B3'} fontSize={'8px'} cursor={'pointer'}>مشاهده کامل</Text>
                        </HStack>
                        <Box as={VStack} gap={'15px'} w={'100%'} transition="height 0.3s ease" height={type ? '100%' : '320px'} overflowY={'scroll'} mt={'25px'}>
                          {
                            dataFollowers?.data?.map((item) => (
                              <Friends item={item} />
                            ))
                          }

                        </Box>
                      </GridItem>
                    </Grid>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'} >
                  <HStack alignItems={'center'} fontSize={'20px'}>
                    <Text fontWeight={'bold'}>سوالات من</Text>
                  </HStack>
                  <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={'calc( 100% - 70px )'} overflowY={'scroll'} mt={'25px'}>
                    {
                      dataQuestions?.data?.result?.map((item) => (
                        <MyQuestion item={item} />
                      ))
                    }

                  </Box>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box >}
    </MainLayout>
  );
};

export default Index;
