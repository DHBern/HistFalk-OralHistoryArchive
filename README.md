# HistFalk-Oral history archive
HistFalk-Oral history archive is a project in cooperation with [Francesca Falk](https://www.hist.unibe.ch/ueber_uns/personen/falk_francesca/index_ger.html). 
We are building a website for the publication of oral history recordings (sound and/or video).
This website is generated using Jekyll and inspired by [MailTape](https://www.mailta.pe/).


## Prerequisites 
* Jekyll requires the following:
    * Ruby version 2.4.0 or higher
    * RubyGems
    * GCC and Make
Please reference [requirements](https://jekyllrb.com/docs/installation/#requirements) for more detailed instructions.

* You may download jetbrains [WebStorm](https://www.jetbrains.com/de-de/webstorm/) as IDE  for an optimal workspace. 
The [.idea](.idea) directory is used for the Webstorm project.

* To use OmekaAPI you must currently install a local proxy ([see Access-Control-Allow-Origin' missing error](doc/DocumentationOAH)):
`$ npm install -g local-cors-proxy`

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
1. Change into directory: `$ cd OH-Archive`
2. Build the site and make it available on a local server: `$ bundle exec jekyll serve`
3. To start local proxy
`$ lcp --proxyUrl http://omekaunibe.ch/api/items?per_page=999999&item_set_id=3527`
4. Browse to http://localhost:4000 (if localhost is not working for you try the link displayed under Server address 
in your terminal)

We recommend using Mozilla Firefox for the best experience of this website. Other browsers may work as well. Note that 
this website isn't optimized for mobile view yet.


## Project structure
```
...
├── _layouts
│   └── In this directory you will find the different layouts. 
│       For example default.html"
├── _posts"
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




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           