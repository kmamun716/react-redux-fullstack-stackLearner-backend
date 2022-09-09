const Transaction = require("../model/Transaction");
const User = require("../model/User");
const { serverError } = require("../utils/error");

module.exports={
    getAllTransaction(req, res){
        Transaction.find({})
            .then(transactions=>{
                if(transactions.length === 0){
                    res.status(203).json({
                        message: 'No Transaction Found'
                    })
                }else{
                    res.status(200).json(transactions)
                }
            })
            .catch(err=> serverError(res, err))
    },
    getTransactionById(req, res){
        const _id = req.params.id;
        Transaction.findOne({id: _id})
            .then(transaction=>{
                if(!transaction){
                    res.status(203).json({
                        message: 'No Transaction Found'
                    })
                }else{
                    res.status(200).json(transaction)
                }
            })
            .catch(err=>serverError(res, err))
    },
    createTransaction(req, res){
        let {amount, type, note} = req.body;
        let userId = req.user._id;

        let transaction = new Transaction({
            amount, type, note, author: userId
        });

        transaction.save()
            .then(trans=>{
                let updatedUser = {...req.user._doc};
                if(type === "income"){
                    updatedUser.balance = updatedUser.balance + amount;
                    updatedUser.income = updatedUser.income + amount;
                }else if(type === "expense"){
                    updatedUser.balance = updatedUser.balance - amount;
                    updatedUser.expense = updatedUser.expense + amount;
                }
                updatedUser.transactions.unshift(trans._id)
                User.findByIdAndUpdate(updatedUser._id, {$set: updatedUser}, {new: true})
                    .then(result=>{
                        res.status(201).json({
                            message: 'Transaction Created Successfully',
                            ...trans._doc,
                            user: result
                        })
                    })
                    .catch(err=>serverError(res, err));               
            })
            .catch(err=> serverError(res, err))
    },
    updateTransaction(req, res){
        const id = req.params.id;
        Transaction.findByIdAndUpdate(id, {$set: req.body}, {new: true})
            .then(trans=>{
                res.status(200).json({
                    message: 'Updated Successfull',
                    ...trans
                })
            })
            .catch(err=>serverError(res, err))
    },
    deleteTransaction(req, res){
        const id = req.params.id;
        Transaction.findByIdAndDelete(id)
            .then(result=>{
                res.status(200).json({
                    message: 'Delete Successfully',
                    ...result
                })
            })
            .catch(err=>serverError(res, err))
    }
}