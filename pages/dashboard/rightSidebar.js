import {
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  IconButton,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { IoPencil, IoPersonOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import useSWR from "swr";

const menuList = [
  { title: "سوالات", icon: <IoPersonOutline />, link: "questions" },
  { title: "پاسخ ها", icon: <FaQuestion />, link: "answers" },
  {
    title: "دیدگاه ها", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 20C13.1811 20 14.8245 19.5308 16.2223 18.6518C17.6202 17.7727 18.7096 16.5233 19.353 15.0615C19.9963 13.5997 20.1646 11.9911 19.8367 10.4393C19.5087 8.88743 18.6991 7.46197 17.5104 6.34315C16.3217 5.22433 14.8071 4.4624 13.1583 4.15372C11.5094 3.84504 9.80036 4.00347 8.24719 4.60897C6.69402 5.21447 5.3665 6.23985 4.43251 7.55544C3.49852 8.87103 3 10.4178 3 12C3 13.3227 3.34 14.5689 3.94444 15.6684L3 20L7.60228 19.1111C8.76961 19.6791 10.0956 20 11.5 20Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    , link: "comments"
  },
  {
    title: "پسند ها", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3518 12.9526C18.7112 16.1557 16.296 19.1718 12.9071 19.8458C11.2543 20.1749 9.53973 19.9742 8.00759 19.2723C6.47545 18.5703 5.20383 17.4028 4.3738 15.9361C3.54377 14.4694 3.19764 12.7782 3.38469 11.1033C3.57174 9.42845 4.28245 7.85527 5.4156 6.60781C7.7398 4.04786 11.6643 3.34316 14.8674 4.62442" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.46106 11.6714L11.6642 14.8745L19.3518 6.54633" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    , link: "likes"
  },
  // { title: "حسنات", icon: <BsReply />, link: "users" },
];

const RightSidebar = () => {

  const { data: dataMe, isLoading: isLoadingMe } = useSWR(`user/client/me`)

  const [activePage, setActivePage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setActivePage(router.asPath);
  }, [router]);

  const getLastPathSegment = (path) => {
    const segments = path.split("/").filter(Boolean);
    return _.last(segments);
  };

  const handleClickLink = (link) => {
    router.push(`/dashboard/${link}`);
  };

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
    <VStack
      w={"100%"}
      alignItems={"center"}
      border={"1px"}
      borderRadius={"15px"}
      borderColor={"gray.200"}
      padding={"10px"}
      pt={"10px"}
      bgColor={"#3646B3"}
      height={'calc( 100vh - 70px )'}
    >
      <Card bgColor={'#F7F7F71A'} height={'360px'} width={'100%'} borderRadius={'10px'} position={'relative'} as={VStack} cursor={'pointer'}>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <Button position={'absolute'} top={'10px'} right={'10px'} bg={'#F9C96D1A'} color={'#F9C96D'} variant={'outline'} borderRadius={'5px'} w={'70px'} h={'22px'} fontSize={'8px'} leftIcon={<Image src="/orange_star.png" w={'10px'} h={'10px'} />}>سطح مبتدی</Button>
          <IconButton icon={<IoPencil />} bgColor={'#3646B3'} position={'absolute'} top={'10px'} left={'10px'} height={'25px'} width={'22px'} borderRadius={'5px'} />
        </HStack>
        <Box border={'5px solid #F9C96D'} borderRadius={'100%'} mt={'30px'}
          boxShadow="0px 0px 133.2px 2px #F9C96D"
        >
          <Avatar height={'109'} width={'109'} onClick={e => handleClickProfile()}
          />
        </Box>
        {/* <Image src="/start.png" position={'absolute'} top={'120px'} onClick={e => handleClickProfile()} /> */}
        <Text color={'white'} fontSize={'15px'} fontWeight={'900'} onClick={e => handleClickProfile()} >{dataMe?.data?.[0]?.first_name} {dataMe?.data?.[0]?.last_name}</Text>
        <Text fontWeight={'300'} fontSize={'10px'} color={'white'} onClick={e => handleClickProfile()} >{dataMe?.data?.[0]?.email}</Text>
        <HStack w={'100%'} padding={'10px'}>
          <Button bgColor={'#3646B3'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollower()}>دنبال کننده‌ها</Button>
          <Button bgColor={'#3646B3'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollowing()}>دنبال شونده‌ها</Button>
        </HStack>
      </Card>
      {/* <Text fontWeight={'bold'} fontSize={'20px'}>حسن الماسی</Text>
      <Text fontSize={'sm'}>مدیر</Text> */}
      {/* <Text fontSize={'sm'}>آخرین فعالیت: ۳ روز پیش</Text> */}
      {/* <Divider my={'20px'} /> */}
      <VStack
        w={"100%"}
        alignItems={"start"}
        padding={"0px"}
        mt={"24px"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <VStack w={"100%"} gap={'10px'}>
          {menuList?.map((item, index) => (
            <HStack
              position={"relative"}
              cursor={"pointer"}
              onClick={(e) => handleClickLink(item?.link)}
              bgColor={
                getLastPathSegment(activePage) == item?.link
                  ? "white"
                  : "#F7F7F71A"
              }
              w={"100%"}
              borderRadius={"10px"}
            >

              <IconButton
                icon={item?.icon}
                color={
                  getLastPathSegment(activePage) == item?.link
                    ? "#3646B3"
                    : "white"
                }
                fontSize={"20px"}
              />
              <Text
                fontWeight={"extrabold"}
                color={
                  getLastPathSegment(activePage) == item?.link
                    ? "#3646B3"
                    : "white"
                }
                fontSize={"10px"}
              >
                {item?.title}
              </Text>
            </HStack>
          ))}
        </VStack>
        <HStack
          position={"relative"}
          cursor={"pointer"}
          // onClick={(e) => handleClickLink(item?.link)}
          w={"100%"}
          borderRadius={"10px"}
          bgColor={"#F7F7F71A"}
          justifyContent={"center"}
          gap={0}
        >
          <IconButton icon={<RxExit />} fontSize={"20px"} />
          <Text
            color={"white"}
            textAlign={"center"}
            fontWeight={"800"}
            fontSize={"10px"}
          >
            خروج از حساب
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default RightSidebar;
