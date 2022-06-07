// import React  from "react";
// import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
//
// interface PasswordInputProps {
//   title?: string;
//   placeholder?: string;
//   classes?: string;
//   disabled?: boolean;
//   helptext?: string;
//   onClick?: () => void;
// }
// export const PasswordInput = ({
//   disabled = false,
//   classes = '',
//                                 IconLeft = <IconButton></IconButton>,
//   IconRight = null,
//   onClick = () => null,
//   ...props
//  }: PasswordInputProps) => {
//     return <InputGroup size='md'>
//
//             <Input
//                 pr='4.5rem'
//                 type={'text'}
//                 placeholder='Enter password'
//                 _focus={{outline :'none'}}
//                 className={'focus:outline-none focus:ring focus:border-indigo-600'}
//             />
//         {IconLeft && <InputLeftElement width='4.5rem'>
//             <IconLeft className="text-zinc-500 pointer-events-none w-5 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
//             </InputLeftElement>}
//         {IconRight && <InputRightElement width='4.5rem'>
//                 <span className={'hover: cursor-pointer'}><IconRight className="text-zinc-500 pointer-events-none w-5 h-4"/></span>
//             </InputRightElement>
//         }
//
//         </InputGroup>
// }
