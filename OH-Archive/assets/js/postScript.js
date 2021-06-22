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
const figure = document.createElement("figure");

//Request audio from API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.corona-memory.ch/api/media?item_set_id=3527', true);
request.withCredentials = false;
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach((object) => {
            const obj_values = Object.values(object);
            const media = new MediaEntry(obj_values[3], Object.values(obj_values[15])[1],
                obj_values[4], obj_values[9], obj_values[17].toString().split('/')[0], obj_values[22]);
            const mediaTypeEnd = media.mediaFileUrl.toString().split(".");

            if (BigInt(pageId) === BigInt(media.entryId)) {
                console.log(media);
                if(media.mediaType === "video" && mediaTypeEnd[3] === "mp4"){

                    //const mediaTitle = document.createElement("h4");
                    //const mediaTextTitle = document.createTextNode(media.title);
                    //mediaTitle.appendChild(mediaTextTitle);
                    const videoPlayer = document.createElement("video");
                    videoPlayer.setAttribute("src", media.mediaFileUrl.toString());
                    videoPlayer.setAttribute("type", "video/mp4");
                    videoPlayer.setAttribute("controls", "");
                    videoPlayer.setAttribute("width", "100%");
                    //app.appendChild(mediaTitle)
                    figure.appendChild(videoPlayer);
                    app.appendChild(figure);

                }
                else{
                    const audioPlayer = document.createElement("audio");
                    audioPlayer.setAttribute("src", media.mediaFileUrl.toString());
                    audioPlayer.setAttribute("controls", "");
                    audioPlayer.setAttribute("width", "100%");
                    figure.appendChild(audioPlayer);
                    app.appendChild(figure);

                }

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
class MediaEntry {
    constructor(mediaId, entryId, isPublic, title,mediaType, mediaFileUrl,) {
        this.mediaId = mediaId;
        this.entryId = entryId;
        this.isPublic = isPublic;
        this.title = title;
        this.mediaType = mediaType;
        this.mediaFileUrl = mediaFileUrl;
    }
}






