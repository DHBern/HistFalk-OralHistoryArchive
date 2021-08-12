# Documentation: HistFalk-Oral history archive
This is the documentation for the "Oral History Archiv" website. This website publishes oral history recordings 
(sound or video). It is generated using Jekyll and inspired by [MailTape](https://www.mailta.pe/).
Jekyll is a static Site-Generator, which means all the components must be added before building the site. Therefore it is
essential to run the [backendmodule](../OH-Archive/_posts/backend/generate-md-files.js).
Please note that "Oral History Archiv" is not optimized for mobile us, all though it may still work on your mobile device.

## Backend
The Backend directory contains the [Entry class](../OH-Archive/backend/entry.js) and the generate-md-files module. 
generate-md-files module accesses OMEKA API and produces the markdown posts from the metadata. These Markdown files are 
needed to build the post pages (due to Jekyll being a static Site-Generator). 
### Data access
The recordings and the Metadata for "Oral History Archiv" are located on OMEKA.

* The data sets can be found in the „oral-history“ Collection. The set_id is 3527.
* To see which data is missing but required for the website please consult [missingEntryTable.csv](missingEntryTable.csv). 
This table is produced when you run `$ node doc/documentationScript.js`.
* The resource template is called oral-history Interview. It decides how the data is stored.
If you need to change an entry or the ressource-template pleas visit [Omeka Backend](http://omeka.unibe.ch/admin)
```   
      User: Mailadresse
      Passwort: 12345678
```
* The data can be accessed via API using [_root_/api](https://www.corona-memory.ch/api/)
For example the following GET query provides the required Metadata on the items to build the posts. The endpoint api/items 
is queried with the parameters per_page and item_set_id. 
    
    https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527
    
As a response the server sends a JSON with all items. Please reference [this table](JSON_Response_table.xlsx) for more information on how 
to query the JSON content. The tables depicts the indices of the different values and how to access them.
### Creating the posts
To create a post, a file with the following format YEAR-MONTH-DAY-title.MARKUP has to be added to [_posts](../OH-Archive/_posts) directory.
In this project this is done automatically using [generate-md-files.js](../OH-Archive/_posts/backend/generate-md-files.js).
Therefore it is very important to run the backend module  before building the website. This module gets the Oral History 
Archive Entries as a JSON from OMEKA via API (see the above GET query).
For organisation purpose and easier access to the Metadata the JSON is parsed and added to different instances of the [Entry](../OH-Archive/backend/entry.js) 
class.
Besides the universal constructor there are three kinds of constructors for three kinds of different instances. The following 
table shows how the content of the JSON is organized in these instances.

| Instance name              | Content                                                           | 
| -------------------------- | ----------------------------------------------------------------- |
| entry                      | id, isPublic, title, created, description, language , firstName, lastName, birthday, hasGeoLoc, locIn, isSubjOf, interviewCreated, creator|                                                                |
| generalInstance            | id, isPublic, title, created, description, language, isSubjOf, interviewCreated, creator |
| personInstance             | firstName, lastName, birthday                                   |
| geoInstance                | hasGeoLoc, locIn |

The three new instances are now used to produce the post files. For post files YAML front matter syntax must be used.
This syntax will be explained further down. Finally for each JSON object a Markup file is produced and stored in _posts.

## Frontend
The frontend uses both static and dynamic content. Due to Jekyll being a static Site-Generator the dynamic content is 
displayed with the HTML DOM. For example index.html uses the indexScrip.js to build dynamic conditional buttons
form the data received from OMEKA API. The buttons are displayed in the "root" `<div> using the HTML DOM.

For the static content the YAML front matter syntax is used. Any file that contains a YAML  front matter block will 
be processed by Jekyll as a special file. The front matter must be the first thing in the file 
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
published: true
---

```
Between these triple-dashed lines, you can set predefined variables and  create custom variables. These variables will 
then be available for you to access using Liquid tags (for example `{{page.title}} `) both further down in the file and also in any 
layouts or includes that the page or post in question relies on. In this project the variables are set and assigned
by the backend module before building the website. 
After building the website each archive entry page (or post) takes its entry information (static) from its Markdown using 
the Liquid tag syntax.

### Dependencies
Oral History Archiv consist the following components: a home page (index.html), a publication page (publication.html) and post pages which are produced from 
the Markdowns contained in the _post folder. They all have the same structure (see overview below).

Each website component uses styling sheets form [sass directory](../OH-Archive/_sass) 
and a layout from [layout directory](../OH-Archive/_layouts). Some components may use a script from the 
[js directory in the assets folder](../OH-Archive/assets/js). The post layout uses a background image form the image folder 
in the assets directory.
```
...
├── index.html (http://localhost:4000)
|   ├── css
|   |   ├─– buttonStyle.scss
|   |   └─– main.scss
|   ├── script
|   |   └─– indexScript.js
|   └── layout
|       └─– homePage.html
├── posts (http://localhost:4000/Firstname_Lastname_id) 
|   ├── css
|   |   ├── buttonStyle.scss
|   |   ├── postStyles
|   |   └─– main.scss
|   ├── script
|   |   └─– postScript.js
|   └── layout
|       └─– post.html
|           └─ PostBackground.jpg
├── publication.html (http://localhost:4000/Publikationen
|   ├── css
|   |   ├── buttonStyle.scss
|   |   └─– main.scss
|   └── layout
|       └─– default.html
└── 404.html
    ├── css
    |   ├── buttonStyle.scss
    |   └─- main.scss
    └── layout
        └─- default.html
...

```
### Layout and styling
The layout is inspired by [MailTape](https://www.mailta.pe/). The used font for "Oral History Archiv" is 'Roboto', sans-serif. 
It is imported via HTML <link> tag in each layout file and assigned in main.scss under basic styling. Bootstrap v5.0.1 is used 
in each layout and accessed via HTML <link> tag. Please don't remove this tag, bootstrap is needed for conditional buttons 
leading to the archive entries on index.html.

The post layout uses this [Background image](../OH-Archive/assets/images/PostBackground.jpg) from [this source](https://www.pexels.com/de-de/foto/weiss-gestrichene-wand-1939485/). 
The licence is "free use and no naming required".

For the color theme for conditional buttons please reference the [ColorTheme.pdf](ColorTheme.pdf).
Currently there are 4 themes for the conditional buttons Schwarzenbach-Abstimmung, Parlamentarierinnen-mit-doppelter-Staatsbürgerschaft, 
Saisonnières-und-Saisonniers, tbd-wird-ergänzt. You can use [themes.txt](themes.txt) as a reference for the current themes 
with entries in OMEKA. This file is produced when you run `$ node doc/documentationScript.js`.
The color are assined to the themes in the [button styling sheet](../OH-Archive/_sass/buttonStyles.scss) using the id.

#### How to ad a new color for a new theme 
If there is no special color assigned the buttons will be displayed with its default color.
To understand how a color is assigned to a button. Please look at the example below  for Schwarzenbach-Abstimmung id 
in buttonStyle.scss:
```

/* Button styling and link styling */


#Schwarzenbach-Abstimmung {
  /* Filled buttons for the archive entries*/
  .btn-primary,
  .btn-primary:hover,
  .btn-primary:active,
  .btn-primary:visited,
  .btn-primary:focus {
    background-color: #117CA6 !important;
    border-color: #117CA6 !important;
    box-shadow: none !important;
  }
  /* Outlined buttons for publication button*/
  .btn-outline-primary:hover {
    color: white !important;
    border-color: #117CA6 !important;
    background-color: #117CA6 !important; ;
  }
  .btn-outline-primary,
  .btn-outline-primary:active,
  .btn-outline-primary:visited,
  .btn-outline-primary:focus {
    border-color: #117CA6 !important;
    color:  #117CA6 !important;
    box-shadow: none !important;
  }
  /* Link styling for publication page*/
  #Schwarzenbach-Abstimmung-links {
    .link-primary,
    .link-primary:hover,
    .link-primary:active,
    .link-primary:visited {
      color: #117CA6 !important;
    }}

}
```

If you need to add a new color for a new theme, please run `$ node doc/documentationScript.js` in command line. 
This will save the correct ids for the [styling sheet](../OH-Archive/_sass/main.scss) in [themes.txt](themes.txt).
Then add your new color like this in buttonStyle.scss:

```
/* Button styling and link styling */

  
    #your-new-theme-id {
       /* Filled buttons for the archive entries*/
        .btn-primary,
        .btn-primary:hover,
        .btn-primary:active,
        .btn-primary:visited,
        .btn-primary:focus {
            /* Change to your desired color here */
            background-color: #117CA6 !important;
            border-color: #117CA6 !important;
            box-shadow: none !important;
        }
      /* Outlined buttons for publication button*/
       .btn-outline-primary:hover {
            /* Change to your desired color here */
            color: white !important;
            border-color: #117CA6 !important;
            background-color: #117CA6 !important; ;
        }
        .btn-outline-primary,
        .btn-outline-primary:active,
        .btn-outline-primary:visited,
        .btn-outline-primary:focus {
            /* Change to your desired color here */
            border-color: #117CA6 !important;
            color:  #117CA6 !important;
             box-shadow: none !important;
            }
       /* Link styling for publication page*/
        #your-new-theme-id-links{
            .link-primary,
            .link-primary:hover,
            .link-primary:active,
            .link-primary:visited {
                /* Change to your desired color here */
                color: #117CA6 !important;
            }
}
            
}
```
You can copy the code above and simply change the id and color to the desired values. 

Finally you need to ad two `<div>` elements to the publication.html. You only need to add the `<div>` elements to the 
publication.html, because the other components build the new themes dynamically. You may also add the desired links 
 and information to publication.html in the your-new-theme-id-links `<div>`. Please use the syntax as seen below for the links or the
color theme will not work:

```
<div id="your-new-theme-id">Publication for your new theme</div>
<div id="your-new-theme-id-links">
<a href="your-new-link.com" class="link-primary">new link</a><br></div>
``` 
## Issues 
 * When accessing http://omeka.unibe.ch/api/items?per_page=999999&item_set_id=3527 you will get an CORS header 
 ['Access-Control-Allow-Origin' missing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin) 
 error. Origin of the requesting site must be added to the set of domains permitted access (Access-Control-Allow-Origin 
 header's value must be added).
    * Solved for now by using corona memory as Root:
    
        https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527

## Feedback from DH-Team
Please reference [this google spreadsheet](https://docs.google.com/spreadsheets/d/1NX8sl2FoIbBQm0FLG06Y3eQGUhusYogwno6ZgM2ZcVQ/edit#gid=0) for the feedback.
## TO DOs
-[ ] map showing origins of the different archive entries
-[ ] external links open a new tab (about_blank)
-[ ] link FF in site description, link dh in impressum
-[ ] stick impressum to the bottom of the page
-[ ] Change sound default in media player to 75%
-[ ] Interviews can not be opened in a new tab
-[ ] Navigation -> must be decided with FF
-[ ] Have a look at OMEKA data with missingEntryTable.csv
-[ ] Change post layout (info not central)
-[ ] Sort categories differently (chronological)
 


     
        
