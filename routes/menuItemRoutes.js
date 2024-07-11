const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/',async (req,res) => {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);



    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/',async(req,res) => {
    try{
        const data = await MenuItem.find();
        console.log('data fatched');
        res.status(200).json(data);


    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})

router.get('/:taste', async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const response = await MenuItem.find({work:taste});
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
        const MenuItemId = req.params.id;  // Extract The Id From URL Parameter
        const UpdatedMenuItemData = req.body;  // Updated Data From The Person

        const response = await MenuItem.findByIdAndUpdate(MenuItemId,UpdatedMenuItemData,{
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
        const MenuItemId = req.params.id;

        // Assuming you have a Person Model
        const response = await MenuItem.findByIdAndDelete(MenuItemId);
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