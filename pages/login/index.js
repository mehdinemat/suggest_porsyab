import PhoneInput from "@/components/base/PhoneInput";
import { baseUrl } from "@/components/lib/api";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GoArrowLeft } from "react-icons/go";
import { IoAdd } from "react-icons/io5";
import useSWRMutation from "swr/mutation";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Index = () => {
  const { t } = useTranslation();

  const toast = useToast();

  const router = useRouter();

  const [fullNumber, setFullNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false)

  const { register, setValue, getValues, handleSubmit } = useForm();

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "user/auth",
    postRequest,
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          if (data?.data?.data?.otp_sended) {
            router.push(
              `/two_step_login/verify_code?username=${getValues("username")}`
            );
          } else {
            localStorage.setItem("token", data?.data?.data?.access_token);
            router.push('/')
          }
        } else {
          toast({
            title: "خطا",
            description: data?.data?.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
    }
  );
  const handleLogin = (e) => {
    const clean = fullNumber.replace(/\D/g, ''); // remove non-digits

    if (clean[2] === '0') {
      setPhoneError(true)
      return;
    }
    trigger({ ...e, username: fullNumber });
  };

  const handleClickRegister = () => {
    router.replace("/register");
  };

  const handleForgetPasswordClick = () => {
    router.push('forget_password')
  }

  return (
    <Box
      backgroundImage="url('./bg.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      height="100vh"
      width="100%"
      bgColor="#F1F5F9"
    >
      <HStack height={"100%"}>
        <Box
          w={{ base: "100%", md: "40%" }}
          alignItems={"center"}
          justifyContent={"center"}
          as={HStack}
        >
          <VStack
            w={"350px"}
            mt={"20px"}
            as={"form"}
            onSubmit={handleSubmit(handleLogin)}
            justifyContent={"center"}
            height={"100%"}
          >
            <Image
              cursor={"pointer"}
              onClick={(e) => router.push("/")}
              src="/logoheader2.png"
              width={{ base: "120px", md: "165px" }}
              height={{ base: "50px", md: "68px" }}
            />
            <Text fontFamily={'morabba'} fontSize={'24px'} fontWeight={'800'}>
              شـبکه اجتماعی پرسش و پاسخ دیـنی
            </Text>
            {/* <Image
              cursor={"pointer"}
              onClick={(e) => router.push("/")}
              src="/loginsubtitle.png"
              width={{ base: "220px", md: "465px" }}
              height={{ base: "30px", md: "38px" }}
              mt={'21px'}
            /> */}
            {/* <Text
              fontSize={{ base: "20px", md: "23px" }}
              color={"#333333"}
              textAlign={"center"}
              w={"327px"}
              mb={"20px"}
            >
              {t("religious")}
            </Text> */}
            <Divider w={"350px"} h={"2px"} bgColor={"#ADADAD"} my={'10px'} />
            <Text fontSize={{ base: "20px", md: "18px" }} mb={"10px"} fontWeight={'extrabold'} color={'#979797'} letterSpacing={'-2%'} alignItems={'start'} w={'100%'}>
              {t("log_in_to_your_account")}
            </Text>
            <PhoneInput setFullNumber={setFullNumber} fullNumber={fullNumber} />
            {phoneError && <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              فرمت شماره تلفن با صفر اشتباست (فرمت نمونه 9111111111)
            </p>}
            {/* <Input
              border={'1px'}
              borderColor={'#B7B7B7'}
              color={'black'}
              height={"46px"}
              borderRadius={'10px'}
              placeholder={t("username_or_mobile_number")}
              my={"10px"}
              {...register("username")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            /> */}
            <Input
              border={'1px'}
              borderColor={'#B7B7B7'}
              height={"46px"}
              borderRadius={'10px'}
              type="password"
              placeholder={t("password")}
              mt={"10px"}
              {...register("password")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <HStack w={"100%"} justifyContent={"space-between"}>
              <HStack>
                <Checkbox></Checkbox>
                <Text fontSize={{ base: "15px", md: "18px" }}>
                  {t("remember_me")}
                </Text>
              </HStack>
              <Text color={"#29CCCC"} fontSize={{ base: "15px", md: "16px" }} fontWeight={'extrabold'} cursor={'pointer'} onClick={handleForgetPasswordClick}>
                {t("forgot_password")}
              </Text>
            </HStack>
            <Button
              w={"100%"}
              bgColor={"#006A71"}
              height={"46px"}
              mt={"20px"}
              type="submit"
              leftIcon={<GoArrowLeft />}
              isLoading={isMutating}
            >
              {t("log_in")}
            </Button>
            <HStack
              w={"100%"}
              alignItems={"start"}
              onClick={(e) => router.push("/register")}
            >
              {/* <Text>{t("no_account")}</Text> */}
              <HStack w={'100%'} justifyContent={'end'} alignItems={'center'} style={{ fontWeight: 'bold' }} gap={0}>
                <IoAdd fontSize={'16px'} color={"#29CCCC"} />
                <Text fontSize={'16px'} cursor={"pointer"} color={"#29CCCC"} fontWeight={'extrabold'} >
                  {t("create_account")}
                </Text>
              </HStack>
            </HStack>
            {/* <Button
              variant={"outline"}
              w={"100%"}
              rightIcon={<IoLogoGoogle />}
              height={"46px"}
            >
              ورود با حساب گوگل
            </Button> */}
          </VStack>
        </Box>
        <Box
          position="relative"
          w="60%"
          h="100%"
          display={{ base: "none", md: "flex" }}
        >
          {/* Base / background image */}
          <Image src="/logbg.png" objectFit="cover" w="100%" h="100%" />

          {/* Overlay / centered image */}
          {/* <Image
            src="/loginquestion.png"
            alt="Centered Image"
            position="absolute"
            top="50%"
            left="50%"
            width={"262px"}
            height={"369px"}
            transform="translate(-50%, -50%)"
          /> */}
        </Box>
      </HStack>
    </Box>
  );
};

export default Index;
