export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '')

  if (numbers.length === 0) return ''
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 10)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

export const formatPhoneRegex = (value: string): string => {
  const numbers = value.replace(/\D/g, '')

  return numbers.replace(
    /(\d{0,2})(\d{0,5})(\d{0,4})/,
    (_, ddd, part1, part2) => {
      if (!ddd) return ''
      if (!part1) return `(${ddd}`
      if (!part2) return `(${ddd}) ${part1}`
      return `(${ddd}) ${part1}-${part2}`
    }
  )
}

export const formatCEP = (value: string): string => {
  const numbers = value.replace(/\D/g, '')

  if (numbers.length === 0) return ''
  if (numbers.length <= 5) return numbers

  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
}

export const cleanCEP = (value: string): string => {
  return value.replace(/\D/g, '')
}
