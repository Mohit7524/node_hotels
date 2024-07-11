const express = require('express');
const router = express.Router();
const Person = require('./../models/Person'); // Corrected import path to person.js

// Post Method for Person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Router get method for person
router.get('/', async (req,res) => {
    try{

        const data = await Person.find();
        console.log('data fatched');
        res.status(200).json(data);

    } catch(err){

        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})


// Parametrized URL

router.get('/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Internal Server Error'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    } 
})

router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;  // Extract The Id From URL Parameter
        const updatedPersonData = req.body;  // Updated Data From The Person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new : true,    // Return The Updated Dacument
            runValidators : true,  // Run Moongose Validation
        })
        console.log('Data Updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

router.delete('/:id', async(req,res) =>{
    try{  
        const personId = req.params.id;

        // Assuming you have a Person Model
        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            return res.status(404).json({ error: 'Person not found'});
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

module.exports = router;