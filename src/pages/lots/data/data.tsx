import { ColumnDef } from "@tanstack/react-table";
import { Lot } from "@/entities/Lot/schemas/shemas";
import { TableActions } from "../ui/TableActions/TableActions";

export const columns: ColumnDef<Lot>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Название микрозелени",
    accessorKey: "plant_name",
    cell: ({ row }) => (
      <a
        href={`/lots/${row.original.id}`}
        className='text-green-800 cursor-pointer font-bold'
      >
        {row.original.plant_name}
      </a>
    ),
  },
  {
    header: "Дата посадки",
    accessorKey: "date_planted",
    cell: ({ row }) => new Date(row.original.date_planted).toLocaleDateString(),
  },
  {
    header: "Тип почвы",
    accessorKey: "type_of_soil",
  },
  {
    header: "Количество почв",
    accessorKey: "soil_number",
  },
  {
    header: "День сбора",
    accessorKey: "date_harvested",
    cell: ({ row }) =>
      new Date(row.original.date_harvested).toLocaleDateString(),
  },
  {
    header: "Actions",
    cell: ({ row }) => <TableActions id={row.original.id} />,
  },
];
