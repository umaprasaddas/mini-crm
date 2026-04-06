import { useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadBoard from "./components/LeadBoard";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app">
      <h1>Mini CRM</h1>
      <LeadForm onAdd={handleAdd} />
      <LeadBoard key={refresh} />
    </div>
  );
}