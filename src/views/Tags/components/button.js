import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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

const PriorityButton = styled(Button)({
  height: 30,
  borderRadius: 20,
  fontWeight: 700,
  textTransform: "none",
  "&:hover": {
    opacity: "75%",
    backgroundColor: "red",
  },
});

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

export { AddTagButton, NewButton, RadioButton, PriorityButton }