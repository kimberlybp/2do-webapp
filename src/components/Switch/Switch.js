import { useState } from 'react';
import { styled, FormControlLabel, Switch } from "@mui/material";

const CustomSwitch = (props) => {
  const { defaultChecked, label, onCheck, disabled } = props;
  const [checked, setChecked] = useState(!!defaultChecked);

  const handleChange = () => {
    setChecked(!checked);
    if (typeof onCheck === "function") onCheck(!checked)
  }

  return (
    <FormControlLabel
      sx={{ marginRight: '0' }}
      control={<StyledSwitch onChange={() => handleChange()} checked={checked} disabled={disabled} />}
      label={label}
    />
  );
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  marginRight: "8px",
  marginLeft: "24px",
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: "#4CC522",
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default CustomSwitch;

