"use client";

import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RingLoader
        size={80}                 // size of the ring
        color="red"           // bright visible red
        speedMultiplier={1.5}     // animation speed
        loading={true}
      />
    </div>
  );
};

export default Loader;
