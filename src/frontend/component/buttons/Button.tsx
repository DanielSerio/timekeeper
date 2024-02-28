import type { PropsWithChildren } from "react";
import type {
  BasicButtonProps,
  ButtonProps,
  LinkButtonProps,
  WrapperButtonProps,
} from "./props";
import { Icon } from "../ui/Icon";

function WrapperButton(props: PropsWithChildren<WrapperButtonProps>) {
  const { className, ...rest } = props;
  const classNames = `btn ${className ?? ""}`.trimEnd();
  return (
    <button className={classNames} {...rest}>
      {props.children}
    </button>
  );
}

function BasicButton(props: BasicButtonProps) {
  const { className, text, icon, ...rest } = props;
  const classNames = `btn ${className ?? ""}`.trimEnd();

  return (
    <button className={classNames} {...rest}>
      <span className="text">{text}</span>
      {icon !== undefined && <Icon {...icon} />}
    </button>
  );
}

function LinkButton(props: LinkButtonProps) {
  const { className, text, icon, ...rest } = props;
  const classNames = `btn link-btn ${className ?? ""}`.trimEnd();

  return (
    <a className={classNames} {...rest}>
      <span className="text">{text}</span>
      {icon !== undefined && <Icon {...icon} />}
    </a>
  );
}

export function Button<
  HrefType extends string | undefined,
  TextType extends string | never
>(props: ButtonProps<HrefType, TextType>) {
  if (props.href) {
    return <LinkButton {...props} />;
  } else if (
    !!props.text === false &&
    !!props.href === false &&
    props.onClick !== undefined
  ) {
    const { href, target, icon, text, ...p } = props;
    return <WrapperButton {...p}>{props.children}</WrapperButton>;
  } else {
    const { href, target, ...p } = props;
    return <BasicButton {...p} />;
  }
}

