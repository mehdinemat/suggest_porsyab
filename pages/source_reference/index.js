import IsLogin from "@/components/base/isLogin";
import MultiSelectComboBox from "@/components/base/multiSelectComboBox";
import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import SliderCom from "@/components/slider";
import SliderSource from "@/components/sliderSource";
import {
  Box,
  Center,
  Container,
  HStack,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GoArrowLeft } from "react-icons/go";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import * as Yup from "yup";

const postRequest = (url, { arg }) => {
  return axios.post(`${baseUrl}${url}`, arg, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const Index = () => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const { locale } = router;

  const [isUserLogin, setIsUserLogin] = useState("");

  const { t } = useTranslation();

  const { data: dataTag, isLoading: isLoadingTag } = useSWR(
    `user/category/tag?name__icontains=${inputValue}`
  );

  const { data: dataReferences, error: errorReferences } =
    useSWR("user/public-figure");
  const { data: dataSource, error: errorSource } = useSWR("user/source");
  return (
    <MainLayout menuDefault={true}>
      <Head>
        <title>{t("submit_your_question")}</title>
        <link rel="icon" href="/question.png" />
      </Head>
      <Box
        scrollSnapAlign="start"
        as={Stack}
        mt={"30px"}
        pb={'100px'}
        w={"100%"}
        bgImage={"/referencebg2.jpg"}
        bgSize="cover"
        bgRepeat="no-repeat"
        justifyContent={"center"}
        alignItems={"center"}
      bgPosition="center"
      >
        <VStack w={"100%"} pt={"170px"} maxW="container.xl">
          <Text
            color={"#333333"}
            fontWeight={"800"}
            fontSize={"33px"}
            fontFamily={"morabba"}
          >
            مراجع و منابع
          </Text>
          <HStack w={"100%"} justifyContent={"center"}>
            <Text color={"#979797"} fontWeight={"500"} fontSize={"18px"}>
              مرتبط سازی بر اساس
            </Text>
            <Select
              w={"117px"}
              bgColor={"#F3F3F3"}
              border={"none"}
              color={"#3646B3"}
              borderRadius={"13px"}
            >
              <option>جدیدترین</option>
              <option>جدیدترین</option>
              <option>جدیدترین</option>
            </Select>
          </HStack>
          <Box
            maxW={{ base: "calc( 100vw - 50px )", md: "100%" }}
            whiteSpace="normal"
            overflowWrap="break-word"
            mt={"100px"}
          >
            {dataReferences?.data && (
              <SliderCom
                items={dataReferences?.data?.result?.map((val) => ({
                  title: val?.full_name,
                  image: val?.image_url,
                  id: val?.id,
                  link: val?.website,
                  buttoh: "اطلاعات بیشتر",
                }))}
                height={"fit-content"}
                borderRadius={"5px"}
                title={t("sources")}
                bgColor={"#faf7f2"}
              />
            )}
          </Box>
          <Box w={"100%"} height={"min-content"}>
            <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
              {dataSource?.data && (
                <SliderSource
                  items={dataSource?.data?.map((val) => ({
                    title: val?.fa_source_name,
                    image: val?.logo_link,
                    id: val?.id,
                    count: val?.question_count,
                    link: val?.source_link,
                    buttoh: "اطلاعات بیشتر",
                  }))}
                  height={"133px"}
                  borderRadius={"5px"}
                  title={"منابع"}
                />
              )}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </MainLayout>
  );
};

export default Index;
