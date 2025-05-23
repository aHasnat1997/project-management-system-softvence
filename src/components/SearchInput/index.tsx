import { Search } from "lucide-react";
import { Input } from "../ui/input";

type TSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange, ...rest }: TSearchInputProps) {
  return (
    <div className="relative">
      <div className="absolute top-[6px] left-2 border-0 p-0 cursor-pointer">
        <Search />
      </div>
      <Input
        className="w-[310px] pl-10"
        type="text"
        placeholder="Search here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </div>
  );
};
