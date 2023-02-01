import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

playVideo();

player.on('timeupdate', throttle(time, 1000));

function time(data) {
  const seconds = Math.round(data.seconds);
  localStorage.setItem(STORAGE_KEY, seconds);
}

function playVideo() {
  const onSecond = localStorage.getItem(STORAGE_KEY);

  if (onSecond) {
    player.setCurrentTime(onSecond);
  }
}
