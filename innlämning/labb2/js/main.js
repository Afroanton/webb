"use strict";

var baseURL = "https://legacy-ad-api.jobtechdev.se";

// läser in alla län från arbetsförmedlingens sida tillsammans med de sammanhängande id för repspektive län, Och lägger sidan in den infon i "mainavlist" och "searchlan".
document.addEventListener("DOMContentLoaded", function () {
    var xmlhttp = new XMLHttpRequest();

    
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {

                var jsonData = JSON.parse(xmlhttp.responseText);
                document.getElementById("searchlan").innerHTML = "";
                for (var i = 0; i < jsonData.soklista.sokdata.length; i++) {
                    document.getElementById("mainnavlist").innerHTML += "<li id='" + jsonData.soklista.sokdata[i].id + "'>" + jsonData.soklista.sokdata[i].namn + " (" + jsonData.soklista.sokdata[i].antal_ledigajobb + ")</li>";
                    document.getElementById("searchlan").innerHTML += "<option value='" + jsonData.soklista.sokdata[i].id + "'>" + jsonData.soklista.sokdata[i].namn + "</option>";
                }
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", baseURL + "/soklista/lan", true);
    xmlhttp.send();
});

//funktion som anropas av olika eventliseners. denna funktion hämtar viss data om olika typer av jobb beroende på vilka alternativ är valda tex antal jobb som ska synas, vilket län jobbet ska ligga i och yrkesområdet. 
function showjobs(e) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) { 

                var jsonData = JSON.parse(xmlhttp.responseText);
                document.getElementById("info").innerHTML = "";
                for (var j = 0; j < document.getElementById("numrows").value; j++) {

                    document.getElementById("info").innerHTML += "<h3 id ='" + jsonData.matchningslista.matchningdata[j].annonsid + "'>"
                        + jsonData.matchningslista.matchningdata[j].yrkesbenamning + "</h3>" +
                        "<p>" +
                        jsonData.matchningslista.matchningdata[j].annonsrubrik + "<br>" +
                        "Anställningstyp: " + jsonData.matchningslista.matchningdata[j].anstallningstyp + "<br>" +
                        "Antal Platser: " + jsonData.matchningslista.matchningdata[j].antalPlatserVisa + "<br>" +
                        "Publiceringsdatum: " + jsonData.matchningslista.matchningdata[j].publiceraddatum + "<br>" +
                        "Sista ansökningsdag: " + jsonData.matchningslista.matchningdata[j].sista_ansokningsdag + "<br>" +
                        "</p>" +
                        "<button id='" + jsonData.matchningslista.matchningdata[j].annonsid + "button' class='btn btn-primary' onclick=window.location.href='" + jsonData.matchningslista.matchningdata[j].annonsurl + "'>Läs Mer</button>";


                }
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };
    if (document.getElementById("onlyit").checked == true) {
        xmlhttp.open("GET", baseURL + "/matchning?lanid=" + e + "&antalrader=" + document.getElementById("numrows").value + "&yrkesomradeid=3", true);
    }
    else {
        xmlhttp.open("GET", baseURL + "/matchning?lanid=" + e + "&antalrader=" + document.getElementById("numrows").value, true);
    }

    xmlhttp.send();
}





// skappar en eventlistener som kollar om något utav länen har blivit klickade på och då detta händer kört showjobs funktion med län id till länet. 
document.getElementById('mainnavlist').addEventListener("click", function (e) {

    showjobs(e.target.id);

});

// skappar en eventlistener som kollar om sök knappen blivit klickad på utav. då den blivit de hämtas info om vilket län som är valt och vad som står i sökrutan och visar hämtar 
//sedan info om jobb som stämmer överens med den givna infon. 
document.getElementById('searchbutton').addEventListener("click", function (e) {

    var xmlhttp = new XMLHttpRequest();
    
    //
    // Read all LÃ„N and dynamically create list from AF
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {

                var jsonData = JSON.parse(xmlhttp.responseText);
                //alert("Du har valt lÃ¤n med id ");
                document.getElementById("info").innerHTML = "";

                for (var k = 0; k < document.getElementById("numrows").value; k++) 
                {
                    
                    document.getElementById("info").innerHTML += "<h3>"+jsonData.matchningslista.matchningdata[k].yrkesbenamning+"</h3>"+
                    "<p> arbetsplats: "+jsonData.matchningslista.matchningdata[k].arbetsplatsnamn+
                    "<br> kommun: "+jsonData.matchningslista.matchningdata[k].kommunnamn+
                    "<br> antalplatser: "+jsonData.matchningslista.matchningdata[k].antalplatser+
                    "<br><button id='" + jsonData.matchningslista.matchningdata[k].annonsid + "button' class='btn btn-primary' onclick=window.location.href='" + jsonData.matchningslista.matchningdata[k].annonsurl + "'>Läs Mer</button>";"</p>"; 

                }
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", baseURL + "/matchning?lanid="+document.getElementById("searchlan").value+"&nyckelord="+document.getElementById("searchText").value, true);
    xmlhttp.send();

}); 