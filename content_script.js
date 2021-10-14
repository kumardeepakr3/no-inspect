var elementKeyStr;

function elementSelection() {
  var focused = document.activeElement;
  var selectedText;

  if (selectedText == undefined) {
    var current_node = window.getSelection().anchorNode.parentNode;
    var div = document.createElement("div");
    var input = document.createElement("textarea");
    //input.setAttribute('type', 'text');
    input.setAttribute('rows', '5');
    input.setAttribute('cols', '50');
    input.size = 20;
    input.value = current_node.innerHTML;
    div.appendChild(input);

    var button = document.createElement("input");
    button.type = "button";
    button.value = "ok";
    button.style = "vertical-align: top;margin-left: 10px;";
    button.onclick = function () {
      current_node.innerHTML = input.value;
      div.parentNode.replaceChild(current_node, div);
    };

    div.appendChild(button);

    current_node.parentNode.replaceChild(div, current_node);
  }
}

function onExtensionMessage(request) {
  if (request['elementSelection'] != undefined) {
    if (!document.hasFocus()) {
      return;
    }
    elementSelection();
  } else if (request['key'] != undefined) {
    elementKeyStr = request['key'];
  }
}

function initContentScript() {
  chrome.extension.onRequest.addListener(onExtensionMessage);
  chrome.extension.sendRequest({ 'init': true }, onExtensionMessage);
}

initContentScript();
