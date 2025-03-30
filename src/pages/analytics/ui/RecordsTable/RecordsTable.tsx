import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetRecordComment } from "@/entities/Journal/hooks/useGetRecordComment";
import { useGetRecordsById } from "@/entities/Journal/hooks/useGetRecordsById";
import { columns } from "../../data/data";

const getCellClassNames = (
  rowIndex: number,
  colIndex: number,
  totalRows: number,
  totalCols: number,
) => {
  if (rowIndex === totalRows - 1) {
    if (colIndex === 0) return "rounded-bl-md";
    if (colIndex === totalCols - 1) return "rounded-br-md";
  }
  return "";
};
export const RecordsTable = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useParams<{ id: string }>();
  const { data } = useGetRecordComment(Number(id));
  const { data: records, isLoading } = useGetRecordsById({
    seedbed_id: id,
    page: page,
    page_size: 10,
  });

  const table = useReactTable({
    data: records?.records || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const nextPage = () => {
    if (page < (records?.page_count || 1)) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message, {
        position: "bottom-right", // Position it at the bottom-right corner
        autoClose: 5000, // Stay visible for 5 seconds (adjust as needed)
        closeOnClick: false, // Don't close when clicked
        draggable: false, // Disable dragging
        hideProgressBar: true, // Optionally hide the progress bar
        style: {
          width: "400px", // Set width to 400px
          wordWrap: "break-word", // Ensure the text wraps
          wordBreak: "break-word", // Break long words
          whiteSpace: "normal", // Allow multiple lines
          backgroundColor: "#f4f4f9", // Light background color for a hint feel
          color: "#333", // Darker text for readability
          border: "1px solid #ddd", // Light border to give it a soft look
          borderRadius: "8px", // Rounded corners
        },
      });
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className='flex flex-col gap-4'>
      <table className='w-full border border-gray-300 rounded-md  overflow-hidden'>
        <thead className='bg-[#F6F6FA] border-b border-gray-300'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`py-4 px-6 text-left border border-gray-300 
                       ${index === 0 ? "rounded-tl-md" : ""} 
                       ${index === headerGroup.headers.length - 1 ? "rounded-tr-md" : ""}
                     `}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className='py-6 text-center border border-gray-300'
              >
                Нет данных
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className='border-t border-gray-300'
              >
                {row.getVisibleCells().map((cell, colIndex) => (
                  <td
                    key={cell.id}
                    className={`py-4 px-6 border border-gray-300 ${getCellClassNames(rowIndex, colIndex, table.getRowModel().rows.length, row.getVisibleCells().length)}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className='flex justify-end items-center gap-4'>
        <IconContext.Provider
          value={{ style: { width: "10px", height: "20px" } }}
        >
          <div className='flex gap-4 items-center'>
            <button
              onClick={prevPage}
              disabled={page === 1}
              className='px-4 py-2 border rounded-md disabled:bg-[#EDEDED] bg-[#262626] text-white flex gap-2 items-center transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
            >
              <BsChevronLeft />
              Предыдущая
            </button>
            <button
              onClick={nextPage}
              disabled={page == (records?.page_count || 1)}
              className='px-4 py-2 border rounded-md disabled:bg-[#EDEDED] bg-[#262626] text-white flex gap-2 items-center transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
            >
              Следующая
              <BsChevronRight />
            </button>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};
