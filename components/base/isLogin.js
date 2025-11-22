import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const IsLogin = ({ type }) => {
  const router = useRouter()
  const { t } = useTranslation();

  return (
    <Stack minHeight={'60vh'} alignItems={'center'}
      padding={'20px'} >
      <Box
        w={{ base: "fit-content", md: "fit-content" }}
        padding={"20px"}
        bgColor={"#006A71"}
        borderRadius={"30px"}
        my={{ base: "0px", md: "0px" }}
        mt={{ base: "80px", md: "120px" }}
        h={'130px'}
        position={'absolute'}
      >
        <HStack w={'100%'} height={'100%'}>
          <VStack w={"100%"} alignItems={"start"}>
            <Text
              fontWeight={"bold"}
              color={"white"}
              fontSize={"16px"}
              mb={"10px"}
            >
              {type == 'question' ? t("your_question") : t("your_answer")}
            </Text>
            <Text fontSize={"xs"} color={"white"}>
              {type == 'question' ? t("ask_question") : t("you_must_log")}
            </Text>
          </VStack>
          <Button
            onClick={e => router.push('/login')}
            bgColor={"#82E5BE"}
            fontWeight={"normal"}
            p={"10px"}
            w={{ base: "200px", md: "200px" }}
            size={"md"}
            borderRadius={'15px'}
            h={'40px'}
           
          >
            {t("log_in_to_your_account")}
          </Button>
        </HStack>
      </Box>
    </Stack>
  )
}

export default IsLogin
