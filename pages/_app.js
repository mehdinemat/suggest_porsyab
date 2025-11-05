// pages/_app.js
import { Fonts } from "@/components/base/global";
import { fetcher, useAxiosInterceptors } from "@/components/lib/api";
import { getTheme } from "@/components/theme";
import { UserProvider } from "@/context/UserContext";
import { Box, Center, ChakraProvider, useToast } from "@chakra-ui/react";
import { NextAdapter } from "next-query-params";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SWRConfig } from "swr";
import { QueryParamProvider } from "use-query-params";
import i18n from "../i18n"; // Assuming i18n.js is in the root directory
import animationData from "../public/animations/loading.json";
import "../styles/globals.css";
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});
const AppWrapper = ({ Component, pageProps }) => {
  const toast = useToast();
  useAxiosInterceptors((options) => toast(options));
  return <Component {...pageProps} />;
};
const Adapter = (props) => <NextAdapter {...props} shallow={true} />;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { ready } = useTranslation();
  const { locale } = router;
  const theme = getTheme(locale || "en");

  const [isLanguageSet, setIsLanguageSet] = useState(false);

  useEffect(() => {
    // Ensure that the i18n language is set to match the Next.js router locale
    if (router.locale && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale).then(() => {
        setIsLanguageSet(true); // Set language, and enable rendering
      });
    } else {
      setIsLanguageSet(true); // Language is already correct, enable rendering
    }
  }, [router.locale]); // Re-run the effect when locale changes

  const isLoading = !isLanguageSet || !ready;


  if (isLoading) {
    return <Center h={'100vh'}>
      <Box w="200px" mx="auto">
        <Lottie animationData={animationData} loop={true} />
      </Box>
    </Center>;
  }

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <QueryParamProvider adapter={Adapter} options={{ enableBatching: true }}>
          <SWRConfig value={{ fetcher }}>
            <AppWrapper Component={Component} pageProps={pageProps} />
          </SWRConfig>
          <Fonts lang={locale || "en"} />
        </QueryParamProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
