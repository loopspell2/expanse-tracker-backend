
const Expense = require('../models/Expense')

exports.addExpense = async (req, res) => {

    try {
        const user = req.user.id;
        const { amount, description, category } = req.body;

        const expense = new Expense({
            user,
            amount,
            description,
            category
        });

        await expense.save();

        return res.status(201).json(expense);

    } catch (err) {
        return res.status(400).json({error : err.massage});
    }

}

exports.getExpense = async (req, res) => {

    try {
        const { filter } = req.query;
        let dateFilter = {};

        const now = new Date();

        switch(filter){
            case 'week':
                dateFilter = { date : {$gte :  new Date(now - 7 * 24 * 60 * 60 * 1000)}};
                break;
            case 'month':
                dateFilter = { date : {$gte : new Date(now.getFullYear(), now.getMonth(), 1)}};
                break;
            case "3months":
                dateFilter = { date : {$gte : new Date(now.getFullYear(), now.getMonth() - 3, 1)}};
                break;
            case 'custom':
                if(req.query.start && req.query.end){
                    dateFilter = { date : {$gte : new Date(req.query.start), $lte : new Date(req.query.end)}};
                }
                break;

        }
        const expenses = await Expense.find({ user: req.user.id, ...dateFilter });
        return res.status(200).json(expenses);
    } catch (err) {
        return res.status(400).json({error : err.massage});
    }

}

exports.updateExpense = async (req, res) => {
    try{
        console.log(req.params.id);

        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}

        );

        if(!expense){
            return res.status(404).json({error : 'Expense not found'});
        }

        return res.status(200).json({success : 'Expense updated successfully'});

    }catch(err){
        return res.status(400).json({error : err.massage});
    }
}

exports.deleteExpense = async (req, res) => {
    
    try{
        const done = await Expense.findByIdAndDelete(req.params.id);

        if(!done){
            return res.status(404).json({error : 'Expense not found'});
        }

        return res.status(200).json({success : 'Expense deleted successfully'});

    }catch(err){
        return res.status(400).json({error : err.massage});
    }
}