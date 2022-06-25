const ja = document.getElementById("ja");
const en = document.getElementById("en");
const glot = new Glottologist();

function main() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var speech = new SpeechRecognition();
    speech.lang = "ja-JP";
    speech.interimResults = true;
    speech.continuous = true;
    
    speech.onsoundstart = function() {
        speech.start();
    };
    speech.onerror = function() {
        if(speeching == 0) {
            main();
        }
    };
    speech.onsoundend = function() {
        main();
    };
    speech.onresult = function(e) {
        var results = e.results;
        for (var i = e.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
                ja.textContent = results[i][0].transcript;
                translate();
                main();
            } else {
                ja.textContent = results[i][0].transcript;
                translate();
                speeching = 1;
            }
        }
    }
    speeching = 0;
    speech.start();
}


function translate() {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${ja.textContent}&langpair=ja|en`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        en.textContent = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                en.textContent = data.translation;
            }
        });
    });
    // reference: https://mymemory.translated.net/doc/spec.php
}