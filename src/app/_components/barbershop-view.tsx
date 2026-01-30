import { MapPinIcon, PhoneIcon } from 'lucide-react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

interface BarbershopViewProps {
  barbershop: {
    id: string
    name: string
    address: string
    phone: string
    barbers: string[]
    imageUrl?: string
  }
}
const BarbershopView = ({ barbershop }: BarbershopViewProps) => {
  return (
    <Card className="items-center md:w-1/2">
      <CardContent className="p-0 px-1 items-center">
        <div className="relative h-[250px] w-[250px]">
          <Image
            fill
            alt={barbershop?.name}
            className="object-cover rounded-2xl"
            src={barbershop?.imageUrl || ''}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="py-3 px-1">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
        </div>
        <div className="flex items-start gap-2 mb-3">
          <MapPinIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-2 truncate">
            {barbershop.address}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <PhoneIcon className="w-4 h-4 text-gray-500" />
          <p className="text-sm text-gray-600">{barbershop.phone}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Barbeiros
          </p>
          <div className="flex flex-wrap gap-2">
            {barbershop.barbers.map((barber, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
              >
                {barber}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopView
