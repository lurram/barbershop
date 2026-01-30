'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightIcon, PlusIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardTitle } from '@/app/_components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Separator } from '@/app/_components/ui/separator'
import { cleanCEP, formatCEP, formatPhone } from '../_constants/formatters'
import { useFileInput } from '../_constants/use-file-input'
import { formSchemaBarbershop } from '../_lib/input-form-schema'

const BarbershopForm = () => {
  const [barberName, setBarberName] = useState<string[]>([])

  const [newBarberInput, setNewBarberInput] = useState('')

  const [cep, setCEP] = useState('')

  const { fileInputRef, fileName, handleFileChange, triggerFileInput } =
    useFileInput()

  const form = useForm<z.infer<typeof formSchemaBarbershop>>({
    resolver: zodResolver(formSchemaBarbershop),
    defaultValues: {
      name: '',
      logo: '',
      address: {
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        number: '',
      },
      phone: '',
      barbers: [],
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchemaBarbershop>) => {
    // router.push(`/barbershops?title=${data.title}`)
    console.log(data)
  }

  async function getCEP(cep: string) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      form.setValue('address', {
        cep: data.cep,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        number: '',
      })

      setCEP(data.cep)
    } catch (error) {
      console.log(error)
    }
  }

  function addNewBarber() {
    const barber = newBarberInput.trim()

    if (!barber) {
      return
    }

    if (barberName.includes(barber)) {
      return
    }

    const newBarberList = [...barberName, barber]
    setBarberName(newBarberList)

    form.setValue('barbers', newBarberList)

    setNewBarberInput('')
  }

  function removeBarber(barberRemove: string) {
    const newBarberList = barberName.filter(barber => barber !== barberRemove)
    setBarberName(newBarberList)

    form.setValue('barbers', newBarberList)
  }

  return (
    <Card className="p-4 md:w-1/2">
      <CardTitle className="text-lg text-center">
        Informações da barbearia
      </CardTitle>
      <Separator className="bg-white" />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.cep"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="00000-000"
                      value={field.value}
                      onChange={e => {
                        const formatted = formatCEP(e.target.value)
                        field.onChange(formatted)
                      }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        getCEP(cleanCEP(e.target.value))
                        field.onBlur()
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {cep && (
              <div className="space-y-4">
                <div className="flex flex-row">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Logradouro</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Logadouro"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Número"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address.neighborhood"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Bairro"
                          {...field}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Cidade"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Estado"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="(DDD) 99999-9999"
                      value={field.value}
                      onChange={e => {
                        const formatted = formatPhone(e.target.value)
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barbers"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Barbeiro</FormLabel>
                  <div className="flex flex-row gap-2">
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Barbeiro"
                        value={newBarberInput}
                        onChange={e =>
                          setNewBarberInput(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        onBlur={addNewBarber}
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      variant="outline"
                      type="button"
                      onClick={addNewBarber}
                    >
                      <PlusIcon />
                    </Button>
                  </div>

                  {barberName.map(barber => {
                    return (
                      <div
                        key={barber}
                        className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center justify-between gap-2"
                      >
                        <span className="text-zinc-300">{barber}</span>
                        <button
                          type="button"
                          onClick={() => removeBarber(barber)}
                        >
                          <X className="size-4 text-zinc-400" />
                        </button>
                      </div>
                    )
                  })}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={e => handleFileChange(e, field.onChange)}
                        accept="image/*"
                      />

                      <Button
                        type="button"
                        variant="link"
                        onClick={triggerFileInput}
                      >
                        Upload
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        {fileName || 'Selecione um arquivo'}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full items-center justify-center"
            >
              Finalizar
              <ArrowRightIcon />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default BarbershopForm
