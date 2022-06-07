import {
  Alert,
  AlertIcon,
  Box,
  Button,
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
import React, { useEffect } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useAxios from 'axios-hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'

const schema = yup.object({
  code: yup.number().required().min(6),
})

export default function Verify() {
  const router = useRouter()
  const [
    {
      data: setUserVerificationCodeData,
      loading: setUserVerificationCodeLoading,
      error: setUserVerificationCodeError,
    },
    setUserVerificationCode,
  ] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/${router?.query?.email}/verification`,
      method: 'PATCH',
    },
    { manual: true }
  )

  const [
    {
      data: getUserVerificationCodeData,
      loading: getUserVerificationCodeLoading,
      error: getUserVerificationCodeError,
    },
    getUserVerificationCode,
  ] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/${router?.query?.email}/verification`,
      method: 'POST',
    },
    { manual: true }
  )

  useEffect(() => {
    if (router?.query?.email) {
      console.log('email set to ', router?.query?.email)
      getUserVerificationCode().then((res) => {
        alert(res.data.data)
      })
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: null,
      email: null,
    },
  })
  const onSubmit = (data: any) => {
    console.log('data', data)
    setUserVerificationCode({ data: data }).then((res) => {
      router.push({
        pathname: 'login',
      })
    })
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
            <Heading size={'xl'} mb={8}>
              We sent you an email
            </Heading>
            <Alert mb={8} status="success" variant="subtle">
              <AlertIcon />
              If a Phinix account exists for {router?.query?.email}, an e-mail
              will be sent with further instructions.
            </Alert>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormControl
                display={'none'}
                mb={4}
                isInvalid={!!errors.email?.message}
              >
                <Input
                  disabled
                  {...register('email')}
                  type="hidden"
                  placeholder="youremail@provider.com"
                />
              </FormControl>

              <FormControl mb={4} isInvalid={!!errors.code?.message}>
                <FormLabel mb={1} htmlFor="code">
                  Verification code
                </FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.500" pointerEvents="none">
                    <HiOutlineInformationCircle />
                  </InputLeftElement>
                  <Input
                    {...register('code')}
                    type="number"
                    maxLength={6}
                    placeholder="Enter 6 Digits code here"
                  />
                </InputGroup>
                {errors.code?.message && (
                  <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
                )}
              </FormControl>

              <Button
                isLoading={
                  setUserVerificationCodeLoading ||
                  getUserVerificationCodeLoading
                }
                type={'submit'}
                mt={4}
                width={'full'}
                colorScheme={'indigo'}
              >
                Sign in
              </Button>
            </form>
            <Text mt={8} size={'3xs'} color={'gray.500'}>
              <Link href={'/forget-password'}>Forgotten your password?</Link>
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
