// sessionManager.js
let sessionId = null;

function setSessionId(id) {
    sessionId = id;
}

function getSessionId() {
    return sessionId;
}

module.exports = { setSessionId, getSessionId };
