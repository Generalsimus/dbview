
import React from 'react';
import { SettingsPage } from '.';
import { GetProjectSettings } from './server';



interface IProps {
}
export default async ({ }: IProps) => {
    const doc = await GetProjectSettings()
    return <>
        <SettingsPage initialValue={doc} />
    </>
}