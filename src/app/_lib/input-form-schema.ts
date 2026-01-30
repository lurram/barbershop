import z from 'zod'

export const formSchemaBarbershop = z.object({
  name: z.string().trim().min(1, {
    message: 'O campo de nome é obrigatório',
  }),
  address: z.object({
    cep: z
      .string()
      .min(9, 'CEP deve ter 8 dígitos')
      .regex(/^\d{5}-\d{3}$/, {
        message: 'Formato: 00000-000',
      })
      .or(z.string().length(0)),
    street: z.string().trim(),
    neighborhood: z.string().trim(),
    city: z.string().trim(),
    state: z.string().trim(),
    number: z.string().trim(),
  }),
  phone: z
    .string()
    .min(14, 'Telefone incompleto')
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
      message: 'Formato: (DDD) 99999-9999',
    })
    .or(z.string().length(0)),
  barbers: z
    .array(
      z.string().trim().min(1, {
        message: 'O campo de nome é obrigatório',
      })
    )
    .min(1, {
      message: 'Pelo menos um barbeiro deve ser adicionado',
    }),
  logo: z
    .instanceof(File)
    .refine(file => file.size === 0 || file.size <= 5 * 1024 * 1024, {
      message: 'O arquivo deve ter no máximo 5MB',
    })
    .refine(
      file =>
        file.size === 0 ||
        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      {
        message: 'Apenas arquivos JPEG, PNG e WEBP são permitidos',
      }
    )
    .optional()
    .or(z.literal('')), // Para quando não há arquivo
})

export const formSchemaClients = z.object({
  name: z.string().trim().min(1, {
    message: 'O campo de nome é obrigatório',
  }),
  phone: z
    .string()
    .min(14, 'Telefone incompleto')
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
      message: 'Formato: (DDD) 99999-9999',
    })
    .or(z.string().length(0)),
})
