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
const { defaultMaxListeners } = require("events");

var {init}=module.exports;

const Red = msg => chalk`{bold.hex('#f00b47') ${msg}}`;

program.version(
  chalk.hex('#0069b9').bold('Mail')+chalk.hex('#f00b47').bold('Er')+ ` version : ${pkg.version}`,
  '-v, --version'
);


program
  .command('init')
  .alias('initialise')
  .description("Initialise with your email")
  .action(()=>{
    init();
  });

program
  .command('send')
  .alias('send-mail')
  .description('Send Mail with multiple options')
  .option('-a, --attachment',"To send the email with attachment")
  .option('-cc, --carbonCopy',"To send the email with a CC Field")
  .option('-bcc, --blankCarbonCopy',"To send email with a BCC field")
  .action(async (options) => {
    try {
      const details=(JSON.parse(fs.readFileSync('F:/mailer-cli/bin/data/details.JSON')));
      if(details.email=="" || details.password=="")
      {
        console.log(chalk.red.bold(' Kindly Initialise the Mailer')+' by typing '+chalk.hex('#0069b9').bold('mailer init')+' Command');
        process.exit(1);
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: details.email,
          pass: details.password
        }
      });
      var mailOptions = {"from": details.email};
      var questions=[{
        type: 'input',
        name: 'email',
        message: "Type the receivers Email",
        validate: function(email)
        {
          // Regex mail check (return true if valid mail)
          var valid=/^[\w.+\-]+@gmail\.com$/.test(email);
          
          if(!valid)
          {
            console.log(chalk.red.bold(' Kindly enter valid Password')); 
            return false;
          }
          else return true;
        }
      },
      {
        type:'input',
        name:'subject',
        message:'Type the Subject',
        validate:function(subject)
        {
          // Regex mail check (return true if valid mail)
          var valid=/^[\w]/.test(subject);
          if(!valid)
          {
            console.log(chalk.red.bold(' Kindly enter valid Password')); 
            return false;
          }
          else return true;
        }
      },
      {
        type:'input',
        name:'text',
        message:'Type the text',
        validate:function(text)
        {
          // Regex mail check (return true if valid mail)
          var valid=/^[\w]/.test(text);
          if(!valid)
          {
            console.log(chalk.red.bold(' Kindly enter valid Password')); 
            return false;
          }
          else return true;
        }
      }
      ];
        await inquirer.prompt(questions).then(answers=>{
        mailOptions['to']=`${answers['email']}`;
        mailOptions['subject']=`${answers['subject']}`;
        mailOptions['text']=`${answers['text']}`;
      });
      console.log(mailOptions);
      const spinner=ora('Loading').start();
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          spinner.fail('unable to send the Mail');
          console.log(chalk.red(error.response));
          console.log(chalk.green.bold(' Try reinitialising the Mailer')+' by typing '+chalk.hex('#0069b9').bold('mailer init')+' Command');
          process.exit(1);
        } else {
          spinner.succeed('Mail Sent');
          console.log('Email sent: ' + info.response);
        }
      }); 
    } catch (error) {
      spinner.stop();
      console.log(error)
      process.exit(1);
    }
  });

program.parse(process.argv);
