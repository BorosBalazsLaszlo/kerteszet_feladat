import express from "express";
import { DbRun, DbQuery } from "../database.js";

const router = express.Router();

// GET - /novenyek
router.get("/novenyek", async (req, res) => {
  try {
    const novenyek = await DbQuery("SELECT * FROM Novenyek", []);
    res.json(novenyek);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - /novenyek/id
router.get("/novenyek/:id", async (req, res) => {
  const novenyId = req.params.id;
  try {
    const noveny = await DbQuery("SELECT * FROM Novenyek WHERE id = ?", [
      novenyId,
    ]);
    if (noveny.length === 0) {
      res.status(404).json({ message: "Nem található ilyen növény." });
    } else {
      res.json(noveny[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - /novenyek
router.post("/novenyek", async (req, res) => {
  const { nev, evelo, kategoria, ar } = req.body;

  if (nev === undefined || evelo === undefined || !kategoria || !ar) {
    res.status(400).json({ message: "Töltsd ki az összes mezőt!" });
    return;
  }

  try {
    await DbRun(
      "INSERT INTO Novenyek (nev, evelo, kategoria, ar) VALUES(?,?,?,?)",
      [nev, evelo, kategoria, ar]
    );
    res.status(201).json({ message: "Új növény hozzáadva" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - /novenyek/:id
router.put("/novenyek/:id", async (req, res) => {
  const novenyId = req.params.id;
  const { nev, evelo, kategoria, ar } = req.body;
  if (!nev || evelo === undefined || !kategoria || !ar) {
    res.status(400).json({ message: "Töltsd ki az összes mezőt!" });
    return;
  }
  try {
    await DbRun(
      "UPDATE Novenyek SET nev = ?, evelo = ?, kategoria = ?, ar = ? WHERE id = ?",
      [nev, evelo, kategoria, ar, novenyId]
    );
    res.json({ message: "Növény frissítve!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - /novenyek/:id
router.delete("/novenyek/:id", async (req, res) => {
  const novenyId = req.params.id;
  try {
    await DbRun("DELETE FROM Cars WHERE id = ?", [novenyId]);
    res.json({ message: "Sikeres törlés!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
