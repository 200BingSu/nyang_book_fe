import { PiCat } from "react-icons/pi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FiPieChart, FiBook } from "react-icons/fi";
import { LuBook, LuCat, LuListTodo } from "react-icons/lu";
import { GiCannedFish } from "react-icons/gi";
import { TbSandbox } from "react-icons/tb";

// 문자열 → 컴포넌트 매핑
export const ICONS: Record<string, React.ElementType> = {
  PiCat: PiCat,
  LuCat: LuCat,
  BiPurchaseTagAlt: BiPurchaseTagAlt,
  FiPieChart: FiPieChart,
  LuListTodo: LuListTodo,
  LuBook: LuBook,
  GiCannedFish: GiCannedFish,
  TbSandbox: TbSandbox,
};
