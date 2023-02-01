import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let seconds = 0;

playVideo();

player.on('timeupdate', throttle(time, 1000));

function time(data) {
  seconds = Math.round(data.seconds);
  localStorage.setItem(STORAGE_KEY, seconds);
}

function playVideo() {
  const onSecond = localStorage.getItem(STORAGE_KEY);

  if (onSecond > 0) {
    player.setCurrentTime(onSecond);
  }
}
