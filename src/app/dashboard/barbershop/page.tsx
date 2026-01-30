import { Scissors, ScissorsIcon } from 'lucide-react'
import BarbershopForm from '@/app/_components/barbershop-form'
import BarbershopView from '@/app/_components/barbershop-view'

interface Barbershop {
  id: string
  name: string
  address: string
  phone: string
  barbers: string[]
  rating?: number
  imageUrl?: string
}

const Barbershop = () => {
  const barbershop: Barbershop = {
    id: '1',
    name: 'Moliveira',
    address: 'Av Tupiniquis, 56 - Beirol',
    phone: '(96) 98134-1777',
    barbers: ['Joao'],
    rating: 5,
    imageUrl: 'https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png',
  }
  return (
    <div className="w-full">
      <div className="flex flex-row gap-2 items-center mb-4">
        <ScissorsIcon className="text-primary" />
        <h1 className="text-2xl font-bold">Barbearia</h1>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <BarbershopForm />
        <BarbershopView barbershop={barbershop} />
      </div>
    </div>
  )
}

export default Barbershop
