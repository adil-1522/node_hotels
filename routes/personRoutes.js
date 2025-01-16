const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async(req,res)=>{

    try{
      const data = req.body 
  
    const newPerson = new Person(data);
  
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);
    }
  
  catch(err){
          console.log(err);
          res.status(500).json({error: 'Internet server error'});
    }
   
  
  })

  router.get('/', async (req,res)=>{
    try{
      const data =  await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server Error'});
  
    }
  })

  router.get('/:workType', async(req,res)=>{
    try{
      const workType = req.params.workType;
      if(workType== 'chef'|| workType == 'manager'|| workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else{
        res.status.apply(404).json({error: 'Invalid work type'});
      }
  
    }catch{
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
  
    }
  })

  router.put('/:id', async(req,res)=>{
    try{
    const personId = req.params.id;
    const updatedPersondata = req.body;

    const response = await Person.findByIdAndUpdate(personId,updatedPersondata,{
      new: true,
      runValidators:true,
    })

    if(!response){
      return res.status(404).json({error:'Person Not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server error'});


  }
  })

  router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
          return res.status(404).json({error:'Person Not Found'});
        }
        console.log('data delete');
        res.status(500).json({message:'data delete successfully'});
    }
    catch(err){

    console.log(err);
    res.status(200).json({error:'Internal Server Error'});

    }
  })




// comment added for testing purposes
  module.exports = router;