"use strict";

class User {
  constructor(userName, lastName) {
    this.userName = userName
    this.lastName = lastName
  }

  getUserName() {
    return this.userName
  }

  getLastName() {
    return this.lastName
  }

  getFullUserName() {
    return `${this.userName} ${this.lastName}`
  }
}

class Header {
  constructor(header) {
    this._header = header
  }

  _getHeaderUserName() {
    return this._header.querySelector(".header__user-name")
  }

  _getLogoutButton() {
    return this._header.querySelector(".button")
  }

  setUserName(userName) {
    this._getHeaderUserName().innerText = userName
  }

  setLogoutListener(listener) {
    this._getLogoutButton().addEventListener('click', listener)
  }
}

class Title {
  constructor(userName) {
    this._userName = userName
  }

  getTitle() {
    const title = document.createElement("span");
    title.innerText = `${this._userName} say:`;

    return title;
  }
}

class Content {
  _messageClassName = "content__message"
  _botMessageClassName = `${this._messageClassName} content__message--bot`
  _errorMessageClassName = `${this._messageClassName} content__message--error`

  constructor(content) {
    this._content = content
  }

  createTitle(title) {
    this._title = title
  }

  createMessage(message) {
    const el = document.createElement("div");
    el.className = this._messageClassName;

    if (this._title) {
      el.appendChild(this._title);
    }

    el.append(message);

    this._content.appendChild(el);
  }

  createBotMessage(message) {
    const el = document.createElement("div");
    el.className = this._botMessageClassName;

    el.append(message);

    this._content.appendChild(el);
  }

  createErrorMessage(message) {
    const el = document.createElement("div");
    el.className = this._errorMessageClassName;

    el.append(message);

    this._content.appendChild(el);
  }

  delErrors() {
    this._content.childNodes.forEach(i => {
      if (i.className === this._errorMessageClassName) {
        content.removeChild(i);
      }
    });
  }
}

class Footer {
  constructor(footer) {
    this._footer = footer
  }

  setSubmitListener(listener) {
    this._footer.addEventListener('submit', listener)
  }
}

class App {
  constructor(id) {
    this._app = document.getElementById(id);
    this._content = new Content(this._app.querySelector(".content"))
    this._footer = new Footer(this._app.querySelector(".footer"))
    this._header = new Header(this._app.querySelector(".header"))
  }

  setLogoutListener(listener) {
    this._header.setLogoutListener(listener)
  }

  setSubmitListener(listener) {
    this._footer.setSubmitListener(listener)
  }

  setHeaderUserName(userName) {
    this._header.setUserName(userName)
  }

  setMessageTitle(title) {
    this._content.createTitle(title)
  }

  sendBotMessage(message) {
    this._content.createBotMessage(message)
  }

  sendMessage(message) {
    this._content.createMessage(message)
  }

  sendErrorMessage(message) {
    this._content.createErrorMessage(message)
  }

  clearErrorMessages() {
    this._content.delErrors()
  }
}

function onLogout() {
  console.log('Logout pushed: ', new Date())
}

function onSubmit(e) {
  e.preventDefault()

  const message = e.target.elements['message']
  if (message.value) {
    console.log('message value: ', message.value)
    message.value = ''
  }
}

window.onload = function () {
  const user = new User(window.userName, window.lastName)
  const app = new App('app')
  const title = new Title(user.getUserName())

  app.setLogoutListener(onLogout)
  app.setSubmitListener(onSubmit)

  app.setHeaderUserName(user.getFullUserName())
  app.setMessageTitle(title.getTitle())

  app.sendMessage("Hello world!!!")
  app.sendBotMessage("Bot message!!!")
  app.sendErrorMessage("Has Error")
  // app.clearErrorMessages()
}
