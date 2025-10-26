import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import "./ApplicationList.css";

const API_URL = "http://localhost:5001/api/applications";

const ApplicationList = ({ refreshKey, onDataUpdated }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setApplications(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [refreshKey]);

  const handleDeleteClick = (app) => {
    setAppToDelete(app);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAppToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!appToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/${appToDelete._id}`);

      if (onDataUpdated) {
        onDataUpdated();
      }
      handleCloseModal();
    } catch (err) {
      console.error("Failed to delete application", err);
      alert("Failed to delete application.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (app) => {
    navigate("/new", { state: { editApplication: app } });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Applied":
        return "status-badge status-applied";
      case "Interview":
        return "status-badge status-interview";
      case "Offer":
        return "status-badge status-offer";
      case "Rejected":
        return "status-badge status-rejected";
      default:
        return "status-badge status-applied";
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <div className="application-list">
      <div className="list-header">
        <h2 className="list-title">Applications</h2>
        {applications.length > 0 && (
          <div className="applications-count">
            {applications.length}{" "}
            {applications.length === 1 ? "application" : "applications"}
          </div>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No applications yet</h3>
          <p>Start tracking your job search journey</p>
          <button className="btn-add-first" onClick={() => navigate("/new")}>
            + Add Your First Application
          </button>
        </div>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>
                  <button
                    className="company-name"
                    onClick={() => navigate(`/application/${app._id}`)}
                  >
                    {app.companyName}
                  </button>
                </td>
                <td>{app.jobTitle}</td>
                <td>{formatDate(app.applicationDate)}</td>
                <td>
                  <span className={getStatusBadgeClass(app.status)}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(app)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteClick(app)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        appName={
          appToDelete
            ? `${appToDelete.jobTitle} at ${appToDelete.companyName}`
            : ""
        }
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ApplicationList;
