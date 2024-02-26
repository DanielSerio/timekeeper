export type IconVariantName = "outline" | "filled" | "sharp";

export interface IconProps {
  name: string;
  variant?: IconVariantName;
  size?: number;
  class?: string;
}

export const Icon = (props: IconProps) => {
  const fullIconName = `${props.name}-${props.variant || "outline"}`;
  return (
    <span
      className={`icon ${props.class || ""}`.trimEnd()}
      style={{
        fontSize: props.size || 15,
      }}
    >
      {/* @ts-ignore */}
      <ion-icon name={fullIconName} />
    </span>
  );
};

