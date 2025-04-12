import type { auth } from "@/lib/auth";
import type { stripe as stripePlugin } from "@better-auth/stripe";

export type AuthOrganization = Awaited<
  ReturnType<typeof auth.api.listOrganizations>
>[number];

type StripePluginSubscriptions = Parameters<
  typeof stripePlugin
>[0]["subscription"];

export type EnabledAuthPlan = NonNullable<StripePluginSubscriptions> extends {
  enabled: infer E;
}
  ? E extends true
    ? NonNullable<StripePluginSubscriptions>
    : never
  : never;

type Plans = EnabledAuthPlan["plans"];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlanArray = Extract<Plans, any[]>;

export type AuthPlan = PlanArray extends (infer P)[] ? P : never;
