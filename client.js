/* eslint-disable max-classes-per-file */

class User {
  constructor(userName, lastName) {
    this.userName = userName;
    this.lastName = lastName;
  }

  getUserName() {
    return this.userName;
  }

  getLastName() {
    return this.lastName;
  }

  getFullUserName() {
    return `${this.userName} ${this.lastName}`;
  }
}

class Header {
  constructor(header) {
    this.header = header;
  }

  getHeaderUserName() {
    return this.header.querySelector('.header__user-name');
  }

  getLogoutButton() {
    return this.header.querySelector('.button');
  }

  setUserName(userName) {
    this.getHeaderUserName().innerText = userName;
  }

  setLogoutListener(listener) {
    this.getLogoutButton().addEventListener('click', listener);
  }
}

class Content {
  constructor(content) {
    this.content = content;
    this.messageClassName = 'content__message';
    this.botMessageClassName = `${this.messageClassName} content__message--bot`;
    this.errorMessageClassName = `${this.messageClassName} content__message--error`;
  }

  setMessageTitle(title) {
    if (!this.title) {
      this.title = document.createElement('span');
    }

    this.title.innerText = title;
  }

  createMessage(message) {
    const el = document.createElement('div');
    el.className = this.messageClassName;

    if (this.title) {
      el.appendChild(this.title);
    }

    el.append(message);

    this.content.appendChild(el);
  }

  createBotMessage(message) {
    const el = document.createElement('div');
    el.className = this.botMessageClassName;

    el.append(message);

    this.content.appendChild(el);
  }

  createErrorMessage(message) {
    const el = document.createElement('div');
    el.className = this.errorMessageClassName;

    el.append(message);

    this.content.appendChild(el);
  }

  delErrors() {
    this.content.childNodes.forEach((i) => {
      if (i.className === this.errorMessageClassName) {
        this.content.removeChild(i);
      }
    });
  }
}

class Footer {
  constructor(footer) {
    this.footer = footer;
  }

  setSubmitListener(listener) {
    this.footer.addEventListener('submit', listener);
  }
}

class App {
  constructor(id) {
    this.app = document.getElementById(id);
    this.content = new Content(this.app.querySelector('.content'));
    this.footer = new Footer(this.app.querySelector('.footer'));
    this.header = new Header(this.app.querySelector('.header'));
  }

  setLogoutListener(listener) {
    this.header.setLogoutListener(listener);
  }

  setSubmitListener(listener) {
    this.footer.setSubmitListener(listener);
  }

  setHeaderUserName(userName) {
    this.header.setUserName(userName);
  }

  setMessageTitle(title) {
    this.content.setMessageTitle(title);
  }

  sendBotMessage(message) {
    this.content.createBotMessage(message);
  }

  sendMessage(message) {
    this.content.createMessage(message);
  }

  sendErrorMessage(message) {
    this.content.createErrorMessage(message);
  }

  clearErrorMessages() {
    this.content.delErrors();
  }
}

function onLogout() {
  // eslint-disable-next-line no-console
  console.log('Logout pushed: ', new Date());
}

function onSubmit(e) {
  e.preventDefault();

  const { message } = e.target.elements;
  if (message.value) {
    // eslint-disable-next-line no-console
    console.log('message value: ', message.value);
    message.value = '';
  }
}

window.onload = function onload() {
  const user = new User(window.userName, window.lastName);
  const app = new App('app');

  app.setLogoutListener(onLogout);
  app.setSubmitListener(onSubmit);

  app.setHeaderUserName(user.getFullUserName());
  app.setMessageTitle(`${user.getUserName()} say:`);

  app.sendMessage('Hello world!!!');
  app.sendBotMessage('Bot message!!!');
  app.sendErrorMessage('Has Error');
  // app.clearErrorMessages()
};
