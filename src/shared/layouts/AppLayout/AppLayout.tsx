import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { collapsedSidebarItems } from "@/widgets/Sidebar/routes";
import { Sidebar } from "@/widgets/Sidebar/Sidebar";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className='flex flex-col'>
      <ToastContainer />
      <ul className='flex space-x-4 md:hidden p-4 border-b border-gray-300'>
        {collapsedSidebarItems.map((item) => (
          <li
            key={item.key}
            className='cursor-pointer p-2 '
          >
            <a href={item.key}> {item.label}</a>
          </li>
        ))}
      </ul>
      <main className='flex gap-4 min-h-screen h-screen overflow-hidden'>
        <Sidebar />
        <main className='flex-1 h-full p-4 overflow-y-auto'>{children}</main>
      </main>
    </section>
  );
};
