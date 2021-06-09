/*
Backend file. Must be run before building the Website.
Gets data from Omeka API and parses JSON.
Creates Entry instances general, person and geo from JSON.
Generates post files (in markdown format and with front matter syntax) in _posts directory.
 */

var fs = require('fs');
var request = require('request');
const https = require('http');


//Request to API
request('https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527',
    function (error, response, body) {

        var data = JSON.parse(body);
            // Begin accessing JSON data here
            data.forEach((object) => {
                const obj_values = Object.values(object);


                //creating Entry instances
                const general = Entry.generalInstance(
                    BigInt(obj_values[3]),
                    obj_values[4] ,
                    obj_values[9],
                    Object.values(obj_values[17][0])[4],
                    Object.values(obj_values[24][0])[4],
                    Object.values(obj_values[11])[0],
                    Object.values(obj_values[12])[0],
                    Object.values(obj_values[23][0])[4],
                    "00-00-0000"
                );

                const person = Entry.personInstance(
                    Object.values(obj_values[19][0])[4],
                    Object.values(obj_values[20][0])[4],
                    Object.values(obj_values[18][0])[4],
                );

                const geo = Entry.geoInstance(
                    Object.values(obj_values[21][0])[4],
                    Object.values(obj_values[22][0])[4],
                );


                //prepares attributes for markdown
                var date = general.created.toString().slice(0,10);
                var name = person.firstName.replace(/\s/g, "")+"-"+person.lastName.replace(/\s/g, "");
                var permalink = person.firstName.replace(/\s/g, "")+"_"+
                    person.lastName.replace(/\s/g, "")+"_"+general.id;



                //function for posts markdown
                function generateMD () {
                    var fileName = date+"-"+name+".md";

                    //front matter syntax
                    var fileContents = ("---\nlayout: post\ntitle: "+general.title
                        + "\ncollection: " +general.isSubjof
                        + "\nprotagonist: " +person.firstName+" "+person.lastName
                        + "\nbirthday: "+person.birthday
                        + "\nlocation: "+geo.locIn
                        + "\nlanguage: "+general.language
                        + "\ninterviewDate: "+general.interviewDate
                        + "\npermalink: "+permalink+
                        "\n---\n"+general.description);

                    var outputPath = '../' + fileName;

                    fs.writeFile(outputPath,fileContents, function (err) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log(outputPath + ' file generated')
                    })
                }
                if(general.isPublic){
                    generateMD()
                }



            })

    });





/*
Entry class definition
 */
class Entry {
    constructor(id, isPublic, title, description, language, created,
                lastMod,firstName, lastName, birthday, hasGeoLoc, locIn, isSubjOf, interviewDate ){
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
        this.interviewDate = interviewDate;
    }
    static generalInstance(id, isPublic, title, description, language, created,
                           lastMod, isSubjOf, interviewDate){
        return new Entry(id, isPublic, title, description, language, created,
            lastMod,null,null,null,null,
            null,isSubjOf, interviewDate)
    }
    static personInstance(firstName, lastName, birthday){
        return new Entry(null,null,null,null,null,null,null,
            firstName, lastName, birthday, null,null,null,null)
    }
    static geoInstance(hasGeoLoc, locIn, isSubjOf){
        return new Entry(null,null,null,null,null,null,null, null,
            null, null, hasGeoLoc,locIn,null,null)
    }

}

