const express = require('express');
const router = express.Router();
const Cards = require('../model/cards');
const Tags = require('../model/tags');
const Archs = require('../model/arch');
const Materials = require('../model/materials');
const Day= require('../model/day');
const User= require('../model/user')
const config = require('../config/config');

//favoritos
const fav= (cardId ,id) => {
    User.findById(id, function(err, user) {

          user.like_id.push(cardId);
        
          user.save((err) => {
        
            return;
        
        });
         
      
     
    })
    
}

const desfav= (cardId ,  id) => {
    User.findById(id, function(err, user) {
        
        var index = user.like_id.indexOf(cardId);

        user.like_id.splice(index);
        
        user.save((err) => {
               
              return 
           
        });

         
         
      
    });
    
}


router.get('/showFavCard', async (req, res) => {
    const {user_id}= req.headers;
    let cards = [];
    const user = await User.findById(user_id);
    try {
        console.log(user.like_id);
        cards = await Cards.find( { _id : { $in : user.like_id } } );
        console.log(cards);
        return res.send(cards);
    }  
    catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
   

});


//cards
router.post('/createCard', async (req, res) => {
    const { picture, photographer, description, size, arch, year, providers, style, subjects, like,status  } = req.body;
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
    const {user_id}= req.headers;

    const user = await User.findById(user_id);
    console.log(user);
    const cardsNotLike = await Cards.find({ _id: { $nin: user.like_id } })
    const cardsLike = await Cards.find({ _id: { $in: user.like_id } })
    cardsLike.forEach((card) => {
        card.status = 'like';
    });

    const cards = cardsNotLike.concat(cardsLike); 
   
    return res.send(cards);  

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
    const {user_id}= req.headers;
    
    if (!user_id) return res.status(400).send( { error: 'Dados insuficientes!' }); 
    
    Cards.findById(id, function(err, cards) {
          try{
            console.log(cards)
              cards.like++;
              
              cards.save((err) => {
                if(err) {
                    Console.log(id);
                  return res.status(400);
                } else {
                         console.log(user_id);   
                    return res.status(200).send( fav(id, user_id));
                }
            });
           
        }
          catch(err){
              return res.status(400);
          }
      })
      
})

router.put('/unlikecard/:id', async (req, res) =>{
    const id = req.params.id;
    const {user_id}= req.headers;
    
      Cards.findById(id, function(err, cards) {
          try{
            console.log(cards)
              cards.like-- ; 
              cards.save((err) => {
                if(err) {
                    Console.log(id);
                  return res.status(400);
                } else {
                         console.log(user_id);   
                    return res.status(200).send(desfav(id, user_id));
                }
            });
           
        }
          catch(err){
              return res.status(400);
          }
      })

})

//day
router.put('/createDay', async (req, res) => {
    const { picture, photographer, description, size, arch, year, providers, style, subjects,textW, like, status } = req.body;
// if (picture || photographer || description) return res.status(400).send({ error: 'Dados insuficientes!' });
// if (size || arch || year) return res.status(400).send({ error: 'Dados insuficientes!'});
//if (style|| providers|| subjects) return res.status(400).send({ error:'Dados insuficientes!'});

    try {
        const day = await Day.update(req.body);                                                         
        return res.status(201).send({day});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar projeto!' });
    }
});

router.get('/showDay', async (req, res) => {
    try {
        const day = await Day.find({});
        return res.send(day);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});




module.exports = router;