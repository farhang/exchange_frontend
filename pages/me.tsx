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
import React, { useEffect } from 'react'
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

export default function Login() {
  let token: string | null = ''
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }
  const [{ data, loading, error }, geMe] = useAxios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    method: 'GET',
  })

  useEffect(() => {
    console.log('data', data)
  }, [data])
  return (
    <>
      <Container maxW={'7xl'} paddingX={6} paddingY={4}>
        User{' '}
        <Text fontFamily={'Yekan Bakh Phinix Bold'} display={'inline-block'}>
          {data?.email}{' '}
        </Text>{' '}
        successfully verified and logged in.
      </Container>
    </>
  )
}
