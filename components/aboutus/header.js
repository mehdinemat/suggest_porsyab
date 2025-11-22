import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaHeadphonesAlt } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";



const menuList = [
  {
    title: "صفحه اصلی",
    icon: <MdKeyboardVoice fontSize={"18px"} />,
    link: "audio",
  },
  { title: "تصویر به متن", icon: <IoDocuments fontSize={"18px"} /> },
  { title: "صوت به متن", icon: <FaHeadphonesAlt fontSize={"18px"} /> },
  // { title: 'ارتباط دادن نماز جمعه و حاکمیت', icon: <FaPrayingHands fontSize={'18px'} /> },
  // { title: 'صفحه مسئولین', icon: <BsFillPersonFill fontSize={'18px'} /> },
  // { title: 'بانک اطلاعات مسائل مربوط نماز جمعه', icon: <IoFileTrayStacked fontSize={'18px'} /> },
  // { title: 'توصیف خطبه', icon: <FaFile fontSize={'18px'} /> },
];

const siteData = [
  {
    title: "سوال",
    number: "234",
  },
  {
    title: "برچسب",
    number: "52353",
  },
  {
    title: "مرجع",
    number: "43",
  },
  {
    title: "منبع",
    number: "2",
  },
  {
    title: "زبان",
    number: "3",
  },
];

const Header = ({ children }) => {
  const router = useRouter();

  return (
    <Box pt={{ base: "60px", md: "80px" }} scrollSnapAlign="start" w={"100%"}>
      <Box
        as={Stack}
        justifyContent={"center"}
        alignItems={"start"}
        width="100%"
        height={{base:"600" ,md:"538px"}}
        bg={"#3646B3"}
        p={2}
        px={4}
        bgImage={{ base: "/aboutusbg2.jpg", md: "/aboutusbg.jpg" }}
        bgSize="cover" // 👈 this makes it cover the container
        bgRepeat="no-repeat"
        bgPosition="center"
      >
        <HStack
          height={"500px"}
          w={"100%"}
          alignItems={"start"}
          justifyContent={"space-between"}
          maxW="container.xl"
        >
          <VStack
            w={"100%"}
            alignItems={"start"}
            justifyContent={"center"}
            height={"100%"}
            mt={{base:'90px' , md:'0px'}}
          >
            <Stack
              maxW="80%"
              mx="auto"
              py={4}
              top={"0px"}
              textAlign={"start"}
              gap={0}
              // position={"absolute"}
            >
              <HStack>
                <Text
                  fontFamily={"morabba"}
                  fontSize={{ base: "25px", md: "64px" }}
                  color={"white"}
                  fontWeight={"800"}
                >
                  درباره
                </Text>
                <Text
                  fontFamily={"morabba"}
                  fontSize={{ base: "25px", md: "64px" }}
                  fontWeight={"800"}
                  color={"#29CCCC"}
                >
                  پارسا
                </Text>
              </HStack>
              <Text
                fontFamily={"morabba"}
                color={"white"}
                fontWeight={"bold"}
                fontSize={{ base: "18px", md: "26px" }}
                my={"0px"}
              >
                شبکه اجتماعی پرسش و پاسخ دینی
              </Text>
              {/* <Text color={'white'} w={'470px'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</Text> */}
            </Stack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
