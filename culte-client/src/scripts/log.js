
function log(message, color = "#ffffff") {
    // get log div
    const log = document.getElementsByName("log")[0];

    // create new message
    const msg = document.createElement("p");
    msg.style.color = color;
    msg.innerHTML = message;

    // add message to log and scroll to bottom
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
}

export default log;