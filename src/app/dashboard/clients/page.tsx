import { Edit, UsersIcon } from 'lucide-react'
import SheetEdit from '@/app/_components/sheet-edit'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'

export const clients = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '(96) 91234-5678',
    appointment: '2024-07-10 14:00',
  },
  {
    id: '2',
    name: 'João Souza',
    phone: '(96) 92345-6789',
    appointment: '2024-07-11 10:30',
  },
  {
    id: '3',
    name: 'Ana Pereira',
    phone: '(96) 93456-7890',
    appointment: '2024-07-12 16:00',
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    phone: '(96) 94567-8901',
    appointment: '2024-07-13 09:00',
  },
  {
    id: '5',
    name: 'Beatriz Fernandes',
    phone: '(96) 95678-9012',
    appointment: '2024-07-14 11:15',
  },
]
const Clients = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center mb-4">
        <UsersIcon className="text-primary" />
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>

      <Table>
        <TableCaption>Lista de clientes agendados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Agendamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.appointment}</TableCell>

              <TableCell>
                <Sheet>
                  <SheetTrigger asChild>
                    <a
                      href="_"
                      className="items-center justify-center inline-block"
                    >
                      <Edit className="text-gray-600 hover:text-primary size-4" />
                    </a>
                  </SheetTrigger>

                  {/* <SheetEdit client={client.id} barbershop={ } service={ } /> */}
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Clients
