/*
ToDO:
- Fix Geo error in objects: 3541, 3662, 3663
- Add conditional coloring
- Add "post" links to the buttons
- Add comments
 */


//Dom Elements
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

            //Dom Button
            const nameBtn = document.createElement('Button');
            nameBtn.setAttribute('class', 'btn btn-primary');
            nameBtn.setAttribute('type', 'Button');
            nameBtn.setAttribute("display","inline-block");

            const flexItem = document.createElement("li");
            flexItem.setAttribute("class", "flex-item");

            var obj_values = Object.values(object);

            /*
            Entry information
             */
            const Entry = {
                id: BigInt(obj_values[3]),
                isPublic: obj_values[4] ,
                title: obj_values[9],
                description: Object.values(obj_values[17][0])[4],
                language:Object.values(obj_values[24][0])[4],
                created: Object.values(obj_values[11])[0],
                lastModified: Object.values(obj_values[12])[0]
            };
            /*
         Person information
           */
            const Person = {
                firstName: Object.values(obj_values[19][0])[4],
                lastName: Object.values(obj_values[20][0])[4],
                birthday: Object.values(obj_values[18][0])[4]
            };
            /*
            Geo information
             */
            const GeoInfo ={
                hasGeoLocation: Object.values(obj_values[21][0])[4],
                locatedIn: Object.values(obj_values[22][0])[4] ,
                isSubjectOf: Object.values(obj_values[23][0])[4]
            };

            // Append text to button and button to the container element
            const name = document.createTextNode(Person.firstName+" "+Person.lastName);
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





