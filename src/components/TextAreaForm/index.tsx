import React from 'react';
import { TextInputProps } from 'react-native';
import {TextArea} from '../TextArea';
import {Control, Controller,FieldValues} from'react-hook-form';
import {ErrorInput} from '../ErrorInput';


interface Props extends TextInputProps{
  control:Control<any>;
  name:string;
  error:FieldValues;
}
export function TextAreaForm({
  control,
  name,
  error,
  ...rest
}:Props){
  return (
    <>
      <Controller 
        control={control}
        render={({field:{onChange, onBlur,value}})=>(
          <TextArea 
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {
          !!error && <ErrorInput description={error.message}/>
      }
    </>
  );
}