import { Select } from "@chakra-ui/react";
import React from "react";

const Languages = ({value, handleChange}) => {

  return (
    <Select borderColor="tomato" color="tomato" value={value} onChange={handleChange} width={"200px"}>
      <option value="English">English</option>
      <option value="Hindi">Hindi</option>
      <option value="French">French</option>
      <option value="German">German</option>
      <option value="Japanese">Japanese</option>
      <option value="Korean">Korean</option>
      <option value="Russian">Russian</option>
      <option value="Arabic">Arabic</option>
      <option value="Greek">Greek</option>
      <option value="Italian">Italian</option>
      <option value="Dutch">Dutch</option>
      <option value="Swedish">Swedish</option>
      <option value="Bengali">Bengali</option>
      <option value="Urdu">Urdu</option>
      <option value="Vietnamese">Vietnamese</option>
      <option value="Thai">Thai</option>
      <option value="Spanish">Spanish</option>
      <option value="Portuguese">Portuguese</option>
      <option value="Turkish">Turkish</option>
    </Select>
  );
};

export default Languages;
