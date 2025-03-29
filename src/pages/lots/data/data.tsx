import { ColumnDef } from "@tanstack/react-table";
import { Lot } from "@/entities/Lot/schemas/shemas";

export const columns: ColumnDef<Lot>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Plant Name",
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
    header: "Date Planted",
    accessorKey: "date_planted",
    cell: ({ row }) => new Date(row.original.date_planted).toLocaleDateString(),
  },
  {
    header: "Type of Soil",
    accessorKey: "type_of_soil",
  },
  {
    header: "Soil Number",
    accessorKey: "soil_number",
  },
  {
    header: "Date Harvested",
    accessorKey: "date_harvested",
    cell: ({ row }) =>
      new Date(row.original.date_harvested).toLocaleDateString(),
  },
  // {
  //   header: "Actions",
  //   cell: ({ row }) => <TableActions id={row.original.id} />,
  // },
];
