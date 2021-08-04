# HistFalk-Oral history archive

HistFalk-Oral history archive is a project in cooperation with [Francesca Falk](https://www.hist.unibe.ch/ueber_uns/personen/falk_francesca/index_ger.html). 
We are building a website for the publication of oral history recordings (sound and/or video).
This website is generated using Jekyll and inspired by [MailTape](https://www.mailta.pe/).

## Prerequisites

* Jekyll requires the following:
    * Ruby version 2.4.0 or higher
    * RubyGems
    * GCC and Make

Please reference [the Jekyll requirements](https://jekyllrb.com/docs/installation/#requirements) in the Jekyll docs
for more detailed instructions.

* You should have Node.js and NPM installed (NPM is installed automatically with latest versions of Node.js) which is
 needed for the backend. You can verify whether you have both by running `node -v` and `npm -v` in terminal
 or command prompt. If you don't have node.js installed please follow the instruction to [download](https://nodejs.org/en/download/)
the package.

## Installation

### Jekyll ([Jekyll Quickstart](https://jekyllrb.com/docs/))

After installing all the prerequisite. Install the jekyll and bundler gems in the root. 

`$ gem install jekyll bundler`  

If you get the following this error when installing the jekyll and bundler gems:

```shell
ERROR:  While executing gem ... (Gem::FilePermissionError) 
You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.
```

Solve using:

```shell
$ brew install chruby ruby-install 
$ ruby-install ruby-2.7.2
```

For Intel Macs

```shell
$ echo "source /usr/local/share/chruby/chruby.sh" >> ~/.zshrc
$ echo "source /usr/local/share/chruby/auto.sh" >> ~/.zshrc
$ echo "chruby ruby-2.7.2" >> ~/.zshrc
```

For futher information concerning this problem  please consult [this Guide](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/?utm_source=stackoverflow).
If you successfully installed jekyll you can run OH-Archive.

### NPM

In the root directory install all the needed modules using ``$ npm install``

## Usage

### Backend

Jekyll is a static Site-Generator, which means all the components must be added before building the site. Therefore it is
essential to run the backend module. For further information please reference the [documentation](doc/Documentation.md#Backend).
To run the backend module:

1. Change into backend directory: `$ cd OH-Archive/backend`
2. Produce the posts from Omeka API by running `$ node generate-md-files.js`

### Frontend

#### Desktop

1. Change into directory: `$ cd OH-Archive`
2. Build the site and make it available on a local server: `$ bundle exec jekyll serve`
3. Browse to <http://localhost:4000> (if localhost is not working for you try the link displayed under Server address in your terminal)

#### Mobile testing

1. Change into directory: `$ cd OH-Archive`
2. Build the site and make it available on a local server: `$ bundle exec jekyll serve --host 0.0.0.0`
3. On your mobile device browse to `http://<Local IP Address>:<port number>` (on Mac Os you will find your local IP Adress in System Preferences > Network)

We recommend using Mozilla Firefox for the best experience of this website. Other browsers may work as well. Note that this website isn't optimized for mobile view yet.

## Project structure

```
...
├── _layouts (Contains the different layouts, which are accessed via front matter)
│   ├── default (Used for 404.html and publication.html)
|   ├── homePage (Used for index.html)
|   └── post (Used for all the posts in _post)
├── _posts (Stores blog posts in markdown with the following format YEAR-MONTH-DAY-title.MARKUP)
|
├── _sass
|   ├── buttonStyles.scss (Styling sheet for all the buttons, especially the conditional button styling)
|   ├── postStyles.scss (Styling sheet for the post.html layout)
│   └── main.scss (Styling sheet for the project, contains generel styling)
├── assets (everything that is placed in this folder will be copied  across to the built site)
│   ├── css
|   |    └── styles.scss (imports styling sheets, namly main.scss, buttonsStyles.scss and postStyles.scss)
│   ├── images (contains the used images for the page)
│   └── js (contains the different scripts for the page)
|       ├── indexScript (runs on index.html)
|       └── postScript  (runs on posts)      
├── Backend
│   ├── Entry (Class, structures the JSON from OMEKA, is used by generate-md-files.js
│   │   and documentationScript.js)
│   └── generate-md-files (Module, gets Metadata via API from OMEKA, structures data and produces "post" form it as 
        markdown)
...
```

## Docker

To run the HistFalk-Oral history archive in a Docker container, build the Docker image (in a Unix system) as follows:  
From root directory of this project run in the terminal  

```shell
$ sudo docker build -t oh-archive .
```

If the image `oh-archive` appears in the list, shown with `sudo docker images`, you can run a container:

```shell
$ sudo docker run -p 4000:4000 --name oh-archive oh-archive
```

`-p` ist for port-forwarding - the Jekyll server runs on port 4000, so we forward this port to get access from outside the docker container.  
If the container should be removed as soon as it stops, add `-rm` after `run` (this won't harm the Docker image).  
If you want to run the container in detached mode, add `-d`. Like this, you won't see the output - it runs in background.  
`sudo` is needed, if you didn't activate rootless mode (<https://docs.docker.com/engine/security/rootless/>).  
You can check this with `docker images`.  

### If something changed in the application, you have to rebuild the image. 
1. Run ``$ sudo git pull`` in HistFalk-OralHistoryArchive directory.
2. Then run ``$ sudo docker ps -a`` and stop and remove the container which occupies the oh-archive IMAGE using 

```
$ sudo docker stop $containerID$
$ sudo docker rm $containerID$

```

3. Build the Docker image as described above. Currently options ``d and --rm`` are used.
``$ sudo docker run -p 4000:4000 -d --rm --name oh-archive oh-archive``

Note: If something in the project structure changed, maybe you have to adjust the Dockerfile too.

## Documentation

[Here](doc) you will find additional information regarding the project.
