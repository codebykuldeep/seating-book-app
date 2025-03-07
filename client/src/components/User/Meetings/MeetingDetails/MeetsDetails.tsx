import React, { useState } from 'react'
import ShowTable from './ShowTable'
import { IMeet } from '../../../../types/dataTypes'
import { Box, Switch } from '@mui/material';
import { getRoomStatus } from '../../../../helper/meetHelperFn';
import ActiveCard from './ActiveCard';
import GanttChart from '../GanttChart/GanttChart';
import classes from './meets-details.module.css'

import ChartIcon from '@mui/icons-material/AlignHorizontalLeft';
import TableIcon from '@mui/icons-material/TableRows';
import { dateFormatter } from '../../../../utils/dateUtils';

interface Props{
    data:IMeet[];
    meetNo:string | number;
}

function MeetsDetails({meetNo,data}:Props) {
  const [checked,setChecked] = useState(false); 

  function handleSwitch(event: React.ChangeEvent<HTMLInputElement>, checked: boolean){
    setChecked(checked);
  }
  return (
    <Box p={2}>
      <ActiveCard data={data} meetNo={meetNo} roomState={getRoomStatus(data)}/>
      <Box className={classes.header}>
        <h2>Meeting Schedule - {dateFormatter(new Date().toISOString())}</h2>
        <Box className={classes.switch}>
          <ChartIcon/>
          <Switch onChange={handleSwitch}/>
          <TableIcon/>
        </Box>
      </Box>
      {
        !checked ? (
        <Box>
          <GanttChart meetData={data}/>
        </Box>
        ):(
          <Box p={2}>
            <ShowTable rows={data}/>
        </Box>
        )
      }
        
    </Box>
  )
}

export default MeetsDetails


