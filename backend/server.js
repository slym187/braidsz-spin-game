const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let checkins = [];
let currentId = 1;

app.get("/api/checkins", (req, res) => {
  res.json(checkins);
});

app.post("/api/checkins", (req, res) => {
  const { name, phone, service, stylist, notes } = req.body;

  if (!name || !service) {
    return res.status(400).json({ message: "Name and service are required." });
  }

  const newCheckin = {
    id: currentId++,
    name,
    phone: phone || "",
    service,
    stylist: stylist || "",
    notes: notes || "",
    status: "waiting",
    createdAt: new Date().toISOString(),
  };

  checkins.push(newCheckin);
  res.status(201).json(newCheckin);
});

app.patch("/api/checkins/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ["waiting", "in-chair", "done"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  const checkin = checkins.find((c) => c.id === Number(id));
  if (!checkin) {
    return res.status(404).json({ message: "Check-in not found." });
  }

  checkin.status = status;
  res.json(checkin);
});

app.delete("/api/checkins/:id", (req, res) => {
  const { id } = req.params;
  const index = checkins.findIndex((c) => c.id === Number(id));

  if (index === -1) return res.status(404).json({ message: "Not found." });

  checkins.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
