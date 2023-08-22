//async handler is used to handle error instead of try and catch block it will automatically do all that stuff
const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");
// @desc get all contact
// @routes GET /api/contacts
// @access public

const getContacts = asyncHandler(async (req,res)=>{
    const contacts= await Contact.find();
    res.status(200).json(contacts);
});

// @desc create anew  contact
// @routes POST /api/contacts
// @access public

const createContact = asyncHandler(async (req,res)=>{
    const {name,email,phone} = req.body;

    if(!name || !email || !phone){
        res.status(404);
        throw new Error('All Fields are mandatory');
    }
        const contact = await Contact.create({name:name,email:email,phone:phone})
        console.log(name, email, phone);
        res.status(201).json(contact);
});

// @desc get a contact
// @routes get /api/contacts:id
// @access public

const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('contact now found');
    }
    res.status(200).json(contact);
})

// @desc update a contact 
// @routes put /api/contacts:id
// @access public

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('contact now found');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact);
})

// @desc delete a contact 
// @routes delete /api/contacts:id
// @access public

const deleteContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('contact now found');
    }
    
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(contact);
})

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact
};