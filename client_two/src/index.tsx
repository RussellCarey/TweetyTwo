import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Add.. another
import ModalState from "./context/modal/ModalState";
import JobState from "./context/jobs/JobsState";
import AuthState from "./context/auth/AuthState";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <ModalState>
        <JobState>
          <App />
        </JobState>
      </ModalState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
