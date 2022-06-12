import Button from "@mui/material/Button";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";

const NewButton = styled(Button)({
  width: "auto",
  marginBottom: 6,
  boxShadow: "none",
  textTransform: "none",
  textEmphasisColor: "#f5f5f3",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#f5f5f3",
  borderColor: "#f5f5f3",
  "&:hover": {
    backgroundColor: "#dbdbdb",
    borderColor: "#dbdbdb",
    boxShadow: "none",
  },
});

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

const AddTagButton = styled(Button)({
  height: 30,
  borderRadius: 20,
  fontWeight: 700,
  borderColor: "black",
  color: "black",
  textTransform: "none",
  "&:hover": {
    opacity: "70%",
    borderColor: "black",
  },
});

const PurpleButton = styled(Button)({
  width: "auto",
  marginBottom: 6,
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  backgroundColor: "#7134eb",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#7134eb",
    opacity: "90%",
  },
});

export { NewButton, RadioButton, PurpleButton, AddTagButton };
