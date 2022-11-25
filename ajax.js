//event listener for button
document.querySelector('button').addEventListener("click", getInfo);

//Variables needed
var genre;

//After choosing a genre from drop-down menu, filtering information
function filterMovies() {
    document.getElementById("moviegenre").select();
    switch (document.getElementById("moviegenre").value) {
        case "Animaatio":
            genre = "Animaatio";
            break;
        case "Draama":
            genre = "Draama";
            break;
        default:
            genre = "";
            document.getElementById("moviegenre").value = "";
    }
    getInfo();
}

//Function to fetch info from api
function getInfo() {
    if (genre != undefined) {
        var url = "https://www.finnkino.fi/xml/Events/" + genre;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                filterInfo(this);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}
/* TÄMÄ HETKEKSI PIILOON, EI TOIMINU, KOKEILEN ALEMPAA
Kokeillaan, että saanko tähän mitään. Genren perusteella?
function finterInfo(xml) {
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    table1 = "";
    x = xmlDoc.getElementsByTagName('Event');
    for (i = 0; i < x.length; i++) {
        txt += x[i].getAttributeNode('Genres').nodeValue + "<br>";
    }
    document.getElementById("data").innerHTML = table1;
}
_*/

//Function to parse xml
function filterInfo(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var event = xmlDoc.getElementsByTagName("Event");
    var titles = xmlDoc.getElementsByTagName("Title");
    var genres = xmlDoc.getElementsByTagName("Genres");
    //TARU VOISKO TÄHÄN KOKEILLA ETTÄ JOS EI OLEKAAN JUST SEN GENREN LEFFOJA OLEMASSA, NI ALERT?

   // var image = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
   // var tableImg = "<img id='movieimg' src='" + xmlDoc.getElementsByTagName("EventSmallImagePortrait")[i].childNodes[0].nodeValue + "'></img>";
    var table1= "<table><tbody><tr><td><strong>Title</strong></td><td><strong>Genre</strong></td></tr>";
    //console.log(xmlDoc);
    for (i = 0; i <event.length; i++) {
        table1 += "<tr><td>" + event[i].childNodes[0].nodeValue + "</td>" + "<td>" + titles[i].childNodes[0].nodeValue + "</td>" + "<td>" + genres[i].childNodes[0].nodeValue + "</td></tr>";

         }
table1 += "</tbody></table>";
document.getElementById("data").innerHTML = table1;
}



/*
document.getElementById("info").innerHTML =
this.responseText;
//en tiiä mihin väliin tää pitäis tunkee?
function filterInfo() {
    var xmlDoc = xhttp.responseXML;
    var titles = xmlDoc.getElementsByTagName("Title");
    var origTitle = xmlDoc.getElementsByTagName("OriginalTitle");
    var genres = xmlDoc.getElementsByTagName("Genres");
    var table1= "<tr><th>Title</th><th>Original title</th><th>Genres</th></tr>";
    console.log(xmlDoc);
    for (i = 0; i <titles.length; i++) {
        table1 += "<tr><td>" + titles[i].childNodes[0].nodeValue + "</td>" + "<td>" + 
        origTitle[i].childNodes[0].nodeValue + "<td>" + genres[i].childNodes[0].nodeValue + "</td></tr>";
        console.log(xmlDoc);

    }
    txt += "</tbody></table>";
    document.getElementById("data").innerHTML = txt;
}
*/
