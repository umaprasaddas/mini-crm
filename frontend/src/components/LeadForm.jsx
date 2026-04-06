import { useState } from "react";

export default function LeadForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    value: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://mini-crm-8im0.onrender.com/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    onAdd && onAdd(data);

    setForm({ name: "", company: "", value: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
      <input name="value" type="number" placeholder="Value" value={form.value} onChange={handleChange} />

      <button type="submit">Add</button>
    </form>
  );
}
