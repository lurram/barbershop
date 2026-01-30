'use client'

import type { BarberShop, BarberShopService, Booking } from '@prisma/client'
import { isPast, isToday, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { createBooking } from '../_actions/create-booking'
import { getBookings } from '../_actions/get-booking'
import BookingSummary from './booking-summary'
import SignInDialog from './sign-in-dialog'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogContent } from './ui/dialog'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'

interface ServiceItemProps {
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

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const router = useRouter()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDate) return
      const bookings = await getBookings({
        date: selectedDate,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDate, service.id])

  const selectedDay = useMemo(() => {
    if (!selectedDate || !selectedTime) return
    return set(selectedDate, {
      hours: Number(selectedTime?.split(':')[0]),
      minutes: Number(selectedTime?.split(':')[1]),
    })
  }, [selectedDate, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelected = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeSelected = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay) return

      await createBooking({
        serviceId: service.id,
        date: selectedDay,
      })

      handleBookingSheetOpenChange()
      toast.success('Reserva criada com sucesso!', {
        action: {
          label: 'Ver agendamentos',
          onClick: () => router.push('/bookings'),
        },
      })
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar reserva')
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDate) return []
    return getTimeList({ bookings: dayBookings, selectedDate })
  }, [dayBookings, selectedDate])

  return (
    <>
      <Card className="p-2">
        <CardContent className="flex items-center gap-3 px-1">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm">{service.name}</h3>
            <p className="text-gray-400 text-sm">{service.description}</p>

            <div className="flex items-center justify-between">
              <p className="font-bold text-sm text-primary">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDate}
                      onSelect={handleDateSelected}
                      fromDate={new Date()}
                      className="w-full border border-solid p-5"
                      classNames={{
                        caption_label:
                          'font-semibold capitalize absolute left-0',
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
                              variant={
                                selectedTime === time ? 'default' : 'outline'
                              }
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

                  <SheetFooter className="px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedDate || !selectedTime}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={open => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
