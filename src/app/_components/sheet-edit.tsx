'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { BarberShop, BarberShopService, Booking } from '@prisma/client'
import { isPast, isToday, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { formatPhone } from '../_constants/formatters'
import { formSchemaClients } from '../_lib/input-form-schema'
import { clients } from '../dashboard/clients/page'
import BookingSummary from './booking-summary'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'

interface SheetEditProps {
  client: string
  service: BarberShopService
  barbershop: Pick<BarberShop, 'name'>
}

const TIME_LIST = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDate: Date
}

const getTimeList = ({ bookings, selectedDate }: GetTimeListProps) => {
  return TIME_LIST.filter(time => {
    const hours = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours, minutes }))

    if (timeIsOnThePast && isToday(selectedDate)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      booking =>
        booking.date.getHours() === hours &&
        booking.date.getMinutes() === minutes
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const SheetEdit = ({ client, service, barbershop }: SheetEditProps) => {
  const clientsData = clients
  const item = clientsData.find(item => item.id === client)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  // const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchemaClients>>({
    resolver: zodResolver(formSchemaClients),
    defaultValues: {
      name: item?.name || '',
      phone: item?.phone || '',
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchemaClients>) => {
    console.log(data)
  }

  const selectedDay = useMemo(() => {
    if (!selectedDate || !selectedTime) return
    return set(selectedDate, {
      hours: Number(selectedTime?.split(':')[0]),
      minutes: Number(selectedTime?.split(':')[1]),
    })
  }, [selectedDate, selectedTime])

  const handleBookingSheetOpenChange = () => {
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    // setBookingSheetIsOpen(false)
  }

  const handleDateSelected = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeSelected = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const timeList = useMemo(() => {
    if (!selectedDate) return []
    return getTimeList({ bookings: dayBookings, selectedDate })
  }, [dayBookings, selectedDate])

  return (
    <SheetContent
      key={item?.id}
      className="overflow-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <SheetHeader>
        <SheetTitle className="text-left">{item?.name}</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 mt-4 p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="border-b border-solid">
              <Calendar
                mode="single"
                locale={ptBR}
                selected={selectedDate}
                onSelect={handleDateSelected}
                fromDate={new Date()}
                className="w-full border border-solid p-5"
                classNames={{
                  caption_label: 'font-semibold capitalize absolute left-0',
                  nav: 'absolute right-0 gap-1 justify-between',
                  nav_button: 'h-8 w-8',
                  weekdays: 'uppercase flex flex-row',
                  day_button: 'rounded-full border-none',
                }}
              />

              {selectedDate && (
                <div className="p-5 flex border-b border-solid overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3 ]">
                  {timeList.length > 0 ? (
                    timeList.map(time => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        className="rounded-full"
                        onClick={() => handleTimeSelected(time)}
                      >
                        {time}
                      </Button>
                    ))
                  ) : (
                    <p className="text-xs">
                      Não há horários disponíveis para este dia
                    </p>
                  )}
                </div>
              )}

              {selectedDay && (
                <div className="p-5">
                  <BookingSummary
                    barbershop={barbershop}
                    service={service}
                    selectedDate={selectedDay}
                  />
                </div>
              )}
            </div>

            {selectedDate && selectedTime && (
              <>
                <FormField
                  control={form.control}
                  name={'name'}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </>
            )}
          </form>
        </Form>
      </div>
      <SheetFooter className="px-5">
        <SheetClose asChild>
          <Button
            onClick={handleBookingSheetOpenChange}
            disabled={!selectedDate || !selectedTime}
          >
            Confirmar
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

export default SheetEdit
