import React from "react";
import { Box, Image } from "native-base";
import icons from "../../utils/icons/icons";

const ScratchCard = () => {
  return (
    <Box height={170} alignContent="center" width={150} bg={"blue.700"}>
      <Image
        source={icons.banner_icon}
        alt="scratch"
        width={150}
        height={170}
      />
    </Box>
  );
};

export default ScratchCard;
