import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import BarbershopItem from './_components/barbershop-item'
import BookingItem from './_components/booking-item'
import Header from './_components/header'
import Search from './_components/search'
import { Button } from './_components/ui/button'
import { quickSearchOptions } from './_constants/search'
import { getConfirmedBookings } from './_data/get-confirmed-bookings'
import { authOptions } from './_lib/auth'
import { db } from './_lib/prisma'

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barberShop.findMany({})
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session?.user?.name : 'visitante'}!
        </h2>

        <p>
          <span className="capitalize">
            {format(new Date(), 'EEEE, dd', { locale: ptBR })}
          </span>
          <span> de </span>
          <span className="capitalize">
            {format(new Date(), 'MMMM', { locale: ptBR })}.
          </span>
        </p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
            <Button
              className="gap-2"
              variant={'secondary'}
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageURl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative h-[150px] lg:h-[250px] w-full mt-6">
          <Image
            src="/banner-pizza.png"
            alt="Agende nos melhores FWS Barber"
            fill
            className="object-contain rounded-xl"
          />
        </div>

        {confirmedBookings?.length > 0 && (
          <>
            <h2 className="uppercase font-bold text-xs text-gray-400 mt-6 mb-3">
              Agendamentos
            </h2>

            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3">
              {confirmedBookings?.map(booking => (
                <BookingItem
                  booking={JSON.parse(JSON.stringify(booking))}
                  key={booking.id}
                />
              ))}
            </div>
          </>
        )}

        <h2 className="uppercase font-bold text-xs text-gray-400 mt-6 mb-3">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="uppercase font-bold text-xs text-gray-400 mt-6 mb-3">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home
