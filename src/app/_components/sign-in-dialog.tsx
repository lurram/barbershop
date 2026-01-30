import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from './ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

const SignInDialog = () => {
  const handleLoginWithGoogleClient = () => signIn('google')
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button
        variant={'outline'}
        className="gap-2 font-bold items-center"
        onClick={handleLoginWithGoogleClient}
      >
        <Image
          src={'/google.svg'}
          width={18}
          height={18}
          alt="Fazer login com o Google"
        />
        Google
      </Button>
    </>
  )
}

export default SignInDialog
