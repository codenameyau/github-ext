'use strict';

var linksTextarea = document.getElementById('textarea-links');
var linksCount = document.getElementById('links-count');
var openLinksBtn = document.getElementById('open-links-btn');
var splitRegex = new RegExp('[ \\n]+', 'g');

function displayLinks(links) {
  linksTextarea.value = links.length ? links.join('\n') + '\n' : '';
  linksCount.textContent = links.length;
}

function parseLinks(textarea) {
  var text = textarea.value.trim();
  if (!text) { return []; }
  return text.split(splitRegex).map(function(value) {
    return value.trim();
  });
}

function saveLinks(e) {
  // Specs: The system should save whenever it detects that a link(s) has
  // been added or removed. Otherwise it should ignore input until either
  // 'enter', 'backspace', or 'ctr+v' is pressed.
  var pressedEnter = e.keyCode === 13;
  var pressedBackspace = e.keyCode === 8;
  var pressedPaste = e.ctrlKey && e.keyCode === 86;

  if (pressedEnter || pressedBackspace || pressedPaste) {
    var links = parseLinks(linksTextarea);
    chrome.storage.sync.set({ 'textarea-links': links });
    displayLinks(links);
  }
}

function openLinks(e) {
  var links = parseLinks(linksTextarea);
  links.forEach(function(link) {
    chrome.tabs.create({
      url: link
    });
  });
}

linksTextarea.addEventListener('keyup', saveLinks);
openLinksBtn.addEventListener('click', openLinks);

chrome.storage.sync.get('textarea-links', function(items) {
  displayLinks(items['textarea-links']);
});
