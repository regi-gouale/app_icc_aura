"use client";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createSoul } from "@/lib/actions/soul.action";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SoulStatus } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SoulFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  gender: z.string().optional(),
  ageRange: z.string().optional(),
  maritalStatus: z.string().optional(),
  dateOfBirth: z.date().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Veuillez entrer une adresse email valide",
    })
    .optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  profession: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(SoulStatus),
  organizationId: z.string(),
});

type SoulFormValues = z.infer<typeof SoulFormSchema>;

type AddSoulFormProps = {
  organizationId: string;
  organizationSlug: string;
};

export function AddSoulForm(props: AddSoulFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SoulFormValues>({
    resolver: zodResolver(SoulFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      ageRange: undefined,
      maritalStatus: undefined,
      dateOfBirth: undefined,
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      profession: "",
      description: "",
      status: SoulStatus.MEMBER,
      organizationId: props.organizationId,
    },
  });

  async function onSubmit(data: SoulFormValues) {
    setIsSubmitting(true);
    try {
      const result = await createSoul({
        ...data,
        organizationId: props.organizationId,
      });

      if (!result.success) {
        throw new Error(
          result.error || "Une erreur est survenue lors de la création de l'âme"
        );
      }

      router.push(`/orgs/${props.organizationSlug}/souls`);
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la création de l'âme:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HOMME">Homme</SelectItem>
                    <SelectItem value="FEMME">Femme</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ageRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tranche d'âge</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0-12">0-12 ans</SelectItem>
                    <SelectItem value="13-17">13-17 ans</SelectItem>
                    <SelectItem value="18-24">18-24 ans</SelectItem>
                    <SelectItem value="25-34">25-34 ans</SelectItem>
                    <SelectItem value="35-44">35-44 ans</SelectItem>
                    <SelectItem value="45-54">45-54 ans</SelectItem>
                    <SelectItem value="55-64">55-64 ans</SelectItem>
                    <SelectItem value="65+">65+ ans</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut marital</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CÉLIBATAIRE">Célibataire</SelectItem>
                    <SelectItem value="MARIÉ(E)">Marié(e)</SelectItem>
                    <SelectItem value="DIVORCÉ(E)">Divorcé(e)</SelectItem>
                    <SelectItem value="VEUF(VE)">Veuf(ve)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de naissance</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="Téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Adresse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input placeholder="Ville" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code postal</FormLabel>
                <FormControl>
                  <Input placeholder="Code postal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Input placeholder="Profession" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={SoulStatus.MEMBER}>Membre</SelectItem>
                  <SelectItem value={SoulStatus.AIDE}>Aide</SelectItem>
                  <SelectItem value={SoulStatus.ASSISTANT_PASTOR}>
                    Assistant Pasteur
                  </SelectItem>
                  <SelectItem value={SoulStatus.PASTOR}>Pasteur</SelectItem>
                  <SelectItem value={SoulStatus.MINISTER}>Ministre</SelectItem>
                  <SelectItem value={SoulStatus.RESPONSIBLE}>
                    Responsable
                  </SelectItem>
                  <SelectItem value={SoulStatus.STAR}>Star</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description ou notes additionnelles"
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <SubmitButton loadingText={"Ajout en cours..."}>Ajouter</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
