/*
* This file must be run before building the Website.
* Gets data from OMEKA API and parses JSON.
* Creates Entry instances general, person and geo from JSON. For more information about ENTRY class pleas reference
* entry.js and the documentation of this project.
* Generates post files (in markdown format and with front matter syntax) in _posts directory.
 */

var fs = require('fs');
var request = require('request');
const https = require('http');
const Entry = require('./entry'); //imports Entry class
keys = [];
values = [];
//Request to API
request('https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527',
    function (error, response, body) {
        var data = JSON.parse(body);

        // Begin accessing JSON data here
        data.forEach((object) => {
            const obj_values = Object.values(object);

            //creating Entry, person and geo instances
            const general = Entry.generalInstance(
                BigInt(obj_values[3]), //id
                obj_values[4],//is public
                obj_values[9],//title
                Object.values(obj_values[11])[0],//created
                Object.values(obj_values[17][0])[4],//description
                Object.values(obj_values[24][0])[4],//language
                Object.values(obj_values[23][0])[4],//isSubjectOf
                Object.values(obj_values[26][0])[4],// interviewCreated
                Object.values(obj_values[25][0])[4]// creator
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

            //tests if an element is in Array
            function containsObject(obj, list) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i] === obj) {
                        return true;
                    }
                }
                return false;
            }


            //prepares attributes for markdown
            var date = general.created.toString().slice(0, 10);
            var name = person.firstName.replace(/\s/g, "") + "-" + person.lastName.replace(/\s/g, "");
            var permalink = person.firstName.replace(/\s/g, "") + "_" +
                person.lastName.replace(/\s/g, "") + "_" + general.id;


            //function for posts markdown
            function generateMD() {
                var fileName = date + "-" + name + ".md";

                //front matter syntax
                var fileContents = ("---\nlayout: post\ntitle: " + general.title
                    + "\ncollection: " + general.isSubjof
                    + "\nprotagonist: " + person.firstName + " " + person.lastName
                    + "\ncreator: " + general.creator
                    + "\nbirthday: " + person.birthday
                    + "\nlocation: " + geo.hasGeoloc
                    + "\nborn: " + geo.locIn
                    + "\nlanguage: " + general.language
                    + "\ninterviewDate: " + general.interviewCreated.toString().replace(/-/g, ".")
                    + "\npermalink: " + permalink +
                    "\n---\n" + general.description);

                var outputPath = '../_posts/' + fileName;

                fs.writeFile(outputPath, fileContents, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log(outputPath + ' file generated')
                })
            }

            if (general.isPublic) {
                generateMD()
            }
        })

    });


