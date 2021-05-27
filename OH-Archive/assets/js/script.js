/*
ToDO:
- Currently following by part this tutorial:
https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
- Fix Geo error in objects: 3541, 3662, 3663
 */
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527', true);
request.withCredentials = false;
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            var obj_keys = Object.keys(object);
            var obj_values = Object.values(object);
            var id = obj_values[3];
            var is_public = obj_values[4];

            /*
            Entry information
            [title, created, lastModified, description, language]
             */
            var entry_info =[obj_values[9],Object.values(obj_values[11])[0],Object.values(obj_values[12])[0],
                Object.values(obj_values[17][0])[4], Object.values(obj_values[24][0])[4]]
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
            var i;
            /*for (i = 20; i < obj_keys.length; i++) {
                console.log(i);
                console.log(obj_keys[i]);
                console.log(obj_values[i]);
            }*/
    })

    } else {
        console.log('error')
    }
};

request.send();


