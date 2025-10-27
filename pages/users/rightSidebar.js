import { baseUrl } from "@/components/lib/api";
import {
  Avatar,
  Button,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { GiGlobeRing } from "react-icons/gi";
import {
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import useSWRMutation from "swr/mutation";

const menuList = [
  { title: "پروفایل", icon: <IoPersonOutline />, link: "profile" },
  { title: "پرسش‌ها", icon: <FaQuestion />, link: "questions" },
  { title: "پاسخ‌ها", icon: <BsReply />, link: "answers" },
  { title: "نوشته‌ها", icon: <CiFileOn />, link: "profile" },
  { title: "حسنات", icon: <GiGlobeRing />, link: "goods" },
  { title: "دوستان", icon: <IoPeopleOutline />, link: "friends" },
  { title: "حساب کاربری", icon: <IoSettingsOutline />, link: "account" },
];

const patchRequest = (url, { arg: { id, ...data } }) => {
  return axios.patch(baseUrl + url + `${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const RightSidebar = ({
  user: { first_name, last_name, username, id, is_following, ...user },
  mutate,
}) => {
  const { trigger: triggerUserFollow, isLoading: isLoadingUserFollow, isMutating: isMutatingFollow } =
    useSWRMutation(`user/client/flow-action/`, patchRequest, {
      onSuccess: () => {
        mutate();
      },
    });

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
    router.push(link);
  };

  return (
    <VStack
      w={"100%"}
      alignItems={"center"}
      justifyContent={"start"}
    >
      <HStack alignItems={'center'}>
        <Avatar borderRadius={'10px'} w={{ base: '140px', md: '297px' }} h={{ base: '140px', md: '297px' }} />
        {/* {is_following ? (
          <Button
            bgColor={"#29CCCC"}
            color={"white"}
            _hover={{ bgColor: "white", color: "#29CCCC" }}
            variant={"outline"}
            onClick={(e) => {
              triggerUserFollow({ id: id });
            }}
          >
            آنفالو کردن
          </Button>
        ) : (
          <Button
            color={"#29CCCC"}
            _hover={{ bgColor: "#29CCCC", color: "white" }}
            variant={"outline"}
            onClick={(e) => {
              triggerUserFollow({ id: id });
            }}
            isLoading={isMutatingFollow}
          >
            دنبال کردن
          </Button>
        )} */}
        <VStack w={'100%'} alignItems={'start'} mr={'30px'}>
          <Button bgColor={'#F9C96D1A'} color={'#CC8600'} borderRadius={'5px'} border={'0.5px solid #F9C96D'} leftIcon={<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.3872 4.69136L8.34608 3.44452L8.49115 1.79402L6.9508 1.42624L6.14435 0L4.6936 0.654817L3.24285 0L2.43641 1.42624L0.896051 1.78953L1.04113 3.44003L0 4.69136L1.04113 5.9382L0.896051 7.59318L2.43641 7.96096L3.24285 9.3872L4.6936 8.7279L6.14435 9.38272L6.9508 7.95647L8.49115 7.5887L8.34608 5.9382L9.3872 4.69136Z" fill="#F9C96D" />
          </svg>
          }>سطح مبتدی</Button>
          <HStack>
            <Text fontWeight={"bold"} fontSize={{ base: '20px', md: "40px" }}>
              {first_name || ""}{last_name || ""}
            </Text>
          </HStack>
          {/* <Text fontWeight={"extrabold"} fontSize={"20px"} >
            مشخصاتبایو
          </Text> */}
          <Text fontWeight={"400"} fontSize={{ base: '10px', md: "18px" }} color={'#333333'}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.          </Text>
        </VStack>
        {/* <Text fontSize={"md"} color={"gray.500"}>
          {username}
        </Text> */}
      </HStack>

      {/* <Text fontSize={"sm"}>۱۲ سال سابقه عضویت در پارسا</Text>
      <Text fontSize={"sm"}>آخرین فعالیت: ۳ روز پیش</Text> */}
    </VStack>
  );
};

export default RightSidebar;
