import { Link, Text, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <VStack
      p={5}
      fontSize="sm"
      as="footer"
      maxW="container.md"
      mx="auto"
      textAlign="center"
    >
      <Text>
        All Rights Reserved &copy; {new Date().getFullYear()}, Lemme In
      </Text>
      <Text>
        Built with ❤️ using{" "}
        <Link
          fontWeight="semibold"
          color="#f07935"
          href="https://chakra-ui.com"
          target="_blank"
          rel="noreferrer"
        >
          Chakra UI
        </Link>
        ,{" "}
        <Link
          fontWeight="semibold"
          color="#f07935"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noreferrer"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          fontWeight="semibold"
          color="#f07935"
          href="https://supabase.com/docs"
          target="_blank"
          rel="noreferrer"
        >
          Supabase
        </Link>{" "}
        and{" "}
        <Link
          fontWeight="semibold"
          color="#f07935"
          href="https://firebase.google.com/docs/functions/schedule-functions"
          target="_blank"
          rel="noreferrer"
        >
          Firebase
        </Link>
        .
      </Text>
      <Text>
        Wanna contribute? Visit{" "}
        <Link
          fontWeight="semibold"
          color="#039be5"
          href="https://github.com/theskinnycoder/lemme-in"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </Link>
      </Text>
    </VStack>
  );
}
