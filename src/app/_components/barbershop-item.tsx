import type { BarberShop } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BarbershopItemProps {
  barbershop: BarberShop
}
const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl px-0 py-2">
      <CardContent className="p-0 px-1 items-center">
        <div className="relative h-[159px] w-full">
          <Image
            fill
            alt={barbershop.name}
            className="object-cover rounded-2xl"
            src={barbershop.imageUrl}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <Badge
            className="absolute rounded-full left-2 top-2"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="py-3 px-1">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
        </div>
        <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
        <Button variant="secondary" className="w-full mt-3" asChild>
          <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
