import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { Soul } from "@prisma/client";
import type { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

export type SoulsTableFilterProps = {
  table: Table<Soul>;
};

export const SoulsTableFilter = ({ table }: SoulsTableFilterProps) => {
  return (
    <div className="font-lato flex items-center justify-between">
      <Input
        placeholder="Rechercher une personne"
        value={table.getColumn("Nom")?.getFilterValue() as string}
        onChange={(event) =>
          table.getColumn("Nom")?.setFilterValue(event.target.value)
        }
        className="mr-4 max-w-md rounded-xl"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="ml-auto rounded-xl border">
            Afficher <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="font-lato"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
