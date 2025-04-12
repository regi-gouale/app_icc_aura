import type { Member, Soul } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";

export const soulsTableColumns: ColumnDef<Soul>[] = [
  {
    id: "Nom",
    accessorKey: "fullname",
    header: ({ column }) => (
      <div className="ml-1 flex items-center justify-start text-primary">
        <span className="truncate text-sm font-semibold">Prénom & Nom</span>
        <Button
          className="ml-0"
          variant="ghost"
          size="icon"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const soul = row.original as Soul;

      return (
        <div className="ml-1 truncate text-left text-sm">
          {soul.firstName} {soul.lastName.toLocaleUpperCase()}
        </div>
      );
    },
  },
  {
    id: "Email",
    accessorKey: "email",
    header: () => (
      <div className="flex items-center justify-start truncate text-sm text-primary">
        E-Mail
      </div>
    ),
    cell: (row) => (
      <div className="truncate text-left text-sm">
        {row.getValue() as string}
      </div>
    ),
  },
  {
    id: "Téléphone",
    accessorKey: "phone",
    header: () => (
      <div className="flex items-center justify-start truncate text-sm text-primary">
        Téléphone
      </div>
    ),
    cell: (row) => (
      <div className="text-left text-sm">{row.getValue() as string}</div>
    ),
  },
  {
    id: "Statut Membre",
    accessorKey: "status",
    header: () => (
      <div className="flex items-center justify-start truncate text-sm text-primary">
        Statut
      </div>
    ),
    cell: ({ row }) => {
      const soul = row.original;
      switch (soul.status) {
        case "MEMBER":
          return <div className="text-left text-sm">Membre</div>;
        case "AIDE":
          return <div className="text-left text-sm">Aide</div>;
        case "ASSISTANT_PASTOR":
          return <div className="text-left text-sm">Assistant Pasteur</div>;
        case "PASTOR":
          return <div className="text-left text-sm">Pasteur</div>;
        case "MINISTER":
          return <div className="text-left text-sm">Ministre</div>;
        case "RESPONSIBLE":
          return <div className="text-left text-sm">Responsable</div>;
        case "STAR":
          return <div className="text-left text-sm">Star</div>;
      }
    },
  },
  {
    id: "Age",
    header: () => <div className="text-sm text-primary">Age</div>,
    cell: ({ row }) => {
      const soul = row.original;
      const age = soul.dateOfBirth
        ? formatDistanceToNowStrict(soul.dateOfBirth, { locale: fr })
        : "N/A";
      return <div className="text-sm text-primary">{age}</div>;
    },
  },
];
