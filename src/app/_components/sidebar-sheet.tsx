'use client'

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { quickSearchOptions } from '../_constants/search'
import SignInDialog from './sign-in-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogOut = () => signOut()

  return (
    <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="p-4 border-b border-solid justify-between flex items-center gap-3">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ''} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button size={'icon'}>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 border-b border-solid">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant={'ghost'} asChild>
            <Link href={'/'}>
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        {!data?.user ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="justify-start gap-2" variant={'ghost'}>
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <SignInDialog />
            </DialogContent>
          </Dialog>
        ) : (
          <Button className="justify-start gap-2" variant={'ghost'} asChild>
            <Link href={'/bookings'}>
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 border-b border-solid">
        {quickSearchOptions.map(option => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant={'ghost'} asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageURl}
                  alt={option.title}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="p-4 flex flex-col gap-2 border-b border-solid">
          <Button
            className="justify-start gap-2"
            variant={'ghost'}
            onClick={handleLogOut}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
