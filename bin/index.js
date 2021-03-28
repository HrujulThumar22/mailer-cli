#!/usr/bin/env node

require = require("esm")(module/*, options*/)
module.exports = require("./transporter.js")
const program=require('commander');
const pkg = require('../package.json');
const chalk=require('chalk');
const boxen=require('boxen');
const ora=require('ora');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
const align=require('wide-align');
const inquirer=require('inquirer');
const fs=require('fs');

var {init}=module.exports;

const Red = msg => chalk`{bold.hex('#f00b47') ${msg}}`;

program.version(
  chalk.hex('#0069b9').bold('Mail')+chalk.hex('#f00b47').bold('Er')+ ` version : ${pkg.version}`,
  '-v, --version'
);


program
  .option('-i, --init',"Initialise with your email")
  .option('-s, --send',"To send the email after entering the details");

program.parse(process.argv);

const options=program.opts();
if(options.init)
{
  init();
}