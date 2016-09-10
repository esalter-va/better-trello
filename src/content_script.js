var PIVOTAL_REGEX = /\[#[0-9]+\]/;
var NON_NUMERIC_REPLACE_REGEX = /\D/g;
var BETTER_TRELLO_PIVOTAL = 'better-trello-pivotal';

var pivotal = function() {
    var elements = document.getElementsByClassName("list-card");
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        checkTitlesForPivotal(el);
        checkLabelsForPivotal(el);
    }
}

function checkTitlesForPivotal(el) {
    clearPivotals(el);
    var titleEl = el.getElementsByClassName("list-card-title")[0];
    checkForPivotal(el, titleEl);
}

function checkLabelsForPivotal(el) {
    clearPivotals(el);
    var labelEl = el.getElementsByClassName('list-card-labels')[0];
    labels = labelEl.childNodes;
    for (var i = 0; i < labels.length; i++) {
        checkForPivotal(el, labels[i]);
    }
}

function checkForPivotal(parentEl, el) {
    var elText = el.innerText;
    var match = elText.match(PIVOTAL_REGEX);
    if (match) {
        var pivotalNumber = match[0].replace(NON_NUMERIC_REPLACE_REGEX, '');
        addPivotalLink(parentEl, pivotalNumber);
    }
}

function clearPivotals(el) {
    var currentPivotals = el.getElementsByClassName(BETTER_TRELLO_PIVOTAL);
    while (currentPivotals.length > 0) {
        currentPivotals[0].remove();
    }
}

function addPivotalLink(el, pivotalNumber) {
    var badgesEl = el.getElementsByClassName('badges')[0];
    var pivotalEl = document.createElement('span')
    pivotalEl.classList.add(BETTER_TRELLO_PIVOTAL);
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

var observer = new MutationObserver(function (mutations) {
    var parent = mutations[0].target.parentElement.parentElement;
    checkLabelsForPivotal(parent);
});

observer.observe(document.querySelector(".list-card-labels"), {
    childList: true,
    subtree:true
});