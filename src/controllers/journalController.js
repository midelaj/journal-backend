const journal = require("../models/journalModel");

const createJournal = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "user not found" });
    const jour = new journal({ ...req.body, userId });

    const newJournal = await jour.save();
    res.status(200).json({ status: "success", data: newJournal });
  } catch (error) {
    res.status(500).json({ error: `this is the error :${error}` });
  }
};

const updateJournal = async (req, res) => {
  try {
    const userId = req.user._id;
    const id = req.params.id;

    if (!id) return res.status(401).json({ message: "id not available" });

    const getJournal = await journal.findById(id);
    if (!getJournal)
      return res.status(401).json({ message: "Journal not available" });

    const upjournal = await journal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(upjournal);
  } catch (error) {
    res.status(500).json({ error: `this is the error :${error}` });
  }
};

const getAllJournal = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("userId:", userId);
    const allJournal = await journal.find({userId} );
    console.log("Journals:", allJournal);
    res.json(allJournal);
  } catch (error) {
    res.status(500).json({ error: `this is the error :${error}` });
  }
};

const updateAllJournal = async (req, res) => {
  try {
    const userId = req.user._id;
    const upJournal = req.body;
    if (!upJournal)
      return res.status(401).json({ message: "need fields to update" });

    const journals = await journal.updateMany({},{userId} , upJournal);
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ error: `this is the error :${error}` });
  }
};

const getJournal = async (req, res) => {
  try {
    const userId = req.user._id;
    const id = req.params.id;
    if (!id) return res.status(401).json({ message: "id not available" });

    const getJournal = await journal.findById({_id:id, userId});
    if (!getJournal)
      return res.status(401).json({ message: "Journal not available" });

    res.status(200).json(getJournal);
  } catch (error) {
    res.status(500).json({ error: `this is the error :${error}` });
  }
};

module.exports = {
  updateAllJournal,
  getAllJournal,
  createJournal,
  updateJournal,
  getJournal,
};
