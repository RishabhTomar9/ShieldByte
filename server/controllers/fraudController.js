const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  try {
    const { senderName, senderPhone, receiverName, receiverPhone, amount, isFraud } = req.body;

    const transaction = new Transaction({
      senderName,
      senderPhone,
      receiverName,
      receiverPhone,
      amount,
      isFraud
    });

    await transaction.save();

    res.status(201).json({ message: 'Transaction added', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
