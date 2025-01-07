import React from "react";

// Define types for the props
interface ConfirmationBoxProps {
  onContinue: () => void;
  onCancel: () => void;
  title: string;
  isVisible: boolean;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  onContinue,
  onCancel,
  title,
  isVisible,
}) => {
  if (!isVisible) return null; // If not visible, don't render anything

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background to block interactions
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onCancel} // Close the modal when clicking outside
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
      >
        <h3>{title}</h3>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onContinue}
          >
            Continue
          </button>
          <button
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
