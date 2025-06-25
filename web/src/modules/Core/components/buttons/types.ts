import type { ButtonProps } from "@mantine/core";
import type { ButtonHTMLAttributes } from "react";

export interface BaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'style'>, ButtonProps {
  isBusy?: boolean;
}

export interface ButtonIconProps {
  isBusy?: boolean;
  icon?: () => React.ReactNode;
}


export interface SubmitButtonProps extends Omit<BaseButtonProps, 'type'> {
  icon?: () => React.ReactNode;
}