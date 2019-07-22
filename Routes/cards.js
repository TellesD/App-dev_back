const express = require('express');
const router = express.Router();
const Cards = require('../model/cards');
const Styles = require('../model/style');
const Archs = require('../model/arch');

const config = require('../config/config');
//cards
router.post('/createCard', async (req, res) => {
    const { picture, photographer, description, size, arch, year, providers, style, subjects } = req.body;
    if (!picture || !photographer || !description) return res.status(400).send({ error: 'Dados insuficientes!' });
    if (!size || !arch || !year) return res.status(400).send({ error: 'Dados insuficientes!' });
    if (!style|| !providers|| !subjects) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        const card = await Cards.create(req.body);
        return res.status(201).send({card});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar projeto!' });
    }
});
router.get('/showCard', async (req, res) => {
    try {
        const cards = await Cards.find({});
        return res.send(cards);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});
//style
router.post('/createStyle', async (req, res) => {
    const {style} = req.body;
    
    if (!style) return res.status(400).send({ error: 'Dados insuficientes!' });
    

    try {
        const style = await Styles.create(req.body);
        return res.status(201).send({style});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar stylo!' });
    }
});

router.get('/showStyle', async (req, res) => {
    try {
        const style = await Styles.find({});
        return res.send(style);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de Stylos!' });
    }
});
//arch
router.post('/createArch', async (req, res) => {
    const {arch} = req.body;
    
    if (!arch) return res.status(400).send({ error: 'Dados insuficientes!' });
    

    try {
        const arch = await Archs.create(req.body);
        return res.status(201).send({arch});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar arch!' });
    }
});


router.get('/showArch', async (req, res) => {
    try {
        const arch = await Archs.find({});
        return res.send(arch);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de archs!' });
    }
});



module.exports = router;