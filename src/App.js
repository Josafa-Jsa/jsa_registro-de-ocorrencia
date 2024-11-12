import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";

import Ocorrencia from "./Ocorrencia";

function App() {
  return (
    <div>
      <Ocorrencia />
      <ToastContainer />
      {/* <XLSX /> */}
      {/* <ExcelJS /> */}
    </div>
  );
}

export default App;
