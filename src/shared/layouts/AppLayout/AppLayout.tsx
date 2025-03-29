import { PropsWithChildren } from "react";
import { Sidebar } from "@/widgets/Sidebar/Sidebar";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='p-4 flex gap-4 min-h-screen h-screen'>
      <Sidebar />
      <main className='flex-1 h-full'>{children}</main>
    </main>
  );
};
