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
import axios from "axios";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSWRMutation from "swr/mutation";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Index = () => {
  const toast = useToast();

  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone");
  const username = searchParams.get("username");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  const { register, setValue, getValues, handleSubmit } = useForm();

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "user/auth/verify-code",
    postRequest,
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          localStorage.setItem("token", data?.data?.data?.access_token);
          if (username) {
            router.replace("/");
          } else {
            router.replace("/login/reset_password");
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

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ""); // Only digits
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if filled
    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleAddVerifyCode = (e) => {
    e.preventDefault();
    trigger({
      code: otp?.join(""),
      username: username || phone,
    });
  };

  const handleLoginClick = () => {
    router.push("/");
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
            as={"form"}
            onSubmit={handleAddVerifyCode}
            justifyContent={"center"}
            height={"100%"}
          >
            <Image
              src="/logoheader2.png"
              width={{ base: "120px", md: "165px" }}
              height={"68px"}
              onClick={handleLoginClick}
              cursor={"pointer"}
            />
            <Text
              fontSize={{ base: "20px", md: "23px" }}
              color={"#333333"}
              textAlign={"center"}
              w={"327px"}
              mb={"20px"}
            >
              {t("religious")}
            </Text>
            <Divider w={"350px"} h={"2px"} bgColor={"#29CCCC"} />
            <Text
              fontSize={{ base: "20px", md: "22px" }}
              mt={"20px"}
              mb={"10px"}
            >
              {t("login_code")}
            </Text>
            <HStack spacing={3} dir="ltr">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  textAlign="center"
                  height="46px"
                  width="46px"
                  fontSize="2xl"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  placeholder="-"
                />
              ))}
            </HStack>
            <Button
              w={"100%"}
              bgColor={"#006A71"}
              height={"46px"}
              my={"20px"}
              type="submit"
              isLoading={isMutating}
            >
              {t("login")}
            </Button>
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

        </Box>
      </HStack>
    </Box>
  );
};

export default Index;
