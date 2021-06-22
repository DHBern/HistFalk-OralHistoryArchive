# Documentation: HistFalk-Oral history archive
This is the documentation for the "Oral History Archiv" website. This website publicises oral history recordings 
(sound or video). It is generated using Jekyll and inspired by [MailTape](https://www.mailta.pe/).
Jekyll is a static Site-Generator, which means all the components must be added before building the site. Therefore it is
essential to run the [backendmodule](../OH-Archive/_posts/backend/generate-md-files.js).
Please note that "Oral History Archiv" is not optimized for mobile us, all though it may still work on your mobile device.

## Backend
The Backend directory contains the [Entry class](../OH-Archive/backend/entry.js) and the generate-md-files module. 
generate-md-files module access OMEKA API and produces the markdown posts from the metadata. These Markdown files are 
needed to build build the post pages (due to Jekyll being a static Site-Generator). 
### Data access
The recordings and the Metadat for "Oral History Archiv" are located on OMEKA.

* The data sets can be found in the „oral-history“ Collection. The set_id is 3527
* To see which data is missing but required for the website please consult [missingEntryTable.csv](missingEntryTable.csv). 
This table is produced when you run `$ node doc/documentationScript.js`.
* The resource template is called oral-history Interview. It desides how the data is stored.
If you need to change an entry or the ressource-template pleas visit [Omeka Backend](http://omeka.unibe.ch/admin)
```   
      User: Mailadresse
      Passwort: 12345678
```
* The data can also be accessed via API using [_root_/api](https://www.corona-memory.ch/api/)
For example the following GET query provides the required Metadata on the items to build the posts. The endpoint api/items 
is queried with the parameters per_page and item_set_id. 
    
    https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527
    
As a response the server sends a JSON with all items. Please reference [this table](JSON_Response_table.xlsx) for more information on how 
to query the JSON content. The tables depicts the indices of the different values and how to access them.
For organisation purpose an easier access to the Metadata the JSON is parsed and added to different instances of the [Entry](../OH-Archive/backend/entry.js) 
class.
Besides the universal constructor there are three kinds of constructors for three kinds of different instances. The following 
table shows how the content of the JSON is organized in these instances.

| Instance name              | Content                                                           | 
| -------------------------- | ----------------------------------------------------------------- |
| entry                      | id, isPublic, title, created, description, language , firstName, lastName, birthday, hasGeoLoc, locIn, isSubjOf, interviewCreated, creator|                                                                |
| generalInstance            | id, isPublic, title, created, description, language, isSubjOf, interviewCreated, creator |
| personInstance             | firstName, lastName, birthday                                   |
| geoInstance                | hasGeoLoc, locIn |

## Frontend
The frontend uses both static and dynamic content. Due to Jekyll being a static Site-Generator the dynamic content is 
displayed with the HTML DOM. For example index.html uses the indexScrip.js to build dynamic conditional buttons
form the data received from OMEKA API. The buttons are displayed in the "root" <div> using html the HTML DOM.
The static content the YAML front matter syntax is used. Any file that contains a YAML 
front matter block will be processed by Jekyll as a special file. The front matter must be the first thing in the file 
and must take the form of valid YAML set between triple-dashed lines. Here is an example from a post found in the _post 
folder:

```

---
layout: post
title: Interview mit Alex Granato
collection: Schwarzenbach-Abstimmung
protagonist: Alex Granato
creator: Livia Meyer
birthday: 4.2.1961
location: Götighofen
born: Sant'Agata di Puglia
language: Schweizerdeutsch
interviewDate: 02.03.2020
permalink: Alex_Granato_3547
---


```
Between these triple-dashed lines, you can set predefined variables and  create custom variables. These variables will 
then be available for you to access using Liquid tags ( {{page.title}} ) both further down in the file and also in any 
layouts or includes that the page or post in question relies on.
For example each archive entry page (or post) takes its entry information from its Markdown using the Liquid tag syntax 
and displays the mp3/mp4 dynamically using DOM. 

### Dependencies
Oral History Archiv consist of the following components (see overview below). The posts components are produced from the 
Markdowns contained in the _post folder. They all have the same structure.

Each components uses the styling sheet form [sass directory](../OH-Archive/_sass/main.scss) 
and a layout from [layout directory](../OH-Archive/_layouts). Some components may use a script from the 
[js directory in the assets folder](../OH-Archive/assets/js). The post layout uses a background image form the image folder 
in the assets directory.
```
...
├── index.html (http://localhost:4000)
|   ├── css
|   |   └─ main.scss
|   ├── script
|   |   └─ indexScript.js
|   └── layout
|       └─ homePage.html
├── posts (http://localhost:4000/Firstname_Lastname_id) 
|   ├── css
|   |   └─ main.scss
|   ├── script
|   |   └─ postScript.js
|   └── layout
|       └─ post.html
|           └─ PostBackground.jpg
├── publication.html (http://localhost:4000/Publikationen
|   ├── css
|   |   └─ main.scss
|   ├── script
|   |   └─ publicationScript.js
|   └── layout
|       └─ default.html
└── 404.html
    ├── css
    |   └─ main.scss
    └── layout
       └─ default.html
...

```
### Layout and styling
The layout is inspired by [MailTape](https://www.mailta.pe/). The used font for "Oral History Archiv" is 'Roboto', sans-serif. 
It is imported via HTML <link> tag in each layout file and assigned in main.scss under basic styling. Bootstrap v5.0.1 is used 
in each layout and accessed via HTML <link> tag. Please don't remove this tag, bootstrap is needed for conditional buttons 
leading to the archive entries on index.html.

The post layout uses this [Background image](../OH-Archive/assets/images/PostBackground.jpg).The image  
[source](https://www.pexels.com/de-de/foto/weiss-gestrichene-wand-1939485/). The licence is free us and no naming required.

For the color theme for conditional buttons please reference the [ColorTheme.pdf](ColorTheme.pdf).
Currently there are 4 themes for the conditional buttons Schwarzenbach-Abstimmung, Parlamentarierinnen-mit-doppelter-Staatsbürgerschaft, 
Saisonnières-und-Saisonniers, tbd-wird-ergänzt. You can use [themes.txt](themes.txt) as a reference for the current themes 
with entries in OMEKA. This file is produced when you run `$ node doc/documentationScript.js`.
The color are assined to the themes in the [styling sheet](../OH-Archive/_sass/main.scss) using the id.

#### How to ad a new color for a new theme 
If there is no special color assigned the buttons will be displayed with its default color.
To understand how a color is assigned to a button. Please look at the example below  for Schwarzenbach-Abstimmung id 
in main.scss:
```
/* Button styling */
#root {
  /* Filled buttons for the archive entries*/
  #Schwarzenbach-Abstimmung {
    .btn-primary,
    .btn-primary:hover,
    .btn-primary:active,
    .btn-primary:visited,
    .btn-primary:focus {
      background-color: #117CA6 !important;
      border-color: #117CA6 !important;
      box-shadow: none !important;
    }
    .btn-outline-primary:hover {
      color: white !important;
      border-color: #117CA6 !important;
      background-color: #117CA6 !important; ;
    }
    /* outlined buttons for publication button*/
    .btn-outline-primary,
    .btn-outline-primary:active,
    .btn-outline-primary:visited,
    .btn-outline-primary:focus {
      border-color: #117CA6 !important;
      color:  #117CA6 !important;
      box-shadow: none !important;
    }
  }
}
/* Link styling for publication page*/
#Schwarzenbach-Abstimmung-links {
  .link-primary,
  .link-primary:hover,
  .link-primary:active,
  .link-primary:visited {
    color: #117CA6 !important;
  }
}
```

If you need to add a new color for a new theme, please run `$ node doc/documentationScript.js`. 
This will save the correct ids for the [styling sheet](../OH-Archive/_sass/main.scss) in [themes.txt](themes.txt).
Then add your new color like this in main.scss:

```
/* Button styling */
#root {
  /* Filled buttons for the archive entries*/
    #your-new-theme-id-links{
      .btn-primary,
      .btn-primary:hover,
      ...
     }
}
/* Link styling for publication page*/
#your-new-theme-id-links{
   .link-primary,
   ...
}

```
Finally you need to ad two <div> elements to the publication.html. You only need to add the <div> elements to the 
publication.html, because the other components build the new themes dynamically. You may also add the desired links 
in the publication.html in the your-new-theme-id-links <div>. Please use the syntax as seen below for the links or the
color theme will not work:

```
<div id="your-new-theme-id"></div>
<div id="your-new-theme-id-links">
<a href="your-new-link.com" class="link-primary">new link</a><br></div>
``` 
## Issues 
This are the issues we accrued or currently face:

 * When accessing http://omeka.unibe.ch/api/items?per_page=999999&item_set_id=3527 you will get an CORS header 
 ['Access-Control-Allow-Origin' missing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin) 
 error. Origin of the requesting site must be added to the set of domains permitted access (Access-Control-Allow-Origin 
 header's value must be added).
    * Solved for now by using corona memory as Root:
    
        https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527
        
* The Interview date is not displayed the same in each post entry.
* main.scss needs a clean up
* ressource template needs clean up/need to change code to with if/else for required and not required data
* mp4 can not yet be displayed
## TO DOs
-[ ] Code Clean Up (it smells :P)
-[ ] Comments namely in the scripts!
-[ ] Documentation (better now)
-[ ] General styling and clean up of sass
-[X] ressource template clean up and 
-[X] Style the Dates
-[ ] Paola Monti entry, video display mp4 player must be displayes (if else statement)
-[ ] dockerimage (file mit allen abhängigkeiten, dockerfile)
-[ ] map showing origins of the different archive entries
-[ ] cronjob
 
 


     
        
