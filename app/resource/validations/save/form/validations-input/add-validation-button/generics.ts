import { InputProps } from "@/basic/generics";



// type OptionalKeys = "setValu"
export type SwitchTypePropGen<T extends { type: any }> = (T extends any ? InputProps<T> & {
    type?: T["type"] | undefined
    onRemove: () => void
} : never);