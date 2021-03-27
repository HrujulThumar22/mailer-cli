#!/usr/bin/env node

const program=require('commander');
const pkg = require('../package.json');
const chalk=require('chalk');
const boxen=require('boxen');
const ora=require('ora');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
const align=require('wide-align');
const inquirer=require('inquirer');
const open=require('open');

const Red = msg => chalk`{bold.hex('#f00b47') ${msg}}`;

program.version(
  chalk.hex('#0069b9').bold('Mail')+chalk.hex('#f00b47').bold('Er')+ ` version : ${pkg.version}`,
  '-v, --version'
);


program
  .option('-i,--init',"Initialise with your email")
  .option('-s, --send',"To send the email after entering the details");




var transporter="";
// var mailOptions = {
//   to: '18BCE077@nirmauni.ac.in',
//   subject: 'Test',
//   text: `Test`
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

program.parse(process.argv);

const options=program.opts();
if(options.init)
{
  var lessSecureQuestion=[{
    type: 'list',
    message: 'Have you Enable Less Secure Apps for your Account?',
    name: 'choice',
    choices: ['Yes', 'No', 'I dont Know']
  }];
  inquirer.prompt(lessSecureQuestion).then(answers => {
    if(`${answers['choice']}`=="Yes")
    {
      var questions = [
        {
          type: 'input',
          name: 'email',
          message: "What's your Email?",
          validate: function(email)
          {
              // Regex mail check (return true if valid mail)
              var valid=/^[\w.+\-]+@gmail\.com$/.test(email);
              if(!valid)
              {
                console.log(chalk.red.bold(' Kindly enter valid Email')); 
                return false;
              }
              else return true;
          }
        },
        {
          type: 'password',
          name: 'pass',
          message: "What's your Password?",
          validate: function(pass)
          {
              // Regex mail check (return true if valid mail)
              var valid=/\w/.test(pass);
              if(!valid)
              {
                console.log(chalk.red.bold(' Kindly enter valid Password')); 
                return false;
              }
              else return true;
          }
        }
      ];
      inquirer.prompt(questions).then(answers => {
        const spinner=ora('Loading').start();
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${answers['email']}`,
            pass: `${answers['pass']}`
          }
        })
        const boxenOptions = {
          padding: 1,
          borderStyle: "round",
          borderColor: "green",
          backgroundColor: "#444",
          float:"center"
         };
         const initBox = boxen( 'Hi '+ chalk.hex('#0069b9').bold(`${answers['email']}!`) + '\nYour ' + chalk.hex('#0069b9').bold('Mail')+chalk.hex('#f00b47').bold('Er')+ ' is Initialised', boxenOptions );
         setTimeout(() => {
          spinner.succeed('You are God to go');
          console.log(align.center(initBox));
        }, 5000);
      });
    }
    else{
      console.log(chalk.red.bold('Please Enable the Less Secure Apps option(in you account)')+ chalk.hex('#0069b9')(' in order to Use this app'));
      console.log('Open the website to enable it : https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Od6qJ0Xaz4XjAsWRINufSaxSeH4s4WT-oIsp4r0NUvlGhnUgDwBkcAdLLuTQ7Hwpcvm7Gpi8h4wv9ZPnZq1BaJtduyDA');
    }
  });
}