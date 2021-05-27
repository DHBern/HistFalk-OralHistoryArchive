# Documentation: DH-Oral history archive
Documentation for OH-archive website. 
## Website structure
```
...
├── Homepage(index.html)
│   ├── Blogposts/Archive entry page
|   |   └── mp3 via Omeka API
│   ├── ...
│   └── Blogposts/OH-Archive entry
...
```

## Requirements
### Layout Requirements
* For the layout the inspiration please reference [MailTape](https://www.mailta.pe/).
* Homepage:
    * Buttons on the top right linking to different Websites
        * Pill Navigation: https://www.w3schools.com/howto/howto_css_pill_nav.asp    
    * Title with logo
    * Description
    * Buttons linking to the archive entry pages
        * Each Button links to a new page
        * Conditional color pattern for buttons
    * "Learn more" Button on the bottom
        *[Pop Up menu](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible)
    * map showing origins of the different archive entries
* Archive entry page where the mp3 can be played
    * possibly cover picture under archive entry title, filler picture at the moment
    * media player for the mp3 (via omeka)
    * description ->meta data from Omkea
    * no login, no comment function, no suggestions
* General styling:
    * Fonts, colors
### Data Requirements
* TopBar Button links
* Title, Logo and Description
* Button description -> "Interview with XY"
* Images        
### Omeka
* [_root_/api](https://www.corona-memory.ch/api/)
* The data sets can be found in the „oral-history“ Collection with the set_id: 3527
* The following GET query provides the required data on the items for the total contributions for OH-Archive. The endpoint api/items 
is queried with the parameters per_page and item_set_id. 
    
    https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527
    
* As a response the server sends a JSON with all items. Please reference [this table](JSON_Response_table.xlsx) for more information on how 
to query the JSON content.
The following table shows how the content of the JSON is organized in [script.js](../OH-Archive/assets/js/script.js)



| Value/Collection Name   | Content                                                        | 
| ------------------------| -------------------------------------------------------------- |
| id                      | String of item id                                              |
| is_public               | Boolean, true if it is public                                  |
| entry_info              | String Array with the following content [title, created, lastModified, description, language] |
| pers_info               | String Array with the following content  [firstName, familyName, birthday]|
| geo_info                |String Array with the following content  [hasGeoLocation, locatedIn, isSubjectOf] |



                                                               
*  [Backend](http://omeka.unibe.ch/admin)
```   
      User: Mailadresse
      Passwort: 12345678
```

### TO DOs
-[ ] script.js get attribute such as title and implement them in default.html
-[ ] Fix Access-Control-Allow-Origin
-[ ] Pill navigation Topbar
-[ ] PopUp menu footer
-[ ] Finish Conditional Buttons using category tags
-[ ] Code Clean Up (it smells :P)

 
 ## Issues 
 * When accessing http://omeka.unibe.ch/api/items?per_page=999999&item_set_id=3527 you will get an CORS header 
 ['Access-Control-Allow-Origin' missing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin) 
 error. Origin of the requesting site must be added to the set of domains permitted access (Access-Control-Allow-Origin 
 header's value must be added).
    * Solved for now by using corona memory as Root:
    
        https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527
* geo_info is not correct in every entry see script.js        
        
