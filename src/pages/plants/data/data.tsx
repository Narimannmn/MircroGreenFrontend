import { ColumnDef } from "@tanstack/react-table";
import { Plant } from "@/entities/Plant/shemas/shemas";
import { TableActions } from "../ui/TableActions/TableActions";

export const columns: ColumnDef<Plant>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Название",
    accessorKey: "name",
  },
  {
    header: "Описание",
    accessorKey: "description",
  },
  {
    header: "Действия",
    cell: ({ row }) => <TableActions id={row.original.id} />,
  },
];
