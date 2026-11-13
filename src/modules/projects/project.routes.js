const express=require("express");
const router=express.Router();
const {getProjects}=require('./project.controller')
router.get('/',getProjects)

module.exports=router;