//✔️1 Ознайомся з документацією бібліотеки Vimeo плеєра.
//✔️2 Додай бібліотеку як залежність проекту через npm.
//✔️3 Ініціалізуй плеєр у файлі скрипта як це описано в
// секції pre-existing player, але враховуй, що у тебе
// плеєр доданий як npm пакет, а не через CDN.
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// ✔️Нехай ключем для сховища буде рядок "videoplayer-current-time".
const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

//✔️4 Вивчи документацію методу on() і почни відстежувати подію
// timeupdate - оновлення часу відтворення.
//✔️7 Додай до проекту бібілотеку lodash.throttle і зроби
// так, щоб час відтворення оновлювався у сховищі не частіше,
// і ніж раз на секунду.
player.on('timeupdate', throttle(onVimeoPlay, 1000));

function onVimeoPlay({ seconds }) {
  //✔️5 Зберігай час відтворення у локальне сховище.
  localStorage.setItem(STORAGE_KEY, seconds);
}

//✔️6 Під час перезавантаження сторінки скористайся методом
// setCurrentTime() з метою відновлення відтворення
// зі збереженої позиції.
startVideoFromWhereItStopped();
function startVideoFromWhereItStopped() {
  const savedVideoTime = localStorage.getItem(STORAGE_KEY);

  if (savedVideoTime) {
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }
}
