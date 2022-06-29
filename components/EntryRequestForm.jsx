import {
  Alert,
  AlertIcon,
  Button,
  chakra,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAccessForm from "../hooks/useAccessForm";

export default function EntryRequestForm({ user }) {
  const { getYourData, createEntry } = useAccessForm(user?.id);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    register: formRegister,
  } = useForm();
  const toast = useToast();

  const [allFieldsSet, setAllFieldsSet] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      (async () => {
        const { data } = await getYourData();
        setAllFieldsSet(data !== null);
        reset(data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, reset]);

  async function submitHandler(data) {
    await createEntry(data);
    toast({
      title: "Success!",
      description: `Your template is ${allFieldsSet ? "updated" : "created"}!`,
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "top",
    });
    setAllFieldsSet(true);
    setShowForm(false);
  }

  return !showForm && allFieldsSet ? (
    <VStack align="start" spacing={5} w="full">
      <Heading fontSize="5xl">
        Hi,{" "}
        <chakra.span
          bgGradient="linear(to-l, #f07935, #996699, #039be5)"
          bgClip="text"
        >
          {user.name}
        </chakra.span>
        !
      </Heading>
      <Heading fontSize="3xl">
        🥳 Yay! You already filled out your template for the entry request
        automation.
      </Heading>
      <Text fontSize="lg">
        You can edit your template by clicking the button below 👇
      </Text>
      <Button
        size="lg"
        onClick={() => {
          setShowForm(true);
        }}
      >
        Update my template
      </Button>
    </VStack>
  ) : (
    <VStack
      spacing={5}
      align="start"
      mr="auto"
      w="full"
      as="form"
      onSubmit={handleSubmit((data) => submitHandler(data))}
    >
      <Heading fontSize="5xl">
        Hi,{" "}
        <chakra.span
          bgGradient="linear(to-l, #f07935, #996699, #039be5)"
          bgClip="text"
        >
          {user.name}
        </chakra.span>
        !
      </Heading>
      <Text fontWeight="medium">
        {allFieldsSet
          ? "Wanna update your template? The form is as of now pre-filled with your previous data. Please do not change anything unless you want to change your template."
          : "Fill out your template! I did you a favor by filling out some of the fields below. Please fill out the rest of the fields."}
      </Text>
      <Alert status="info">
        <AlertIcon />
        Remember to fill in all the fields for this automation to work.
      </Alert>
      <Divider />
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Employee Name</FormLabel>
        <Input
          {...formRegister("name", {
            required: {
              value: true,
              message: "Please enter your full name",
            },
          })}
          defaultValue={user?.name}
          variant="filled"
          id="name"
          type="text"
          w={["xs", "sm", "lg"]}
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.vehicle}>
        <FormLabel htmlFor="vehicle">Vehicle Number</FormLabel>
        <Input
          {...formRegister("vehicle", {
            required: {
              value: true,
              message: "Please enter your vehicle number",
            },
          })}
          variant="filled"
          id="vehicle"
          type="text"
          w={["xs", "sm", "lg"]}
        />
        <FormErrorMessage>{errors?.vehicle?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.designation}>
        <FormLabel htmlFor="designation">Employee Designation</FormLabel>
        <Input
          {...formRegister("designation", {
            required: {
              value: true,
              message: "Please enter your designation",
            },
          })}
          variant="filled"
          id="designation"
          type="text"
          w={["xs", "sm", "lg"]}
        />
        <FormErrorMessage>{errors?.designation?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.mobile}>
        <FormLabel htmlFor="mobile">Employee Mobile Number</FormLabel>
        <Input
          {...formRegister("mobile", {
            required: {
              value: true,
              message: "Please enter your mobile number",
            },
          })}
          variant="filled"
          id="mobile"
          type="text"
          w={["xs", "sm", "lg"]}
        />
        <FormErrorMessage>{errors?.mobile?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Employee Email Address</FormLabel>
        <Input
          {...formRegister("email", {
            required: {
              value: true,
              message: "Please enter your email-id",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email-id",
            },
          })}
          defaultValue={user?.email}
          variant="filled"
          id="email"
          type="email"
          w={["xs", "sm", "lg"]}
        />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.startup}>
        <FormLabel htmlFor="startup">Name of the Startup</FormLabel>
        <Input
          {...formRegister("startup", {
            required: {
              value: true,
              message: "Please enter your startup name",
            },
          })}
          defaultValue="Apxor Technology Solutions Pvt. Ltd"
          variant="filled"
          id="startup"
          type="text"
          w={["xs", "sm", "lg"]}
        />
        <FormErrorMessage>{errors?.startup?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.purpose}>
        <FormLabel htmlFor="purpose">Purpose of Visit</FormLabel>
        <Input
          {...formRegister("purpose", {
            required: {
              value: true,
              message: "Please enter why you wanna attend",
            },
          })}
          defaultValue="I work here."
          variant="filled"
          id="purpose"
          type="text"
          w={["xs", "sm", "lg"]}
        />
        <FormErrorMessage>{errors?.purpose?.message}</FormErrorMessage>
      </FormControl>
      <HStack spacing={4}>
        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          colorScheme="blue"
        >
          {allFieldsSet ? "Update" : "Submit"}
        </Button>
        <Tooltip
          isDisabled={allFieldsSet}
          hasArrow
          label="Please fill all the fields."
          shouldWrapChildren
          mt="3"
          placement="top-start"
        >
          <Button
            size="lg"
            disabled={!allFieldsSet}
            onClick={() => {
              setShowForm(false);
            }}
          >
            Nevermind
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  );
}
