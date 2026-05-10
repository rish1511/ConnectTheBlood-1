import { useCallback, useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue((state) => !state), [])
  return [value, toggle]
}
