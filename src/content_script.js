var PIVOTAL_REGEX = /\[#[0-9]+\]/g;
var NON_NUMERIC_REPLACE_REGEX = /\D/g;
var BETTER_TRELLO_PIVOTAL_LABELS = 'better-trello-pivotal-labels';
var BETTER_TRELLO_PIVOTAL_TITLES = 'better-trello-pivotal-titles';

var pivotal = function() {
    var elements = document.getElementsByClassName("list-card");
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        checkTitlesForPivotal(el);
        checkLabelsForPivotal(el);
    }
}

function checkTitlesForPivotal(el) {
    clearPivotals(el, BETTER_TRELLO_PIVOTAL_TITLES);
    var titleEl = el.getElementsByClassName("list-card-title")[0];
    checkForPivotal(el, titleEl, BETTER_TRELLO_PIVOTAL_TITLES);
}

function checkLabelsForPivotal(el) {
    clearPivotals(el, BETTER_TRELLO_PIVOTAL_LABELS);
    var labelEl = el.getElementsByClassName('list-card-labels')[0];
    labels = labelEl.childNodes;
    for (var i = 0; i < labels.length; i++) {
        checkForPivotal(el, labels[i], BETTER_TRELLO_PIVOTAL_LABELS);
    }
}

function checkForPivotal(parentEl, el, type) {
    var elText = el.innerText;
    var match = elText.match(PIVOTAL_REGEX);
    if (match) {
        match.forEach(function(pivotal) {
            var pivotalNumber = match[0].replace(NON_NUMERIC_REPLACE_REGEX, '');
            addPivotalLink(parentEl, pivotalNumber, type);
        });
    }
}

function clearPivotals(el, type) {
    var currentPivotals = el.getElementsByClassName(type);
    while (currentPivotals.length > 0) {
        currentPivotals[0].remove();
    }
}

function addPivotalLink(el, pivotalNumber, type) {
    var badgesEl = el.getElementsByClassName('badges')[0];
    var pivotalEl = document.createElement('span')
    pivotalEl.classList.add(type);
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

var labelObserver = new MutationObserver(function (mutations) {
    var parent = mutations[0].target.parentElement.parentElement;
    checkLabelsForPivotal(parent);
});

labelObserver.observe(document.querySelector(".list-card-labels"), {
    childList: true,
    subtree:true
});

var titleObserver = new MutationObserver(function (mutations) {
    var parent = mutations[0].target.parentElement.parentElement;
    checkTitlesForPivotal(parent);
});

titleObserver.observe(document.querySelector(".list-card-title"), {
    childList: true,
    subtree:true
});