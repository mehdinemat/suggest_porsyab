import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Link,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useBreakpointValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import QuestionMCard from "@/components/home/mobile/questionMCard";
import { baseUrl } from "@/components/lib/api";
import LoadingDots from "@/components/loadingDots";
import Pagination from "@/components/pagination";
import QuestionCard from "@/components/questionCars";
import TextSlider from "@/components/textSlider";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaLink } from "react-icons/fa";
import { IoIosList, IoMdCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import { IoOptionsOutline, IoSearch } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const fetcherWithTiming = async (url) => {
  const startTime = performance.now();
  const response = await fetch(baseUrl + url);
  const endTime = performance.now();
  const duration = endTime - startTime;

  if (!response.ok) throw new Error("Request failed");

  const data = await response.json();

  return { data, duration };
};

const postRequest = (url, { arg }) => {
  console.log("slam");
  return axios.post(baseUrl + url, arg);
};

const tags = [
  "جامعه اسلامی",
  "قرآن",
  "جمهوری اسلامی",
  "احادیث معتبر",
  "روایات",
  "جامعه اسلامی",
];

const sendAudio = async (url, { arg }) => {
  const formData = new FormData();
  formData.append("file", arg, "voice.wav");

  const res = await fetch(baseUrl + url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload audio");
  return res.json();
};


const Index = ({ children, filters, setFilters, source, handleClickAiSearch, handleClickSemanticSearch, handleClickSearch, isUserLogin, chatType }) => {
  const { t } = useTranslation();

  const toast = useToast()

  const size = useBreakpointValue({ base: "base", md: "md", xl: "xl" });

  const router = useRouter();

  const { locale } = useRouter();

  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [chatSession, setChatSession] = useState("");
  const [botStream, setBotStream] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [filter, setFilter] = useState(false);
  const [conditionStream, setConditionStream] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [continueQuestion, setContinueQuestion] = useState(false)
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const currentSize = useBreakpointValue({ base: "base", md: "md", lg: "lg" });

  const { register, setValue, watch } = useForm()

  const [searchActive, setSearchActive] = useState(false);

  const sourceParams =
    filters?.source?.length > 0
      ? filters.source
        .map((src) => `&source_list=${encodeURIComponent(src)}`)
        .join("")
      : "";

  const {
    data: dataQuestionSearch,
    error: errorQuestionSearch,
    isLoading: isLoadingQuestionSearch,
  } = useSWR(
    `user/question/search?page=${(page - 1) * 10}` +
    `&search_type=${filters?.search_type || ""}` +
    `&content=${filters?.search || ""}` +
    `&lang=${locale}` +
    `${filters?.order_by ? `&order_by=${filters.order_by}` : ""}` +
    `&model_name=${filters?.model || ""}` +
    `${sourceParams}`,
    fetcherWithTiming
  );

  const { trigger: triggerSession } = useSWRMutation(
    `user/chat/session`,
    postRequest,
    {
      onSuccess: async (data) => {
        setChatSession(data?.data?.data?.id);
        setIsStreaming(true);
        setChatHistory([])

        const userId = Date.now();

        const newUserMsg = {
          id: userId,
          role: 2, // user
          content: filters?.search,
          level: (chatHistory?.length ?? 0) + 1, // increment level
          copied: false
        };

        setChatHistory((prev) => {
          const base = Array.isArray(prev) ? prev : [];
          return [...base, newUserMsg];
        });


        const streamId = userId + 1;
        let botMessage = "";
        setChatHistory((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          { id: streamId, role: 3, content: "", level: (chatHistory?.length ?? 0) + 2, copied: false, done: false },
        ]);

        setBotStream("");
        setAiMessage("");

        setInput('')

        const res = await fetch(
          `https://parsa.api.t.etratnet.ir/user/chat/${data?.data?.data?.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: filters?.search }),
          }
        );

        if (!res.body) {
          setIsStreaming(false);
          console.error("No streaming body in response");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = !!doneReading;
          if (value) buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) continue;

            const jsonStr = line.replace(/^data:\s*/, "");
            if (jsonStr === "[DONE]") {
              done = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed.error) {
                console.error("Stream error:", parsed.error);
                done = true;
                break;
              }

              if (!parsed?.chunk) {
                setConditionStream(parsed?.state);
              }

              if (parsed.chunk) {
                setConditionStream("");
                setIsStreaming(false);
                botMessage += parsed.chunk;

                setChatHistory((prev) =>
                  prev.map((msg) =>
                    msg.id === streamId ? { ...msg, content: botMessage } : msg
                  )
                );

                setAiMessage(botMessage);
              }

              if (parsed.done) {
                setChatHistory((prev) =>
                  prev.map((msg) =>
                    msg.id === streamId ? { ...msg, done: true } : msg
                  )
                );
                done = true;
                break;
              }
            } catch (err) {
              console.error("Could not parse stream JSON:", jsonStr, err);
            }
          }
        }

        // clear botStream state if you don’t need it
        setBotStream("");
      },
    }
  );

  const handleSubmit = async () => {
    setInput('')
    setIsStreaming(true)

    const userId = Date.now();

    const newUserMsg = {
      id: userId,
      role: 2, // user
      content: filters?.search,
      level: (chatHistory?.length ?? 0) + 1, // increment level
    };

    // add user message
    setChatHistory((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      return [...base, newUserMsg];
    });

    // add placeholder assistant message
    const streamId = userId + 1;
    let botMessage = "";
    setChatHistory((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { id: streamId, role: 3, content: "", level: (chatHistory?.length ?? 0) + 2, done: false, copied: false },
    ]);

    // reset stream state
    setBotStream("");

    // make request
    const res = await fetch(`https://parsa.api.t.etratnet.ir/user/chat/${chatSession}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ content: filters?.search }),
    });

    if (!res.body) {
      setIsStreaming(false)
      console.error("No streaming body in response");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let done = false;

    while (!done) {

      const { value, done: doneReading } = await reader.read();
      done = !!doneReading;
      if (value) buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith("data:")) continue;

        const jsonStr = line.replace(/^data:\s*/, "");
        if (jsonStr === "[DONE]") {
          done = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);

          if (parsed.error) {
            console.error("Stream error:", parsed.error);
            done = true;
            break;
          }

          if (!parsed?.chunk) {
            setConditionStream(parsed?.state)
          }

          if (parsed.chunk) {
            setConditionStream('')
            setIsStreaming(false)
            botMessage += parsed.chunk;
            console.log(parsed)
            // update assistant message in history
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === streamId ? { ...msg, content: botMessage } : msg
              )
            );
          }

          if (parsed.done) {
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === streamId ? { ...msg, done: true } : msg
              )
            );
            done = true;
            break;
          }
        } catch (err) {
          console.error("Could not parse stream JSON:", jsonStr, err);
        }
      }
    }

    // clear botStream state if you don’t need it
    setBotStream("");
  };


  const publicChat = async () => {
    let botMessage = "";
    setIsStreaming(true);
    setBotStream("");
    setAiMessage("");

    setChatHistory([])

    const userId = Date.now();

    const newUserMsg = {
      id: userId,
      role: 2, // user
      content: filters?.search,
      level: (chatHistory?.length ?? 0) + 1, // increment level
    };

    setChatHistory((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      return [...base, newUserMsg];
    });

    // add placeholder assistant message
    const streamId = userId + 1;
    setChatHistory((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { id: streamId, role: 3, content: "", level: (chatHistory?.length ?? 0) + 2 },
    ]);


    const res = await fetch(
      `https://parsa.api.t.etratnet.ir/user/chat/anonymous`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          messages: [{ content: filters?.search, role: "user" }],
        }),
      }
    );

    if (!res.body) {
      setIsStreaming(false);
      console.error("No streaming body in response");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = !!doneReading;
      if (value) buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith("data:")) continue;

        const jsonStr = line.replace(/^data:\s*/, "");
        if (jsonStr === "[DONE]") {
          done = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.error) {
            console.error("Stream error:", parsed.error);
            done = true;
            break;
          }

          if (!parsed?.chunk) {
            setConditionStream(parsed?.state);
          }

          if (parsed.chunk) {
            setConditionStream("");
            setIsStreaming(false);
            botMessage += parsed.chunk;
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === streamId ? { ...msg, content: botMessage } : msg
              )
            );
            setAiMessage(botMessage);
          }

          if (parsed.done) {
            done = true;
            break;
          }
        } catch (err) {
          console.error("Could not parse stream JSON:", jsonStr, err);
        }
      }
    }

    // clear botStream state if you don’t need it
    setBotStream("");
  };

  useEffect(() => {
    setPage(1);
  }, [filters?.search]);

  useEffect(() => {
    if (filters?.type == "ai") {
      setAiMessage("");
      if (isUserLogin) {
        if (chatType == 1) {
          triggerSession();
        } else {
          handleSubmit()
        }
      } else {
        publicChat();
      }
    }
  }, [filters?.search]);

  const handleAiResponse = () => {
    handleClickAiSearch(2, watch('search'));
  };

  useEffect(() => {
    if (chatType == 1) {
      setContinueQuestion(false)
    } else {
      setContinueQuestion(true)
    }
  }, [chatType])

  const handleCopyClick = async (content, id) => {
    try {
      await navigator.clipboard.writeText(content);
      setChatHistory(chatHistory?.map((item) => (item?.id == id ? { ...item, copied: true } : item)))
      toast({
        title: "کپی شد!",
        description: `متن کپی شد.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {

    }

  }


  return (
    <Tabs w={"100%"} scrollSnapAlign="start">
      <Head>
        <title>
          {t("parsa")} :{" "}
          {t(
            filters?.search_type != "search"
              ? "semantic_search_results_for"
              : "literal_search_results_for"
          )}{" "}
          :{filters?.search}
        </title>
        <link rel="icon" href="/question.png" />
      </Head>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
        mt={{ base: "60px", md: "30px" }}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
          templateAreas={{
            base: `"main" "right" "left" "slider"`,
          }}
          gap={"20px"}
          w={"100%"}
        >
          <Box
            p={{ base: 0, md: "6" }}
            order={{ base: 1, md: 2 }}
            as={VStack}
            width={"100%"}
            alignItems={"start"}
            colSpan={{ md: 4 }}
            w="100%"
            overflowWrap="break-word"
            wordBreak="break-word"
            maxW={{ base: "calc( 100vw - 100px )", md: "100vw" }}
            whiteSpace="normal"
            pr={{ base: 0, md: "21px" }}
          >
            {filters?.type == "ai" && (
              <VStack mb={"0px"} alignItems={"start"} w={'100%'}>
                <Tabs colorScheme="blue" variant="unstyled" w={'100%'}>
                  <TabList>
                    <Tab _selected={{
                      borderBottom: "3px solid #3646B3", // active border
                      color: "#3646B3", // active text color
                    }}>
                      <HStack w={"100%"} alignItems={"center"}>
                        <svg
                          width="21"
                          height="22"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7422 0L17.1554 6.14379C18.1138 10.3056 21.2586 13.5519 25.2904 14.5412L31.2422 16L25.2904 17.4588C21.2586 18.4481 18.1138 21.6944 17.1554 25.8562L15.7422 32L14.329 25.8562C13.3706 21.6944 10.2257 18.4481 6.19398 17.4588L0.242188 16L6.19398 14.5412C10.2257 13.5519 13.3706 10.3056 14.329 6.14379L15.7422 0Z"
                            fill="#3646B3"
                          />
                        </svg>
                        <Text fontSize={"22px"} color={"#3646B3"} fontWeight={'700'} width={'max-content'}>
                          نتایج جستجو هوشمند
                        </Text>
                      </HStack>
                    </Tab>
                    <HStack w={"100%"} alignItems={"center"} color={'#B8B8B8'}>
                      <IoIosList fontSize={'20px'} />
                      <Text fontSize={"22px"} fontWeight={'700'} onClick={() => {
                        const el = document.querySelector(".questionlist");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }} cursor={'pointer'}>نتایج بین سوالات پارسا</Text>
                    </HStack>

                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Box
                        bgColor={"#F7F7F7"}
                        borderRadius={"30px"}
                        w={"100%"}
                        padding={'15px'}
                        px={'0px'}
                        pb={'0px'}
                      >
                        <Box maxHeight={'696px'}
                          overflowY={'auto'}>
                          {chatHistory?.map((chat, index) => {
                            const isLast = index === chatHistory.length - 1;

                            return (

                              <Box
                                key={chat.id}
                                id={chat.role === 2 ? 'user' : 'bot'}
                                alignSelf={chat.role === 2 ? 'flex-start' : 'flex-end'}
                                border={'.3px'}
                                bgColor={chat.role === 2 ? '#DFE3FF' : 'none'}
                                px={'18px'}
                                mx={'30px'}
                                py={'5px'}
                                borderRadius={'20px'}
                                borderBottomRightRadius={chat.role === 2 ? '0px' : '20px'}
                                w={'auto'}
                                maxW={chat.role == 2 ? 'fit-content' : '100%'}
                                mb={'15px'}
                                justifyContent={'start'}

                              >
                                {
                                  chat.role != 2
                                    ?
                                    <Box
                                      padding={"5px"}
                                      borderRadius={"30px"}
                                    >
                                      <ReactMarkdown
                                        remarkPlugins={[remarkBreaks]}
                                        components={{
                                          ul: (props) => <ul style={{ listStyleType: "none", paddingLeft: 0 }} {...props} />,
                                          ol: (props) => <ol style={{ listStyleType: "none", paddingLeft: 0 }} {...props} />,
                                          li: (props) => <li style={{ listStyleType: "none" }} {...props} />,
                                          h1: (props) => (
                                            <Heading as="h2" size="lg" my={2} {...props} />
                                          ),
                                          h2: (props) => (
                                            <Heading as="h3" size="md" my={2} {...props} />
                                          ),
                                          h3: (props) => (
                                            <Heading as="h4" size="sm" my={2} {...props} />
                                          ),
                                          p: (props) => (
                                            <Text
                                              fontSize="20px"
                                              fontWeight="400"
                                              my={1}
                                              {...props}
                                            />
                                          ),
                                          a: ({ href, children }) => (
                                            <Link
                                              href={href}
                                              color="blue.500"
                                              display="inline-flex"
                                              alignItems="center"
                                              gap="4px"
                                              isExternal
                                              _hover={{
                                                textDecoration: "underline",
                                                color: "blue.600",
                                              }}
                                            >
                                              <FaLink /> {children}
                                            </Link>
                                          ),
                                        }}
                                      >
                                        {chat?.content}
                                      </ReactMarkdown>

                                      {isStreaming && chat.role !== 2 && isLast && (

                                        <LoadingDots size="sm" color="blue.500" conditionStream={conditionStream} />
                                      )}

                                      {chat?.done && <HStack mt={'10px'} justifyContent={'space-between'} pb={continueQuestion ? '0px' : '0px'}>
                                        <HStack gap={'15px'}>
                                          <Button bgColor={'#DFE3FF'} color={'#3646B3'} borderRadius={'18px'} fontSize={'14px'} width={'180px'} fontWeight={'500'}>بررسی عمیق‌تر</Button>
                                          <Button bgColor={'white'} color={chat?.copied ? '#3646B3' : '#CCCCCC'} leftIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.00001 5.40001C4.00001 4.62201 4.62201 4.00001 5.40001 4.00001L12.6 4.00001C13.378 4.00001 14 4.62201 14 5.40001V6.00001C14 6.13133 14.0259 6.26136 14.0761 6.38269C14.1264 6.50401 14.2 6.61425 14.2929 6.70711C14.3858 6.79997 14.496 6.87363 14.6173 6.92388C14.7386 6.97414 14.8687 7.00001 15 7.00001C15.1313 7.00001 15.2614 6.97414 15.3827 6.92388C15.504 6.87363 15.6143 6.79997 15.7071 6.70711C15.8 6.61425 15.8736 6.50401 15.9239 6.38269C15.9741 6.26136 16 6.13133 16 6.00001V5.40001C16 3.51801 14.482 2.00001 12.6 2.00001L5.40001 2.00001C4.95329 1.99921 4.51081 2.08662 4.09795 2.25721C3.68508 2.42779 3.30996 2.6782 2.99408 2.99408C2.6782 3.30996 2.42779 3.68508 2.25721 4.09795C2.08662 4.51081 1.99921 4.95329 2.00001 5.40001L2.00001 12.6C2.00001 14.482 3.51801 16 5.40001 16H6.00001C6.26522 16 6.51958 15.8946 6.70711 15.7071C6.89465 15.5196 7.00001 15.2652 7.00001 15C7.00001 14.7348 6.89465 14.4804 6.70711 14.2929C6.51958 14.1054 6.26522 14 6.00001 14H5.40001C4.62201 14 4.00001 13.378 4.00001 12.6L4.00001 5.40001Z" fill={chat?.copied ? "#3646B3" : "#CCCCCC"} />
                                            <path d="M9 11.4C9 10.7635 9.25286 10.153 9.70294 9.70294C10.153 9.25286 10.7635 9 11.4 9L18.6 9C19.2365 9 19.847 9.25286 20.2971 9.70294C20.7471 10.153 21 10.7635 21 11.4V18.6C21 19.2365 20.7471 19.847 20.2971 20.2971C19.847 20.7471 19.2365 21 18.6 21H11.4C10.7635 21 10.153 20.7471 9.70294 20.2971C9.25286 19.847 9 19.2365 9 18.6L9 11.4Z" fill={chat?.copied ? "#3646B3" : "#CCCCCC"} />
                                          </svg>
                                          } borderRadius={'18px'} padding={'4px'} fontWeight={'500'} onClick={e => handleCopyClick(chat?.content, chat?.id)}>کپی</Button>
                                          <Button bgColor={'white'} color={'#CCCCCC'} leftIcon={<IoMdCheckmarkCircleOutline fontSize={"30px"} />} borderRadius={'18px'} padding={'4px'}>مفید بود</Button>
                                          <Button bgColor={'white'} padding={'4px'} color={'#CCCCCC'} leftIcon={<svg width="29" height="28" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                              <path d="M10.1855 10.459L18.8438 19.349" stroke="#999999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                              <path d="M18.8457 10.459L10.1875 19.349" stroke="#999999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <path opacity="0.5" d="M14.2607 1.50098C21.2711 1.50103 27.0215 7.34769 27.0215 14.6436C27.0213 21.9393 21.271 27.7851 14.2607 27.7852C7.25041 27.7852 1.50014 21.9393 1.5 14.6436C1.5 7.34766 7.25033 1.50098 14.2607 1.50098Z" stroke="#A1A1A1" stroke-width="3" />
                                          </svg>
                                          } borderRadius={'18px'}>اشتباه بود</Button>
                                        </HStack>
                                        {(!continueQuestion && isUserLogin) && <Button bgColor={'#3646B3'} color={'white'} fontSize={'14px'} fontWeight={'500'} borderRadius={'18px'} width={'180px'} onClick={e => setContinueQuestion
                                          (true)}>ادامه گفتگو</Button>}
                                      </HStack>}

                                    </Box>
                                    :
                                    <Text
                                      fontSize={chat.role === 2 ? '13px' : '14px'}
                                      fontWeight={'400'}
                                      whiteSpace="pre-wrap"
                                      color={chat.role === 2 ? 'black' : 'black'}
                                      padding={'5px'}
                                    >
                                      {chat.content}
                                    </Text>
                                }
                              </Box>
                            );
                          })}
                        </Box>
                        {continueQuestion && <VStack
                          mb={{ base: "80px", md: "15px" }}
                          gap={0}
                          alignItems={"center"}
                          position="relative"
                          borderRadius="20px"
                          p={{ base: "5px", md: "12px" }}
                          bgColor={"#FFFFFF"}
                          height={{ base: "95px", md: "163px" }}
                          width={{ base: "380px", md: "100%" }}
                          boxShadow={`
        0px 4px 9px 0px #0000000D,
        0px 16px 16px 0px #0000000A,
        0px 35px 21px 0px #00000008,
        0px 62px 25px 0px #00000003,
        0px 98px 27px 0px #00000000
      `}

                          sx={{
                            "@media (min-width: 120em)": {
                              marginBottom: "80px",
                            },
                            backdropFilter: "blur(23.3px)",
                            WebkitBackdropFilter: "blur(23.3px)",
                            overflow: "hidden", // for rounded corners
                            _before: {
                              content: '""',
                              position: "absolute",
                              inset: 0,
                              borderRadius: "20px",
                              padding: "1.5px", // thickness of border
                              background:
                                "linear-gradient(360deg, rgba(255, 255, 255, 0.55) -32.14%, rgba(255, 255, 255, 0) 19.32%, rgba(255, 255, 255, 0) 53.62%, rgba(255, 255, 255, 0.33) 100%)",
                              WebkitMask:
                                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                              WebkitMaskComposite: "xor",
                              maskComposite: "exclude",
                              pointerEvents: "none",
                            },
                          }}
                        >
                          <Textarea
                            borderRadius="10px"
                            ref={inputRef}
                            fontSize={{ base: "14px", md: "20px" }}
                            fontWeight={"500"}
                            width={{ base: "370px", md: "100%" }}
                            bgColor="#EBEDF8"
                            backdropFilter="blur(9px)"
                            minHeight={{ base: "57px", md: "89px" }}
                            height={{ base: "57px", md: "89px" }}
                            textIndent="5px"
                            placeholder={isRecording ? t("listening") : t("search_among")}
                            color="black"
                            border="none" // removes the border completely
                            _placeholder={{ color: "#000000" }}
                            {...register("search")}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleClickSearch();
                              }
                            }}
                          />
                          <HStack
                            w={"100%"}
                            justifyContent={"end"}
                            alignItems={"end"}
                            mt={{ base: "0px", md: "5px" }}
                          >

                            <HStack height={"100%"} alignItems={"center"} paddingY={'5px'}>
                              {searchActive && (
                                <Box
                                  height={"fit-content"}
                                  display={"flex"}
                                  flexDir={"row"}
                                  alignItems={"center"}
                                  gap={"5px"}
                                  bgColor={"#FFFFFF0D"}
                                  border={"1px"}
                                  borderColor={"#3646B3"}
                                  borderRadius={"10px"}
                                  padding={"5px"}
                                >
                                  <Button
                                    leftIcon={<IoSearch fontSize={{ base: '1px', md: "20px" }} size={'22px'} color="#3646B3" />}
                                    bgColor={"#3646B333"}
                                    color={"#081438"}
                                    borderRadius={'6px'}
                                    onClick={(e) => handleClickSearch()}
                                    fontSize={{ base: "6px", md: "14px" }}
                                    height={{ base: "13px", md: "30px" }}
                                    width={{ base: "50px", md: "auto" }}
                                  >
                                    معمولی
                                  </Button>
                                  <Button
                                    height={{ base: "13px", md: "30px" }}
                                    fontSize={{ base: "6px", md: "14px" }}
                                    borderRadius={'6px'}
                                    onClick={(e) => handleClickSemanticSearch()}
                                    leftIcon={
                                      <svg
                                        width={currentSize == 'base' ? '7' : "17"}
                                        height={currentSize == 'base' ? '8' : "18"}
                                        viewBox="0 0 17 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M15.5129 16.6387L12.0137 13.2129L15.5129 16.6387Z"
                                          fill="black"
                                        />
                                        <path
                                          d="M15.5129 16.6387L12.0137 13.2129"
                                          stroke="#3646B3"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M13.9003 8.745C13.9003 12.2326 11.0124 15.0598 7.45013 15.0598C3.88782 15.0598 1 12.2326 1 8.745C1 5.25742 3.88782 2.43018 7.45013 2.43018"
                                          stroke="#3646B3"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M11.1696 0.232422L11.61 2.01061C11.9087 3.21516 12.8889 4.15473 14.1454 4.44107L16.0003 4.86329L14.1454 5.28552C12.8889 5.57185 11.9087 6.51142 11.61 7.71597L11.1696 9.49416L10.7292 7.71597C10.4305 6.51142 9.45034 5.57185 8.1938 5.28552L6.33887 4.86329L8.1938 4.44107C9.45034 4.15473 10.4305 3.21516 10.7292 2.01061L11.1696 0.232422Z"
                                          fill="#3646B3"
                                        />
                                      </svg>
                                    }
                                    bgColor={"#3646B333"}
                                    color={"#081438"}
                                    width={{ base: "50px", md: "auto" }}
                                  >
                                    معنایی
                                  </Button>
                                </Box>
                              )}
                              {!searchActive && (
                                <Box
                                  height={"fit-content"}
                                  display={"flex"}
                                  flexDir={"row"}
                                  alignItems={"center"}
                                  gap={"5px"}
                                  bgColor={"#FFFFFF0D"}
                                  borderRadius={"10px"}
                                  padding={"5px"}
                                >
                                  <Button
                                    w={{ base: "47px", md: "109px" }}
                                    height={{ base: "17px", md: "40px" }}
                                    color={"#3646B3"}
                                    borderRadius="10px"
                                    rightIcon={
                                      <IoSearch fontSize={{ base: "10px", md: "25px" }} size={'25px'} />
                                    }
                                    fontSize={{ base: "6px", md: "14px" }}
                                    onClick={(e) => setSearchActive(true)}
                                    variant={"outline"}
                                  >
                                    جستجو
                                  </Button>
                                </Box>
                              )}
                              <Tooltip
                                label="پاسخ معنایی با استفاده از هوش مصنوعی"
                                bgColor={"#D9D9D9"}
                                color={"#333333"}
                                sx={{
                                  boxShadow: `
                                  0px 20px 45px 0px #00000033,
                                  0px 82px 82px 0px #0000002B,
                                  0px 184px 111px 0px #0000001A,
                                  0px 328px 131px 0px #00000008,
                                  0px 512px 143px 0px #00000000
                                `,
                                }}
                                hasArrow
                              >
                                <Button
                                  bgColor={"#081438"}
                                  w={{ base: "80px", md: "179px" }}
                                  height={{ base: "17px", md: "40px" }}
                                  fontSize={{ base: "6px", md: "14px" }}
                                  fontWeight={"700"}
                                  color={"white"}
                                  borderRadius="10px"
                                  leftIcon={
                                    currentSize != "base" ? (
                                      <svg
                                        width="13"
                                        height="14"
                                        viewBox="0 0 13 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.5 0L7.09264 2.68791C7.49455 4.5087 8.81335 5.92895 10.5041 6.36177L13 7L10.5041 7.63823C8.81335 8.07105 7.49455 9.4913 7.09264 11.3121L6.5 14L5.90736 11.3121C5.50545 9.4913 4.18665 8.07105 2.49591 7.63823L0 7L2.49591 6.36177C4.18665 5.92895 5.50545 4.5087 5.90736 2.68791L6.5 0Z"
                                          fill="#29CCCC"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="6"
                                        height="7"
                                        viewBox="0 0 6 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M2.89814 0.694336L3.15614 1.86452C3.33111 2.6572 3.90526 3.2755 4.64132 3.46393L5.72791 3.74179L4.64132 4.01964C3.90526 4.20807 3.33111 4.82638 3.15614 5.61906L2.89814 6.78924L2.64013 5.61906C2.46516 4.82638 1.89102 4.20807 1.15496 4.01964L0.0683594 3.74179L1.15496 3.46393C1.89102 3.2755 2.46516 2.6572 2.64013 1.86452L2.89814 0.694336Z"
                                          fill="#29CCCC"
                                        />
                                      </svg>
                                    )
                                  }
                                  rightIcon={
                                    currentSize != "base" ? (
                                      <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M0.720694 7.78459L16.2645 0.12078C17.0776 -0.28007 18 0.365831 18 1.33614V5.32419C18 6.16725 17.4516 6.89296 16.6905 7.05663L11.0017 8.28076C10.2766 8.43656 10.2766 9.56335 11.0017 9.71937L16.6905 10.9435C17.4516 11.1072 18 11.8327 18 12.676L18 16.6638C18 17.6341 17.0776 18.2802 16.2645 17.8791L0.720694 10.2155C-0.240232 9.74163 -0.240232 8.25828 0.720694 7.78459Z"
                                          fill="white"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="9"
                                        height="9"
                                        viewBox="0 0 9 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M0.950104 4.21324L7.71712 0.8768C8.07107 0.70229 8.47266 0.983484 8.47266 1.40591V3.14211C8.47266 3.50913 8.2339 3.82507 7.90256 3.89633L5.42594 4.42925C5.11027 4.49708 5.11027 4.98763 5.42594 5.05555L7.90256 5.58848C8.2339 5.65973 8.47266 5.97557 8.47266 6.3427V8.0788C8.47266 8.50122 8.07107 8.78251 7.71712 8.60791L0.950104 5.27156C0.531765 5.06524 0.531765 4.41947 0.950104 4.21324"
                                          fill="white"
                                        />
                                      </svg>
                                    )
                                  }
                                  onClick={(e) => handleAiResponse()}
                                >
                                  پاسخ هوش‌مصنوعی
                                </Button>
                              </Tooltip>
                            </HStack>
                          </HStack>
                        </VStack>
                        }
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>


                {/* {(!showMore && aiMessage?.length > 200) && (
                  <VStack w={"100%"} justifyContent={"center"}>
                    <Text
                      fontSize={"14px"}
                      color={"#3646B3"}
                      cursor={"pointer"}
                      onClick={(e) => setShowMore(true)}
                    >
                      مشاهده کامل
                    </Text>
                  </VStack>
                )} */}
              </VStack>
            )}

            <Flex
              flexDir={{ base: "column", md: "row" }}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"start"}
              height={"100%"}
              width={"100%"}
              className="questionlist"
            >
              <HStack mb={"10px"} ml={"20px"}>
                <IoSearch color={"#3646B3"} fontSize={"22px"} />
                <Text
                  fontSize={{ base: "20px", md: "30px" }}
                  color={"#3646B3"}
                  whiteSpace={"nowrap"}
                >
                  نتایج جستجو بین سوالات
                </Text>
                <Text
                  color={"#C2C2C2"}
                  fontSize={{ base: "11px", md: "16px" }}
                  whiteSpace={"nowrap"}
                >
                  {dataQuestionSearch?.data?.data?.total_count} سوال
                </Text>
              </HStack>
              {!filter ? (
                <Box
                  position="relative"
                  cursor="pointer"
                  borderRadius="15px"
                  overflow="hidden"
                  role="group"
                  onClick={() => setFilter(true)}
                >
                  {/* Background */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="0" // default: no background
                    height="100%"
                    bgColor="#3646B31A"
                    transition="width 0.4s ease" // collapse smoothly on leave
                    _groupHover={{
                      width: "100%", // appear instantly on hover
                      transition: "none", // no animation on hover enter
                    }}
                    zIndex={0}
                  />

                  {/* Content */}
                  <HStack
                    position="relative"
                    alignItems="center"
                    justifyContent="center"
                    height="60px"
                    px={4}
                    spacing={2}
                    zIndex={1}
                  >
                    {size != "base" && (
                      <Text
                        fontFamily="iransans"
                        fontWeight="500"
                        fontSize="20px"
                        color="#3646B3"
                        opacity={0} // hidden initially
                        transition="opacity 0.4s ease" // smooth fade on leave
                        _groupHover={{
                          opacity: 1, // appear instantly
                          transition: "none", // no animation on hover enter
                        }}
                        pointerEvents="none"
                      >
                        فیلترها
                      </Text>
                    )}

                    <IconButton
                      icon={<IoOptionsOutline color="#3646B3" />}
                      fontSize="31px"
                    />
                  </HStack>
                </Box>
              ) : (
                <Box
                  flex="1"
                  as={HStack}
                  justifyContent={"space-between"}
                  w={"calc( 100% - 40px )"}
                  bgColor={"#3646B31A"}
                  overflow={"hidden"}
                  height={"60px"}
                  borderRadius={"10px"}
                >
                  <TextSlider
                    source={source}
                    setFilters={setFilters}
                    filters={filters}
                  />
                  <Box>
                    <IoMdClose
                      color="#3646B3"
                      fontSize={"24px"}
                      width={"fit-content"}
                      cursor={"pointer"}
                      style={{ width: "24px", marginLeft: "14px" }}
                      onClick={(e) => setFilter(false)}
                    />
                  </Box>
                </Box>
              )}
            </Flex>

            <VStack
              w={"100%"}
              bgColor={"white"}
              padding={"14px"}
              borderRadius={"15px"}
            >
              <HStack w={"100%"} justifyContent={"space-between"}></HStack>
              {isLoadingQuestionSearch ? (
                <HStack
                  w={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Spinner />
                </HStack>
              ) : (
                <VStack display={{ base: "none", md: "flex" }} w={"100%"} >
                  {dataQuestionSearch?.data?.data?.result?.map(
                    (item, index) => (
                      <QuestionCard
                        key={index}
                        data={item}
                        t={t}
                        bgColor={"#F7F7F7"}
                      />
                    )
                  )}
                  <Stack
                    w={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Pagination
                      totalPages={
                        Math?.ceil(
                          dataQuestionSearch?.data?.data?.total_count / 10
                        ) - 1
                      }
                      currentPage={page}
                      onPageChange={setPage}
                      t={t}
                    />
                  </Stack>
                </VStack>
              )}
            </VStack>

            <VStack display={{ base: "flex", md: "none" }} width={"100%"}>
              {dataQuestionSearch?.data?.data?.result?.map((item, index) => (
                <QuestionMCard key={index} data={item} t={t} />
              ))}
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Tabs>
  );
};

export default Index;
