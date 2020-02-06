"use strict";

function getUserName() {
  return window.userName;
}

function getLastName() {
  return window.lastName;
}

function setUserName() {
  const el = document.getElementById("user-name");
  el.innerText = `${getUserName()} ${getLastName()}`;
}

function connect() {
  setUserName();
  document.getElementById("logout").addEventListener("click", () => {
    console.log("logout");
  });
}

function getContent() {
  return document.getElementById("content");
}

function getMessageTitle() {
  const title = document.createElement("span");
  title.innerText = `${getUserName()} say:`;

  return title;
}

function createMessage(message) {
  const el = document.createElement("div");
  el.className = "message";
  el.appendChild(getMessageTitle());
  el.append(message);

  getContent().appendChild(el);
}

function createBotMessage(message) {
  const el = document.createElement("div");
  el.className = "message message__bot";

  el.append(message);

  getContent().appendChild(el);
}

function createErrorMessage(message) {
  const el = document.createElement("div");
  el.className = "message message__error";

  el.append(message);

  getContent().appendChild(el);
}

function delErrors() {
  const content = getContent();

  content.childNodes.forEach(i => {
    if (i.className === "message message__error") {
      content.removeChild(i);
    }
  });
}

connect();
createMessage("Hello world !!!");
createMessage("Hello world !!!");
createBotMessage("Bot message!!!");
createMessage("Hello world !!!");
createBotMessage("Bot message!!!");
createErrorMessage("Has error");
// delErrors();
