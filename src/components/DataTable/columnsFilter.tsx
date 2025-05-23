import { Columns3 } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import type { DataTableHandle } from "./dataTable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ColumnsFilter({ tableRef }: { tableRef: React.RefObject<DataTableHandle<any> | null> }) {
  const table = tableRef.current?.table;

  if (!table) return null;

  const hidableColumns = table.getAllColumns().filter((column) => column.getCanHide());

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Columns3 />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {hidableColumns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.columnDef.header as string ?? column.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
