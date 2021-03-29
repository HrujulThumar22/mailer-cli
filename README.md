# mailer-cli

A command line interface to send mail without any hassle.

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

To use this

```bash
$ mailer --help
or
$ mailer -h
```

![Help](/images/help.png)

---

## Initialise the Mailer

```bash
$ mailer inti
or
$ mailer i
```

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
