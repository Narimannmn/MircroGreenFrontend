import { useQueryClient } from "@tanstack/react-query";
import { IoReload } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useDeletePlant } from "@/entities/Plant/hooks/useDeletePlant";
import { ID } from "@/shared/schemas";

export interface TableActionsProps {
  id: ID;
}
export const TableActions = ({ id }: TableActionsProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useDeletePlant();
  const handleDelete = (id: string) => {
    mutateAsync(id, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["useGetPlants"],
        });
        toast.success("Вы удалили растение");
      },
    });
  };
  return (
    <div className='flex gap-3 items-center'>
      <IoReload size={16} />
      <MdDelete
        size={16}
        onClick={() => handleDelete(id)}
      />
    </div>
  );
};
