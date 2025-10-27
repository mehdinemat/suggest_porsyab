import QuestionCard from "@/components/dashboard/questions/questionCard";
import MainLayout from "@/components/mainLayout";
import MobileUserPage from "@/components/profile/MobileUserPage";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Select,
  Text,
  Textarea,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GoPencil } from "react-icons/go";
import { IoArrowBack, IoClose } from "react-icons/io5";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";

const Index = () => {
  const { t } = useTranslation();

  const { data: dataQuestion, isLoading: isLoadingQuestion } = useSWR(`user/client/my-questions`)

  const isMobile = useBreakpointValue({ base: true, md: false });


  useEffect(() => {
    console.log(dataQuestion?.data)
  }, [dataQuestion])

  return (
    <MainLayout menuDefault={true}>
      {
        isMobile
          ? <MobileUserPage />
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
            <Grid mt={'80px'}
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
              w={"100%"}
              gap={2}
            >
              <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
                <RightSidebar />
              </GridItem>
              <GridItem as={VStack} gap={"8px"} colSpan={7} height={'100vh'}>
                <Grid templateColumns="repeat(4, 1fr)" gap={2} w={'100%'} p={'10px'} bgColor={"#F3F3F3"} borderRadius={'15px'} height={'calc( 100% - 70px )'} overflowY={'scroll'}>
                  <GridItem w={"100%"} height={"100%"} colSpan={3} borderRadius={"15px"} >
                    <HStack w={'100%'} justifyContent={'space-between'} paddingX={'16px'}>
                      <HStack color="#979797" alignItems={'baseline'}>
                        <Text height={'20px'} fontWeight={'800'} fontSize={'18px'}>مرتب سازی براساس</Text>
                        <Select bgColor={'white'} height={'40px'} width={'90px'} color={'#3646B3'}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </Select>
                      </HStack>
                    </HStack>
                    <Box as={VStack} w={'100%'} height={'calc( 100vh - 270px )'} padding={'16px'} gap={'10px'} overflowY={'auto'}>
                      {
                        dataQuestion?.data?.map((question) => (
                          <QuestionCard data={question} />
                        ))
                      }
                    </Box>
                  </GridItem>
                  <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"} padding={'20px'}>
                    <VStack w={'100%'} alignItems={'start'} justifyContent={'space-between'} height={'100%'}>
                      <VStack w={'100%'} alignItems={'start'}>
                        <HStack color={'#3646B3'} w={'100%'} alignItems={'center'} justifyContent={'start'} gap={0} fontWeight={'600'} fontSize={'16px'}>
                          <IconButton icon={<GoPencil />} variant={'ghost'} />
                          <Text>ویرایش سوال</Text>
                        </HStack>
                        <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </Select>
                        <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >متن پاسخ</Text>
                        <Textarea bgColor={'#F3F3F3'} />
                        <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >انتخاب مراجع</Text>
                        <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </Select>
                        <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >انتخاب واژگان کلیدی</Text>
                        <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </Select>
                      </VStack>
                      <VStack w={'100%'}>
                        <Button bgColor={'#3646B3'} fontWeight={'800'} fontSize={'14px'} mt={'24px'} leftIcon={<IoArrowBack />} w={'100%'} height={'49px'}>ثبت و ادامه</Button>
                        <Button color={'#FF0000'} fontWeight={'800'} fontSize={'14px'} mt={'8px'} leftIcon={<IoClose />} w={'100%'} variant={'ghost'}>حذف این سوال</Button>
                      </VStack>
                    </VStack>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </Box >
      }

    </MainLayout>
  );
};

export default Index;
