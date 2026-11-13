const express=require("express");
const router=express.Router();
const quoteController=require('./quotes.controller')
router.post("/", quoteController.createQuote);

module.exports=router