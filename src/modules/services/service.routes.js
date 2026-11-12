const express=require('express')
const router=express.Router();


const {
    getServicedetail,
    getServices
}=require('./service.controller');

router.get('/',getServices);
router.get('/:slug',getServicedetail);

module.exports=router;