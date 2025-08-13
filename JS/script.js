// Navbar and move to top button
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = () => {
  menu.classList.add("active");
  menuBtn.classList.add("hide");
  cancelBtn.classList.add("show");
  body.classList.add("disabledScroll");
}

cancelBtn.onclick = () => {
  menu.classList.remove("active");
  menuBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  body.classList.remove("disabledScroll");
}

const siteLogo = document.querySelector('.logo a');

// Get all the menu items
const navLinks = document.querySelectorAll('.menu-list li');

const playSongBtn = document.querySelector('.play-song-btn');

// Add click event listener to each menu item
navLinks.forEach(item => {
  item.addEventListener('click', function () {
    // Remove the 'active' class from all menu items
    navLinks.forEach(menuItem => menuItem.classList.remove('active-menu-list'));

    // Add the 'active' class to the clicked menu item
    this.classList.add('active-menu-list');
  });
});

playSongBtn.onclick = () => {
  removeActiveClass();
}

siteLogo.onclick = () => {
  removeActiveClass();
};

function removeActiveClass() {
  navLinks.forEach(menuItem => menuItem.classList.remove('active-menu-list'));
}

window.onscroll = () => {
  this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");

  // When the user scrolls down 75px from the top of the document, show the button
  if (document.body.scrollTop > 75 || document.documentElement.scrollTop > 75) {
    moveTopBtn.style.display = "block";
  } else {
    moveTopBtn.style.display = "none";
  }
}

// Fix: Wait for DOMContentLoaded to ensure all elements exist before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
  // PLAY MUSIC 
  const playSong = document.getElementById("song");
  var icon = document.getElementById("icon");
  if (icon) {
    icon.addEventListener("click", playMusic);
  }
  function playMusic() {
    if (playSong.paused) {
      playSong.play();
      icon.src = "./assets/Image/pause.png";
    } else {
      playSong.pause();
      icon.src = "./assets/Image/play.png";
    }
  }

  // Custom Audio Player Logic
  const playBtn = document.getElementById("play-btn");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const progress = document.getElementById("audio-progress");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");

  const songList = [
    {src: './assets/Songs/khoya.mp3', img: './assets/Image/khoya.jpg', name: 'Khoya Sa', by: 'Kasyap'},
    {src: './assets/Songs/I Like Me Better - Lauv.mp3', img: './assets/Image/ilikemebetter.png', name: 'I Like Me Better', by: 'Lauv'},
    {src: './assets/Songs/mazaak.mp3', img: './assets/Image/mazaak.jpg', name: 'Mazaak', by: 'Anuv Jain'},
    {src: './assets/Songs/betty.mp3', img: './assets/Image/betty.jpeg', name: 'Betty (Get Money)', by: 'Yung Gravy'},
    {src: './assets/Songs/ghost.mp3', img: './assets/Image/ghost.jpg', name: 'Mary On A Cross', by: 'Ghost'},
    {src: './assets/Songs/baraat.mp3', img: './assets/Image/baraat.jpeg', name: 'Baaraat', by: 'Unknown'},
    {src: './assets/Songs/ishq.mp3', img: './assets/Image/ishq.jpg', name: 'Ishq Bulaava', by: 'Unknown'},
    {src: './assets/Songs/katputli.mp3', img: './assets/Image/katputli.jpg', name: 'Katputli ke Dhage', by: 'Unknown'},
    {src: './assets/Songs/you.mp3', img: './assets/Image/you.jpg', name: 'Tu/You', by: 'Unknown'},
    {src: './assets/Songs/pal.mp3', img: './assets/Image/pal.jpg', name: 'Har Ek Pal', by: 'Unknown'},
    {src: './assets/Songs/chand.mp3', img: './assets/Image/chand.jpg', name: 'Chand Baliyan', by: 'Unknown'},
    {src: './assets/Songs/aisay.mp3', img: './assets/Image/aisay.jpeg', name: 'Aisay Kaisay', by: 'Unknown'}
  ];
  let currentSongIndex = 1;

  function loadSong(index) {
    const songData = songList[index];
    playSong.src = songData.src;
    document.getElementById('songName').innerText = songData.name;
    document.getElementById('songBy').innerText = songData.by;
    document.getElementById('banner').src = songData.img;
  }

  function formatTime(sec) {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  if (playBtn) {
    playBtn.addEventListener('click', function() {
      if (playSong.paused) {
        playSong.play();
        playPauseIcon.src = './assets/Image/pause.png';
      } else {
        playSong.pause();
        playPauseIcon.src = './assets/Image/play.png';
      }
    });
  }

  if (playSong) {
    playSong.addEventListener('play', function() {
      if (playPauseIcon) playPauseIcon.src = './assets/Image/pause.png';
    });
    playSong.addEventListener('pause', function() {
      if (playPauseIcon) playPauseIcon.src = './assets/Image/play.png';
    });
    playSong.addEventListener('timeupdate', function() {
      if (progress) progress.value = playSong.duration ? (playSong.currentTime / playSong.duration) * 100 : 0;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(playSong.currentTime);
    });
    playSong.addEventListener('loadedmetadata', function() {
      if (durationEl) durationEl.textContent = formatTime(playSong.duration);
    });
  }

  if (progress) {
    progress.addEventListener('input', function() {
      if (playSong.duration) {
        playSong.currentTime = (progress.value / 100) * playSong.duration;
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      currentSongIndex = (currentSongIndex + 1) % songList.length;
      loadSong(currentSongIndex);
      playSong.play();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
      loadSong(currentSongIndex);
      playSong.play();
    });
  }

  // Initial load
  loadSong(currentSongIndex);
});

// Move to Top button
var moveTopBtn = document.getElementById("moveTopBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  removeActiveClass();
}

// PreLoader
var loader = document.getElementById("loading");
function preLoader() {
  loader.style.display = "none";
}

// CHOOSE A SONG
const buttons = document.querySelectorAll(".btn");

const photo = document.getElementById("banner");
const song = document.getElementById("song");
const songName = document.getElementById("songName");
const songBy = document.getElementById("songBy");
const aboutSong = document.getElementById("aboutSong");
const title = document.getElementById("title");
const download = document.getElementById("download");

buttons[0].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/khoya.jpg";
  song.src = "./assets/Songs/khoya.mp3";
  songName.innerText = "Khoya Sa";
  songBy.innerText = "Kasyap";
  title.innerText = "Khoya Sa";
  download.href = "./assets/Songs/khoya.mp3";
  aboutSong.innerText = "Music has the power to uplift your mood and also makes you feel the warmth of emotions in the most memorable ways.Weaving magic once again, Label Day One announces the launch of 'khoya sa' by singer, songwriter & composer, KASYAP who is ready to twirl up emotions and make you feel the jitters of love at first sight. ";
});

buttons[1].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/ilikemebetter.png";
  song.src = "./assets/Songs/I Like Me Better - Lauv.mp3";
  songName.innerText = "I Like Me Better";
  songBy.innerText = "Lauv";
  title.innerText = " I Like Me Better";
  download.href = "./assets/Songs/I Like Me Better - Lauv.mp3";
  aboutSong.innerText = "“I Like Me Better” is a song recorded by American singer-songwriter Lauv. It was released on May 19, 2017, and is included on Lauv's compilation album I Met You When I Was 18, which was released on May 31, 2018. It has also been used in an Android Auto app commercial, in the trailer of Netflix's romantic comedy To All the Boys I've Loved Before, and in the fall ball episode of Netflix's comedy series The Expanding Universe of Ashley Garcia.";
});

buttons[2].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/mazaak.jpg";
  song.src = "./assets/Songs/mazaak.mp3";
  songName.innerText = "Mazaak";
  songBy.innerText = "Anuv Jain";
  title.innerText = "Mazaak";
  download.href = "./assets/Songs/mazaak.mp3";
  aboutSong.innerText = "I don't think that I needs to explain much about this song just close your eyes and try to feel it but for now I am just gonna tell ya' for the context that how absurd is it that when we least expect love, it still finds us? And when it does, we hope that it isn't a Mazaak, it isn't a joke…";
});

buttons[3].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/betty.jpeg";
  song.src = "./assets/Songs/betty.mp3";
  songName.innerText = " Betty (Get Money)";
  songBy.innerText = "Yung Gravy";
  title.innerText = "Betty (Get Money)";
  download.href = "./assets/Songs/betty.mp3";
  aboutSong.innerText = `"Betty (Get Money)" is a song by the American rapper and songwriter Yung Gravy. Yung Gravy, whose real name is Matthew Hauri, is known for his unique blend of hip-hop and comedy, often incorporating humorous and witty lyrics into his songs.

  "Betty (Get Money)" is a track from Yung Gravy's mixtape called "Thanksgiving's Eve," which was released in 2017. The song showcases Yung Gravy's playful and tongue-in-cheek style, with lyrics that touch on themes of money, success, and his own rise in the music industry.

  The track features a catchy beat and Yung Gravy's distinctive delivery, characterized by his laid-back flow and clever wordplay. The song's title, "Betty (Get Money)," is a nod to the slang term "betty," which is often used to refer to an attractive woman. In the context of the song, Yung Gravy is expressing his desire to pursue financial success while attracting attention from women.

  Overall, "Betty (Get Money)" is a light-hearted and humorous track that showcases Yung Gravy's unique style and approach to hip-hop music.`;
});

buttons[4].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/ghost.jpg";
  song.src = "./assets/Songs/ghost.mp3";
  songName.innerText = "Mary On A Cross";
  songBy.innerText = "Ghost";
  title.innerText = "Mary On A Cross";
  download.href = "./assets/Songs/ghost.mp3";
  aboutSong.innerText = `"Mary on a Cross" is a song by the Swedish rock band Ghost. Ghost, also known as Ghost B.C. in the United States, is a heavy metal band known for their theatrical and occult-themed performances. They gained international recognition with their unique blend of metal, rock, and pop elements.

  "Mary on a Cross" is featured on Ghost's fourth studio album, "Prequelle," which was released in 2018. The song showcases the band's signature sound, characterized by catchy melodies, heavy guitar riffs, and melodic vocals.

  Lyrically, "Mary on a Cross" touches on themes of religion and the subversion of traditional religious imagery. The lyrics depict a reinterpretation of Mary, the mother of Jesus, as a powerful and rebellious figure. The song's lyrics are often cryptic and open to interpretation, which is a characteristic of many Ghost songs.

  Musically, "Mary on a Cross" combines elements of classic rock and heavy metal with a modern twist. The band's use of layered harmonies, memorable hooks, and a driving rhythm section creates a powerful and anthemic sound.

  Overall, "Mary on a Cross" is a dynamic and thought-provoking song that showcases Ghost's unique blend of heavy metal and rock with their characteristic theatrical and occult-inspired style.`;
});

buttons[5].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/baraat.jpeg";
  song.src = "./assets/Songs/baraat.mp3";
  songName.innerText = "Baaraat";
  songBy.innerText = "Ritviz";
  title.innerText = "Baaraat";
  download.href = "./assets/Songs/baraat.mp3";
  aboutSong.innerText = `Ritviz is an Indian electronic music producer, singer, and songwriter known for his fusion of electronic music with traditional Indian sounds. He gained popularity with his breakthrough track "Udd Gaye" in 2017 and has since released several successful songs, collaborating with various artists.
  
  "Baaraat" is a song from Ritviz's debut album, "Ved," which was released in 2018. The song showcases Ritviz's unique blend of electronic music with traditional Indian sounds, creating a dynamic and energetic track.

  Ritviz is an Indian electronic music producer, singer, and songwriter known for his fusion of electronic music with traditional Indian sounds. He gained popularity with his breakthrough track "Udd Gaye" in 2017 and has since released several successful songs, collaborating with various artists..
  `;
});

buttons[6].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/ishq.jpg";
  song.src = "./assets/Songs/ishq.mp3";
  songName.innerText = "Ishq Bulaava";
  songBy.innerText = "Vishal-Shekhar & Shipra Goyal";
  title.innerText = "Ishq Bulaava";
  download.href = "./assets/Songs/ishq.mp3";
  aboutSong.innerText = "Music has the power to uplift your mood and also makes you feel  the warmth of emotions in the most memorable ways. Weaving magic once again, Label Day One announces the launch of 'Ishq Bulaava' that is ready to twirl up emotions and make you feel the jitters of love at first sight.";
});

buttons[7].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/katputli.jpg";
  song.src = "./assets/Songs/katputli.mp3";
  songName.innerText = "Katputli Ke Dhaage";
  songBy.innerText = "Anumita Nadesan & Himonshu Parikh";
  title.innerText = "Katputli Ke Dhaage";
  download.href = "./assets/Songs/katputli.mp3";
  aboutSong.innerText = "Music has the power to uplift your mood and also makes you feel the warmth of emotions in the most memorable ways. 'Katputli Ke Dhaage' song was released in 2021.";
});

buttons[8].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/you.jpg";
  song.src = "./assets/Songs/you.mp3";
  songName.innerText = "Tu/You";
  songBy.innerText = "Armaan Malik";
  title.innerText = "Tu/You";
  download.href = "./assets/Songs/you.mp3";
  aboutSong.innerText = "Music has the power to uplift your mood and also makes you feel  the warmth of emotions in the most memorable ways. 'Tu/You' was released in 2022";
});

buttons[9].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/pal.jpg";
  song.src = "./assets/Songs/pal.mp3";
  songName.innerText = "Har Ek Pal";
  songBy.innerText = "Ashu Shukla";
  title.innerText = "Har Ek Pal";
  download.href = "./assets/Songs/pal.mp3";
  aboutSong.innerText = "Music has the power to uplift your mood and also makes you feel  the warmth of emotions in the most memorable ways. 'Har Ek Pal' was released in 2017.";
});

buttons[10].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/chand.jpg";
  song.src = "./assets/Songs/chand.mp3";
  songName.innerText = "Chand Baliyan";
  songBy.innerText = "Aditya A";
  title.innerText = "Chand Baliyan";
  download.href = "./assets/Songs/chand.mp3";
  aboutSong.innerText = "Music has the power to uplift your mood and also makes you feel  the warmth of emotions in the most memorable ways. 'Chand Baliyan' was released in 2023.";
});

buttons[11].addEventListener("click", () => {
  icon.src = "./assets/Image/play.png";
  photo.src = "./assets/Image/aisay.jpeg";
  song.src = "./assets/Songs/aisay.mp3";
  songName.innerText = "Aisay Kaisay";
  songBy.innerText = "Hasan Raheem & Abdullah Kasumbi";
  title.innerText = "Aisay Kaisay";
  download.href = "./assets/Songs/aisay.mp3";
  aboutSong.innerText = "Music has the power to uplift your mood and also makes you feel  the warmth of emotions in the most memorable ways. 'Aisay Kaisay' was released in 2020.";
});

// Initial load
loadSong(currentSongIndex);






