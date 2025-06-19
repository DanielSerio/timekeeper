import { TbDashboard, TbCategory2, TbFileSpreadsheet } from "react-icons/tb";

export const NAVIGATION_LINKS = [
  {
    href: "/",
    title: "Dashboard",
    icon: TbDashboard,
  },
  {
    href: "/categories",
    title: "Categories",
    icon: TbCategory2,
  },
  {
    href: "/timesheets",
    title: "Timesheets",
    icon: TbFileSpreadsheet,
  },
] as const;

export type NavigationLink = (typeof NAVIGATION_LINKS)[number];
