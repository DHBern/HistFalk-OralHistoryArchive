/*
ToDO:
- Fix Geo error in objects: 3541, 3662, 3663
 */

const request = new XMLHttpRequest();
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
request.open('GET', 'https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527', true);
request.withCredentials = false;
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            const h1 = document.createElement('h1')

            var obj_values = Object.values(object);
            /*
            Entry information
            [id, is_public, title, created, lastModified, description, language]
             */
            var entry_info =[obj_values[3], obj_values[4], obj_values[9],Object.values(obj_values[11])[0],
                Object.values(obj_values[12])[0], Object.values(obj_values[17][0])[4],
                Object.values(obj_values[24][0])[4]];
            /*
           Person information
            [firstName, familyName, birthday]
             */

            var pers_info = [Object.values(obj_values[19][0])[4], Object.values(obj_values[20][0])[4],
                Object.values(obj_values[18][0])[4]];
            /*
            Geo information
            [hasGeoLocation, locatedIn, isSubjectOf]
             */

            var geo_info = [Object.values(obj_values[21][0])[4],Object.values(obj_values[22][0])[4],
                Object.values(obj_values[23][0])[4]];


            h1.textContent = entry_info[2].toString();
            // Append the cards to the container element
            container.appendChild(card)
            // Each card will contain an h1 and a p
            card.appendChild(h1)


        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage);
    }

};

request.send();





