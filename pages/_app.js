import { ChakraProvider, Divider, Flex, VStack } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContextProvider from "../contexts/AuthContext";
import theme from "../utils/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Flex direction="column" minH="100vh">
          <Header />
          <VStack flex={1} maxW="container.md" mx="auto" px={[5, 0]} py={10}>
            <Component {...pageProps} />
          </VStack>
          <Divider />
          <Footer />
        </Flex>
      </ChakraProvider>
    </AuthContextProvider>
  );
}
