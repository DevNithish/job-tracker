import React from "react";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ isOpen, onClose, onConfirm, appName, isLoading }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Confirm Deletion</h3>
        <p>
          Are you sure you want to delete the application for{" "}
          <strong>{appName}</strong>?
        </p>
        <p>This action cannot be undone.</p>

        <div className={styles.buttonContainer}>
          <button
            onClick={onClose}
            disabled={isLoading}
            className={styles.btnCancel}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={styles.btnConfirm}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
