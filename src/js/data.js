 var scores = document.getElementById("scores");
 var addScore = document.querySelector(".add-score-block");

 function getScores() {
    $.ajax({
        type: 'GET',
        url:  'http://157.230.98.200/snake/scores',
    }).done(function(result) {
        scores.innerHTML += "<div>" + result + "</div>";
    }).fail(function (jqXHR, exception) {
        console.error(jqXHR);
        console.error(exception);
    });
}

getScores();

 function showWindowAddScore() {
    addScore.classList.add("add-score-block__show")
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    if (matches !== null && matches[1] !== "undefined") {
        return decodeURIComponent(matches[1]);
    } else {
        return false;
    }
}

function setCookie(name, value) {  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);  
    document.cookie = updatedCookie;
    return value;
}