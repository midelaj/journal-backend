const TradeJournal = require("../models/tradejournal.model");

const createTradeJournal = async (req, res) => {
  try {

    const { symbol, tradeType, entryPrice, quantity, ...customFeilds } =
      req.body;
    const traderJournal = new TradeJournal({
        symbol,
        tradeType,
        entryPrice,
        quantity,
        ...customFeilds
    })

    if(!symbol || !tradeType || !entryPrice || !quantity){
      res.status(400).json({error:"Missing required feilds"});
    }

    await traderJournal.save();

    res.status(201).json({message:"Trade journal created successfully", traderJournal})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTradeJournals = async(req, res) =>{
  try {
    
    const tradeJournals = await TradeJournal.find();
    if(!tradeJournals) return res.status(400).json({error:"Trader Journal is empty"});

    res.status(201).json({message:"Fetch data successfully",tradeJournals})

  } catch (error) {
  res.status(500).json({error: error.message}); 
  }
}

const getTradeJournal = async(req, res) =>{
  try {
    
    const tradeJournal = await TradeJournal.findById(req.params.id)
    
    if(!tradeJournal) return res.status(404).json({error:"There is no trading journal"});

    res.status(201).json({message:"Fetch data successfully",tradeJournal})

  } catch (error) {
  res.status(500).json({error: error.message}); 
  }
}

const deleteTradeJournal = async(req, res) =>{
  try {
    
    const tradeJournal = await TradeJournal.findByIdAndDelete(req.params.id)
    if(!tradeJournal) return res.status(404).json({error:"There is no trading journal"});

    res.status(201).json({message:"Trader journal deleted successfully",tradeJournal})

  } catch (error) {
  res.status(500).json({error: error.message}); 
  }
}

const updateTradeJournal = async(req, res) =>{
  try {

    const tradeJournal = await TradeJournal.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!tradeJournal) return res.status(404).json({error:"There is no trading journal"});

    res.status(201).json({message:"Update trade journal successfully",tradeJournal})

  } catch (error) {
  res.status(500).json({error: error.message}); 
  }
}

module.exports = {createTradeJournal, getAllTradeJournals, getTradeJournal, updateTradeJournal, deleteTradeJournal}