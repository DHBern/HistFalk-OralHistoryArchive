/*
*
*
*/
var i= 0;
const collections = [];

// request items from API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527', true);
request.withCredentials = false;
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            const obj_values = Object.values(object);

            //creating Entry instances
            //generalInstance(id, isPublic, title, description, language, isSubjOf, created, creator)
            const general = Entry.generalInstance(
                BigInt(obj_values[3]),
                obj_values[4],
                obj_values[9],
                Object.values(obj_values[11])[0],
                Object.values(obj_values[17][0])[4],
                Object.values(obj_values[24][0])[4],
                Object.values(obj_values[23][0])[4],
                Object.values(obj_values[25][0])[4],
                Object.values(obj_values[26][0])[4],
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


            //set titles for conditional buttons and colors with isSubjectOf parameter
            if (!containsObject(general.isSubjof, collections)) {
                collections.push(general.isSubjof);
                console.log(collections)

                const app = document.getElementById(general.isSubjof.replaceAll(" ", "-"));
                //creates DOM elemts
                const h4Container = document.createElement("div");
                h4Container.setAttribute("id", general.isSubjof.replaceAll(" ", "-"));
                h4Container.setAttribute("class", "container");
                h4Container.setAttribute("style", "padding-right: 0px; padding-left: 0px;padding-top: 15px;padding-top: 15p");


                const h4 = document.createElement("h4");
                h4.setAttribute("style","text-align: left;")
                const h4Text = document.createTextNode(general.isSubjof);

                //appends elements
                h4.appendChild(h4Text);
                h4Container.appendChild(h4);
                app.appendChild(h4Container);
                console.log(app);
                i++
            }

        })
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app1.appendChild(errorMessage);
    }

};
request.send();


/*
Entry class definition
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
        return new Entry(null, null, null, null, null, null, null, null,
            hasGeoLoc, locIn, null, null, null)
    }

}



