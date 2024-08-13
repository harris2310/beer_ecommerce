import React from "react";
import { RingLoader } from "react-spinners";

type Props = {};

function Loading({}: Props) {
  return <RingLoader color='white' loading={true} size={150} aria-label='Loading Spinner' data-testid='loader' />;
}

export default Loading;
