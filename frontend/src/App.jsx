import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ApplicationList from "./components/ApplicationList";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationDetails from "./components/ApplicationDetails";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataUpdated = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const MyApplicationsPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1>My Job Applications</h1>
        <p>Track and manage all your job applications in one place</p>
      </div>
      <ApplicationList
        refreshKey={refreshKey}
        onDataUpdated={handleDataUpdated}
      />
    </div>
  );

  const NewApplicationPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New Application</h1>
        <p>Add a new job application to track</p>
      </div>
      <ApplicationForm onDataUpdated={handleDataUpdated} />
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MyApplicationsPage />} />
            <Route path="/new" element={<NewApplicationPage />} />
            <Route path="/application/:id" element={<ApplicationDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
