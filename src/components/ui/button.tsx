// components/ui/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "w-full px-4 py-3 font-semibold text-white rounded-xl",
          "bg-[#039155]",
          "hover:bg-[#28A771]",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#039155]",
          "transition duration-200 disabled:bg-opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
