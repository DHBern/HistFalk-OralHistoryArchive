/*
* Gets data from OMEKA API and parses JSON.
* Creates Entry instances general, person and geo from JSON (uses a copy of entry class).
* For more information about ENTRY class pleas reference entry.js and the documentation of this project.
* Generates DOM elements for homePage (colored buttons for each theme and titles).
 */

// Array of themes (see themes.txt in documentation)
const collections = [];
//DOM Elements definition
const app = document.getElementById('root');

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
            const person = Entry.personInstance(
                Object.values(obj_values[19][0])[4],
                Object.values(obj_values[20][0])[4],
                Object.values(obj_values[18][0])[4],
            );




            // creates correct permalink for the posts (see generate-md-files.js as refrence)
            var permalink =  "Interview_"+general.id;


            //creates DOM elements for conditional buttons
            const flexItem = document.createElement("li");
            flexItem.setAttribute("class", "flex-item");

            const a = document.createElement("a");
            setAttributes(a,{"class": "use-loader", "href":permalink})

            const nameBtn = document.createElement("button");
            setAttributes(nameBtn,{ "class": "btn btn-primary","style": "font-variant: small-caps;" })

            const name = document.createTextNode(person.firstName + " " + person.lastName);

            //"Beiträge" Buttons
            const publicationBtn = document.createElement("button");
            setAttributes(publicationBtn,{"class": "btn btn-outline-primary","style":"float: right"});

            const publication = document.createTextNode("Kontext");
            publicationBtn.appendChild(publication);

            function finalAppend(){
                nameBtn.appendChild(name);
                flexItem.appendChild(nameBtn);
                a.appendChild(nameBtn);
                flexItem.appendChild(a);
            }


            /*
            * Creates conditional buttons.
            * Sets text and colors via if clause using isSubjectOf parameter.
            */
            // If the theme xy is already contained in collections array
            if (containsObject(general.isSubjof, collections)) {
                for (let i = 0; i < collections.length; i++) {
                    if (collections[i] === general.isSubjof) {
                        if(general.isSubjof !=="Podcastbeitrag"){
                        //gets correct container by id
                        const flexContainerById = document.getElementById("id-"+general.isSubjof.replaceAll(" ", "-"));

                        finalAppend();
                        flexContainerById.appendChild(flexItem);
                        app.appendChild(flexContainerById);

                    }}
                }
            }

            // If the theme xy is not contained in collections array
            if (!containsObject(general.isSubjof, collections)) {
                // add to array
                if(general.isSubjof !=="Podcastbeitrag"){
                    collections.push(general.isSubjof);



                //creates DOM elemts
                const flexContainer = document.createElement("ul");
                setAttributes(flexContainer,{"class":"flex-container wrap","id": "id-"+general.isSubjof.replaceAll(" ", "-")  })

                const h4Container = document.createElement("div");
                setAttributes(h4Container, {"class":"container", "style": "padding-right: 0px; padding-left: 0px;padding-top: 15px;"})

                const row = document.createElement("div");
                setAttributes(row, {"class":"row","style":"padding: 0"})

                const col9 = document.createElement("div");
                setAttributes(col9, {"class":"col-md-9", "style":"display: inline-block;" })

                const col3 = document.createElement("div");
                col3.setAttribute("class","col-md-3");

                const h4 = document.createElement("h4");
                h4.setAttribute("style","text-align: left;");

                const h4Text = document.createTextNode(general.isSubjof);

                publicationBtn.addEventListener("click",function () {
                    location = "/Publikationen#"+"id-"+general.isSubjof.replaceAll(" ", "-")+"-links"
                });


                //appends all elements
                h4.appendChild(h4Text);
                if(general.isSubjof === '«Schwarzenbach-Abstimmung»' || general.isSubjof === "Saisonnières und Saisonniers"
                    || general.isSubjof === "Wenn Migration die Arbeitsteilung in der Familie prägt" || general.isSubjof === "Einbürgerungen à la Schweizermacher"){
                    col3.appendChild(publicationBtn);
                }

                col9.appendChild(h4);
                row.append(col9, col3);
                h4Container.appendChild(row);


                finalAppend();
                flexContainer.append(h4Container, flexItem);
                app.appendChild(flexContainer);


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
}

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
//sets multiple Attributes
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}






