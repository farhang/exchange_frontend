import { useState } from 'react'

export const inputMaxLength = () => {
  const [num, setNum] = useState('')

  const handleNumChange = (event: any) => {
    const limit = 4
    setNum(event.target.value.slice(0, limit))
  }
}
