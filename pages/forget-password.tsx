import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useAxios from 'axios-hooks'
import Link from 'next/link'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export default function ForgetPassword() {
  const [{ data, loading, error }, loginUser] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgetPassword`,
      method: 'POST',
    },
    { manual: true }
  )

  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => {
    loginUser({ data: data })
  }
  return (
    <>
      <Container maxW={'7xl'} paddingX={6} paddingY={4}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          justifyContent={'space-between'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Box minW={{ lg: 'sm', sm: 'sm' }} maxW={{ lg: 'sm', sm: 'sm' }}>
            <Heading mb={8} color={'gray.500'} size={'md'}>
              Forget passwrod
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormControl mb={4} isInvalid={errors.email?.message}>
                <FormLabel mb={1} htmlFor="email">
                  Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    color="gray.500"
                    pointerEvents="none"
                    children={<HiOutlineMail />}
                  />
                  <Input
                    {...login('email')}
                    type="email"
                    placeholder="youremail@provider.com"
                  />
                </InputGroup>
                {errors.email?.message && (
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mb={4} isInvalid={errors.password?.message}>
                <FormLabel mb={1} htmlFor="password">
                  Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    color="gray.500"
                    pointerEvents="none"
                    children={<HiOutlineMail />}
                  />
                  <Input
                    {...login('password')}
                    type="password"
                    placeholder="Password"
                  />
                </InputGroup>
                {errors.password?.message && (
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button
                isLoading={loading}
                type={'submit'}
                mt={4}
                width={'full'}
                colorScheme={'indigo'}
              >
                Sign in
              </Button>
            </form>
            <Text mt={8} size={'3xs'} color={'gray.500'}>
              <Link href={'login'}>Login to your account</Link>
            </Text>
            <Text mt={8} size={'3xs'} color={'gray.500'}>
              <Link href={'register'}>Create new accout</Link>
            </Text>
          </Box>
          <Box
            alignItems={'start'}
            display={['none', 'none', 'block']}
            textAlign={'center'}
          >
            <Image src={'./images/auth-character.svg'} mb={9} />
            <Heading size={'lg'} color={'gray.900'}>
              Buy Crypto in Minutes
            </Heading>
            <Text fontSize={'xl'} color={'gray.500'}>
              {' '}
              Enjoy the world’s largest cryptocurrency exchange at your
              fingertips.
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
