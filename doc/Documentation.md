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
        * Each Button links to a new page (__done__)
        * Conditional color pattern for buttons
    * "Learn more" Button on the bottom
    
        *[Pop Up menu](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible)
        
    * map showing origins of the different archive entries
* Archive entry page where the mp3 can be played
    * possibly cover picture under archive entry title, filler picture at the moment
    * media player for the mp3 (via omeka)
    * description -> meta data from Omkea
    * no login, no comment function, no suggestions
* General styling:
    * Fonts, colors
### Data Requirements
* TopBar Button links
* Website: Header, Title, Logo and Description 
* Images  
* General styling:
    * Fonts, colors theme    
### Omeka
* [_root_/api](https://www.corona-memory.ch/api/)
* The data sets can be found in the „oral-history“ Collection with the set_id: 3527
* The following GET query provides the required data on the items for the total contributions for OH-Archive. The endpoint api/items 
is queried with the parameters per_page and item_set_id. 
    
    https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527
    
* As a response the server sends a JSON with all items. Please reference [this table](JSON_Response_table.xlsx) for more information on how 
to query the JSON content.
For organisation purpose an easier access the JSON is parsed and added to different instances of the Entry class.
The following code shows definition of Entry class in  [generate-md-files.js](../OH-Archive/_posts/backend/generate-md-files.js).
```
class Entry {
    constructor(id, isPublic, title, description, language, created,
                lastMod,firstName, lastName, birthday, hasGeoLoc, locIn, isSubjOf ){
        this.id = id;
        this.isPublic = isPublic;
        this.title = title;
        this.description = description;
        this.language = language;
        this.created = created;
        this.lastMod = lastMod;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.hasGeoloc = hasGeoLoc;
        this.locIn = locIn;
        this.isSubjof = isSubjOf;
    }
    static generalInstance(id, isPublic, title, description, language, created,
                           lastMod){
        return new Entry(id, isPublic, title, description, language, created,
            lastMod,null,null,null,null,
            null,null)
    }
    static personInstance(firstName, lastName, birthday){
        return new Entry(null,null,null,null,null,null,null,
            firstName, lastName, birthday, null,null,null)
    }
    static geoInstance(hasGeoLoc, locIn, isSubjOf){
        return new Entry(null,null,null,null,null,null,null, null,
            null, null, hasGeoLoc,locIn,isSubjOf)
    }

}
```
At the moment there are three kinds of constructors for three kinds of different instances. The following table shows 
how the content of the JSON is organized in these instances.




| Instance name           | Content                                                        | 
| ------------------------| -------------------------------------------------------------- |
| generalInstance         | id, is_public, title, description, language, created, lastModified |
| personInstance          | [firstName, familyName, birthday]|
| geoInstance             | hasGeoLocation, locatedIn, isSubjectOf |



                                                               
*  [Omeka Backend](http://omeka.unibe.ch/admin)
```   
      User: Mailadresse
      Passwort: 12345678
```

### TO DOs
-[X] indexScript.js get attribute such as title and implement them in default.html
-[X] Fix Access-Control-Allow-Origin (for now)
-[ ] Pill navigation Topbar
-[ ] PopUp menu footer
-[ ] Finish Conditional Buttons using category tags
-[ ] Add a tag to verify if there is a post 
-> Maybe post request only set to public if backend file is run?
-> Or use front matter tags
-[ ] Code Clean Up (it smells :P)
-[ ] Comments
-[ ] Add seperate Entry Class file

 
 ## Issues 
 * When accessing http://omeka.unibe.ch/api/items?per_page=999999&item_set_id=3527 you will get an CORS header 
 ['Access-Control-Allow-Origin' missing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin) 
 error. Origin of the requesting site must be added to the set of domains permitted access (Access-Control-Allow-Origin 
 header's value must be added).
    * Solved for now by using corona memory as Root:
    
        https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527
* geo_info is not correct in every entry see indexScript.js
     
        
