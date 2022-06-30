import { Heading, IconButton, VStack } from "@chakra-ui/react";
import EntryRequestForm from "../components/EntryRequestForm";
import SlackIcon from "../components/SlackIcon";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { user, signInWithSlack } = useAuth();

  return user ? (
    <EntryRequestForm user={user} />
  ) : (
    <VStack minH="75vh" justify="center" spacing={5} textAlign="center">
      <Heading fontSize="2xl">
        You need to sign in with slack to continue :
      </Heading>
      <IconButton icon={<SlackIcon />} onClick={signInWithSlack} size="lg" />
    </VStack>
  );
}
