import CommentCard from "@/components/commentCard";
import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import { useUser } from "@/context/UserContext";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment-jalaali";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdCheckmarkCircleOutline
} from "react-icons/io";
import { TbBookmark } from "react-icons/tb";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";


const answer = [
  "لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از",
  "لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن  تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از",
  "لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از  گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از",
  "لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن ساختگی با تولید سادگی از صنعت چاپ، و  متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از",
];

const postRequest = (url, { arg: { id, ...data } }) => {
  return axios.post(baseUrl + url + `?question_id=${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
const postActionRequest = (
  url,
  { arg: { table_id, table_type, type_param, content, ...data } }
) => {
  return axios.post(
    baseUrl +
    url +
    `?table_type=${table_type}&table_id=${table_id}&type_param=${type_param}`,
    content,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

const patchRequest = (url, { arg: { action_id, ...data } }) => {
  return axios.patch(baseUrl + url + `?action_id=${action_id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const Index = () => {
  const { t } = useTranslation();

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [comment, setComment] = useState("");

  const [showMore, setShowMore] = useState(false);
  const [like, setLike] = useState(false);
  const [answerPage, setAnswerPage] = useState(0)

  const [contentTest, setContentTest] = useState(
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرن گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی،"
  );

  const { dataMe, isLoadingMe } = useUser();

  const [isUserLogin, setIsUserLogin] = useState("");

  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const router = useRouter();

  const { query } = router;

  const {
    register: registerAnswer,
    setValue: setValueAnswer,
    getValues: getValuesAnswer,
    reset: resetAnswer,
    handleSubmit: handleSubmitAnswer,
  } = useForm();
  const {
    register: registerComment,
    setValue: setValueComment,
    getValues: getValuesComment,
    reset: resetComment,
    handleSubmit: handleSubmitComment,
  } = useForm();

  const {
    register: registerSearch,
    getValues: getValuesSearch,
    setValue: setValueSearch,
    handleSubmit: handleSubmitSearch,
    watch: watchSearch,
    reset: resetSearch,
  } = useForm();

  const {
    data: dataQuestion,
    isLoading: isLoadingQuestion,
    mutate: mutateQuestion,
  } = useSWR(query?.id && `user/question?id=${query?.id}`);

  const {
    data: dataQuestionAnswer,
    isLoading: isLoadingQuestionAnswer,
    mutate: muatteAnswer,
  } = useSWR(query?.id && `user/question/answer?question_id=${query?.id}`);

  const { data: dataQuestionComment, isLoading: isLoadingComment } = useSWR(
    query?.id &&
    `user/action?table_id=${query?.id}&table_type=question&type_param=comment`
  );
  const {
    data: dataQuestionLike,
    isLoading: isLoadingLike,
    mutate: mutateLike,
  } = useSWR(
    query?.id &&
    `user/action?table_id=${query?.id}&table_type=question&type_param=like`
  );

  const { data: dataAnswerLike, mutate: mutateAnswerLike } = useSWR(
    dataQuestionAnswer?.data &&
    `user/action?table_id=${dataQuestionAnswer?.data?.[0]?.id}&table_type=answer&type_param=like`
  );

  // const { data: dataQuestionSave, isLoading: isLoadingSave } = useSWR(
  //   query?.id &&
  //   `user/action?table_id=${query?.id}&table_type=question&type_param=save_message`
  // );

  const { data: dataQuestionSimilar, isLoading: isLoadingSimilar } = useSWR(
    dataQuestion?.data &&
    `user/question/similar-questions?question_elastic_id=${dataQuestion?.data?.result?.[0]?.elastic_id}`
  );

  const {
    trigger: triggerAnswer,
    isLoading: isLoadingAnswer,
    isMutating: isMutatingQuestionAnswer,
  } = useSWRMutation(`user/question/answer`, postRequest, {
    onSuccess: () => {
      resetAnswer();
    },
  });

  const { trigger: triggerUpdateLike, isLoading: isLoadingUpdateLike } =
    useSWRMutation(`user/action`, patchRequest, {
      onSuccess: () => {
        mutateQuestion();
        muatteAnswer();
        mutateAnswerLike()
        mutateLike();
      },
    });
  const {
    trigger: triggerAddLike,
    isLoading: isLoadingAddLike,
    isMutating: isMutatingAddAction,
  } = useSWRMutation(`user/action`, postActionRequest, {
    onSuccess: () => {
      mutateQuestion();
      muatteAnswer();
      mutateAnswerLike()
      mutateLike();
      resetComment();
    },
  });

  const handleClickSearch = () => {
    router.push(
      `/result_search?search=${watchSearch("search")}&search_type=search`
    );
  };

  const handleAddAnswer = (e) => {
    triggerAnswer({ ...e, id: query?.id, lang: "fa" });
  };

  const handleAddAction = (type, action, id, content = false) => {
    setLike(true)
    if (!content) {
      triggerAddLike({
        table_id: id || query?.id,
        table_type: type,
        type_param: action,
      });
    } else {
      triggerAddLike({
        table_id: id || query?.id,
        table_type: type,
        type_param: action,
        content
      });
    }
  };
  const handleUpdateAction = (action_id) => {
    setLike(!like);
    triggerUpdateLike({
      action_id
    });
  };

  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };

  const handleSimilarClick = (id) => {
    router.push(`/question_answer/${id}`);
  };
  const { data: dataSource, error: errorSource } = useSWR(
    "user/source?size=10"
  );

  const handleClickSource = (source) => {
    router.replace(
      `/questions?source=${dataSource?.data?.find((it) => it?.fa_source_name == source)?.id
      }`
    );
  };

  const handleToggleInput = () => {
    setIsInputOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendComment = (type, action) => {
    triggerAddLike({
      table_id: query?.id,
      table_type: type,
      type_param: action,
      content: getValuesComment("content"),
    });
    setIsInputOpen(false);
  };

  const handleUserProfileLink = (username) => {
    router.push(`/users/${username}`);
  };

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    console.log(dataAnswerLike?.data?.result?.find((like) => (like?.user__username == dataMe?.data?.[0]?.username))?.id);
  }, [dataMe, dataAnswerLike]);

  const handleLikeQuestion = () => {
    setLike(!like);
  };

  return (
    <MainLayout
      menuDefault={true}
      register={registerSearch}
      watchSearch={watchSearch}
      setIsUserLogin={setIsUserLogin}
      isUserLogin={isUserLogin}
    >
      <Head>
        <title>
          {dataQuestion?.data?.result?.[0]?.title ||
            dataQuestion?.data?.result?.[0]?.content}
        </title>
        <link rel="icon" href="/logoheader.png" />
      </Head>
      <Box
        marginTop={{ base: "0px", md: "10px" }}
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
        scrollSnapAlign="start"
      >
        <HStack w={"100%"} alignItems={"start"} gap={"20px"}>
          <VStack w={"100%"}>

            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={{ base: "10px", md: "20px" }}
              w={"100%"}
              mt={"80px"}
            >
              <GridItem
                as={Stack}
                position={"relative"}
                direction={{ base: "row", md: "column" }}
                colSpan={"3"}
                w={"100%"}
              >


                {isLoadingQuestion ? (
                  <Spinner />
                ) : (
                  <VStack w={"100%"} alignItems={"start"}>
                    <HStack alignItems={"start"} w={"100%"}>

                      <HStack
                        alignItems={"start"}
                        bgColor={"#006A711A"}
                        padding={"8px"}
                        borderRadius={"30px"}
                        w={"100%"}
                      >
                        <IoIosArrowForward
                          cursor={"pointer"}
                          style={{ marginRight: "10px", marginTop: "10px" }}
                          onClick={(e) => router.back()}
                        />

                        <VStack w={"100%"} alignItems={"start"} mr={"10px"}>
                          <Text
                            lineHeight={"taller"}
                            textAlign={"justify"}
                            fontSize={{ base: "16px", md: "21px" }}
                            fontWeight={"700"}
                          >
                            {dataQuestion?.data?.result?.[0]?.content}
                          </Text>

                        </VStack>
                        <Text
                          whiteSpace={"nowrap"}
                          fontWeight={"400"}
                          color={"#999999"}
                          fontSize={"16px"}
                          display={{ base: "none", md: "block" }}
                          mt={'5px'}
                        >
                          {dataQuestionAnswer?.data &&
                            dataQuestionAnswer?.data?.length}{" "}
                          پاسخ
                        </Text>

                        <IconButton
                          minWidth={"none"}
                          icon={
                            dataQuestion?.data?.result?.[0]?.is_user_saved ? (
                              <TbBookmark
                                color="orange"
                                fontSize={"20px"}
                                strokeWidth={2}
                                onClick={(e) => {
                                  if (
                                    dataQuestion?.data?.result?.[0]
                                      ?.is_user_saved
                                  ) {
                                    // handleUpdateAction("question", "save_message", dataQuestionLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id)
                                  } else {
                                    handleAddAction("question", "save_message");
                                  }
                                }}
                              />
                            ) : (
                              <TbBookmark
                                fontSize={"20px"}
                                strokeWidth={2}
                                color="black"
                                onClick={(e) => {
                                  if (
                                    dataQuestion?.data?.result?.[0]
                                      ?.is_user_saved
                                  ) {
                                    // handleUpdateAction("question", "save_message", dataQuestionLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id)
                                  } else {
                                    handleAddAction("question", "save_message");
                                  }
                                }}
                              />
                            )
                          }
                          size={"lg"}
                        />
                      </HStack>
                    </HStack>
                    <Box
                      w={{ base: "100%", md: "100%" }}
                      padding={{ base: "none", md: "0px" }}
                      px={{ base: "5px", md: "20px" }}
                      bgColor={"#F7F7F7"}
                      borderRadius={"30px"}
                      mb={"10px"}
                      mr={{ base: "0px", md: "0px" }}
                    >

                      <HStack alignItems={"start"} gap={"10px"} w={"100%"}>

                        <VStack
                          w={"100%"}
                          alignItems={"start"}
                          px={"2px"}
                          pt={"25px"}
                        >
                          <Box position="relative" w="100%">
                            <HStack w="100%" justifyContent="space-between" position="relative">
                              {/* Left section */}
                              {dataQuestionAnswer?.data?.[answerPage]?.source && <HStack>
                                <Avatar w="28px" h="28px" />
                                <Text fontSize="16px" color="#999999">
                                  {dataQuestionAnswer?.data?.[answerPage]?.source}
                                </Text>
                              </HStack>}

                              {/* Center section */}
                              {dataQuestionAnswer?.data?.length > 1 && <Box
                                as={HStack}
                                bgColor="white"
                                borderRadius="30px"
                                position="absolute"
                                left="50%"
                                transform="translateX(-50%)"
                              >
                                <IconButton isDisabled={answerPage == 0} icon={<IoIosArrowForward />} color="#006A71" onClick={e => setAnswerPage(answerPage - 1)} />
                                <Text color="#006A71" fontWeight={'600'} fontSize={'16px'}>پاسخ شماره {answerPage + 1}</Text>
                                <IconButton isDisabled={answerPage == (dataQuestionAnswer?.data?.length - 1)} icon={<IoIosArrowBack />} color="#006A71" onClick={e => setAnswerPage(answerPage + 1)} />
                              </Box>}

                              {/* Optional right filler (for symmetry) */}
                              <Box w="28px" /> {/* empty box to balance layout if needed */}
                            </HStack>
                          </Box>

                          <Collapse startingHeight={80} in={showMore}>
                            <Text
                              lineHeight="190%"
                              w="fit-content"
                              textAlign="justify"
                              fontSize={{ base: "14px", md: "16px" }}
                              fontWeight="400"
                              whiteSpace="pre-wrap"
                              mt="20px"
                              color="#333333"
                            >
                              {dataQuestionAnswer?.data?.[answerPage]?.content}
                            </Text>
                          </Collapse>
                          <HStack
                            w={"100%"}
                            justifyContent={{
                              base: "start",
                              md: "space-between",
                            }}
                            mt={"10px"}
                          >
                            {(showMore || dataQuestionAnswer?.data?.[answerPage]?.content?.length < 200) && (
                              <HStack
                                order={{ base: 1 }}
                                w={"100%"}
                                justifyContent={"space-between"}
                              >

                                <HStack
                                  w={{ base: "140px", md: "100%" }}
                                  justifyContent={{ base: "start" }}
                                  flexWrap="wrap"
                                >
                                  <Button
                                    bgColor={"white"}
                                    color={dataAnswerLike?.data?.result?.find((like) => (like?.user__username == dataMe?.data?.[0]?.username))?.id ? "green.300" : "#CCCCCC"}
                                    fontWeight={"500"}
                                    fontSize={"16px"}
                                    borderRadius={"18px"}
                                    h={'37px'}
                                    leftIcon={
                                      <IoMdCheckmarkCircleOutline
                                        fontSize={"25px"}
                                      />
                                    }
                                    onClick={(e) => { dataAnswerLike?.data?.result?.find((like) => (like?.user__username == dataMe?.data?.[0]?.username))?.id ? handleUpdateAction(dataAnswerLike?.data?.result?.find((like) => (like?.user__username == dataMe?.data?.[0]?.username))?.id) : handleAddAction('answer', 'like', dataQuestionAnswer?.data?.[answerPage]?.id) }}
                                  >
                                    پسند
                                  </Button>
                                  {dataQuestion?.data?.result?.[0]?.tags?.map(
                                    (tag) => (
                                      <Badge
                                        bgColor={"#E6F1F1"}
                                        color={"#006A71"}
                                        padding={"15px"}
                                        borderRadius={"21px"}
                                        w={{ base: "min-content" }}
                                        textAlign={"center"}
                                        fontWeight={'400'}
                                        fontSize={'17px'}
                                        height={'37px'}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"

                                      >
                                        {tag?.name}
                                      </Badge>
                                    )
                                  )}
                                </HStack>

                                <Flex
                                  flexDir={{ base: "column", md: "row" }}
                                  justifyContent={"space-between"}
                                >

                                  <Text
                                    mt={{ base: "15px", md: "0px" }}
                                    fontSize={"16px"}
                                    color={"#999999"}
                                    fontWeight={"100"}
                                  >
                                    {moment(dataQuestionAnswer?.data?.[answerPage]?.created_at).format(
                                      "jYYYY/jMM/jDD"
                                    )}
                                  </Text>
                                </Flex>
                              </HStack>
                            )}
                          </HStack>
                          {!showMore && dataQuestionAnswer?.data?.[answerPage]?.content?.length > 200 && (
                            <Stack
                              flexDir={"row"}
                              color={"#3646B3"}
                              alignItems={"center"}
                              cursor={"pointer"}
                              onClick={(e) => setShowMore(true)}
                              mt={"13px"}
                            >
                              <Text
                                fontWeight={"500"}
                                fontSize={"14px"}
                                lineHeight={"176%"}
                              >
                                مشاهده کامل
                              </Text>
                              <IoIosArrowBack />
                            </Stack>
                          )}
                        </VStack>
                      </HStack>
                      {/* ))} */}

                      <Divider mt={"20px"} borderColor={"gray.200"} />
                    </Box>
                    {!isUserLogin ? (
                      <Box
                        w={{ base: "100%", md: "100%" }}
                        padding={"20px"}
                        bgColor={"#3646B3"}
                        borderRadius={"15px"}
                        my={{ base: "0px", md: "0px" }}
                        mr={{ base: "0px", md: "0px" }}
                      >
                        <HStack>
                          <VStack w={"100%"} alignItems={"start"}>
                            <Text
                              fontWeight={"bold"}
                              color={"white"}
                              fontSize={"16px"}
                              mb={"10px"}
                            >
                              {t("your_answer")}
                            </Text>
                            <Text fontSize={"xs"} color={"white"}>
                              {t("you_must_log")}
                            </Text>
                          </VStack>
                          <Button
                            onClick={(e) => router.push("/login")}
                            bgColor={"#29CCCC"}
                            fontWeight={"normal"}
                            p={"10px"}
                            w={{ base: "200px", md: "150px" }}
                            size={"sm"}
                          >
                            {t("log_in_to_your_account")}
                          </Button>
                        </HStack>
                      </Box>
                    ) : (
                      <VStack w={"100%"} alignItems={"start"} mt={"40px"}>
                        <Text
                          fontSize={{ base: "16px", md: "22px" }}
                          fontWeight={"600"}
                        >
                          شما میتوانید به این سوال پاسخ دهید
                        </Text>
                        <HStack
                          w={"100%"}
                          as="form"
                          onSubmit={handleSubmitAnswer(handleAddAnswer)}
                        >
                          <Input
                            w={"100%"}
                            borderRadius={"30px"}
                            height={{ base: "35px", md: "61px" }}
                            placeholder="نوشتن متن..."
                            border={"1px"}
                            borderColor={"#A3A3A3"}
                            bgColor={"#FBFBFB"}
                            {...registerAnswer("content")}
                          />
                          <Button
                            isLoading={isMutatingQuestionAnswer}
                            bgColor={"#00D2A1"}
                            borderRadius={"30px"}
                            color={"black"}
                            width={{ base: "72px", md: "220px" }}
                            height={{ base: "32px", md: "61px" }}
                            fontWeight={"700"}
                            fontSize={{ base: "10px", md: "18px" }}
                            type="submit"
                          >
                            {" "}
                            {t("submit_answer")}
                          </Button>
                        </HStack>
                        {/* <QuestionAnswerCard handleSubmitAnswer={handleSubmitAnswer} handleAddAnswer={handleAddAnswer} isMutatingQuestionAnswer={isMutatingQuestionAnswer} registerAnswer={registerAnswer} t={t} /> */}
                      </VStack>

                    )}
                    <Grid
                      templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(5, 1fr)",
                      }}
                      mt={{ base: '20px', md: "90px" }}
                      gap={"25px"}
                      w={"100%"}
                    >
                      <GridItem
                        colSpan={"3"}
                        height={{ base: "auto", md: "456px" }}
                      >
                        <HStack w={"100%"} justifyContent={"space-between"}>
                          <Text
                            fontSize={{ base: "20px", md: "33px" }}
                            fontWeight={"800"}
                            color={"#333333"}
                            fontFamily={"morabba"}
                          >
                            دیدگاه ها
                          </Text>
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color="#3646B3"
                            cursor={"pointer"}
                            onClick={(e) => router.push("/references")}
                          >
                            {/* {t("show_all")} */}
                          </Text>
                        </HStack>
                        <CommentCard t={t} handleAddAction={handleAddAction} id={dataQuestionAnswer?.data?.[answerPage]?.id} />
                      </GridItem>
                      <GridItem
                        colSpan={{ base: 3, md: 2 }}
                        height={{ base: "auto", md: "456px" }}
                      >
                        <VStack w="100%" h="100%" spacing="0" align="stretch">
                          {/* Header */}
                          <HStack
                            w="100%"
                            justifyContent="space-between"
                            id="answers-header"
                          >
                            <HStack>
                              <Text
                                fontSize={{ base: "20px", md: "33px" }}
                                fontWeight="800"
                                color="#333333"
                                fontFamily="morabba"
                              >
                                پرسش‌های مرتبط
                              </Text>
                            </HStack>
                            <Text
                              fontWeight="700"
                              fontSize="12px"
                              color="#3646B3"
                              cursor="pointer"
                              onClick={() => router.push("/references")}
                            >
                              {/* {t("show_all")} */}
                            </Text>
                          </HStack>

                          {/* Box with scrollable answers */}
                          <Box
                            w="100%"
                            h="100%"
                            p="20px"
                            bgColor="#F7F7F7"
                            borderRadius="30px"
                            as="form"
                            display="flex"
                            flexDirection="column"
                            overflowY="auto"
                            onSubmit={handleSubmitAnswer(handleAddAnswer)}
                          >
                            {/* Scrollable area: calculate height dynamically */}
                            <VStack
                              w="100%"
                              gap="10px"
                              flex="1"
                              minH="0" // important for scroll inside flex container
                              pb="10px"
                            >
                              {dataQuestionSimilar?.data
                                ?.slice(5, 10)
                                ?.map((item, idx) => (
                                  <HStack
                                    cursor={"pointer"}
                                    onClick={(e) =>
                                      handleSimilarClick(item?.id)
                                    }
                                    key={idx}
                                    bgColor="white"
                                    padding="10px"
                                    borderRadius="10px"
                                    w="100%"
                                  >
                                    <HStack w="100%" alignItems="start">
                                      <Text
                                        fontSize={{ base: "10px", md: "14px" }}
                                        fontWeight={"400"}
                                      >
                                        {item?.content}
                                      </Text>
                                    </HStack>
                                    {/* <Divider orientation="vertical" />
                                    <VStack w="100%" justifyContent="end" flex={1} alignItems={'start'} fontSize={'12px'} fontWeight={'400'}>
                                      <Text whiteSpace={'nowrap'} color="#999999" lineHeight={'192%'}>5 پاسخ</Text>
                                      <Text whiteSpace={'nowrap'} color="#999999" lineHeight={'192%'}>اسلام کوئست</Text>
                                    </VStack> */}
                                  </HStack>
                                ))}
                            </VStack>
                          </Box>
                        </VStack>
                      </GridItem>
                    </Grid>
                  </VStack>
                )}
              </GridItem>

            </Grid>
          </VStack>
        </HStack>
      </Box>
    </MainLayout>
  );
};

export default Index;
