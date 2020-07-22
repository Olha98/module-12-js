import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import templateName from '../templates/list.hbs';
import templateInfo from '../templates/allCountry.hbs';
import {
  debounce
} from 'debounce';

export const axios = require('axios').default;
const contentRef = document.querySelector('.content');

let result = '';

const searchRef = document.querySelector('.search');

searchRef.addEventListener(
  'input',
  debounce(function (e) {

    result = e.target.value;
    if (result !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${result}`)
        .then(function (response) {
          const data = response.data;
          const name = templateName(data.map(element => element.name));
          const info = templateInfo(data[0]);

          data.length > 10 && PNotify.alert('Make your search more specific');
          data.length < 10 && (contentRef.innerHTML = name);
          data.length === 1 && (contentRef.innerHTML = info);
        })
        .catch(function (error) {
          PNotify.error(`${error}`)
          console.log(error);
        })
        .finally(function () {});
    }
  }, 600),
);
