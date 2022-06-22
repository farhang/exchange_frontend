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
import React, { useEffect, useState } from 'react'
import {
  HiLockClosed,
  HiOutlineLockClosed,
  HiOutlineMail,
} from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useAxios from 'axios-hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'

// username: farhang.darzi@gmail.com
// password: Mntconix20$
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*[a-z])/, 'password must contain one lowercase')
    .matches(/^(?=.*[A-Z])/, 'password must contain one uppercase')
    .matches(/^(?=.*[0-9])/, 'password must contain one number')
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      'password must contain one Special Case Character'
    )
    .min(10, 'password must contain one 10 characters'),
  confirm_password: yup
    .string()
    .test('passwords-match', 'passwords must match', function (value) {
      return this.parent.password === value
    }),
})

export default function Register() {
  const router = useRouter()
  const [validatedEmail, setValidatedEmail] = useState()
  const [{ data, loading, error }, registerUser] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      method: 'POST',
    },
    { manual: true }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => {
    console.log('data on submit', data)
    setValidatedEmail(data.email)
    registerUser({ data })
  }
  useEffect(() => {
    console.log('data', data)
    if (data?.message) {
      console.log('validatedEmail', validatedEmail)
      router.push({
        pathname: 'verify',
        query: { email: validatedEmail },
      })
    }
  }, [data])
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
          <Box maxW={{ lg: 'sm', sm: 'sm' }}>
            <Heading size={'xl'}>Welcome to Phinix!</Heading>
            <Heading mb={8} color={'gray.500'} size={'md'}>
              Become a member — you’ll enjoy exclusive deals, offers and
              invites.
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormControl mb={4} isInvalid={errors.email?.message}>
                <FormLabel mb={1} htmlFor="email">
                  Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.500" pointerEvents="none">
                    <HiOutlineMail />
                  </InputLeftElement>
                  <Input
                    autoComplete={'email'}
                    {...register('email')}
                    type="email"
                    className={'email'}
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
                  <InputLeftElement color="gray.500" pointerEvents="none">
                    <HiOutlineLockClosed />
                  </InputLeftElement>
                  <Input
                    autoComplete={'new-password'}
                    {...register('password')}
                    type="password"
                    className={'password'}
                    placeholder="Password"
                  />
                </InputGroup>
                {errors.password?.message && (
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl mb={4} isInvalid={errors.confirm_password?.message}>
                <FormLabel mb={1} htmlFor="confirm_password">
                  Confirm password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.500" pointerEvents="none">
                    <HiOutlineLockClosed />
                  </InputLeftElement>
                  <Input
                    autoComplete={'new-password'}
                    {...register('confirm_password')}
                    type="password"
                    className={'confirm-password'}
                    placeholder="Confirm password"
                  />
                </InputGroup>
                {errors.confirm_password?.message && (
                  <FormErrorMessage>
                    {errors.confirm_password?.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button
                isLoading={loading}
                type={'submit'}
                mt={4}
                width={'full'}
                colorScheme={'indigo'}
                className={'register'}
              >
                Sign up
              </Button>
            </form>
            <Text mt={8} size={'3xs'} color={'gray.500'} textAlign={'center'}>
              By creating an account you agree to our Terms and Conditions and
              Data Protection Guidelines.
            </Text>
            <Text mt={8} size={'3xs'}>
              <Link href={'/login'}>Login to your account</Link>
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
