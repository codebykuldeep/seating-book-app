import React, { useState } from 'react'
import ShowTable from './ShowTable'
import { IMeet } from '../../../../types/dataTypes'
import { Box, Switch, Tooltip } from '@mui/material';
import { getRoomStatus } from '../../../../helper/meetHelperFn';
import ActiveCard from './ActiveCard';
import GanttChart from '../GanttChart/GanttChart';
import classes from './meets-details.module.css'

import ChartIcon from '@mui/icons-material/AlignHorizontalLeft';
import TableIcon from '@mui/icons-material/TableRows';
import { dateFormatter } from '../../../../utils/dateUtils';
import NoDataImg from '../../../../assets/noData.png';

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
         <Tooltip title='Chart'>
          <ChartIcon/>
         </Tooltip>
          <Switch onChange={handleSwitch}/>
          <Tooltip title='Table'>
          <TableIcon/>
         </Tooltip>
        </Box>
      </Box>
      {
        data &&  data.length !== 0 ?
        <>
        {!checked ?( 
          <Box>
          <GanttChart meetData={data}/>
        </Box>
        ):(
          <Box p={2}>
            <ShowTable rows={data}/>
        </Box>
        )
        }
        </>
        :
        <></>
      }
      {
         data && data.length === 0 && (
          <Box className={classes.no_data}>
            <Box className={classes.img}>
              <img src={NoDataImg} alt="no data" />
            </Box>
            <Box className={classes.text}>
              No meetings 
            </Box>
          </Box>
        )
      }  
    </Box>
  )
}

export default MeetsDetails


