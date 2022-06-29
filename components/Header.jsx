import { Avatar, Heading, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, signout } = useAuth();

  return (
    <HStack
      p={5}
      pos="sticky"
      zIndex={10}
      bgColor="#161f2e"
      borderBottom="1px solid"
      borderColor="gray.700"
      style={{
        insetX: 0,
        top: 0,
      }}
    >
      <HStack
        justify={user ? "space-between" : "center"}
        align="center"
        w="full"
        maxW="container.md"
        mx="auto"
      >
        <NextLink href="/" passHref>
          <Heading
            size="md"
            as="a"
            color="#f07935"
            _hover={{
              color: "#039be5",
            }}
          >
            lemme in!
          </Heading>
        </NextLink>
        {user && (
          <HStack spacing={2}>
            <Tooltip label={user?.name}>
              <Avatar size={["sm", "md"]} name={user?.name} src={user?.photo} />
            </Tooltip>
            <Tooltip label="Logout" placement="right">
              <IconButton
                variant="unstyled"
                size="xs"
                onClick={signout}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                }
              />
            </Tooltip>
          </HStack>
        )}
      </HStack>
    </HStack>
  );
}
