import { Outlet } from "react-router-dom";
import "./App.css";
import ReminderSystem from "./components/ReminderSystem";

function App() {
  return (
    <div className="app-container w-full overflow-x-hidden">
      <ReminderSystem />
      <Outlet />
    </div>
  );
}

export default App;
