import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
let formJsonData;
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', throttle(onInputChange, 500));
refs.textarea.addEventListener('input', throttle(onTextareaChange, 500));

refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;

  formJsonData = JSON.stringify(formData);
});

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();

  if (refs.input.value && refs.textarea.value) {
    console.log(formData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  } else {
    alert('Hе торопись, заполни все поля!');
  }
}

function onInputChange(e) {
  formData.email = e.target.value;
  toLocalStorageSave();
}

function onTextareaChange(e) {
  formData.message = e.target.value;
  toLocalStorageSave();
}

function toLocalStorageSave() {
  const toStrData = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, toStrData);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const userMessage = JSON.parse(savedMessage);
    refs.input.value = userMessage.email;
    refs.textarea.value = userMessage.message;
  }
}
