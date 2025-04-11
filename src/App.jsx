import React, { useState } from "react";
import Camera from "./components/Camera";

const App = () => {
  const [hasPhoto, setHasProto] = useState(false);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Camera />
    </div>
  );
};

export default App;
