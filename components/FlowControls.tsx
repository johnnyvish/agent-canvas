import React from "react";

type FlowControlsProps = {
  showAddOptions: boolean;
  setShowAddOptions: (show: boolean) => void;
  handleAddNode: (isRoot: boolean) => void;
  processFlow: () => void;
  stopFlow: () => void; // new prop
  isProcessing: boolean;
  mounted: boolean;
};

export const FlowControls: React.FC<FlowControlsProps> = ({
  showAddOptions,
  setShowAddOptions,
  handleAddNode,
  processFlow,
  stopFlow,
  isProcessing,
  mounted,
}) => (
  <div className="absolute z-10 top-8 left-8 flex gap-4">
    <div className="relative">
      <button
        onClick={() => setShowAddOptions(!showAddOptions)}
        className="bg-gray-900 text-white text-5xl rounded-full w-16 h-16 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {showAddOptions ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          )}
        </svg>
      </button>

      {mounted && (
        <div
          className={`absolute left-0 mt-2 w-32 bg-gray-900 rounded-lg shadow-md transition-transform duration-200 transform origin-top ${
            showAddOptions ? "scale-y-100" : "scale-y-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => {
              setShowAddOptions(!showAddOptions);
              handleAddNode(true);
            }}
            className="block w-full text-white px-4 py-2 text-left hover:bg-gray-800 rounded-t-lg"
          >
            Add Root Node
          </button>
          <button
            onClick={() => {
              setShowAddOptions(!showAddOptions);
              handleAddNode(false);
            }}
            className="block w-full text-white px-4 py-2 text-left hover:bg-gray-800 rounded-b-lg"
          >
            Add Child Node
          </button>
        </div>
      )}
    </div>

    <button
      onClick={isProcessing ? stopFlow : processFlow}
      className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-gray-800"
    >
      {isProcessing ? (
        // Stop icon: a simple square
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      ) : (
        // Play icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
          />
        </svg>
      )}
    </button>
  </div>
);
