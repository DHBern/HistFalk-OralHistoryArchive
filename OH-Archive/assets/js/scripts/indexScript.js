/*
ToDO:
- Fix Geo error in objects: 3541, 3662, 3663
- Add conditional coloring
- Add "post" links to the buttons
- Add comments
 */

//DOM Elements definition
const app = document.getElementById('root');
const flexContainer = document.createElement("ul");
flexContainer.setAttribute("class","flex-container wrap" );
app.appendChild(flexContainer);

//Request to API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527', true);
request.withCredentials = false;

request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            const obj_values = Object.values(object);



            //DOM Button
            const nameBtn = document.createElement('Button');
            nameBtn.setAttribute('class', 'btn btn-primary');
            nameBtn.setAttribute('type', 'Button');
            nameBtn.addEventListener("click", function(){
                location = " http://127.0.0.1:4000/archiveEntry"; // Navigate to new page
            });


            const flexItem = document.createElement("li");
            flexItem.setAttribute("class", "flex-item");




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





            // Append text to button and button to the container element
            const name = document.createTextNode(person.firstName+" "+person.lastName);
            nameBtn.appendChild(name);
            flexItem.appendChild(nameBtn);
            flexContainer.appendChild(flexItem);

        })
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }

};

request.send();

function generateMD () {
    var fileName = faker.lorem.word() + '-' + faker.lorem.word()
    var fileContents = `---
title: "${faker.lorem.words()}"
layout: Post
---

${faker.lorem.sentence()}
`;
    var outputPath = path.join(__dirname, 'OH-Archive/_posts', `${fileName}.md`)

    fs.writeFile(outputPath, fileContents, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log(outputPath + ' file generated')
    })
}




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





