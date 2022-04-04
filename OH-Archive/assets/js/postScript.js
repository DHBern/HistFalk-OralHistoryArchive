/*
* Gets media from OMEKA API and parses JSON. Each requests gets all the media from oral-history-collection.
* Checks for matching media for each post.
* Generates DOM elements for posts (media player).

*/

//DOM Elements definition
const pageId = window.location.href.split('_')[1];
const mediaPlayer = document.getElementById("mediaPlayer");
const chevron_left = document.getElementById("chevron_left");
const chevron_right = document.getElementById("chevron_right");
const figure = document.createElement("figure");
const nextNeighbourLink = [];

//Request media from API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/media?item_set_id=3527&sort_order=desc', true);
request.withCredentials = false;
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            console.log(Object.values(object))
            const obj_values = Object.values(object);
            const media = new MediaEntry(obj_values[3], Object.values(obj_values[15])[1],
                obj_values[4], obj_values[9], obj_values[17].toString().split('/')[0], obj_values[23]);
            const mediaTypeEnd = media.mediaFileUrl.toString().split(".");

            /*
            * Checks for matching media via pageId and entryId.
            * Checks if it is video or audio.
            * creates media DOM element.
             */

            nextNeighbourLink.push(media.entryId);


            if (BigInt(pageId) === BigInt(media.entryId)) {
                if(media.mediaType === "video" && mediaTypeEnd[3] === "mp4"){

                    const videoPlayer = document.createElement("video");
                    setAttributes(videoPlayer,{"src":media.mediaFileUrl.toString(), "type": "video/mp4",
                        "controls": "","width":"100%", "height":"100%", "loop":"loop", "muted":"", "defaultMuted":"", "playsinline":""})
                    figure.appendChild(videoPlayer);
                    mediaPlayer.appendChild(figure);

                }
                else{
                    const audioPlayer = document.createElement("audio");
                    setAttributes(audioPlayer,{"src":media.mediaFileUrl.toString(),
                        "controls": "","width":"100%"})
                    figure.appendChild(audioPlayer);
                    mediaPlayer.appendChild(figure);
                }
            }

        });

        //Add before and next (chevron button)
        for(var i = 0;i< nextNeighbourLink.length;i++){
            if(BigInt(nextNeighbourLink[i])===BigInt(pageId)){
                if(BigInt(i)=== BigInt(nextNeighbourLink.length-1)){
                    chevron_left.setAttribute("href","Interview_"+nextNeighbourLink[i-1]);
                    chevron_right.setAttribute("href","Interview_"+nextNeighbourLink[0]);

                }
                if(i === 0){
                    chevron_left.setAttribute("href","Interview_"+nextNeighbourLink[nextNeighbourLink.length-1]);
                    chevron_right.setAttribute("href","Interview_"+nextNeighbourLink[i+1])

                }
                if(i!==0){
                    if(BigInt(i) !== BigInt(nextNeighbourLink.length-1)) {
                    chevron_left.setAttribute("href","Interview_"+nextNeighbourLink[i-1]);
                    chevron_right.setAttribute("href","Interview_"+nextNeighbourLink[i+1])

                    }

            }
        }}
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        mediaPlayer.appendChild(errorMessage);
    }
};

request.send();


/*
MediaEntry class definition
 */
class MediaEntry {
    constructor(mediaId, entryId, isPublic, title,mediaType, mediaFileUrl) {
        this.mediaId = mediaId;
        this.entryId = entryId;
        this.isPublic = isPublic;
        this.title = title;
        this.mediaType = mediaType;
        this.mediaFileUrl = mediaFileUrl;
    }
}

//sets multiple Attributes
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}




