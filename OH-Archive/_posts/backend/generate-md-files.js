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

                const general = Entry.generalInstance(
                    BigInt(obj_values[3]),
                    obj_values[4] ,
                    obj_values[9],
                    Object.values(obj_values[17][0])[4],
                    Object.values(obj_values[24][0])[4],
                    Object.values(obj_values[11])[0],
                    Object.values(obj_values[12])[0],
                );

                const person = Entry.personInstance(
                    Object.values(obj_values[19][0])[4],
                    Object.values(obj_values[20][0])[4],
                    Object.values(obj_values[18][0])[4],
                );
                const geo = Entry.geoInstance(
                    Object.values(obj_values[21][0])[4],
                    Object.values(obj_values[22][0])[4],
                    Object.values(obj_values[23][0])[4]
                );


                var date = general.created.toString().slice(0,10);
                var name = person.firstName.replace(/\s/g, "")+"-"+person.lastName.replace(/\s/g, "");
                var permalink = person.firstName.replace(/\s/g, "")+
                    person.lastName.replace(/\s/g, "")


                function generateMD () {
                    var fileName = date+"-"+name+".md";

                    var fileContents = ("---\nlayout: post\ntitle: "+general.title+"\npermalink: "+permalink+
                        "\n---");

                    var outputPath = '../' + fileName;

                    fs.writeFile(outputPath,fileContents, function (err) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log(outputPath + ' file generated')
                    })
                }

                generateMD()


            })

    });





/*
Entry class definition
 */
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

