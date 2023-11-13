import { Grid, Input, Text } from "@chakra-ui/react";
import SelectCategoriesInput from "./selectors/SelectCategoriesInput";
import SelectComplexityInput from "./selectors/SelectComplexityInput";
import React, { useEffect, useState } from "react";

interface ModalPage1Props {
  title: string;
  link: string;
  onTitleChange: (title: string) => void;
  onLinkChange: (link: string) => void;
}

const ModalPage1: React.FC<ModalPage1Props> = ({
  title,
  link,
  onTitleChange,
  onLinkChange,
}) => {

  return (
    <Grid gap={4}>
      <Grid gap={1}>
        <Text as='b'>Title</Text>
        <Input
          placeholder={'Enter Question Title'}
          bg='primary.blue1'
          border='2px solid #244153'
          onChange={(e) => onTitleChange(e.target.value)} // Use the provided callback function
          value={title} // Use the provided prop
        />
      </Grid>
      <Grid gap={1}>
        <Text as='b'>Link</Text>
        <Input
          placeholder={'Enter Question Link'}
          bg='primary.blue1'
          border='2px solid #244153'
          onChange={(e) => onLinkChange(e.target.value)} // Use the provided callback function
          value={link} // Use the provided prop
        />
      </Grid>
      <Grid gap={1}>
        <Text as='b'>Category</Text>
        <SelectCategoriesInput />
      </Grid>
      <Grid gap={1}>
        <Text as='b'>Complexity</Text>
        <SelectComplexityInput />
      </Grid>
    </Grid>
  );
}

export default ModalPage1;