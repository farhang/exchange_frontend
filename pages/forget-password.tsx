import {
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
import React from 'react'
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useAxios from 'axios-hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'

const schema = yup.object({
  email: yup.string().email().required(),
  newPassword: yup.string().required(),
  confirmNewPassword: yup
    .string()
    .test('passwords-match', 'passwords must match', function (value) {
      return this.parent.newPassword === value
    }),
})

export default function ForgetPassword() {
  const router = useRouter()
  const [{ loading }, forgetPasswordUser] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,
      method: 'PATCH',
    },
    { manual: true }
  )

  const {
    register: forgetPassword,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => {
    forgetPasswordUser({
      data: { email: data.email, password: data.newPassword },
    }).then((res) => {
      console.log(' res.data', res.data)
      router.push({ pathname: 'login' })
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
            <Heading mb={8} color={'gray.500'} size={'md'}>
              Forget your password
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
                    {...forgetPassword('email')}
                    type="email"
                    className={'email'}
                    placeholder="youremail@provider.com"
                  />
                </InputGroup>
                {errors.email?.message && (
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mb={4} isInvalid={errors.newPassword?.message}>
                <FormLabel mb={1} htmlFor="newPassword">
                  New Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.500" pointerEvents="none">
                    <HiOutlineLockClosed />
                  </InputLeftElement>
                  <Input
                    {...forgetPassword('newPassword')}
                    type="password"
                    className={'newPassword'}
                    placeholder="New Password"
                  />
                </InputGroup>
                {errors.newPassword?.message && (
                  <FormErrorMessage>
                    {errors.newPassword?.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={errors.confirmNewPassword?.message}
              >
                <FormLabel mb={1} htmlFor="password">
                  Reset Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.500" pointerEvents="none">
                    <HiOutlineLockClosed />
                  </InputLeftElement>
                  <Input
                    {...forgetPassword('confirmNewPassword')}
                    type="password"
                    className={'confirmNewPassword'}
                    placeholder="Confirm New Password"
                  />
                </InputGroup>
                {errors.confirmNewPassword?.message && (
                  <FormErrorMessage>
                    {errors.confirmNewPassword?.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button
                isLoading={loading}
                type={'submit'}
                mt={4}
                width={'full'}
                colorScheme={'indigo'}
                className={'reset-password'}
              >
                Reset Password
              </Button>
            </form>
            <Text mt={8} size={'3xs'}>
              <Link href={'/login'}>Login to your account</Link>
            </Text>
            <Text mt={2} size={'3xs'}>
              <Link href={'/register'}>Register</Link>
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
