import React from "react";
import { Chart } from "react-google-charts";
import classes from './gantt-chat.module.css'
import { IMeet } from "../../../../types/dataTypes";
import { Box } from "@mui/material";
import NoDataImg from '../../../../assets/noData.png';

interface Props{
    meetData:IMeet[];
}

const GanttChart = ({meetData}:Props) => {
  const data = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    ...meetData.map((meeting) => {
      const startDateTime = new Date(`${meeting.date}T${meeting.start_time}`);
      const endDateTime = new Date(`${meeting.date}T${meeting.end_time}`);

      return [
        meeting.meet_id.toString(),
        `${meeting.booked_by.name}`,
        `Floor ${meeting.floor_no}`,
        startDateTime,
        endDateTime,
        null,
        100, 
        null, 
      ];
    }),
  ];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 40,
      barHeight: 30,
      criticalPathEnabled: false,
    },
  };

  return (
    <div className={classes.gantt_container}>
      {
        meetData.length > 0 && (
          <Chart
            chartType="Gantt"
            width="100%"
            height="100%"
            data={data}
            options={options}
          />
        )
      }
      {
        meetData.length === 0 && (
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
    </div>
  );
};

export default GanttChart;
