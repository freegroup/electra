#!/usr/bin/env node
const github = require('./utils/github')
const bcrypt = require("bcrypt")

function asyncCall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(5)
      }, 2000)
    });
  }
  
 value =  (async function() {
    return await asyncCall();
  })()

console.log("33:",value)

let hash = (async ()=> await bcrypt.hash("blah", 10))()
console.log(hash)

/*
let fromFiles = "data/circuit/digital333"
let toFiles = "data/circuit/digital3"
    
github.deleteDirectory( fromFiles, "blah")
*/