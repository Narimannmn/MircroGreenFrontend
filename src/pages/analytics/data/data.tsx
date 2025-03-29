import { ColumnDef } from "@tanstack/react-table";
import { RecordsResponse } from "@/entities/Journal/schemas/schemas";

export const columns: ColumnDef<RecordsResponse>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Water Temp (°C)",
    accessorKey: "water_temperature",
  },
  {
    header: "Air Temp (°C)",
    accessorKey: "air_temperature",
  },
  {
    header: "Air Humidity (%)",
    accessorKey: "air_humidity",
  },
  {
    header: "Light Level",
    accessorKey: "light_level",
  },
  {
    header: "Height (cm)",
    accessorKey: "height_plant",
  },
  {
    header: "Photo",
    accessorKey: "photo_link",
    cell: ({ row }) =>
      row.original.photo_link ? (
        <img
          src={row.original.photo_link}
          alt='image'
          className='h-[50px] w-[50px]'
        />
      ) : (
        <span className='text-gray-400 italic'>No photo</span>
      ),
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleString("ru-RU", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    header: "Soil ID",
    accessorKey: "soilId",
  },
  // Optional Actions Column
  // {
  //   header: "Actions",
  //   cell: ({ row }) => <TableActions id={row.original.id} />,
  // },
];
