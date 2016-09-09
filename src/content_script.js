var PIVOTAL_REGEX = /\[#[0-9]+\]/;

var pivotal = function() {
    var elements = document.getElementsByClassName("list-card");
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var titleEl = el.getElementsByClassName("list-card-title")[0];
        var titleText = titleEl.innerText;
        var match = titleText.match(PIVOTAL_REGEX);
        if (match) {
            var pivotalNumber = match[0].replace(/\D/g, '');
            titleText = titleText.replace(match[0], '')
            titleEl.innerText = titleText;
            addPivotalLink(el, pivotalNumber)
        }
    }
}

function addPivotalLink(el, pivotalNumber) {
    console.log(el, pivotalNumber);
    var badgesEl = el.getElementsByClassName('badges')[0];
    var pivotalEl = document.createElement('span')
    pivotalEl.classList.add('badge-icon');
    pivotalEl.classList.add('icon-sm');
    var imageUrl = chrome.extension.getURL('assets/pivotal.png');
    pivotalEl.style.backgroundImage = 'url("' + imageUrl + '")';
    pivotalEl.addEventListener('click', function() {
        window.open('https://www.pivotaltracker.com/story/show/' + pivotalNumber);
    })
    badgesEl.appendChild(pivotalEl);
}

pivotal();