"use server"

import { autoBuildState } from "./state"






export async function getAutoBuildValue(): Promise<boolean> {
    'use server'
    return autoBuildState.autoBuild
}

export async function toggleSetAutoBuild(): Promise<boolean> {
    'use server'
    autoBuildState.autoBuild = !autoBuildState.autoBuild;
    return autoBuildState.autoBuild;
}