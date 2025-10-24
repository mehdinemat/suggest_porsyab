import AboutUsCard from "@/components/aboutus/aboutUsCard";
import Header from "@/components/aboutus/header";
import MainLayout from "@/components/mainLayout";
import {
  Box,
  Center,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const items = [
  {
    image: "/img1.jpg",
    title: "آیت الله محمدتقی بهجت فومنی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img2.jpg",
    title: "آیت الله جعفر سبحانی خیابانی تبریزی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img3.jpg",
    title: "آیت الله سید عبدالکریم موسوی اردبیلی",
    button: "اطلاعات بیشتر",
  },
];

const Index = () => {
  return (
    <MainLayout menuDefault={true}>
      <Header />
      <Box
        scrollSnapAlign="start"
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        // maxW="container.xl"
        mx="auto"
        pt={{ base: "80px", md: "60px" }}
        my={"20px"}
      >
        <Center>
          <HStack
            dir="rtl"
            w="100%"
            justifyContent="space-between"
            gap="25px"
            flexDir={{ base: "column-reverse", md: "row" }} // ✅ key change
            maxW="container.lg"
          >
            <Stack w="100%" justifyContent="center" alignItems="center">
              <Image src="/aboutus1.png" w="445px" h="445px" />
            </Stack>

            <VStack w="100%" alignItems={{ base: "center", md: "start" }}>
              <Text
                fontSize="33px"
                fontWeight="800"
                color="#3646B3"
                fontFamily="morabba"
              >
                درباره پارسا
              </Text>

              <Text
                w={{ base: "90%", md: "500px" }} // ✅ optional: better responsiveness
                fontSize="16px"
                textAlign="justify"
                fontWeight="400"
              >
                بسیاری از مردم جامعه، در زندگی روزمره خود با مسائل دینی مختلفی
                مواجه می‌شوند که دریافت پاسخ این پرسشها گاها برای آنها ناممکن و
                یا زمان بر است. از این رو در سالهای گذشته، سامانه‌های برخط
                متعددی آماده شده است که از طرفی روند پرسش سوال را بصورت
                الکترونیکی در اختیار مردم قرارداده و از طرف دیگر، امکان پاسخگویی
                متمرکز را برای دفاتر مراجع و مراکز پاسخ گویی، فراهم نموده است.
                اما این سامانه‌ها با مشکلات متعددی دست و پنجه نرم می‌کنند که
                تاثیر بسیار بدی در خدمات آنها گذاشته است. نبود موتور جستجوی
                معنایی پرسش و پاسخ سیستم هوشمند پاسخگویی به سوالات چالش سوالات
                تکراری چالش تگ‌گذاری انبوه سوالات چالش غلط های نگارشی و املایی
                کاربران و حتی افراد خبره پاسخ گو سوالات نامناسب و مناسب حال
                کاربران ...{" "}
              </Text>
            </VStack>
          </HStack>
        </Center>

        <VStack w={"100%"} alignItems={"center"} mb={"20px"} mt={"100px"}>
          <Text
            fontFamily={"morabba"}
            fontWeight={"800"}
            fontSize={"33px"}
            color={"#3646B3"}
          >
            ویژگی‌های پارسا
          </Text>
          <Text>
            گروه پارسا در اين زمينه تلاش هايی به عمل آورده است که از جمله آن به
            موارد زیر می‌توان اشاره نمود.
          </Text>
        </VStack>
        <Box bgColor={"#F7F7F7"}>
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={"20px"}
            maxW="container.lg"
            alignItems={"center"}
            justifyContent={"center"}
            // maxW="container.xl"
            placeItems="center"
            mx="auto"
            py={"50px"}
          >
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"} bgColor={"white"}>
                <Image
                  src="/aboutus_list1.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                fontSize={{ base: "10px", md: "16px" }}
                textAlign={"justify"}
              >
                یافتن سوالات مشابه، مرتبط و تکراری
              </Text>
            </VStack>
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"}>
                <Image
                  src="/aboutus_list2.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                align={"justify"}
                textAlign={"justify"}
                fontSize={{ base: "10px", md: "16px" }}
              >
                موتور جستجوی سوالات از تمامی پایگاه‌های پرسش و پاسخ اسلامی
              </Text>
            </VStack>
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"}>
                <Image
                  src="/aboutus_list3.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                fontSize={{ base: "10px", md: "16px" }}
                textAlign={"justify"}
              >
                تگ‌گذاری خودکار سوالات
              </Text>
            </VStack>
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"}>
                <Image
                  src="/aboutus_list4.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                fontSize={{ base: "10px", md: "16px" }}
                textAlign={"justify"}
              >
                سیستم‌های توصیه‌گر سوال
              </Text>
            </VStack>
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"}>
                <Image
                  src="/aboutus_list5.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                fontSize={{ base: "10px", md: "16px" }}
                textAlign={"justify"}
              >
                ساده سازی متن
              </Text>
            </VStack>
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"}>
                <Image
                  src="/aboutus_list6.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                align={"justify"}
                textAlign={"justify"}
                fontSize={{ base: "10px", md: "16px" }}
              >
                تصحیح غلط های املایی در سوالات، پاسخ‌ها و متن مورد جستجو
              </Text>
            </VStack>
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"}>
                <Image
                  src="/aboutus_list7.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                align={"justify"}
                textAlign={"justify"}
                fontSize={{ base: "10px", md: "16px" }}
              >
                یافتن پاسخ سوال از متن خام کتابهای اسلامی
              </Text>
            </VStack>
            <VStack
              bgColor={"white"}
              justifyContent={"space-between"}
              p={"20px"}
              borderRadius={"18px"}
              boxShadow="0px 3px 5.5px 0px #00000029"
              w={{ base: "142px", md: "250px" }}
              h={{ base: "122px", md: "216px" }}
            >
              <Box w={"100px"} h={"100px"}>
                <Image
                  src="/aboutus_list8.png"
                  w={{ base: "50px", md: "121px" }}
                  h={{ base: "50px", md: "121px" }}
                />
              </Box>
              <Text
                align={"justify"}
                textAlign={"justify"}
                fontSize={{ base: "10px", md: "16px" }}
              >
                سامانه لیبل گذاری دیتا و تولید دیتاست
              </Text>
            </VStack>
          </Grid>
        </Box>
        <HStack
          w={"100%"}
          justifyContent={"center"}
          my={"40px"}
          position={"relative"}
          mt={"55px"}
        >
          <VStack>
            <Text
              fontWeight={"800"}
              fontSize={"33px"}
              color={"#3646B3"}
              fontFamily={"morabba"}
            >
              تیم پارسا
            </Text>
            <Text color={"gray"}>
              گروه پارسا در اين زمينه تلاش هايی به عمل آورده است که از جمله آن
              به موارد زیر می‌توان اشاره نمود.
            </Text>
          </VStack>
        </HStack>

        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
          gap={"20px"}
          w={"100%"}
          mt={"33px"}
          maxW="container.lg"
          alignItems={"center"}
          justifyContent={"center"}
          placeItems="center"
          // maxW="container.xl"
          mb={"50px"}
          mx="auto"
        >
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Index;
