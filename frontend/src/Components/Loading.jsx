import React from "react";
import { CirclesWithBar } from  'react-loader-spinner'

const Loading = ({h,w}) => {
  return (
    <>
      <CirclesWithBar
        height= {h}
        width={w}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </>
  );
};

export default Loading;
