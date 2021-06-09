/*
ToDO:
- Fix Geo error in objects: 3541, 3662, 3663
- Add conditional coloring?
- Add comments
- Check URL for correct audio
 */

//DOM Elements definition
const pageId = window.location.href.split('_')[2];
const app = document.getElementById('root');
const figure =document.createElement("figure");

//Request items from API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=3527', true);
request.withCredentials = false;

//Request audio from API
const requestAudio = new XMLHttpRequest();
requestAudio.open('GET', 'https://www.corona-memory.ch/api/media?item_set_id=3527', true);
requestAudio.withCredentials = false;


request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            const obj_values = Object.values(object);
        })
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }

};
requestAudio.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (requestAudio.status >= 200 && requestAudio.status < 400) {
        data.forEach((object) => {
            const obj_values = Object.values(object);

            const audio = new AudioEntry(obj_values[3], Object.values(obj_values[15])[1],
                obj_values[4], obj_values[9], obj_values[22]);

            console.log(obj_values);

            if(BigInt(pageId) === BigInt(audio.entryId)){
                const audioPlayer = document.createElement("audio");
                audioPlayer.setAttribute("src",audio.audioFileUrl.toString());
                audioPlayer.setAttribute("controls","");
                figure.appendChild(audioPlayer);
                app.appendChild(figure);

            }



        })} else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
};

request.send();
requestAudio.send();





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
class AudioEntry{
    constructor(audioId, entryId, isPublic, title, audioFileUrl, ){
        this.ausioId = audioId;
        this.entryId = entryId;
        this.isPublic = isPublic;
        this.title = title;
        this.audioFileUrl = audioFileUrl;

    }
}






