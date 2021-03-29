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
        prefix: chalk.green('@'),
        message: "Type the receivers Email : ",
        validate: function(email)
        {
          // Regex mail check (return true if valid mail)
          var valid=/^[A-Za-z0-9_.-]+@[A-Za-z0-9-.]+[A-Za-z0-9-]\.[A-Za-z]+/.test(email);
          
          if(!valid)
          {
            console.log(chalk.red.bold(' Kindly enter valid Email')); 
            return false;
          }
          else return true;
        }
      },
      {
        type:'input',
        name:'subject',
        prefix: chalk.green('>'),
        message:'Type the Subject : ',
        validate:function(subject)
        {
          // Regex mail check (return true if valid mail)
          var valid=/^[\w]/.test(subject);
          if(!valid)
          {
            console.log(chalk.red.bold(' Kindly enter valid Subject')); 
            return false;
          }
          else return true;
        }
      },
      {
        type:'editor',
        name:'text',
        prefix: chalk.green('>>'),
        message:'Type the text in the editor and save it : \n',
        validate:function(text)
        {
          // Regex mail check (return true if valid mail)
          var valid=/^[\w]/.test(text);
          if(!valid)
          {
            console.log(chalk.red.bold(' Kindly enter valid Text')); 
            return false;
          }
          else return true;
        }
      }
      ];

      if(options.carbonCopy)
      {
        questions.push({
          type:'input',
          name:'cc',
          prefix: chalk.green('@'),
          message:'Enter CC email Address : ',
          validate: function(email)
          {
            // Regex mail check (return true if valid mail)
            var valid=/^[A-Za-z0-9_.-]+@[A-Za-z0-9-.]+[A-Za-z0-9-]\.[A-Za-z]+/.test(email);
            
            if(!valid)
            {
              console.log(chalk.red.bold(' Kindly enter valid CC Email')); 
              return false;
            }
            else return true;
          }
        });
      }

      if(options.blankCarbonCopy)
      {
        questions.push({
          type:'input',
          name:'bcc',
          prefix: chalk.green('@'),
          message:'Enter BCC email Address : ',
          validate: function(email)
          {
            // Regex mail check (return true if valid mail)
            var valid=/^[A-Za-z0-9_.-]+@[A-Za-z0-9-.]+[A-Za-z0-9-]\.[A-Za-z]+/.test(email);
            
            if(!valid)
            {
              console.log(chalk.red.bold(' Kindly enter valid BCC Email')); 
              return false;
            }
            else return true;
          }
        });
      }

      if(options.attachment)
      {
        questions.push({
          type:'input',
          name:'file',
          prefix: chalk.green('$'),
          message:'Enter Path/link for file Attachment : ',
          validate: function(email)
          {
            // Regex mail check (return true if valid mail)
            var valid=true;
            
            if(!valid)
            {
              console.log(chalk.red.bold(' Kindly enter valid Path')); 
              return false;
            }
            else return true;
          }
        });
      }

        await inquirer.prompt(questions).then(answers=>{
        mailOptions['to']=`${answers['email']}`;
        mailOptions['subject']=`${answers['subject']}`;
        mailOptions['text']=`${answers['text']}`;
        if(options.carbonCopy) mailOptions['cc']=`${answers['cc']}`;
        if(options.blankCarbonCopy) mailOptions['bcc']=`${answers['bcc']}`;
        if(options.attachment) mailOptions['attachments']=[{'path':`${answers['file']}`}];
      });
      var spinner=ora('Creating Your Mail').start();
      setTimeout(()=>{
        spinner.succeed("Mail Created");
        const boxenOptions = {
          padding: 1,
          borderStyle: "round",
          borderColor: "green",
          backgroundColor: "#444",
          float:"center"
        };
      var optString=chalk.green.bold('Your Mail Details\n');
      for(var key in mailOptions){
        if (mailOptions.hasOwnProperty(key)) {
          var val = mailOptions[key];
          optString+=chalk.hex('#0069b9').bold(`${key} : `)+ chalk.red(`${val}\n`);
        }
      }
      const mailBox = boxen( optString, boxenOptions );
      console.log(align.center(mailBox));
      const confirmQuestion=[{
        type:'list',
        message:'Send this Mail?',
        name:'confirm',
        choices:['Yes','No']
      }];
      inquirer.prompt(confirmQuestion).then(answers => {
        if(`${answers['confirm']}`=="Yes"){
          spinner=ora('Sending your mail').start();
          setTimeout(()=>{
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                spinner.fail('unable to send the Mail');
                console.log(chalk.red(error));
                console.log(chalk.green.bold(' Try reinitialising the Mailer')+' by typing '+chalk.hex('#0069b9').bold('mailer init')+' Command');
                process.exit(1);
              } else {
                spinner.succeed('Mail Sent');
                console.log('Email sent: ' + info.response);
                process.exit(1);
              }
            });
          },5000);
      }
      else{
        spinner.warn('Not Sending the Mail');
        process.exit(1);
      }
      })
    },5000); 
    } catch (error) {
      spinner.stop();
      console.log(error)
      process.exit(1);
    }
  });

program.parse(process.argv);
