import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ApplicationForm.css";

const API_URL = "http://localhost:5001/api/applications";

const ApplicationForm = ({ onDataUpdated, onCancelEdit }) => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [status, setStatus] = useState("Applied");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const appToEdit = location.state?.editApplication || null;
  const isEditMode = appToEdit !== null;

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (isEditMode) {
      setCompanyName(appToEdit.companyName);
      setJobTitle(appToEdit.jobTitle);
      setApplicationDate(formatDateForInput(appToEdit.applicationDate));
      setStatus(appToEdit.status);
      setError(null);
      setSuccess(null);
    } else {
      setCompanyName("");
      setJobTitle("");
      setApplicationDate("");
      setStatus("Applied");
    }
  }, [appToEdit, isEditMode]);

  const validateForm = () => {
    const errors = [];
    if (companyName.length < 3) {
      errors.push("Company name must be at least 3 characters long.");
    }
    if (!jobTitle) {
      errors.push("Job title is required.");
    }
    if (!applicationDate) {
      errors.push("Application date is required.");
    } else if (new Date(applicationDate) > new Date()) {
      errors.push("Application date cannot be in the future.");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      return;
    }

    setLoading(true);

    const applicationData = {
      companyName,
      jobTitle,
      applicationDate,
      status,
    };

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${appToEdit._id}`, applicationData);
        setSuccess("Application updated successfully!");
      } else {
        await axios.post(API_URL, applicationData);
        setSuccess("Application added successfully!");

        setCompanyName("");
        setJobTitle("");
        setApplicationDate("");
        setStatus("Applied");
      }

      setLoading(false);

      if (onDataUpdated) {
        onDataUpdated();
      }

      setTimeout(() => {
        if (!isEditMode) {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Operation failed. Please try again.");
      }
      console.error(err);
    }
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
    navigate("/");
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {isEditMode ? "Edit Application" : "Add New Application"}
      </h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-group">
        <label htmlFor="companyName" className="form-label required">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          className="form-input"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          minLength="3"
          required
        />
        <div className="help-text">Minimum 3 characters required</div>
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle" className="form-label required">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          className="form-input"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="applicationDate" className="form-label required">
          Application Date
        </label>
        <input
          type="date"
          id="applicationDate"
          className="form-input"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          required
        />
        <div className="help-text">Cannot be a future date</div>
      </div>

      <div className="form-group">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn-submit">
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Application"
            : "Add Application"}
        </button>

        <button type="button" onClick={handleCancel} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
