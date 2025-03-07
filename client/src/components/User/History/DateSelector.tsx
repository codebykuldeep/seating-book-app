import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';


interface Props{
    date:string;
    updateDate:(val:string)=>void;
}

export default function DateSelector({date,updateDate}:Props) {

    function handleDate(value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>){
        console.log(context);
        if(context.validationError) return;
        
        console.log(value?.toDate());
        const date =  value?.toDate().toISOString().split('T')[0]
        updateDate(date!)   
    }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Date" disableFuture onChange={handleDate} value={dayjs(date)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
