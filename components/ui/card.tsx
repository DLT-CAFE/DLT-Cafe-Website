import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight transition-colors duration-200 hover:text-primary",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, dangerouslySetInnerHTML, ...props }, ref) => {
  // Process HTML content if provided
  const processedHtml = dangerouslySetInnerHTML && 
    typeof dangerouslySetInnerHTML.__html === 'string' ? 
    { __html: dangerouslySetInnerHTML.__html.replace(/&amp;/g, '&') } : 
    dangerouslySetInnerHTML;
  
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      dangerouslySetInnerHTML={processedHtml}
      {...props}
    />
  );
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, dangerouslySetInnerHTML, ...props }, ref) => {
  // Process HTML content if provided
  const processedHtml = dangerouslySetInnerHTML && 
    typeof dangerouslySetInnerHTML.__html === 'string' ? 
    { __html: dangerouslySetInnerHTML.__html.replace(/&amp;/g, '&') } : 
    dangerouslySetInnerHTML;
  
  return (
    <div 
      ref={ref} 
      className={cn("p-6 pt-0", className)} 
      dangerouslySetInnerHTML={processedHtml}
      {...props} 
    />
  );
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
