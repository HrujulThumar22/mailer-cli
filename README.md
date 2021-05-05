# mailer-cli

A command line interface to send mail without any hassle.

### Usage Instructions

- Install the CLI
- Give Permission to acces your Gmail Account ([Google Permission](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Od6qJ0Xaz4XjAsWRINufSaxSeH4s4WT-oIsp4r0NUvlGhnUgDwBkcAdLLuTQ7Hwpcvm7Gpi8h4wv9ZPnZq1BaJtduyDA))
- Initialise the Mailer
- Send Mail, without any Hassel.

# Installation

Manually Install mailer from this package

```bash
$ git clone https://github.com/HrujulThumar22/mailer-cli.git

$ cd mailer-cli/

$ npm install -g
```

Check Installation by running

```bash
$ mailer --version
or
$ mailer -v
```

![Version](/images/version.png)

# Usage

To See the Various Options

```bash
$ mailer --help
or
$ mailer -h
```

![Help](/images/help.png)

---

## Initialise the Mailer

```bash
$ mailer init
or
$ mailer i
```

![Init](/images/init.png)
Eg:-  
![Init](/images/init.gif)

---

## Sending Mail

To Get the available options

```bash
$ mailer send --help
or
$ mailer send -h
```

![send Help](/images/sendhelp.png)

### Various Options of sending Mail

Mail can be send with a combination of any of the following options:

- With Attachment

```bash
$ mailer send -a
or
$ mailer send --attachment
```

![attachment img](/images/attachment.png)
Eg:-  
![attachment GIF](/images/attachment.gif)

- With CC

```bash
$ mailer send -cc
or
$ mailer send --carbonCopy
```

![attachment img](/images/cc.png)
Eg:-  
![attachment GIF](/images/cc.gif)

- With BCC

```bash
$ mailer send -bcc
or
$ mailer send --blindCarbonCopy
```

![attachment img](/images/bcc.png)
Eg:-  
![attachment GIF](/images/bcc.gif)

# Future Release :

Coming up with a CLI having **OAuth Authentication** rather than **allowing Less Secure Apps**.

# Bugs :

Feel Free to open an Issue.
