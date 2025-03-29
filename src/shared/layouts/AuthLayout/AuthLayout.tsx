import clsx from "clsx";
import { PropsWithChildren } from "react";
import styles from "./AuthLayout.module.css";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return <main className={clsx(styles.authLayout)}>{children}</main>;
};
