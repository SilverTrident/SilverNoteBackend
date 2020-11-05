const ModelTask = require('../model/ModelTask');
const {
    startOfDay, 
    endOfDay, 
    startOfWeek, 
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear, format
} = require('date-fns');

const current = new Date();


class ControllerTask {

    async created(req, res) {
        const task = new ModelTask(req.body);
        await task
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {
                return res.status(500).json(err);
            })
    }
    async update(req, res) {
        await ModelTask.findByIdAndUpdate(
            { '_id': req.params.id },
            req.body,
            { new: true })// new true returns the updated task
            .then(response => {
                return res.status(200).json(response);
            }
            ).catch(err => {
                return res.status(500).json(err);
            })

    }
    async listAll(req, res) {
        await ModelTask.find({
            macaddress: {
                '$in': req.params.macaddress
            }
        }).sort('when').//sort 'when' - organizes by date and time
            then(response => {
                return res.status(200).json(response);
            }
            ).catch(err => {
                return res.status(500).json(err);
            })
    }
    async listOne(req, res) {
        await ModelTask.findById(req.params.id).
            then(response => {
                if (response) {
                    console.log(format(new Date(response.when),'yyyy-LL-dd' ))
                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({ err: 'Tarefa não encontrada' });
                }


            }
            ).catch(err => {
                return res.status(500).json(err);
            })
    }
    async delete(req, res) {
        await ModelTask.deleteOne({ '_id': req.params.id }).
            then(response => {
                if (response) {
                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({ err: 'Tarefa não encontrada' });
                }
            }
            ).catch(err => {
                return res.status(500).json(err);
            })
    }
    async done(req, res) {
        await ModelTask.findByIdAndUpdate(
            { '_id': req.params.id },
            { 'done': req.params.done },
            { new: true }
        ).
            then(response => {
                return res.status(200).json(response);
            }
            ).catch(err => {
                return res.status(500).json(err);
            })
    }
    async listLate(req, res) {
        await ModelTask.find({
            'when': { '$lt': current },
            'macaddress': { '$in': req.params.macaddress }//filter macaddress
        }). //@lt - smaller than
            sort('when').
            then(response => {
                return res.status(200).json(response);
            }
            ).catch(err => {
                return res.status(500).json(err);
            });
    }
    async listToDay(req,res){
        await ModelTask.find({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfDay(current), '$lt' : endOfDay(current) }
        }). //$gte - greater than equals $lt - smaller than
        sort('when').
        then(response => {
            return res.status(200).json(response);
        }
        ).catch(err => {
            return res.status(500).json(err);
        });
    }
    async listWeek(req,res){
        await ModelTask.find({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfWeek(current), '$lt' : endOfWeek(current) }
        }). //$gte - greater than equals $lt - smaller than
        sort('when').
        then(response => {
            return res.status(200).json(response);
        }
        ).catch(err => {
            return res.status(500).json(err);
        });
    }
    async listMonth(req,res){
        await ModelTask.find({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfMonth(current), '$lt' : endOfMonth(current) }
        }). //$gte - greater than equals $lt - smaller than
        sort('when').
        then(response => {
            return res.status(200).json(response);
        }
        ).catch(err => {
            return res.status(500).json(err);
        });
    }
    async listYear(req,res){
        await ModelTask.find({
            'macaddress': { '$in': req.params.macaddress },
            'when': { '$gte': startOfYear(current), '$lt' : endOfYear(current) }
        }). //$gte - greater than equals $lt - smaller than
        sort('when').
        then(response => {
            return res.status(200).json(response);
        }
        ).catch(err => {
            return res.status(500).json(err);
        });
    }


}

module.exports = new ControllerTask();