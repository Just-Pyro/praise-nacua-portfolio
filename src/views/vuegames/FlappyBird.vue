<template>
  <div style="position: absolute;">
    <router-link to="/projects"
      class="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none 
      ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
      Back
    </router-link>
  </div>
  <audio id="jump_sound">
    <source src="./sfx/jumping.mp3" type="audio/mpeg">
  </audio>
  <audio id="death_sound">
    <source src="./sfx/death.mp3" type="audio/mpeg">
  </audio>
  <audio id="bgmusic" autoplay loop>
    <source src="./sfx/bgmusic.mp3" type="audio/mpeg">
  </audio>
  <div class="floppybird">
    <header>
      <h1>Flappy Bird</h1>
      <div class="score-container">
        <div id="bestScore">{{ bestScore }}</div>
        <div id="currentScore">{{ currentScore }}</div>
      </div>
    </header>

    <canvas ref="canvas" width="431" height="590"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bestScore: 0,
      currentScore: 0,
      gamePlaying: false,
      gravity: 0.5,
      speed: 6.2,
      size: [51, 36],
      jump: -11.5,
      cTenth: 43.1, // canvas.width / 10
      index: 0,
      flight: 0,
      flyHeight: 0,
      pipes: [],
      pipeWidth: 78,
      pipeGap: 270,
      ctx:null,
      img: new Image(),
    };
  },
  methods: {
    playDeathSound() {
      const sound = document.getElementById('death_sound');
      sound.currentTime = 0; // Rewind the sound to the beginning
      sound.play();
    },
    playFlappySound() {
      const sound = document.getElementById('jump_sound');
      sound.currentTime = 0; // Rewind the sound to the beginning
      sound.play();
    },
    // playjump(){

    // },
    setup() {
      this.currentScore = 0;
      this.flight = this.jump;

      // set initial flyHeight (middle of screen - size of the bird)
      this.flyHeight = (this.$refs.canvas.height / 2) - (this.size[1] / 2);

      // setup first 3 pipes
      this.pipes = Array(3).fill().map((a, i) => [this.$refs.canvas.width + (i * (this.pipeGap + this.pipeWidth)), this.pipeLoc()]);
    },
    render() {
      // make the pipe and bird moving 
      this.index++;

      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!this.$refs.canvas) {
        return;
      }
      // background first part 
      this.ctx.drawImage(this.img, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height, -((this.index * (this.speed / 2)) % this.$refs.canvas.width) + this.$refs.canvas.width, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      // background second part
      this.ctx.drawImage(this.img, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height, -(this.index * (this.speed / 2)) % this.$refs.canvas.width, 0, this.$refs.canvas.width, this.$refs.canvas.height);

      // pipe display
      if (this.gamePlaying){
        this.pipes.map(pipe => {
          // pipe moving
          pipe[0] -= this.speed;

          // top pipe
          this.ctx.drawImage(this.img, 432, 588 - pipe[1], this.pipeWidth, pipe[1], pipe[0], 0, this.pipeWidth, pipe[1]);
          // bottom pipe
          this.ctx.drawImage(this.img, 432 + this.pipeWidth, 108, this.pipeWidth, this.$refs.canvas.height - pipe[1] + this.pipeGap, pipe[0], pipe[1] + this.pipeGap, this.pipeWidth, this.$refs.canvas.height - pipe[1] + this.pipeGap);

          // give 1 point & create new pipe
          if(pipe[0] <= -this.pipeWidth){
            this.currentScore++;
            // check if it's the best score
            this.bestScore = Math.max(this.bestScore, this.currentScore);
            
            // remove & create new pipe
            this.pipes = [...this.pipes.slice(1), [this.pipes[this.pipes.length-1][0] + this.pipeGap + this.pipeWidth, this.pipeLoc()]];
            console.log(this.pipes);
          }
        
          // if hit the pipe, end
          if ([
            pipe[0] <= this.cTenth + this.size[0], 
            pipe[0] + this.pipeWidth >= this.cTenth, 
            pipe[1] > this.flyHeight || pipe[1] + this.pipeGap < this.flyHeight + this.size[1]
          ].every(elem => elem)) {
            this.gamePlaying = false;
            this.playDeathSound();
            this.setup();
          }
        })
      }
      // draw bird
      if (this.gamePlaying) {
        this.ctx.drawImage(this.img, 432, Math.floor((this.index % 9) / 3) * this.size[1], ...this.size, this.cTenth, this.flyHeight, ...this.size);
        this.flight += this.gravity;
        this.flyHeight = Math.min(this.flyHeight + this.flight, this.$refs.canvas.height - this.size[1]);
      } else {
        this.ctx.drawImage(this.img, 432, Math.floor((this.index % 9) / 3) * this.size[1], ...this.size, ((this.$refs.canvas.width / 2) - this.size[0] / 2), this.flyHeight, ...this.size);
        this.flyHeight = (this.$refs.canvas.height / 2) - (this.size[1] / 2);
          // text accueil
        this.ctx.fillText(`Best score : ${this.bestScore}`, 85, 245);
        this.ctx.fillText('Spacebar to play', 65, 535);
        this.ctx.font = "bold 30px courier";
      }

      document.getElementById('bestScore').innerHTML = `Best : ${this.bestScore}`;
      document.getElementById('currentScore').innerHTML = `Current : ${this.currentScore}`;

      // tell the browser to perform anim
      window.requestAnimationFrame(this.render);
    },
    pipeLoc(){
      return (Math.random() * ((this.$refs.canvas.height - (this.pipeGap + this.pipeWidth)) - this.pipeWidth)) + this.pipeWidth;
    },
    handleKeyDown(e) {
      // Handle keydown events here
      if (e.code === 'Space') {
        this.gamePlaying = true;
        // this.playFlappySound();
      }

      if (e.code === 'Space') {
        this.flight = this.jump;
        this.playFlappySound();
      }
    },
  },
  mounted() {
    this.setup();
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

    this.img.onload = () => {
      this.ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
      this.render();
    };

    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.floppybird {
  margin: 0;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  user-select: none;
}
header {
  margin: 0 auto;
  width: 431px;
}
h1 {
  background: url("https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png") 0% 340px;
  padding: 1.2rem 0;
  margin: 0;
}
.score-container {
  display: flex;
  justify-content: space-between;
  padding: 8px 6px;
  background: #5EE270;
}
canvas{
  margin-left: auto;
  margin-right: auto;
}
</style>
