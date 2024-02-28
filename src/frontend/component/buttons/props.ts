import type { PropsWithChildren } from "react";
import type { IconProps } from "../ui/Icon";

interface ButtonBaseProps<
  HrefType extends string | undefined,
  TextType extends string | never
> {
  href?: HrefType;
  target?: HrefType;
  className?: string;
  type?: "button" | "reset" | "submit";
  onClick?: (() => void) | (() => Promise<void>);
  title?: string;
  disabled?: boolean;
  icon?: IconProps;
  text?: TextType;
}

export interface BasicButtonProps extends ButtonBaseProps<never, string> {
  type?: "button" | "reset" | "submit";
  onClick?: (() => void) | (() => Promise<void>);
  href?: never;
  target?: never;
}

export interface LinkButtonProps extends ButtonBaseProps<string, string> {
  href?: string;
  target?: string;
  disabled?: never;
  onClick?: never;
  type?: never;
}

export interface WrapperButtonProps extends ButtonBaseProps<never, never> {
  type?: "button" | "reset" | "submit";
  onClick?: (() => void) | (() => Promise<void>);
  href?: never;
  target?: never;
  icon?: never;
}

export type ButtonProps<
  HrefType extends string | undefined,
  TextType extends string | never
> = PropsWithChildren<
  HrefType extends string
    ? LinkButtonProps
    : TextType extends never
    ? WrapperButtonProps
    : BasicButtonProps & Omit<BasicButtonProps, "href" | "target">
>;

