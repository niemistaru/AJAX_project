//event listener for button
document.querySelector('button').addEventListener("click", getInfo);

//Function to fetch info from api
function getInfo() {
    var url = "https://www.finnkino.fi/xml/Events/";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            filterInfo(this);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Function to parse information the way I want it...
function filterInfo(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var event = xmlDoc.getElementsByTagName("Event");
    var titles = xmlDoc.getElementsByTagName("Title");
    var genres = xmlDoc.getElementsByTagName("Genres");
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
