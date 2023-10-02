import React, { useState } from "react";
import Papa from "papaparse";
import CsvModal from "./CsvModal.jsx";
import CsvImg from "../assets/csv.png";
const FileImport = () => {
  const [csvData, setCsvData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isfile, setIsfile] = useState(false);
  const [filename, setFilename] = useState("");
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [sheeturl, setSheeturl] = useState("");
  const [finalurl, setFinalurl] = useState("");
  const getSpreadsheetUrl = (e) => {
    e.preventDefault();
    const url = e.target.url.value;
    setFinalurl(url);
    function extractSpreadsheetIdFromUrl(url) {
      const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
      const match = url.match(regex);
      if (match && match[1]) {
        return match[1];
      } else {
        return null;
      }
    }
    const spreadsheetId = extractSpreadsheetIdFromUrl(url);
    console.log("Spreadsheet ID:", spreadsheetId);
    setSheeturl(spreadsheetId);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFilename(file.name);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setCsvData(result.data);
        setSelectedHeaders(Object.keys(result.data[0]));
        setIsfile(true);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  const handleApplyHeaders = (selected) => {
    setSelectedHeaders(selected);
    setShowModal(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://csv-backend-ui7e.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedHeaders, csvData, sheeturl }),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
        setLoading(false);
        setSuccess(true);
      } else {
        console.error("Error submitting form data:", response.statusText);
        setWrong(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setWrong(true);
    }
  };
  return (
    <div className="">
      {!sheeturl ? (
        <div className="flex justify-center pt-10">
          <form className="w-3/4" onSubmit={getSpreadsheetUrl}>
            <label
              htmlFor="url"
              className="text-sm font-medium  sr-only text-white"
            >
              Spreadsheet Url
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
              <input
                type="text"
                id="url"
                name="url"
                className="block w-full p-4 pl-10 text-sm 
                 border border-gray-300 rounded-lg 
                  focus:outline-none   
                  bg-gray-700 
                  border-gray-600 
                  placeholder-gray-400 
                  text-white "
                placeholder="Enter Spreadsheet url"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 
                 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                bg-blue-600 
                hover:bg-blue-700 
                focus:ring-blue-800"
              >
                Spreadsheet Url
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center pt-10 ">
          <div className="w-3/4">
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6  border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500"
              value={`your sheet id : ${sheeturl}`}
              disabled
            />
          </div>
        </div>
      )}
      {wrong ? (
        <div>
          <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden bg-gray-900 border-violet-400">
            <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leadi rounded-full bg-violet-400 text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-8 w-8"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <div className="flex-1 p-2">
              <p className="text-sm text-gray-100">
               An error occured while accessing the data this might be at our end , please check the Spreadsheet url or try to upload a valid Csv file and try again .
              </p>
            </div>
            <button onClick={() => setWrong(false)} type="button" className="ml-6 p-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {isfile ? (
        <>
          <div className="flex pt-8 justify-center items-center">
            <img className="w-16" src={CsvImg} alt="" />
            <p className="text-xl font-bold text-gray-900 ml-2">
              {filename}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
            >
              Select Headers
            </button>
          </div>
        </>
      ) : (
        <>
          <p class="font-mono text-3xl flex pt-10 m-auto justify-center text-white">
            Add your CSV file here
          </p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex text-xs hover:text-white text-gray-500 text-gray-400 flex-col items-center mt-10 justify-center w-auto p-10 pl-20 pr-20 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
              hover:bg-neutral-600 bg-white 
               bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </>
      )}
      {showModal && (
        <CsvModal
          headers={selectedHeaders}
          selectedHeaders={selectedHeaders}
          onClose={() => setShowModal(false)}
          onApply={handleApplyHeaders}
        />
      )}
      {isfile ? (
        <div>
          <section className="flex justify-center ">
            <div className="container flex justify-center w-2/4 p-4 sm:p-10 lg:flex-row">
              <div className="flex flex-col items-center justify-center flex-1 p-4 pb-4 text-center rounded-md sm:p-8 lg:p-16 bg-green-400 
              :bg-gray-900 text-gray-900">
                <span className="text-sm font-semibold 
                ">
                  Export to Sheets
                </span>
                <p className="font-semibold 
                 text-lg mt-4">
                  Export your CSV data to Google Sheets using a Google Sheet
                  link. Simply post your link above and click the export button
                  to transfer the data!
                </p>
                {success ? (
                  <button
                    onClick={() => (window.open(finalurl, "_blank"))}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    <span>Visit</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-6"
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Export</span>
                  </button>
                )}

                {loading ? (
                  <>
                    <div
                      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed mt-2">
                      Processing...
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FileImport;
