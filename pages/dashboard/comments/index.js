import CommentEdit from "@/components/admin_dashboard/comments/commentEdit";
import CommentCard from "@/components/dashboard/comments/commentCard";
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
import RightSidebar from "../rightSidebar";

const Index = () => {
  const { t } = useTranslation();

  const isMobile = useBreakpointValue({ base: true, md: false });


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
          scrollSnapAlign="start"
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
            <GridItem as={VStack} gap={"8px"} colSpan={7} mr={"8px"}>

              <Box
                w={"100%"}
                height={"calc( 100% - 70px )"}
                bgColor={"#F3F3F3"}
                borderRadius={"15px"}
                padding={'10px'}
              >
                <Grid templateColumns="repeat(4, 1fr)" gap={6} w={'100%'} height={"calc( 100% - 10px )"} overflowY={'scroll'}>
                  <GridItem bgColor={"#F3F3F3"} w={"100%"} colSpan={3} borderRadius={"15px"} >
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
                    <Box as={VStack} w={'100%'} height={'calc( 100vh - 70px )'} paddingY={'16px'} gap={'10px'} overflowY={'auto'}>
                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                      <CommentCard />
                    </Box>
                  </GridItem>
                  <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"} padding={'20px'}>
                    <CommentEdit />
                  </GridItem>
                </Grid>
              </Box>
            </GridItem>
          </Grid>
        </Box >}
    </MainLayout>
  );
};

export default Index;
