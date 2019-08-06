const express = require('express');
const router = express.Router();
const Cards = require('../model/cards');
const Tags = require('../model/tags');
const Archs = require('../model/arch');
const Materials = require('../model/materials');

const config = require('../config/config');
//cards
router.post('/createCard', async (req, res) => {
    const { picture, photographer, description, size, arch, year, providers, style, subjects, like } = req.body;
   // if (picture || photographer || description) return res.status(400).send({ error: 'Dados insuficientes!' });
   // if (size || arch || year) return res.status(400).send({ error: 'Dados insuficientes!' });
    //if (style|| providers|| subjects) return res.status(400).send({ error: 'Dados insuficientes!' });

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
router.post('/createTag', async (req, res) => {
    const {tag} = req.body;
    
    if (!tag) return res.status(400).send({ error: 'Dados insuficientes!' });
    

    try {
        const tag = await Tags.create(req.body);
        return res.status(201).send({tag});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar tag!' });
    }
});

router.get('/showTags', async (req, res) => {
    try {
        const tag = await Tags.find({});
        return res.send(tag);
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
//materials
router.post('/createMaterial', async (req, res) => {
    const {material} = req.body;
    
    if (!material) return res.status(400).send({ error: 'Dados insuficientes!' });
    

    try {
        const material = await Materials.create(req.body);
        return res.status(201).send({material});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar arch!' });
    }
});


router.get('/showMaterials', async (req, res) => {
    try {
        const material = await Materials.find({});
        return res.send(material);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de archs!' });
    }
});
//like
router.put('/likecard/:id', async (req, res) =>{
    const id = req.params.id;
    
      Cards.findById(id, function(err, cards) {
          try{
            console.log(cards)
              cards.like++;
              cards.save((err) => {
                if(err) {
                    Console.log(id);
                  return res.status(400);
                } else {
                    return res.status(200).send({cards});
                }
            });
           
        }
          catch(err){
              return res.status(400);
          }
      })
      
})



module.exports = router;