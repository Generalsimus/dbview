import React, { } from 'react';
import { AddValidationsList } from './validation-list';
import { DataTypeView } from './data-types';
import { InputProps } from '@/basic/generics';
import { useMemoCall } from '@/app/utils/hooks/useMemoCall';
import { ValidateDataTypesEnums } from '@/basic/models/validation/data-types/enums';
import { ValidateDataTypes, ValidateValueType } from '@/basic/models/validation/data-types/schema';

interface IProps extends InputProps<ValidateValueType> {
    onRemove: () => void
}
export const AddValidationButton: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue, onRemove } = props;

    const addDataType = useMemoCall((type: ValidateDataTypesEnums) => {
        setValue({
            type: type,
            entities: []
        })

    });


    return <>
        {

            value.type ? <DataTypeView {...props} onRemove={onRemove} /> :
                <AddValidationsList entityTypes={ValidateDataTypes} onChange={addDataType} />
        }
    </>
})