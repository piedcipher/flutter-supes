chrome.runtime.onMessage.addListener(msgObj => {
    const actionMessage = msgObj?.flutterSupes?.action;
    switch (actionMessage) {
        case "find-me":
            const container = document.querySelectorAll(".container")[1];
            const ul = container.querySelectorAll("ul");
            let count = 0;
            const username = msgObj?.flutterSupes?.data?.toLowerCase();
            ul.forEach(e => {
                console.log(msgObj?.flutterSupes?.data);
                Array.from(e.children).forEach(li => {
                    if (!li.innerHTML.toLowerCase().includes(username)) {
                        li.remove();
                    } else {
                        count++;
                    }
                });
            });
            sendMessage("find-me-reply", `found ${count} PRs for ${username}`);
            break;
    }
});

const sendMessage = (action, message) => {
    chrome.runtime.sendMessage({ flutterSupes: { action: action, actionReply: message }});
};
