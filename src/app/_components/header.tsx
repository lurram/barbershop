import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SidebarSheet from './sidebar-sheet'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Sheet, SheetTrigger } from './ui/sheet'

const Header = () => {
  return (
    <Card>
      <CardContent className="justify-between items-center flex flex-row px-5 py-2">
        <Link href={'/'}>
          <Image alt="FSW Barber" src="/logo.png" width={120} height={100} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
