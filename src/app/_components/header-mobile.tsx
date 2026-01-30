'use client'

import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MobileSidebar } from './sidebar-mobile'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Sheet, SheetTrigger } from './ui/sheet'

const HeaderMobile = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Card>
        <CardContent className="justify-between items-center flex flex-row">
          <Link href={'/'}>
            <Image alt="FSW Barber" src="/logo.png" width={120} height={100} />
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <MobileSidebar setOpen={setOpen} />
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}

export default HeaderMobile
