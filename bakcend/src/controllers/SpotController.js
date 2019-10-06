const Spot = require('../models/Spot');
const User = require('../models/User');
const fs = require('fs');
const {
    promisify
} = require('util')

module.exports = {
    async index(req, res) {
        const {
            tech
        } = req.query;

        const spots = await Spot.find({
            techs: tech
        });

        return res.json(spots);
    },
    async store(req, res) {
        const {
            filename
        } = req.file;
        const {
            company,
            techs,
            price
        } = req.body;
        const {
            user_id
        } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({
                error: 'Usuário não existe'
            })
        }

        if ((await Spot.countDocuments({
                company
            })) < 1) {
            const spot = await Spot.create({
                user: user_id,
                thumbnail: filename,
                company,
                techs: techs.split(',').map(tech => tech.trim()),
                price
            })

            return res.json(spot);
        }

        const unlinkAsync = promisify(fs.unlink);

        await unlinkAsync(req.file.path);

        return res.status(400).json({
            error: 'Empresa já cadastrada'
        })
    }
};