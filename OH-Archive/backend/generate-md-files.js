/*
 * This file must be run before building the Website.
 * Clears _posts directory to ensure that only published posts are generated.
 * Gets data from OMEKA API and parses JSON.
 * Creates Entry instances general, person and geo from JSON. For more information about ENTRY class pleas reference
 * entry.js and the documentation of this project.
 * Generates post files (in markdown format and with front matter syntax) in _posts directory.
 */

var fs = require("fs");
var request = require("request");
const https = require("http");
const Entry = require("./entry"); //imports Entry class
const path = require("path");
const directory = "../_posts/";
keys = [];
values = [];

clearDirectory();

//Request to API
request(
  "https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527",
  function (error, response, body) {
    var data = JSON.parse(body);

    // Begin accessing JSON data here
    data.forEach((object) => {
      const obj_values = Object.values(object);

      //creating Entry, person and geo instances
      const general = Entry.generalInstance(
        obj_values[3], //id
        obj_values[4], //is public
        obj_values[9], //title
        Object.values(obj_values[11])[0], //created
        Object.values(obj_values[17][0])[4], //description
        Object.values(obj_values[24][0])[4], //language
        Object.values(obj_values[23][0])[4], //isSubjectOf
        Object.values(obj_values[26][0])[4], // interviewCreated
        Object.values(obj_values[25][0])[4] // creator
      );

      const person = Entry.personInstance(
        Object.values(obj_values[19][0])[4],
        Object.values(obj_values[20][0])[4],
        Object.values(obj_values[18][0])[4]
      );

      const geo = Entry.geoInstance(
        Object.values(obj_values[21][0])[4],
        Object.values(obj_values[22][0])[4]
      );

      //prepares attributes for markdown
      var date = general.created.toString().slice(0, 10);
      var name =
        person.firstName.replace(/\s/g, "") +
        "-" +
        person.lastName.replace(/\s/g, "");
      var permalink = "Interview_" + general.id;

      //function for posts markdown
      function generateMD() {
        var fileName = date + "-" + name + ".md";

        //front matter syntax
        var fileContents =
          "---\nlayout: post\ntitle: " +
          general.title +
          "\ncollection: " +
          "'" +
          general.isSubjof +
          "'" +
          "\nprotagonist: " +
          person.firstName +
          " " +
          person.lastName +
          "\ncreator: " +
          general.creator +
          "\nborn: " +
          geo.locIn +
          "\nlanguage: " +
          general.language +
          "\ninterviewDate: " +
          general.interviewCreated.toString().replace(/-/g, ".") +
          "\npermalink: " +
          permalink +
          "\npublished: " +
          general.isPublic +
          "\n---\n" +
          general.description;

        var outputPath = directory + fileName;

        fs.writeFile(outputPath, fileContents, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log(outputPath + " file generated");
        });
      }

      generateMD();
    });
  }
);

//function to clear _post directory
function clearDirectory() {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
      console.log(file + " was successfully deleted");
    }
  });
}
