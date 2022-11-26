//Event listener to input (select movie theatre)
document.querySelector('input').addEventListener('input', function(event) {
    filterMovies(event.target.value);
});


//LAITETAAN TÄÄ KU EI MIKÄÄN TOIMIwindow.onload = document.getElementById("movietheatre").select();
//event listener for button TAI SITTTEN INPUT
/*TÄTÄKIN KOKEILIN
window.onload = function() {
    document.querySelector('input').oninput = function () {
        filterMovies(this.value);
    }
}
*/
//document.querySelector('input').oninput = filterMovies();
   
//laitetaas tää hetkeks piiloon input.addEventListener("select", filterMovies);
/*
const getButton = document.querySelector('.btn-info');
getButton.addEventListener("click", filterMovies);
*/
//Variables needed
var theatreID;

//After choosing a theatre from drop-down menu, filtering information
function filterMovies() {
    document.getElementById("movietheatre").select();
    switch (document.getElementById("movietheatre").value) {
        case "Pääkaupunkiseutu":
            theatreID = 1014;
            break;
        case "Espoo":
            theatreID = 1012;
            break;
        case "Espoo: Omena":
            theatreID = 1039;
            break;    
        case "Espoo: Sello":
            theatreID = 1038;
            break;
        case "Helsinki":
            theatreID = 1002;
            break;
        case "Helsinki: Itis":
            theatreID = 1045;
            break;
        case "Helsinki: Kinopalatsi":
            theatreID = 1031;
            break;
        case "Helsinki: Maxim":
            theatreID = 1032;
            break;
        case "Helsinki: Tennispalatsi":
            theatreID = 1033;
            break;
        case "Vantaa: Flamingo":
            theatreID = 1013;
            break;
     
        default:
            theatreID = null;
            document.getElementById("movietheatre").value = "";
        
    }
   // console.log(theatreID);
    getInfo();
}

//Function to fetch info from api
function getInfo() {
    if (theatreID != undefined) {
        var url = "https://www.finnkino.fi/xml/Schedule/?area" + theatreID;
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

//Function to parse xml: image, title
function filterInfo(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table1= "<table><tbody>";
    var shows = xmlDoc.getElementsByTagName("Show");
     // If there's no movies in the selected theatre, alert user
     if (shows.length == 0) {
        var theatreName = document.getElementById("movietheatre").value;
        if (theatreName =="") {
            alert("Valitussa teatterissa " + theatreName + " ei mene tällä hetkellä elokuvia. Valitse jokin toinen.")
            document.getElementById("movietheatre").value = "";
        }

    } else {   
        for (i = 0; i <shows.length; i++) {
            var image = "<img id='moviePic' src='" + shows[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'></img>";
            table1 += "<tr><td id='image'>" + image + "</td>" +
            "<td id='title'>" + shows[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +"</td>" +
            "<td id='time'>" + shows[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue + 
            "</td></tr>";
         }
    table1 += "</tbody></table>";
    document.getElementById("data").innerHTML = table1;
    }
}


 // var image = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
   // var tableImg = "<img id='movieimg' src='" + xmlDoc.getElementsByTagName("EventSmallImagePortrait")[i].childNodes[0].nodeValue + "'></img>";
   
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
