/*
Backend file. Must be run before building the Website.
Gets data from Omeka API and parses JSON.
Creates Entry instances general, person and geo from JSON.
Generates post files (in markdown format and with front matter syntax) in _posts directory.
 */

var fs = require('fs');
var request = require('request');
const https = require('http');
const Entry = require('../OH-Archive/backend/entry');
keys = [];
values = [];
const collections = [];
var x = 0;



//Request to API
request('https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527',
    function (error, response, body) {

        var data = JSON.parse(body);
        // Begin accessing JSON data here
        data.forEach((object) => {
            const obj_values = Object.values(object);
            const obj_keys = Object.keys(object);


            //creating Entry, person and geo instances
            const general = Entry.generalInstance(
                BigInt(obj_values[3]),
                obj_values[4],
                obj_values[9],
                Object.values(obj_values[11])[0],
                Object.values(obj_values[17][0])[4],
                Object.values(obj_values[24][0])[4],
                Object.values(obj_values[23][0])[4],
                Object.values(obj_values[26][0])[4],
                Object.values(obj_values[25][0])[4],
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

            if(x === 0){
                keys.push(obj_keys[3]+";");
                keys.push(obj_keys[9]+";");
                keys.push(obj_keys[11]+";");
                for(var i = 0; i < 10;i++) {
                    keys.push(obj_keys[17 + i]+";");
                }
                x++;
            }

            values.push(obj_values[3]+";");
            values.push(obj_values[9]+";");
            values.push(Object.values(obj_values[11])[0]+";");
            for(i = 0; i < 10;i++) {
                if(i === 9){
                    values.push(Object.values(obj_values[17 + i][0])[4]+"\n");
                }
                else {
                    values.push(Object.values(obj_values[17 + i][0])[4]+";");
                }
            }


            if(!containsObject(general.isSubjof,collections)){
                collections.push(general.isSubjof);
            }




            function generateCsv(){
                var fileName = "missingEntryTable.csv";
                var fileContents = (keys.toString().replace(/,/g, "")+"\n"+values.toString().replace(/,/g, "")
                );
                var outputPath = fileName;

                fs.writeFile(outputPath, fileContents, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log(outputPath + ' file generated')
                })


            }
            function generateIsSubList(){
                var fileName = "themes.txt";
                var fileContents = ("List of current Themes with entries: \n"+collections.toString().replace(/,/g, "\n").replace(/ /g,"-"));
                var outputPath = fileName;

                fs.writeFile(outputPath, fileContents, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log(outputPath + ' file generated')
                })


            }


            generateCsv();
            generateIsSubList()



        })

    });


