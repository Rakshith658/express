const express = require('express');
const uuid = require('uuid');
const member = require('../../Members');
const router =express.Router();
 // init midleware
//router.use(logger);

 router.get('/',(req,res)=>{
     res.json(member);
 })

 // geting single attibute

 router.get('/:id',(req,res)=>{
     const found = member.some(member =>member.id === parseInt(req.params.id));
     if(found){
        res.json(member.filter(member =>member.id === parseInt(req.params.id)))
     }else(
         res.status(400).json({" msg ":` member is not found with ID  ${req.params.id}`})
     )
 })

 router.post('/',(req ,res)=>{
     const newMember = {
         id : uuid.v4(),
         name :req.body.name,
         age : req.body.age,
         combination:"BCA"
     }
     if (!newMember.name && !newMember.age){
         return res.status(400).json({msg:'please insert name and age'})
     }
     member.push(newMember)

     res.json(member)
  })
 // updateing members
  
 router.put('/:id',(req,res)=>{
    const found = member.some(member =>member.id === parseInt(req.params.id));
    if(found){
        const updmember=req.body;
        member.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updmember.name ?updmember.name:member.name
                member.age=updmember.age?updmember.age:member.age
                res.json({msg:"member upd",member})
            }
        })
    }else(
        res.status(400).json({" msg ":` member is not found with ID  ${req.params.id}`})
    )
})

router.delete('/:id',(req,res)=>{
    const found = member.some(member =>member.id === parseInt(req.params.id));
    if(found){
        res.json({
        msg:"member deleted",
       member: member.filter(member =>member.id !== parseInt(req.params.id))
    });
    }else(
        res.status(400).json({" msg ":` member is not found with ID  ${req.params.id}`})
    )
})

 module.exports = router;
