import * as React from "react"

import { cn } from "@/lib/utils"
// glass: '  ',


const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
		<input
			type={type}
			className={cn(
				'flex h-9 w-full rounded-md bg-white/20 shadow-md backdrop-blur-sm border border-black/30 px-3 py-1 text-base shadow-sm  active:shadow-md transition-all duration-150 ease-in-out transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:bg-white/[0.43] hover:shadow-lg  active:scale-[0.98]',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
  }
)
Input.displayName = "Input"

export { Input }
