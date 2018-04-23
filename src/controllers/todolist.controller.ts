import { Router, Request, Response, NextFunction } from "express";

const todolist = require("../models/todolist.model");

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

export let getAllTasksList = (req: Request, res: Response) => {
    /* res.send("Hello, World!"); */
    todolist.getAllTasksList((err: any, lists: any) => {
        res.header("Access-Control-Allow-Origin", "*");
        if (err) {
            res.json({success: false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists: lists}, undefined, 2));
            res.end();
    }
    });
  };


// POST HTTP method to /bucketlist
export let addTask = (req: Request, res: Response, next: NextFunction) => {

    const newList = new todolist({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority
    });
    todolist.addTask(newList, (err: any , list: any) => {
       /*  res.header("Access-Control-Allow-Origin", "*"); */
        if (err) {
            res.json({success: false, message: `Failed to create a new task. Error: ${err}`});
        }
        else {
            res.json({success: true, message: "Todo task added successfully."});
        }
    });
};

// DELETE HTTP method to /todolist. Here, we pass in a param which is the object id.

export let deleteTaskById = (req: Request, res: Response, next: NextFunction) => {
  // access the parameter which is the id of the item to be deleted
    const id = req.params.id;
  // Call the model method deleteListById
  todolist.deleteTaskById(id, (err: any, list: any) => {
    /*  res.header("Access-Control-Allow-Origin", "*"); */
        if (err) {
            res.json({success: false, message: `Failed to delete the task. Error: ${err}`});
        }
        else if (list) {
            res.json({success: true, message: "Task deleted successfully"});
        }
        else
            res.json({success: false});
        });
    };

router.get("/", (req: Request, res: Response) => {
    todolist.getAllLists((err: any, lists: any) => {
        if (err) {
            res.json({success: false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists: lists}, undefined, 2));
            res.end();
    }
    });
});

/*router.get('/:name', (req: Request, res: Response) => {
    let { name } = req.params;

    res.send(`Hello, ${name}!`);
});*/

export const TodolistController: Router = router;

/*

//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const todolist = require('../models/todolist.model');

//GET HTTP method to /bucketlist
//router.get('/',(req,res) => {
 //   res.send("THIS IS A GET REQUEST");
//});


//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    todolist.getAllLists((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();
    }
    });
});

//POST HTTP method to /bucketlist

//router.post('/', (req,res,next) => {
  //  res.send("THIS IS A POST REQUEST");

//});


//DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
//router.delete('/:id', (req,res,next)=> {
  //  res.send("DELETE");

//})

//POST HTTP method to /bucketlist

router.post('/', (req,res,next) => {
    let newList = new todolist({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority
    });
    todolist.addList(newList,(err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new task. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Todo task added successfully."});

    });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a param which is the object id.
deleteTaskById
router.delete('/:id', (req,res,next)=> {
  //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
  //Call the model method deleteListById
  todolist.deleteListById(id,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the task. Error: ${err}`});
        }
        else if(list) {
            res.json({success:true, message: "Task deleted successfully"});
        }
        else
            res.json({success:false});
    })
});

module.exports = router;    */


