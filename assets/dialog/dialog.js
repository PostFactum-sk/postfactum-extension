const delay = (function () {
    let timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();


function send_request(action) {
    chrome.tabs.getSelected(null, function(tab) {
        const data = new FormData();
        data.append('url', tab.url);
        data.append('action', action);
        data.append('title', tab.title);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://stg.postfactum.sk/api/v1/source_articles/submit/', true);
        // Keep both URLs for fast switching between local and remote servers
        // xhr.open('POST', 'http://127.0.0.1:8000/api/v1/source_articles/submit/', true);
        xhr.onload = function () {
            const responseDiv = document.getElementById("r-response");
            responseDiv.classList.add("r-response");
            responseDiv.innerHTML = "Požiadavka bola odoslaná.<br>Ďakujeme";
            console.log(this.responseText);
            delay(function(){
                // responseDiv.style.visibility = "hidden";
                responseDiv.innerHTML = "";
                responseDiv.classList.remove("r-response");
            }, 2000 );
        };
        xhr.send(data);
    })
}



document.getElementById('submitPage').addEventListener('click',function(){
    // console.log('submitPage click')
    send_request("submit_url")
});

document.getElementById('upVote').addEventListener('click',function(){
    // console.log('upVote click')
    send_request("upvote_url")
});

document.getElementById('downVote').addEventListener('click',function(){
    // console.log('downVote click')
    send_request("downvote_url")
});