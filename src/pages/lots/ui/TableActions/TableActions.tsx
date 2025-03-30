import { useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useDeleteLot } from "@/entities/Lot/hooks/useDeleteLot";

export interface TableActionsProps {
  id: number;
}
export const TableActions = ({ id }: TableActionsProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useDeleteLot();
  const handleDelete = (id: number) => {
    mutateAsync(id, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["useGetLots"],
        });
        toast.success("Вы удалили лот");
      },
    });
  };
  return (
    <div className='flex gap-3 items-center'>
      <MdDelete
        size={16}
        color='red'
        onClick={() => handleDelete(id)}
      />
    </div>
  );
};
