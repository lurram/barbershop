'use client'

import type { Prisma } from '@prisma/client'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteBooking } from '../_actions/delete-booking'
import BookingSummary from './booking-summary'
import PhoneItem from './phone-item'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barberShop: true
        }
      }
    }
  }>
}

// TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { barberShop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cancelar reserva. Tente novamente.')
    }
  }
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? 'default' : 'secondary'}
              >
                {isConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barberShop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barberShop.name}</p>
              </div>
            </div>
            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, 'MMMM', { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, 'dd', { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, 'HH:mm', { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-5">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative flex h-[180px] items-center ">
          <Image
            alt={`Mapa da barbearia ${booking.service.barberShop.name}`}
            src="/map.png"
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-8 mb-3 w-full rounded-xl p-3 items-center">
            <CardContent className="flex items-center gap-3 px-5">
              <Avatar>
                <AvatarImage src={barberShop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barberShop.name}</h3>
                <p className="text-xs">{barberShop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barberShop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-3">
            {barberShop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter>
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant={'outline'} className="flex-1 w-full">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'destructive'} className="flex-1 w-full">
                    Cancelar reserva
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader className="items-center">
                    <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar esse agendamento?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="flex-1">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction className="flex-1" asChild>
                      <Button
                        variant={'destructive'}
                        className="flex-1 w-full"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
