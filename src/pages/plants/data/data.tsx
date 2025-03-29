import { ColumnDef } from "@tanstack/react-table";
import { Plant } from "@/entities/Plant/shemas/shemas";
import { TableActions } from "../ui/TableActions/TableActions";

export const columns: ColumnDef<Plant>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Actions",
    cell: ({ row }) => <TableActions id={row.original.id} />,
  },
];
