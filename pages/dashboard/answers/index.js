import AnswerEdit from "@/components/admin_dashboard/answers/answerEdit";
import AnswerCard from "@/components/dashboard/answers/answerCard";
import MainLayout from "@/components/mainLayout";
import MobileUserPage from "@/components/profile/MobileUserPage";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Select,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";

const Index = () => {
  const { t } = useTranslation();

  const isMobile = useBreakpointValue({ base: true, md: false });


  const { data: dataAnswer, isLoading: isLoadingAnswer } = useSWR(`user/client/my-answers`)

  return (
    <MainLayout menuDefault={true}>
      {isMobile
        ? <MobileUserPage />
        : <Box
          w="100%"
          alignItems={"center"}
          justifyContent={"center"}
          // maxW="container.xl"
          px="34px"
          // p={{ base: "20px", md: "60px" }}
          my={"34px"}
          mt={{ base: "40px", md: "10px" }}
          scrollSnapAlign="start"
        >
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
            w={"100%"} mt={'80px'}
          >
            <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
              <RightSidebar />
            </GridItem>
            <GridItem as={VStack} gap={"8px"} colSpan={7} mr={"8px"} height={'100%'}>
              <Grid templateColumns="repeat(4, 1fr)" gap={6} w={'100%'} p={'10px'} bgColor={"#F3F3F3"} borderRadius={'15px'} height={'calc( 100% - 70px )'} overflowY={'scroll'}>
                <GridItem w={"100%"} height={"100%"} colSpan={3} borderRadius={"15px"} >
                  <HStack w={'100%'} justifyContent={'space-between'} paddingX={'16px'}>
                    <HStack color="#979797" alignItems={'baseline'}>
                      <Text height={'20px'} fontWeight={'800'} fontSize={'18px'}>مرتب سازی براساس</Text>
                      <Select bgColor={'white'} color={'#3646B3'} height={'40px'} width={'90px'}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </Select>
                    </HStack>
                  </HStack>
                  <Box as={VStack} w={'100%'} height={'calc( 100% - 270px )'} padding={'16px'} gap={'10px'} overflowY={'auto'}>
                    {
                      dataAnswer?.data?.map((answer) => (
                        <AnswerCard data={answer} />
                      ))
                    }
                  </Box>
                </GridItem>
                <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"} padding={'20px'}>
                  <AnswerEdit />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box >}
    </MainLayout>
  );
};

export default Index;
