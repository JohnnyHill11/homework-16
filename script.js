'use strict';

const LOGIN_URL = 'https://api.github.com/users/{{login}}';
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const wrap = document.querySelector('.wrap');
const listEl = document.querySelector('#listEl').innerHTML;
const listProperty = document.querySelector('#property-list');

form.addEventListener('submit', onButtonClick);

function onButtonClick(event) {
  event.preventDefault();
  fetch(LOGIN_URL.replace('{{login}}', input.value))
    .then((response) => {
      clearInput();
      return response.json();
    })
    .then((data) => {
      renderUser(data);
    })
    .catch((error) => console.error(error));
}

function renderUser(data) {
  const dataHtml = generateDataHtml(data);
  listProperty.innerHTML = dataHtml;
}

function generateDataHtml(data) {
  return  listEl
    .replace('{{data.avatar_url}}', data.avatar_url)
    .replace('{{data.public_repos}}', data.public_repos)
    .replace('{{data.followers}}', data.followers)
    .replace('{{data.following}}', data.following);
}

function clearInput() {
  input.value = '';
}