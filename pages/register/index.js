import PhoneInput from "@/components/base/PhoneInput";
import { baseUrl } from "@/components/lib/api";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GoArrowLeft } from "react-icons/go";
import useSWRMutation from "swr/mutation";
import * as Yup from "yup";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Index = () => {
  const [phone, setPhone] = useState("");
  const [fullNumber, setFullNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false)

  const { t } = useTranslation();

  const router = useRouter();
  const toast = useToast();

  const validationSchema = Yup.object({

    email: Yup.string().email("ایمیل اشتباست"),
    password: Yup.string()
      .required("رمز عبور را وارد کنید")
      .min(6, "رمز عبور حداقل باید 6 کاراکتر باشد"),

    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "تکرار رمز عبور اشتباست")
      .required("لطفا تکرار رمز عبور را وارد کنید"),
  });

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "user/auth/register",
    postRequest,
    {
      onSuccess: (data) => {
        if (data?.data?.data?.otp_sended) {
          router.push(
            `/two_step_login/verify_code?username=${encodeURIComponent(fullNumber)}`
          );
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
  const handleRegisterUser = (e) => {

    const clean = fullNumber.replace(/\D/g, ''); // remove non-digits

    if (clean[2] === '0') {
      setPhoneError(true)
      return;
    }

    trigger({ ...e, phone_number: fullNumber });
  };

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
            justifyContent={"center"}
            height={"100%"}
            as={"form"}
            onSubmit={handleSubmit(handleRegisterUser)}
          >
            <Image
              src="/logoheader2.png"
              width={{ base: "120px", md: "165px" }}
              height={{ base: "50px", md: "68px" }}
              onClick={(e) => router.replace("/")}
              cursor={"pointer"}
            />
            <Text fontFamily={'morabba'} fontSize={'24px'} fontWeight={'800'}>
              شـبکه اجتماعی پرسش و پاسخ دیـنی
            </Text>
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
            <Text fontSize={{ base: "20px", md: "18px" }} mt={"0px"} fontWeight={'extrabold'} color={'#979797'} letterSpacing={'-2%'} alignItems={'start'} w={'100%'} onClick={(e) => router.push("/")}>
              {t("create_an_account")}
            </Text>

            <VStack bgColor={'gray.100'} padding={'12px'} borderRadius={'18px'}>
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
              height={"46px"}
              placeholder={t("first_name")}
              {...register("first_name")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.first_name?.message}
            </p> */}
              {/* <Input
              height={"46px"}
              placeholder={t("last_name")}
              {...register("last_name")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.last_name?.message}
            </p> */}
              {/* <Input
              height={"46px"}
              placeholder={t("username")}
              {...register("username")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.username?.message}
            </p> */}
              <Input
                border={'1px'}
                borderColor={'#B7B7B7'}
                borderRadius={'10px'}
                height={"46px"}
                mt={'7px'}
                placeholder={t("password")}
                type="password"
                {...register("password")}
                sx={{
                  "::placeholder": {
                    textAlign: "center", // this line is also needed to target the placeholder itself
                  },
                }}
              />
              <p
                style={{
                  fontSize: "10px",
                  color: "#e4002b",
                  width: "100%",
                  textAlign: "start",
                }}
              >
                {errors.password?.message}
              </p>
              <Input
                border={'1px'}
                borderColor={'#B7B7B7'}
                borderRadius={'10px'}
                height={"46px"}
                placeholder={t("confirm_password")}
                type="password"
                {...register("re_password")}
                sx={{
                  "::placeholder": {
                    textAlign: "center", // this line is also needed to target the placeholder itself
                  },
                }}
              />
              <p
                style={{
                  fontSize: "10px",
                  color: "#e4002b",
                  width: "100%",
                  textAlign: "start",
                }}
              >
                {errors.re_password?.message}
              </p>
              {/* <Input
              height={"46px"}
              placeholder={t("email")}
              {...register("email")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.email?.message}
            </p> */}

              <Button
                w={"100%"}
                leftIcon={<GoArrowLeft />}
                height={"46px"}
                mt={"20px"}
                type="submit"
                isLoading={isMutating}
                bgColor={"#006A71"}
              >
                {t("register")}
              </Button>
              <HStack
                w={"100%"}
                alignItems={"start"}
                onClick={(e) => router.push("/login")}
              >
                {/* <Text>{t("have_account")}</Text> */}
                <Text color={"#29CCCC"} cursor={"pointer"} fontWeight={'extrabold'} fontSize={'16px'} w={'100%'} textAlign={'end'}>
                  {t("log_in_to_your_account")}
                </Text>
              </HStack>
            </VStack>
            {/* <Button
              w={"100%"}
              height={"46px"}
              variant={'outline'}
              colorScheme="teal"
              onClick={e => router.push("/login")}
            >
              ثبت نام
            </Button> */}
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
      </HStack >
    </Box >
  );
};

export default Index;
