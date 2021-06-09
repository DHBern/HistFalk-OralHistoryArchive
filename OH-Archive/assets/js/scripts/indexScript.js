/*
ToDO:
- Fix Geo error in objects: 3541, 3662, 3663
- Add comments
 */

const collections = [];
//DOM Elements definition
const app = document.getElementById('root');

//second request items from API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527', true);
request.withCredentials = false;

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            const obj_values = Object.values(object);

            /*
            Entry Instances general, person and geo
             */
            const general = Entry.generalInstance(
                BigInt(obj_values[3]),
                obj_values[4] ,
                obj_values[9],
                Object.values(obj_values[17][0])[4],
                Object.values(obj_values[24][0])[4],
                Object.values(obj_values[11])[0],
                Object.values(obj_values[12])[0],
                Object.values(obj_values[23][0])[4]

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


            function containsObject(obj, list) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i] === obj) {
                        return true;
                    }
                }
                return false;
            }







            //create DOM elements
            const flexItem = document.createElement("li");
            flexItem.setAttribute("class", "flex-item");

            var permalink = person.firstName.replace(/\s/g, "")+"_"+
                person.lastName.replace(/\s/g, "")+"_"+general.id;
            const nameBtn = document.createElement("button");
            nameBtn.setAttribute("class", "btn btn-primary");
            nameBtn.addEventListener("click", function(){
                location = permalink});
            const name = document.createTextNode(person.firstName+" "+person.lastName);






            var i = 0;

            //set titles for conditional buttons and colors with isSubjectOf parameter
                if(containsObject(general.isSubjof,collections)){
                    for (i = 0; i<collections.length;i++){
                        if(collections[i] === general.isSubjof){
                            const flexContainerById = document.getElementById(general.isSubjof);
                            nameBtn.appendChild(name);
                            flexItem.appendChild(nameBtn);
                            flexContainerById.appendChild(flexItem);
                            app.appendChild(flexContainerById);
                            console.log("there")
                        }
                    }
                }
            if(!containsObject(general.isSubjof,collections)){
                    collections.push(general.isSubjof);
                    //create DOM elemts
                    const flexContainer = document.createElement("ul");
                    flexContainer.setAttribute("class", "flex-container wrap");
                    flexContainer.setAttribute("id",general.isSubjof);

                    const h4Container = document.createElement("div");
                    h4Container.setAttribute("class", "container");
                    const h4 = document.createElement("h4");
                    h4.setAttribute("style", "font-variant: small-caps;")
                    const h4Text = document.createTextNode(general.isSubjof);
                    h4.appendChild(h4Text);
                    h4Container.appendChild(h4);
                    flexContainer.appendChild(h4Container);

                    nameBtn.appendChild(name);
                    flexItem.appendChild(nameBtn);
                    flexContainer.appendChild(flexItem);
                    app.appendChild(flexContainer);
                }






        })
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }

};
request.send();




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
                           lastMod, isSubjOf){
        return new Entry(id, isPublic, title, description, language, created,
            lastMod,null,null,null,null,
            null,isSubjOf)
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





