const express = require('express');
const router = express.Router();
const MenuItem =  require('./../models/menu');

router.get('/', async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);

    }
    catch{
        console.log(err);
        res.status(500).json({error:'Internal Server error'});

    }
})

router.post('/', async(req,res)=>{
    const data = req.body

    const newMenuItem = new MenuItem(data);
    try{
    const response = await newMenuItem.save();
    console.lof('data saved');
    res.status(200).json(response);
    }catch{
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

})