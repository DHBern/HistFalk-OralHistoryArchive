/*
ToDO:
- Currently following by part this tutorial:
https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
 */
const request = new XMLHttpRequest();
request.open('GET','https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527', true);
request.withCredentials = false;
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object)=>{
            console.log(object);
            console.log(Object.keys(object));
            console.log(Object.entries(object));
        })

    }
    else {
        console.log('error')
    }
};

request.send();


