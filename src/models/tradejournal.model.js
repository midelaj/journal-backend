const mongoose = require("mongoose");

const tradeJournalSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    tradeType: { type: String, enum: ["Buy", "Sell"], required: true },
    entryPrice: { type: Number,  required: true },
    quantity: { type: Number, required: true },
  },
  { strict: false, timestamps: true }
);

const TradeJournal = mongoose.model('TradeJournal', tradeJournalSchema);

module.exports = TradeJournal;