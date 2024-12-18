document.querySelector("#find-button").onclick = () => {
    sendMessage("find-me", document.querySelector("#name").value);
};

document.querySelector("#reload-button").onclick = () => {
    document.querySelector("#result-block").style.display = "none";
    document.querySelector("form").style.display = "block";
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
    });
};

const sendMessage = (message, data) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { flutterSupes: { action: message, data: data }});
    });
};

chrome.runtime.onMessage.addListener(msgObj => {
    const actionMessage = msgObj?.flutterSupes?.action;
    switch (actionMessage) {
        case "find-me-reply":
            if (msgObj?.flutterSupes?.actionReply) {
                document.querySelector("#result").innerHTML = msgObj?.flutterSupes?.actionReply;
                document.querySelector("#result-block").style.display = "block";
                document.querySelector("form").style.display = "none";
            }
            break;
    }
});
