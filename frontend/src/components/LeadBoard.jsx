import { useEffect, useState } from "react";

export default function LeadBoard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        console.log("Fetching leads...");

        const res = await fetch("http://localhost:5000/api/leads");
        console.log("Response:", res);

        const data = await res.json();
        console.log("Data:", data);

        setLeads(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    void fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    const updated = await res.json();

    setLeads((prev) =>
      prev.map((lead) => (lead._id === id ? updated : lead))
    );
  };

  return (
    <div className="board">
      <div className="column new">
        <h2>New</h2>
        {leads.filter(l => l.status === "New").map(lead => (
          <div className="card" key={lead._id}>
            <p><b>{lead.name}</b></p>
            <p>{lead.company}</p>
            <p>₹{lead.value}</p>
            <button onClick={() => updateStatus(lead._id, "Contacted")}>
              Move →
            </button>
          </div>
        ))}
      </div>

      <div className="column contacted">
        <h2>Contacted</h2>
        {leads.filter(l => l.status === "Contacted").map(lead => (
          <div className="card" key={lead._id}>
            <p><b>{lead.name}</b></p>
            <p>{lead.company}</p>
            <p>₹{lead.value}</p>
            <button onClick={() => updateStatus(lead._id, "Closed")}>
              Move →
            </button>
          </div>
        ))}
      </div>

      <div className="column closed">
        <h2>Closed</h2>
        {leads.filter(l => l.status === "Closed").map(lead => (
          <div className="card" key={lead._id}>
            <p><b>{lead.name}</b></p>
            <p>{lead.company}</p>
            <p>₹{lead.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}