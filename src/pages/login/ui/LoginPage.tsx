import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "@/entities/Auth/hooks/hooks";
import {
  DecodedToken,
  LoginFormFields,
  LoginFormFieldsSchema,
} from "@/entities/Auth/schemas/schemas";
import { Tokens, useAuthStore } from "@/entities/Auth/store/store";
import { privateRoutesMap } from "@/shared/navigation";
import { appSessionStorage } from "@/shared/utils/appSessionStorage/appSessionStorage";
import { isTokenValid } from "@/shared/utils/token/token";

export const LoginPage = () => {
  const tokens = useAuthStore((state) => state.tokens);

  let decodedToken = null;
  if (tokens?.accessToken) {
    decodedToken = jwtDecode<DecodedToken>(tokens.accessToken);
  }

  if (decodedToken && isTokenValid(decodedToken)) {
    return (
      <Navigate
        to={privateRoutesMap.plants}
        replace
      />
    );
  }

  const { mutateAsync } = useLogin();
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormFieldsSchema),
  });

  const onSubmit = (data: LoginFormFields) => {
    mutateAsync(data, {
      onSuccess: (data) => {
        toast.success("Вы успешно зашли!");
        const tokens: Tokens = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        };
        appSessionStorage.setTokenValid();
        setTokens(tokens);
        navigate(privateRoutesMap.plants);
      },
    });
  };

  return (
    <section className='h-screen bg-[#F6F6FA] flex justify-center items-center'>
      <div className='w-[749px] bg-white p-6 mx-auto my-auto rounded-2xl flex flex-col items-center gap-6'>
        <div className='text-center font-semibold'>
          <h1 className='text-[32px]'>MicroTravka</h1>
          <h3 className='text-[28px]'>Регистрация кабинета</h3>
        </div>
        <div className='space-y-2 w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col'
          >
            <div className='flex flex-col gap-2 mb-4'>
              <label
                htmlFor='email'
                className='font-semibold'
              >
                Почта <span className='text-[#C61717]'>*</span>
              </label>
              <input
                type='text'
                id='email'
                {...register("email")}
                className='font-medium rounded-2xl px-4 py-5 border border-gray-300 transition duration-200 focus:outline-none focus:border-[#7568FF] focus:ring-2 focus:ring-[#7568FF]'
                placeholder='travka@mail.ru'
              />
              {errors.email && (
                <p className='text-red-600 text-sm'>{errors.email.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2 mb-2'>
              <label
                htmlFor='password'
                className='font-semibold'
              >
                Пароль <span className='text-[#C61717]'>*</span>
              </label>
              <input
                type='password'
                id='password'
                {...register("password")}
                className='font-medium rounded-2xl px-4 py-5 border border-gray-300 transition duration-200 focus:outline-none focus:border-[#7568FF] focus:ring-2 focus:ring-[#7568FF]'
                placeholder='Пароль'
              />
              {errors.password && (
                <p className='text-red-600 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='flex justify-end mb-6'>
              {/* Add a forgot password link here if necessary */}
            </div>
            <button
              type='submit'
              className='bg-[#262626] text-white rounded-2xl text-center py-5 transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
