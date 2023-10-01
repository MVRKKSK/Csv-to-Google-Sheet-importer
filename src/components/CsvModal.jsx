import React, { useState, useEffect } from 'react';

const CsvModal = ({ headers, selectedHeaders, onClose, onApply }) => {
  const [localSelectedHeaders, setLocalSelectedHeaders] = useState(selectedHeaders);

  useEffect(() => {
    setLocalSelectedHeaders(headers);
  }, [selectedHeaders]);

  const handleHeaderToggle = (header) => {
    if (localSelectedHeaders.includes(header)) {
      setLocalSelectedHeaders(localSelectedHeaders.filter((h) => h !== header));
    } else {
      setLocalSelectedHeaders([...localSelectedHeaders, header]);
    }
  };

  const handleApply = () => {
    onApply(localSelectedHeaders);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container text-white bg-gray-700  w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Select Headers to Display</p>
            <button
              className="modal-close"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="mb-4">
            {headers.map((header) => (
              <label key={header} className="block">
                <input
                  type="checkbox"
                  checked={localSelectedHeaders.includes(header)}
                  onChange={() => handleHeaderToggle(header)}
                  className="mr-2 leading-tight"
                />
                {header}
              </label>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleApply}
              className="modal-close px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default CsvModal;
