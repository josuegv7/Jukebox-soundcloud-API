SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

function Jukebox(element) {
  this.playlist = [{
      id: 313763911 ,
      tracks: "https://soundcloud.com/skrillex/tracks",
      title: "Keys to the Chastity Belt",
      artwork_url: "https://i1.sndcdn.com/artworks-GxEVozH4uyKy-0-large.jpg",
      artist: "Black Knights ",
      genre: "Genre: RAP & HIP-HOP",
      link: "https://soundcloud.com/blackknightsofficial"
    },
    {
      id: 343417263,
      tracks: "https://soundcloud.com/illeniumofficial/tracks",
      title: "Free Fall (ft. RUNN)",
      artwork_url: "https://i1.sndcdn.com/artworks-000243707036-9i6gtf-large.jpg",
      artist: "Illenium",
      genre: "Genre: Indie",
      link: "https://soundcloud.com/illeniumofficial"
    },
    {
      id: 343144024,
      tracks: "https://soundcloud.com/applemusicfree/tracks",
      title: "No Flockin 2 Bodak Orange",
      artwork_url: "https://i1.sndcdn.com/artworks-000243409972-pvuzdd-large.jpg",
      artist: "Kodak Black",
      genre: "Genre: Trap",
      link: "https://soundcloud.com/applemusicfree"
    },
    {
      id: 342785159,
      tracks: "https://soundcloud.com/montanaof300fge/tracks",
      title: "First Day Out (Remix)",
      artwork_url: "https://i1.sndcdn.com/artworks-000243040507-47us9e-large.jpg",
      artist: "Montana Of 300",
      genre: "Genre: Trap",
      link: "https://soundcloud.com/montanaof300fge"
    }
  ];
  this.currentSong = 0;
  this.jukebox = element;
  this.elCurrentSong = element.querySelector(".currentSong");
  this.elImage = element.querySelector("#Image");
  this.elGenre = element.querySelector(".Genre");
  this.elLink = element.querySelector("a");
  this.elArtist = element.querySelector(".Artist");
};

Jukebox.prototype = {
  play: function() {
    let song = this.playlist[this.currentSong];
    if (song.player) {
      song.player.seek(0);
      song.player.play();
    } else {
      SC.stream(`/tracks/${song.id}`).then(function(player) {
        song.player = player;
        player.play();
      });
    }
  },
  pause: function() {
    console.log("this:", this);
    if (this.playlist[this.currentSong].player)
      this.playlist[this.currentSong].player.pause();
  },

  back: function() {
    this.pause();
    this.currentSong = (this.currentSong + this.playlist.length - 1) % this.playlist.length;
    this.updateUI();
  },
  forward: function() {
    this.pause();
    this.currentSong = (this.currentSong + 1) % this.playlist.length;
    this.updateUI();
  },

  updateUI: function() {
    // update current Song
    this.elCurrentSong.innerText = this.playlist[this.currentSong].title;
    this.elImage.src = this.playlist[this.currentSong].artwork_url;
    this.elGenre.innerText = this.playlist[this.currentSong].genre;
    this.elLink.href = this.playlist[this.currentSong].link;
    this.elArtist.href = this.playlist[this.currentSong].tracks;
    this.elArtist.innerText = this.playlist[this.currentSong].artist;
    this.play();
  }
};

let jukebox, elControls, elBack, elPlay, elPause, elForward;

document.addEventListener("DOMContentLoaded", function() {
  console.log("loaded")
  elPlayer = document.querySelector("audio");

  jukebox = new Jukebox(document.querySelector(".jukebox"));
  elControls = document.querySelector(".controls")
  elBack = document.querySelector(".fa-backward");
  elPlay = document.querySelector(".fa-play");
  elPause = document.querySelector(".fa-pause");
  elForward = document.querySelector(".fa-forward");

  console.log(jukebox)
  elPlay.addEventListener("click", function() {
    jukebox.play();
  });

  elPause.addEventListener("click", function() {
    jukebox.pause();
  });

  elForward.addEventListener("click", function() {
    jukebox.forward();
  });

  elBack.addEventListener("click", function() {
    jukebox.back();
  });
});
