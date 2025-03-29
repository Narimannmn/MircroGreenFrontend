import { AddRecordModal } from "./AddRecordModal/AddRecordModal";
import LineGraph from "./LineGraph/LineGraph";
import { RecordsTable } from "./RecordsTable/RecordsTable";
import { Input } from "@/components/ui/input";

export const AnalyticsPage = () => {
  return (
    <section className='w-full flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Input
          type='text'
          placeholder='Поиск'
          className='flex-1 p-4 rounded-md  border-2 border-gray-300'
        />
        <AddRecordModal />
      </div>
      <RecordsTable />
      <div className='mt-[140px]'>
        <h1 className='text-3xl font-bold'>Analytics</h1>
        <LineGraph />
      </div>
    </section>
  );
};
