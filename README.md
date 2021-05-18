#DH-Oral history archive
DH-Oral history archive is a project in cooperation with [Francesca Falk](https://www.hist.unibe.ch/ueber_uns/personen/falk_francesca/index_ger.html). 
We are building a website for the publication of oral history recordings (sound and/or video).
This website is generated using Jekyll and inspired by [MailTape](https://www.mailta.pe/).

## Prerequisites 
Jekyll requires the following:
* Ruby version 2.4.0 or higher
* RubyGems
* GCC and Make

Please refrence [requirements](https://jekyllrb.com/docs/installation/#requirements) for more detailed instructions.

##Insatllation
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

##Usage
1. Change into directory: `$ cd OH-Archive`
3. Build the site and make it available on a local server: `$ bundle exec jekyll serve`
4. Browse to http://localhost:4000 (if localhost is not working for you try the link displayed under Server address 
in your terminal)
##Project structure
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




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           