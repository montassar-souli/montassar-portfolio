import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetContextValue {
    open: boolean
    setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined)

const useSheet = () => {
    const context = React.useContext(SheetContext)
    if (!context) {
        throw new Error("useSheet must be used within a Sheet")
    }
    return context
}

interface SheetProps {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const Sheet = ({ children, open: controlledOpen, onOpenChange }: SheetProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
    const setOpen = onOpenChange || setUncontrolledOpen

    return (
        <SheetContext.Provider value={{ open, setOpen }}>
            {children}
        </SheetContext.Provider>
    )
}

const SheetTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { setOpen } = useSheet()

    return (
        <button
            ref={ref}
            className={className}
            onClick={() => setOpen(true)}
            {...props}
        >
            {children}
        </button>
    )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        side?: "top" | "right" | "bottom" | "left"
    }
>(({ className, children, side = "right", ...props }, ref) => {
    const { open, setOpen } = useSheet()

    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [open, setOpen])

    if (!open) return null

    const sideClasses = {
        top: "top-0 left-0 right-0 h-auto",
        right: "top-0 right-0 h-full w-80",
        bottom: "bottom-0 left-0 right-0 h-auto",
        left: "top-0 left-0 h-full w-80"
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50"
                onClick={() => setOpen(false)}
            />
            {/* Sheet */}
            <div
                ref={ref}
                className={cn(
                    "fixed z-50 bg-background p-6 shadow-lg transition-transform",
                    sideClasses[side],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </>
    )
})
SheetContent.displayName = "SheetContent"

const SheetHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
        {...props}
    />
))
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
))
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
SheetDescription.displayName = "SheetDescription"

export {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
}
