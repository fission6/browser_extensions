// Copyright (c) 2011 Daniel Saewitz. All rights reserved.

function genericOnClick(info, tab) {
  chrome.tabs.getSelected(null,function(tab) {
      copy(info.selectionText);
  });
}

function copy(text) {
	var clip = document.getElementById('clip');

	// Default the clipboard text to that of the URLs separated by a \n
	if (text === undefined)
		text = urls.join("\n");

	// Set the clipboard text
	
	clip.value = text;
	clip.select();
	document.execCommand('Copy');
}

var title = "Copy '%s' Unformatted";
var id = chrome.contextMenus.create({"title": title, 
                                     "contexts": ["selection"],
                                     "onclick": genericOnClick});