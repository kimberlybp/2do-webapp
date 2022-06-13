import Radio from "@mui/material/Radio";
import { useState } from "react";


const RadioButton = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Radio
      color="default"
      checked={selectedValue === "a"}
      onChange={handleChange}
    />
  );
};

export { RadioButton };