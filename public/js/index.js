import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout,signup } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const mapBox = document.querySelector('#map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logoutbtn = document.querySelector('.nav__el--logout');
const userdataform = document.querySelector('.form-user-data');
const passwordform = document.querySelector('.form-user-password');
const bookBtn = document.querySelector('#book-tour');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const passwordconfirm = document.querySelector('#passwordconfirm').value;
    signup(name, email, password, passwordconfirm);
  });
}

if (logoutbtn) {
  logoutbtn.addEventListener('click', logout);
}

if (userdataform) {
  userdataform.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);

    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}
if (passwordform) {
  passwordform.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'save password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing..';
    const { tourId } = e.target.dataset;

    bookTour(tourId);
  });
}
