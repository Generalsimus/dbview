"use server"

import { AutoBuild } from ".."





const options = {
    autoBuild: false
}

export async function getAutoBuildValue(): Promise<boolean> {
    'use server'
    return options.autoBuild
}

export async function toggleSetAutoBuild(): Promise<boolean> {
    'use server'
    options.autoBuild = !options.autoBuild;
    return options.autoBuild;
}