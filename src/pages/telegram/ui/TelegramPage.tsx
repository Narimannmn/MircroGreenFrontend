import { useState } from "react";
import { toast } from "react-toastify";
import {
  useAddTelegramIntegration,
  useDeleteTelegramIntegration,
} from "../hook/hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TelegramPage = () => {
  const [value, setValue] = useState<string>("");
  const { mutateAsync: addTelegram } = useAddTelegramIntegration();
  const { mutateAsync: deleteTelegram } = useDeleteTelegramIntegration();
  const onFinish = () => {
    if (value.trim() === "") {
      toast.error("Пожалуйста, введите ваш telegram_id!");
      return;
    }

    addTelegram(value, {
      onSuccess: () => {
        toast.success("Вы подключили уведомления через телеграм бота!");
      },
      onError: (error) => {
        toast.error(`Ошибка: ${error.message}`);
      },
    });
  };

  const onUnsubscribe = () => {
    if (value.trim() === "") {
      toast.error("Пожалуйста, введите ваш telegram_id для отмены подписки!");
      return;
    }

    deleteTelegram(value, {
      onSuccess: () => {
        toast.success(
          "Вы успешно отписались от уведомлений через телеграм бота!",
        );
      },
      onError: (error) => {
        toast.error(`Ошибка: ${error.message}`);
      },
    });
  };

  return (
    <section className='w-full h-full flex justify-center items-center bg-gray-50'>
      <div className='max-w-md w-full p-8 bg-white rounded-xl shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-4'>
          Привяжите Телеграм для уведомлений
        </h1>
        <h2 className='text-xl font-semibold text-gray-600 mb-4 text-center'>
          Для этого используйте телеграмм бота{" "}
          <a
            href='https://t.me/coin_trumpbot'
            className='text-green-800 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            @coin_trumpbot
          </a>
        </h2>

        <div className='mb-6'>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Введите ваш telegram_id'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600'
          />
        </div>

        <div className='text-center mb-4'>
          <Button
            onClick={onFinish}
            className='w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
          >
            Привязать Телеграм
          </Button>
        </div>

        <div className='text-center'>
          <Button
            onClick={onUnsubscribe}
            className='w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
          >
            Отписаться от уведомлений
          </Button>
        </div>
      </div>
    </section>
  );
};
