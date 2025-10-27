import MainLayout from "@/components/mainLayout";
import Pagination from "@/components/pagination";
import UsersCard from "@/components/users/usersCard";
import {
  Box,
  Button,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import useSWR from "swr";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";

const Index = () => {
  const router = useRouter();

  const [filters, setFilters] = useQueryParams({
    page: withDefault(NumberParam, 1),
  });

  const { t } = useTranslation();
  const { data: dataUser, isLoading: isLoadingUser } = useSWR(
    `user/client?page=${filters?.page}&size=10`
  );

  const handleOpenProfileUser = (id) => {
    router.push(`/users/${id}`);
  };

  return (
    <MainLayout menuDefault={true}>
      <Head>
        <title>لیست کاربران</title>
        <link rel="icon" href="/question.png" />
      </Head>
      <Box
        scrollSnapAlign="start"
        marginTop={{ base: "60px", md: "100px" }}
        mb={"20px"}
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: "0px", md: "20px" }}
        px={{ base: "20px" }}
        pt={{ base: '120px', md: '120px' }}
      >

        <HStack
          w={"100%"}
          justifyContent={"space-between"}
          display={{ base: "none", md: "flex" }}
        >
          <Text fontWeight={"800"} fontSize={'33px'} fontFamily={'morabba'} >{t("users")}</Text>
          <HStack w={"100%"} alignItems={"end"} justifyContent={"end"}>
            <HStack justifyContent={{ base: "start" }}>
              <Button
                color={'#979797'}
                variant={"ghost"}
                fontSize={"18px"}
                fontWeight={'600'}
                padding={{ base: "0px" }}
                display={{ base: "none", md: "flex" }}
              >
                {t("sort_by")}
              </Button>
              <Select bgColor={'#F3F3F3'} color={'#3646B3'} borderRadius={'13px'} height={'40px'} width={'117px'} border={'none'}>
                <option>{t("latest")}</option>
                <option>{t("most_viewed")}</option>
                <option>{t("most_popular")}</option>
              </Select>
              {/* <Button
                variant={"ghost"}
                fontSize={"sm"}
                padding={{ base: "0px" }}
                display={{ md: "none", md: "flex" }}
              >
                {t("latest")}
              </Button> */}
            </HStack>
            {/* <HStack display={{ base: "none", md: "flex" }}>
            <Button variant={"ghost"} fontSize={"sm"}>
              {t("latest")}
            </Button>
            <Button variant={"ghost"} fontSize={"sm"}>
              {t("most_viewed")}
            </Button>
            <Button variant={"ghost"} fontSize={"sm"}>
              {t("most_popular")}
            </Button>
          </HStack> */}
          </HStack>
          <InputGroup width={"290px"} height={"40px"} bgColor={'#F3F3F3'} color={'#3646B3'} borderRadius={'13px'}>
            <Input
              borderRadius={'13px'}
              width={"290px"}
              height={"40px"}
              placeholder={t("search_user")}
            />
            <InputRightElement h="100%">
              <IoSearch
                fontSize="20px"
                style={{ marginTop: "2px" }}
                color="gray"
              />
            </InputRightElement>
          </InputGroup>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"} my={"20px"}>
          {/* <Text fontWeight={'bold'} >کاربر</Text> */}

        </HStack>
        <Grid
          bgColor={'#F3F3F3'}
          padding={'26px'}
          borderRadius={'15px'}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          gap={"20px"}
          w={"100%"}
        >
          {dataUser?.data?.result?.map((user) => (
            <UsersCard
              t={t}
              item={user}
              handleProfile={handleOpenProfileUser}
            />
          ))}
        </Grid>
        <Stack w={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Pagination
            totalPages={Math.ceil(dataUser?.data?.total_count / 10)}
            currentPage={filters?.page}
            onPageChange={(e) => setFilters({ page: e })}
            t={t}
          />
        </Stack>
      </Box>
    </MainLayout>
  );
};

export default Index;
