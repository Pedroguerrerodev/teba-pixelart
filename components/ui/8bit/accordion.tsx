"use client";

import type * as React from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

import "@/components/ui/8bit/styles/retro.css";

function Accordion({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

export interface BitAccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  asChild?: boolean;
}

function AccordionItem({
  className,
  children,
  ...props
}: BitAccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-dashed border-b-4 border-foreground dark:border-ring relative",
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

export interface BitAccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  font?: "normal" | "retro";
}

function AccordionTrigger({
  className,
  children,
  font,
  ...props
}: BitAccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-3 text-left text-sm font-medium",
          font !== "normal" && "retro",
          className
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export interface BitAccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  font?: "normal" | "retro";
}

function AccordionContent({
  className,
  children,
  font,
  ...props
}: BitAccordionContentProps) {
  return (
    <div className="relative">
      <AccordionPrimitive.Content
        className={cn(
          "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
          font !== "normal" && "retro",
          className
        )}
        {...props}
      >
        <div className="pb-4 pt-0 relative z-10 p-1">{children}</div>
      </AccordionPrimitive.Content>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
