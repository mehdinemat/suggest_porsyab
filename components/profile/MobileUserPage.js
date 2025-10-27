import { useUser } from "@/context/UserContext";
import { Avatar, Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import QuestionCard from "../questionCars";
import Profile from "./profile";


const MobileUserPage = ({ dataSaved }) => {

  const { dataMe } = useUser()


  const { data: dataQuestion, isLoading: isLoadingQuestion } = useSWR(`user/client/my-questions`)


  const [activePage, setActivePage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setActivePage(router.asPath);
  }, [router]);

  const getLastPathSegment = (path) => {
    const segments = path.split("/").filter(Boolean);
    return _.last(segments);
  };


  return (
    <Box scrollSnapAlign="start" w={'100%'} padding={'12px'}>
      {getLastPathSegment(activePage) === "profile" && <Profile />}
      {getLastPathSegment(activePage) === "questions" && <Box as={VStack} w={'100%'} height={'calc( 100vh - 270px )'} padding={'16px'} gap={'10px'} overflowY={'auto'}>
        {
          dataQuestion?.data?.map((question) => (
            <QuestionCard data={question} />
          ))
        }
      </Box>}
      <Flex
        position="fixed"
        bottom="10px"
        left="0"
        right="0"
        bg="#3646B3"
        w={'calc( 100% - 20px )'}
        mx="auto"
        boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
        justify="space-around"
        align="center"
        h="71px"
        borderTop="1px solid"
        borderColor="gray.200"
        borderRadius={'15px'}
        zIndex="1000"
      >
        <Link href="/dashboard/profile">
          <Button
            variant="ghost"
            bg={getLastPathSegment(activePage) === "profile" ? "#4A58BA" : "none"}
            color={getLastPathSegment(activePage) === "profile" ? "#29CCCC" : "gray.500"}
            borderRadius={'999px'}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            // _hover={{ bg: "teal.100" }}
            textAlign={'center'}
          >
            <Avatar h={getLastPathSegment(activePage) === "profile" ? '18px' : '32px'} w={getLastPathSegment(activePage) === "profile" ? '18px' : '32px'} />
            {/* 👇 show text only if condition is true */}
            {getLastPathSegment(activePage) === "profile" && (
              <span style={{ fontSize: "12px", marginRight: '10px' }}>پروفایل</span>
            )}
          </Button>
        </Link>
        <Link href="/dashboard/questions">
          <Button
            variant="ghost"
            bg={getLastPathSegment(activePage) === "questions" ? "#4A58BA" : "transparent"}
            color={getLastPathSegment(activePage) === "questions" ? "#29CCCC" : "gray.500"}
            borderRadius={'999px'}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            // _hover={{ bg: "teal.100" }}
            textAlign={'center'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.00039 7.58422C6.99787 7.64899 7.00755 7.71362 7.02885 7.77416C7.05014 7.8347 7.0826 7.88987 7.12422 7.93626C7.16584 7.98266 7.21575 8.0193 7.27088 8.04394C7.32601 8.06858 7.38519 8.0807 7.44478 8.07955H8.96602C9.22048 8.07955 9.42331 7.85294 9.4565 7.57821C9.62245 6.2627 10.4522 5.30414 11.931 5.30414C13.196 5.30414 14.354 5.99198 14.354 7.64639C14.354 8.91979 13.6643 9.50535 12.5746 10.3957C11.3336 11.3763 10.3508 12.5214 10.4209 14.3803L10.4264 14.8155C10.4283 14.9471 10.4778 15.0725 10.564 15.1648C10.6502 15.2571 10.7664 15.3088 10.8874 15.3088H12.3828C12.5051 15.3088 12.6223 15.256 12.7088 15.162C12.7952 15.068 12.8438 14.9404 12.8438 14.8075V14.5969C12.8438 13.1571 13.3472 12.738 14.7062 11.617C15.8291 10.6885 17 9.65775 17 7.49398C17 4.4639 14.6472 3 12.0712 3C9.73493 3 7.17557 4.18315 7.00039 7.58422ZM9.87138 19.141C9.87138 20.2099 10.6551 21 11.7337 21C12.8567 21 13.6293 20.2099 13.6293 19.141C13.6293 18.0341 12.8549 17.256 11.7319 17.256C10.6551 17.256 9.87138 18.0341 9.87138 19.141Z" fill="#29CCCC" />
            </svg>

            {/* 👇 show text only if condition is true */}
            {getLastPathSegment(activePage) === "questions" && (
              <span style={{ fontSize: "12px" }}>سوالات</span>
            )}
          </Button>
        </Link>
        <Link href="/dashboard/answers">
          <Button
            variant="ghost"
            bg={getLastPathSegment(activePage) === "answers" ? "#4A58BA" : "transparent"}
            color={getLastPathSegment(activePage) === "answers" ? "#29CCCC" : "gray.500"}
            borderRadius={'999px'}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            // _hover={{ bg: "teal.100" }}
            textAlign={'center'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4445 8.26665V4L23 11.4666L14.4445 18.9333V14.56C8.33333 14.56 4.05554 16.2666 1 20C2.2222 14.6666 5.88887 9.33335 14.4445 8.26665Z" stroke="#29CCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            {/* 👇 show text only if condition is true */}
            {getLastPathSegment(activePage) === "answers" && (
              <span style={{ fontSize: "12px", marginRight: '5px' }}>پاسخ‌ها</span>
            )}
          </Button>
        </Link>
        <Link href="/dashboard/comments">
          <Button
            variant="ghost"
            bg={getLastPathSegment(activePage) === "comments" ? "#4A58BA" : "transparent"}
            color={getLastPathSegment(activePage) === "comments" ? "#29CCCC" : "gray.500"}
            borderRadius={'999px'}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            // _hover={{ bg: "teal.100" }}
            textAlign={'center'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 20C13.1811 20 14.8245 19.5308 16.2223 18.6518C17.6202 17.7727 18.7096 16.5233 19.353 15.0615C19.9963 13.5997 20.1646 11.9911 19.8367 10.4393C19.5087 8.88743 18.6991 7.46197 17.5104 6.34315C16.3217 5.22433 14.8071 4.4624 13.1583 4.15372C11.5094 3.84504 9.80036 4.00347 8.24719 4.60897C6.69402 5.21447 5.3665 6.23985 4.43251 7.55544C3.49852 8.87103 3 10.4178 3 12C3 13.3227 3.34 14.5689 3.94444 15.6684L3 20L7.60228 19.1111C8.76961 19.6791 10.0956 20 11.5 20Z" stroke="#29CCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            {/* 👇 show text only if condition is true */}
            {getLastPathSegment(activePage) === "comments" && (
              <span style={{ fontSize: "12px", marginRight: '5px' }}>دیدگاه‌ها</span>
            )}
          </Button>
        </Link>
        <Link href="/dashboard/likes">
          <Button
            variant="ghost"
            bg={getLastPathSegment(activePage) === "likes" ? "#4A58BA" : "transparent"}
            color={getLastPathSegment(activePage) === "likes" ? "#29CCCC" : "gray.500"}
            borderRadius={'999px'}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            // _hover={{ bg: "teal.100" }}
            textAlign={'center'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.3518 12.9526C18.7112 16.1557 16.296 19.1718 12.9071 19.8458C11.2543 20.1749 9.53973 19.9742 8.00759 19.2723C6.47545 18.5703 5.20383 17.4028 4.3738 15.9361C3.54377 14.4694 3.19764 12.7782 3.38469 11.1033C3.57174 9.42845 4.28245 7.85527 5.4156 6.60781C7.7398 4.04786 11.6643 3.34316 14.8674 4.62442" stroke="#29CCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.46106 11.6714L11.6642 14.8745L19.3518 6.54633" stroke="#29CCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            {/* 👇 show text only if condition is true */}
            {getLastPathSegment(activePage) === "likes" && (
              <span style={{ fontSize: "12px", marginRight: '5px' }}>پسندها</span>
            )}
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}

export default MobileUserPage
