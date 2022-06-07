import React from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { indigo } from 'color-name'

interface TextInputProps {
  title?: string
  placeholder?: string
  classes?: string
  disabled?: boolean
  helptext?: string
  IconLeft?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null
  IconRight?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null
  onClick?: () => void
}
export const TextInput = ({
  disabled = false,
  classes = '',
  IconLeft = null,
  IconRight = null,
  onClick = () => null,
  ...props
}: TextInputProps) => {
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={'text'}
        placeholder="Enter password"
        _focus={{ outline: 'none', borderColor: 'indigo.600' }}
        className={'focus:outline-none focus:ring'}
      />
      {IconLeft && (
        <InputLeftElement width="4.5rem">
          <IconLeft className="text-zinc-500 pointer-events-none w-5 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
        </InputLeftElement>
      )}
      {IconRight && (
        <InputRightElement width="4.5rem">
          <span className={'hover: cursor-pointer'}>
            <IconRight className="text-zinc-500 pointer-events-none w-5 h-4" />
          </span>
        </InputRightElement>
      )}
    </InputGroup>
  )
}
