import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box } from '@mui/material';
import moment from 'moment';
import { Fragment } from 'react';


export default function generateSecondLine(value) {
  const toCheck = ['tags', 'tasklist', 'module', 'dueDate', 'subtasks'];
  const items = [];

  toCheck.map(key => {
    if (value[key]) {
      if (key === 'tags' && value.tags.length > 0) {
        let res = value.tags.map((tag, i) => {
          return <Box key={i} sx={{
            mx: "1px",
            width: "5px",
            height: "12px",
            backgroundColor: tag.colour,
            borderRadius: '5px',
          }} />
        });
        items.push(res);
      }

      if (key === 'tasklist') {
        items.push(value.tasklist.name)
      }

      if (key === 'moduleCode') {
        items.push(value.module.moduleCode)
      }

      if (key === 'dueDate') {
        items.push(`Due ${moment(value.dueDate).calendar()}`);
      }

      if (key === 'subtasks' && value.subtasks.length > 0) {
        items.push(
          <Fragment key="subtask">
            {value.subtasks.filter(s => s.complete).length}\{value.subtasks.length}
            <FormatListBulletedIcon sx={{ fontSize: "15px" }} />
          </Fragment>
        )
      }
    }
  })

  let lastIndex = items.length - 1;

  return (
    <Fragment>
      {
        items.map((item, index) => {
          if (lastIndex !== index) return <Fragment key={index}>{item}&nbsp;|&nbsp;</Fragment>;
          else return <Fragment key={index}>{item}</Fragment>
        })
      }
    </Fragment>
  )
} 