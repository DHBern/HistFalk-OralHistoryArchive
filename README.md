# HistFalk-Oral history archive
HistFalk-Oral history archive is a project in cooperation with [Francesca Falk](https://www.hist.unibe.ch/ueber_uns/personen/falk_francesca/index_ger.html). 
We are building a website for the publication of oral history recordings (sound and/or video).
This website is generated using Jekyll and inspired by [MailTape](https://www.mailta.pe/).
Jekyll is a static Site-Generator, which means all the components must be added before building the site. 


## Prerequisites 
* Jekyll requires the following:
    * Ruby version 2.4.0 or higher
    * RubyGems
    * GCC and Make
Please reference [the Jekyll requirements](https://jekyllrb.com/docs/installation/#requirements) in the Jekyll docs
for more detailed instructions.

* You should have Node.js and NPM installed (NPM is installed automatically with latest versions of Node.js) which is
 needed for the backend. You can verify whether you have both by running `node -v` and `npm -v` in terminal 
 or command prompt.
    * If you don't have node.js installed please follow the instruction please [download](https://nodejs.org/en/download/)
     the package.


* You may download jetbrains [WebStorm](https://www.jetbrains.com/de-de/webstorm/) as IDE  for an optimal workspace. 
The [.idea](.idea) directory is used for the Webstorm project.

## Installation
Follow [Quickstart](https://jekyllrb.com/docs/). 
<br/> 
If you get the following this error when installing the jekyll and bundler gems using
`$ gem install jekyll bundler`
```    
ERROR:  While executing gem ... (Gem::FilePermissionError) 
You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.
```

Solve using:
``` 
$ brew install chruby ruby-install 
$ ruby-install ruby-2.7.2
```
For Intel Macs
```
$ echo "source /usr/local/share/chruby/chruby.sh" >> ~/.zshrc
$ echo "source /usr/local/share/chruby/auto.sh" >> ~/.zshrc
$ echo "chruby ruby-2.7.2" >> ~/.zshrc
```
For futher information please consult [this Guide](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/?utm_source=stackoverflow).
If you successfully installed jekyll you can run OH-Archive.

## Usage
### Backend
The backend file must be run before building the website.
1. Change into backend directory: `$ cd OH-Archive/_posts/backend`
2. Produce the posts from Omeka API by running `$ node generate-md-files.js`
### Frontend
#### Desktop
1. Change into directory: `$ cd OH-Archive`
2. Build the site and make it available on a local server: `$ bundle exec jekyll serve`
3. Browse to http://localhost:4000 (if localhost is not working for you try the link displayed under Server address 
in your terminal)
#### Mobile testing
1. Change into directory: `$ cd OH-Archive`
2. Build the site and make it available on a local server: `$ bundle exec jekyll serve --host 0.0.0.0`
3. On your mobile device browse to `http://<Local IP Address>:<port number>` (on Mac Os you will find your local IP 
Adress in System Preferences > Network)

We recommend using Mozilla Firefox for the best experience of this website. Other browsers may work as well. Note that 
this website isn't optimized for mobile view yet.


## Project structure
```
...
├── _layouts
│   └── In this directory you will find the different layouts. 
│       For example default.html"
├── _posts
│   ├── Backend
│   │ 
│   └── Stores blog posts in markdown.
├── _sass
│   └── Styling sheet for the project.
├── assets
│   ├── css
│   ├── images
│   └── js
...

```

## Documentation
[Here](doc) you will find additional information regarding the project.




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           