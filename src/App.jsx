import React, { useState } from "react";
import Papa from "papaparse";
import Navbar from "./components/Navbar";
import FileImport from "./components/FileImport";

const App = () => {
  return (
    <div>
      <Navbar />
      <FileImport />
    </div>
  );
};
export default App;
