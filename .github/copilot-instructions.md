# Agent

- Write concise, technical TypeScript code using functional and declarative programming patterns.
- Avoid classes; prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).
- Structure files into: exported component, subcomponents, helpers, static content, and types.

## syntax-and-formatting

- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Write declarative JSX.

## typescript-usage

- Use TypeScript for all code; prefer types over interfaces.
- Avoid enums; use maps instead.
- Use functional components with TypeScript types.

## ui-and-styling

- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS using a mobile-first approach.

## performance-optimization

- Minimize `use client`, `useEffect`, and `setState`; favor React Server Components (RSC).
- Wrap client components in `Suspense` with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, and implement lazy loading.

## database-querying-and-data-model-creation

- Use Prisma SDK to query the database.
- For data models, read the `.prisma` files.

## key-conventions

- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client': Favor server components and Next.js SSR for data fetching or state management.
- Use 'use client' only for Web API access in small components.

## Output

- Always write code in English
- Always write UI in French
- Do not add comments

## Terminal

- ALWAYS use `pnpm`

# Naming Convention

## Context

- Apply these naming conventions to all code elements including files, folders, functions, classes, interfaces, types, enums, etc.
- These conventions ensure code consistency, improve readability, and reduce cognitive load
- Follow these guidelines for all new code and when refactoring existing code

## Requirements

### 1. General Principles

- Names must be descriptive and reveal intent
- Names should be searchable and not too short
- Avoid abbreviations except for widely accepted ones (e.g., `id`, `http`, `url`)
- Avoid redundant or meaningless words (e.g., `data`, `info`)
- Maximum name length: 50 characters
- Maintain consistent casing patterns as defined below

### 2. File & Folder Naming

#### Files

- **Source Code**: `kebab-case.extension` (e.g., `resume-builder.ts`)
- **React/Vue Components**: `PascalCase.tsx` (e.g., `ResumeForm.tsx`)
- **Tests**: `[filename].{spec|test}.extension` (e.g., `resume-service.spec.ts`)
- **Type Declaration Files**: `kebab-case.d.ts` (e.g., `resume-types.d.ts`)
- **Configuration Files**: `kebab-case.config.ts` (e.g., `tailwind.config.ts`)
- **Constants/Data Files**: `SCREAMING_SNAKE_CASE.ts` (e.g., `DEFAULT_RESUME_TEMPLATE.ts`)
- **Server Action Files** : `kebab-case.action.ts` (e.g., `user.action.ts`)
- **Zustand Store Files** : `kebab-case.store.ts` (e.g., `user.store.ts`)
- **Zod Shema Files** : `kebab-case.schema.ts` (e.g., `user.schema.ts`)

#### Folders

- **General Purpose Folders**: `kebab-case` (e.g., `error-handling`)
- **Domain/Feature Folders**: `kebab-case` (e.g., `resume-builder`)
- **Clean Architecture Layers**: `kebab-case` (e.g., `domain`, `application`, `infrastructure`, `presentation`)
- **Component Collections**: `kebab-case` (e.g., `ui-components`)

### 3. JavaScript/TypeScript Elements

#### Variables

- **Regular Variables**: `camelCase` (e.g., `userProfile`)
- **Private Class Variables**: `_camelCase` (e.g., `_userData`)
- **Boolean Variables**: `isPrefixed` or `hasPrefixed` (e.g., `isValid`, `hasErrors`)

#### Constants

- **Module-level Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)
- **Class Constants**: `SCREAMING_SNAKE_CASE` (e.g., `static readonly MAX_ENTRIES = 50`)
- **Enum Constants**: `SCREAMING_SNAKE_CASE` (e.g., `ERROR_TYPES.VALIDATION`)

#### Functions & Methods

- **Regular Functions/Methods**: `camelCase` (e.g., `calculateTotal()`)
- **Private Class Methods**: `_camelCase` (e.g., `_validateInput()`)
- **Boolean-returning Functions**: `isPrefixed` or `hasPrefixed` (e.g., `isValidEmail()`)
- **Factory Functions**: `createPrefixed` (e.g., `createUserProfile()`)
- **Event Handlers**: `handlePrefixed` (e.g., `handleSubmit()`)

#### Classes

- **Class Names**: `PascalCase` (e.g., `ResumeBuilder`)
- **Abstract Classes**: `AbstractPascalCase` (e.g., `AbstractRepository`)
- **Service Classes**: `PascalCaseService` (e.g., `ValidationService`)
- **Repository Classes**: `PascalCaseRepository` (e.g., `ResumeRepository`)
- **Controller Classes**: `PascalCaseController` (e.g., `ResumeController`)

#### Interfaces & Types

- **Interfaces**: `PascalCaseInterface` (e.g., `ResumeDataInterface`)
- **Type Aliases**: `PascalCaseType` (e.g., `ResumeTemplateType` or `TResumeTemplateType`)
- **Type Parameters/Generics**: Single uppercase letter or `PascalCaseType` (e.g., `T` or `EntityType`)
- **Prop Types**: `PascalCaseProps` (e.g., `ResumeFormProps`)

#### Enums

- **Enum Names**: `PascalCaseEnum` (e.g., `ValidationResultEnum`)
- **Enum Members**: `SCREAMING_SNAKE_CASE` (e.g., `ValidationResult.INVALID_EMAIL`)

#### React/Vue Specific

- **Component Names**: `PascalCase` (e.g., `ResumeForm`)
- **Custom Hooks**: `useCamelCase` (e.g., `useFormValidation`)
- **Context Providers**: `PascalCaseProvider` (e.g., `ResumeProvider`)
- **Higher-Order Components**: `withPascalCase` (e.g., `withAuthentication`)

### Zod Schema

- **Schema name** : `PascaleCaseSchema` (e.g., `NameSchema`)

### 4. CSS & Styling

- **Tailwind Custom Classes**: `kebab-case` (e.g., `@apply bg-primary text-white;`)

### 5. Backend Specific

- **API Endpoints**: `kebab-case` (e.g., `/api/resume-templates`)
- **Environment Variables**: `SCREAMING_SNAKE_CASE` (e.g., `DATABASE_URL`)

### 6. Testing Specific

- **Test Suites**: `describe('PascalCase', ...)` (e.g., `describe('ResumeService', ...)`)
- **Test Cases**: `it('should do something', ...)` or `test('should do something', ...)`
- **Test Fixtures**: `camelCaseMock` or `mockPascalCase` (e.g., `resumeDataMock`)
- **Test Helpers**: `camelCaseHelper` (e.g., `createTestUser`)

## Examples

<example>
// Good file naming
resume-service.ts
ResumeForm.vue
resume-repository.spec.ts
TEMPLATE_CONSTANTS.ts

// Good variable naming
const userData = fetchUserData();
const isValid = validateEmail(email);
const MAX*FILE_SIZE = 5 * 1024 \_ 1024;

// Good function naming
function calculateTotalExperience(workHistory) {...}
function isEmailValid(email) {...}
function handleSubmit() {...}

// Good class naming
class ResumeBuilder {...}
class LocalStorageResumeRepository implements IResumeRepository {...}
class ValidationService {...}

// Good interface & type naming
interface IResumeData {...}
type ResumeTemplate = {...}
type TEntityId<T> = {...}

// Good enum naming
enum ValidationResult {
VALID,
INVALID_EMAIL,
MISSING_REQUIRED_FIELD
}

// Good component naming
const ProfileSection = () => {...}
const useFormValidation = () => {...}
</example>

<example type="invalid">
// Bad file naming
resume_service.ts  // Uses snake_case instead of kebab-case
resumeForm.vue     // Uses camelCase instead of PascalCase for component
ResumeRepo.test.ts // Inconsistent test naming

// Bad variable naming
const data = fetch(); // Too vague
const r = calculateTax(); // Too short and meaningless
const valid = check(); // Boolean should use is/has prefix

// Bad function naming
function validate() {...} // Too vague
function process_data() {...} // Uses snake_case
function returnTrueIfUserExists() {...} // Too verbose

// Bad class naming
class resume_builder {...} // Uses snake_case
class validationservices {...} // Not properly capitalized
class Repository_Local {...} // Inconsistent casing

// Bad interface & type naming
interface resumeData {...} // Should be IPascalCase
type data = {...} // Too vague and not PascalCase
type tEntity = {...} // Inconsistent casing

// Bad enum naming
enum validationResults {
valid, // Should be SCREAMING_SNAKE_CASE
invalid_email, // Should be SCREAMING_SNAKE_CASE
MissingField // Inconsistent casing
}

// Bad component naming
const profilesection = () => {...} // Should be PascalCase
const FormValidation = () => {...} // Custom hook should use usePrefix
</example>

# Client components

## Context

- Since React 19 and NextJS 13, we have Client Component
- This project use Client Component and [server-components.mdc](mdc:.cursor/rules/server-components.mdc) to work.
- Client Components allow you to write interactive UI elements that are pre-rendered on the server and can use client-side JavaScript to run in the browser.

## Why Client Components?

1. **Interactivity**: Client Components can use state, effects, and event listeners, meaning they can provide immediate feedback to the user and update the UI dynamically.
2. **Browser APIs**: Client Components have access to browser APIs, such as geolocation or localStorage, enabling richer functionality.

## Example:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## Rules:

1. Client Components need to start with `'use client'`.
2. Client Components can use `useState` and other React hooks.
3. Client Componentsed\*\* on the server, which means that they can create hydration errors. You must avoid such errors by using hooks like `@use-is-client.ts` or checking `typeof window` when using Browser APIs.

# Create component

## Context

- Creating a component must ALWAYS follow this rules.

## Rules

- You always use `export function` without "default".
- You always use an object "props" as the first argument of your component, and add type directly in the object.

## Example

With 2 or less props :

```tsx
export function MyComponent(props: { prop1: string; prop2: number }) {
  return <div>{props.prop1}</div>;
}
```

With more than 2 props :

```tsx
type MyComponentProps = {
  prop1: string;
  prop2: number;
  prop3: number;
};

export function MyComponent(props: MyComponentProps) {
  return <div>{props.prop1}</div>;
}
```

# Readme

## Context

- When creating or updating project documentation
- When adding new features or dependencies
- When changing project structure
- When updating installation or usage instructions

## Requirements

### Core Structure

- Title and Description

  - Project name
  - Clear, concise description of purpose
  - Status badges (build, coverage, version)

- Table of Contents

  - Auto-generated for READMEs longer than 2 screens
  - Hierarchical structure with clickable links

- Project Overview

  - Problem statement
  - Solution overview
  - Key features
  - Technologies used with versions
  - Architecture diagram (if applicable)

- Getting Started

  - Prerequisites
  - Installation steps
  - Environment setup
  - Configuration

- Usage

  - Basic examples
  - Common use cases
  - API documentation (if applicable)
  - Screenshots/GIFs for UI features

- Development

  - Setup instructions
  - Testing procedures
  - Contribution guidelines
  - Code style guide
  - Branch naming conventions

- Project Structure

  - Directory layout
  - Key files and their purposes
  - Architecture overview

- Deployment

  - Build instructions
  - Deployment procedures
  - Environment variables
  - Infrastructure requirements

- Maintenance
  - Update procedures
  - Troubleshooting guide
  - Known issues
  - FAQ

### Formatting

- Use proper Markdown syntax
- Include syntax highlighting for code blocks
- Keep line length under 120 characters
- Use relative links for internal references
- Include alt text for images

### Updates

- Keep version numbers current
- Update documentation with each feature
- Maintain changelog
- Review and update quarterly

## Examples

<example>
# CV Generator
@![Build Status](mdc:https:/travis-ci.org/user/cv-generator)
@![Coverage Status](mdc:https:/coveralls.io/github/user/cv-generator?branch=master)
@![Version](mdc:https:/www.npmjs.com/package/cv-generator)

Modern CV generator supporting JSON Resume format with real-time preview.

## Features

- JSON Resume format support
- Real-time preview
- Multiple themes
- PDF export
- Responsive design

## Quick Start

```bash
pnpm install
pnpm dev
```

@View full documentation
</example>

<example type="invalid">
cv generator app

install:
npm install
npm start

made by john
</example>

## Critical Notes

<critical>
- NEVER commit sensitive information (API keys, credentials)
- ALWAYS update version numbers when making changes
- ENSURE all commands and procedures are tested before documenting
- MAINTAIN synchronization between code and documentation
</critical>

# Next.js Backend

## Context

- NextJS 15 give us backend methods we should use.

## Header

Enable you to get the header of the request.

```tsx
import { headers } from "next/headers";

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
}
```

## Cookie

Enable you to get the cookie of the request.

```tsx
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  return "...";
}
```

To set a cookie, you must be in an [api-route.mdc](mdc:.cursor/rules/api-route.mdc) or [server-actions.mdc](mdc:.cursor/rules/server-actions.mdc) :

```tsx
"use server";

import { cookies } from "next/headers";

export async function create(data) {
  const cookieStore = await cookies();

  cookieStore.set("name", "lee");
  // or
  cookieStore.set("name", "lee", { secure: true });
  // or
  cookieStore.set({
    name: "name",
    value: "lee",
    httpOnly: true,
    path: "/",
  });
}
```
