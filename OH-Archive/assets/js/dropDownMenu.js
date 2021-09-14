// Array of themes (see themes.txt in documentation)
const collections = [];
//DOM Elements definition
const dropDownMenu = document.getElementById("dropdown-menu");

//request items from API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527&sort_order=desc', true);
request.withCredentials = false;

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            const obj_values = Object.values(object);


            //creating Entry instances
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

            // creates correct permalink for the posts (see generate-md-files.js as refrence)
            var permalink =  "Interview_"+general.id;


            //Dropdown menu
            const li_2 = document.createElement("li");
            const dropDownItem = document.createElement("a");
            dropDownItem.setAttribute("class", "dropdown-item");
            dropDownItem.setAttribute("href",permalink);
            const LinkText = document.createTextNode(general.title);



            // If the theme xy is already contained in collections array
            if (containsObject(general.isSubjof, collections)) {
                for (let i = 0; i < collections.length; i++) {
                    if (collections[i] === general.isSubjof) {
                        if(general.isSubjof !=="Podcastbeitrag"){
                        //gets correct container by id
                        const divById = document.getElementById(general.isSubjof.replaceAll(" ", "-")+"_div");



                        dropDownItem.appendChild(LinkText);
                        li_2.appendChild(dropDownItem);
                        divById.appendChild(li_2);
                        dropDownMenu.appendChild(divById);

                    }}
                }
            }

            // If the theme xy is not contained in collections array
            if (!containsObject(general.isSubjof, collections)) {
                // add to array
                if(general.isSubjof !=="Podcastbeitrag"){
                collections.push(general.isSubjof);

                const dropDownDiv = document.createElement("div");
                dropDownDiv.setAttribute("id", general.isSubjof.replaceAll(" ", "-")+"_div");
                const li_1 = document.createElement("li");


                const dropDownHeader = document.createElement("h6");
                dropDownHeader.setAttribute("class", "dropdown-header");
                dropDownHeader.setAttribute("id", general.isSubjof.replaceAll(" ", "-")+"_header");
                const h6Text = document.createTextNode(general.isSubjof);

                dropDownItem.appendChild(LinkText);
                dropDownHeader.appendChild(h6Text);
                li_1.appendChild(dropDownHeader);
                li_2.appendChild(dropDownItem);
                dropDownDiv.appendChild(li_1);
                dropDownDiv.appendChild(li_2);
                dropDownMenu.appendChild(dropDownDiv);
            }}


        })
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
};
request.send();


/*
Entry class definition (copie from entry.js)
 */
class Entry {
    constructor(id, isPublic, title, created, description, language
        , firstName, lastName, birthday, hasGeoLoc, locIn, isSubjOf, interviewCreated, creator) {
        this.id = id;
        this.isPublic = isPublic;
        this.title = title;
        this.created = created;
        this.description = description;
        this.language = language;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.hasGeoloc = hasGeoLoc;
        this.locIn = locIn;
        this.isSubjof = isSubjOf;
        this.interviewCreated = interviewCreated;
        this.creator = creator;
    }

    static generalInstance(id, isPublic, title, created, description, language, isSubjOf, interviewCreated, creator) {
        return new Entry(id, isPublic, title, created, description, language, null, null, null, null,
            null, isSubjOf, interviewCreated, creator)
    }

    static personInstance(firstName, lastName, birthday) {
        return new Entry(null, null, null, null, null, null,
            firstName, lastName, birthday, null, null, null, null, null)
    }

    static geoInstance(hasGeoLoc, locIn) {
        return new Entry(null, null, null, null, null, null, null, null, null,
            hasGeoLoc, locIn, null, null, null)
    }

}



