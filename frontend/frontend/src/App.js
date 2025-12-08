// src/App.js
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <div className="auth-container">
        <h1 className="app-title">AI Interview – Auth</h1>
        <p className="app-subtitle">
          Sign up or login to access the AI interview platform.
        </p>
        <div className="auth-grid">
          <Signup />
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
