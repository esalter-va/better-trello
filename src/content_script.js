var PIVOTAL_REGEX = /\[#[0-9]+\]/;
var NON_NUMERIC_REPLACE_REGEX = /\D/g;

var pivotal = function() {
    var elements = document.getElementsByClassName("list-card");
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.addEventListener('change', function() {
            checkTitlesForPivotal(el);
            checkLabelsForPivotal(el);
        });
        checkTitlesForPivotal(el);
        checkLabelsForPivotal(el);
    }
}

function checkTitlesForPivotal(el) {
    var titleEl = el.getElementsByClassName("list-card-title")[0];
    var titleText = titleEl.innerText;
    var match = titleText.match(PIVOTAL_REGEX);
    if (match) {
        var pivotalNumber = match[0].replace(NON_NUMERIC_REPLACE_REGEX, '');
        titleText = titleText.replace(match[0], '')
        titleEl.innerText = titleText;
        addPivotalLink(el, pivotalNumber)
    }
}

function checkLabelsForPivotal(el) {
    var labelEl = el.getElementsByClassName('list-card-labels')[0];
    labels = labelEl.childNodes;
    for (var i = 0; i < labels.length; i++) {
        var labelEl = labels[i];
        var labelText = labelEl.innerText;
        var match = labelText.match(PIVOTAL_REGEX);
        if (match) {
            var pivotalNumber = match[0].replace(NON_NUMERIC_REPLACE_REGEX, '');
            addPivotalLink(el, pivotalNumber);
        }
    }
}

function addPivotalLink(el, pivotalNumber) {
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