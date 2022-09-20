import throttle from 'lodash.throttle';

const STORAGE_FEEDBACK_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_FEEDBACK_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_FEEDBACK_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_FEEDBACK_KEY);
  const parsedData = JSON.parse(savedMessage);

  if (savedMessage) {
    refs.email.value = parsedData.email;
    refs.message.textContent = parsedData.message;
  }
}
