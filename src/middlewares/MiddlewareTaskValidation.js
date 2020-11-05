const { isPast } = require('date-fns');
const { id } = require('date-fns/locale');
const ModelTask = require('../model/ModelTask');

const MiddlewareTaskValidation = async (req, res, next) => {

    const {
        macaddress,
        type,
        title,
        description,
        when
    } = req.body;

    if (!macaddress) {
        return res.status(400).json({ err: 'macaddress é obrigatorio' });
    } else if (!type) {

    } else if (!title) {
        return res.status(400).json({ err: 'título é obrigatorio' });
    } else if (!description) {
        return res.status(400).json({ err: 'descrição é obrigatoria' });
    } else if (!when) {
        return res.status(400).json({ err: 'data é obrigatoria' });
    } else if (isPast(new Date(when))) {
        return res.status(400).json({ err: 'data não pode ser no passsado' });
    }
    else {
        let exists;

        if (req.params.id) {
            exists = await ModelTask.findOne(
                {
                    '_id': { $ne: req.params.id },//$ne ignore this 
                    'when': { $eq: new Date(when) }, //$eq  equals 
                    macaddress: { '$in': macaddress }//$in contained
                });

        } else {
            exists = await ModelTask.findOne(
                {
                    'when': { $eq: new Date(when) },
                    macaddress: { '$in': macaddress }
                });
        }

        if (exists) {
            return res.status(400).json({ err: 'Já existe uma tarefa na mesma data e horário' });
        } else {
            next();
        }

    }
}

module.exports = MiddlewareTaskValidation;