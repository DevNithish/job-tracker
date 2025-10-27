import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ApplicationDetails.css";

const API_URL = "http://localhost:5001/api/applications";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${id}`);
        setApplication(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch application details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleEdit = () => {
    navigate("/new", { state: { editApplication: application } });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Applied: "#3b82f6",
      Interview: "#f59e0b",
      Offer: "#10b981",
      Rejected: "#ef4444",
    };
    return colors[status] || "#6b7280";
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading application details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Applications
        </button>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="page-container">
        <div className="error-message">Application not found.</div>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="details-header">
        <h1>Application Details</h1>
      </div>

      <div className="details-card">
        <div className="detail-row">
          <label>Company Name</label>
          <p>{application.companyName}</p>
        </div>

        <div className="detail-row">
          <label>Job Title</label>
          <p>{application.jobTitle}</p>
        </div>

        <div className="detail-row">
          <label>Application Date</label>
          <p>{formatDate(application.applicationDate)}</p>
        </div>

        <div className="detail-row">
          <label>Status</label>
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(application.status) }}
          >
            {application.status}
          </span>
        </div>

        <div className="detail-actions">
          <button onClick={handleEdit} className="btn-primary">
            Edit Application
          </button>
          <button onClick={() => navigate("/")} className="btn-secondary">
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
