
ZenvaRunner.Game = function() {
    this.seedRate = 5000; // Generate seed every 5000ms
    this.seedTimer = 0; // Create a seed every game loop

    this.lifeRate = 3000; // Generate life every 3000ms
    this.lifeTimer = 0; // Create a life every game loop

    this.enemyRate = 8000;// Generate enemy (cat) every 10000ms
    this.enemyTimer = 0; //Create an enemy every game loop
 
    this.score = 0; // Declare score equal to zero

    this.life=1; // Declare life equal to one


   
};
ZenvaRunner.Game.prototype = { //extend the Game method prototype
    create: function() {

// GAME ATTRIBUTE=========================GAME ATTRIBUTE=========================GAME ATTRIBUTE=========================GAME ATTRIBUTE=========================GAME ATTRIBUTE=========================
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // this will enable physics to our game
        this.game.world.setBounds(0, 0, 4990, 0); //game size

// BACKGROUND ATTRIBUTE ============================ BACKGROUND ATTRIBUTE ============================ BACKGROUND ATTRIBUTE ============================ BACKGROUND ATTRIBUTE ============================
        this.background = this.game.add.tileSprite(0, 0,5000,1000, 'background'); // Adding Background
        this.background.autoScroll(-100, 0); // Background will move from right to left

// GROUND ATTRIBUTE =========================== GROUND ATTRIBUTE =========================== GROUND ATTRIBUTE =========================== GROUND ATTRIBUTE =========================== GROUND ATTRIBUTE ===========================
        this.ground = this.game.add.tileSprite(0, 900,5000,73, 'ground'); // Adding ground
        this.ground.autoScroll(-1, 0); // Ground will move from right to left
        this.game.physics.arcade.enableBody(this.ground); // Adding physics too the ground
        this.ground.body.immovable = true; // This will keep the ground stay in place
// MOTHER ATTRIBUTE ============================ MOTHER ATTRIBUTE ============================ MOTHER ATTRIBUTE ============================ MOTHER ATTRIBUTE ============================ MOTHER ATTRIBUTE ============================ MOTHER ATTRIBUTE ============================
        this.mother = this.game.add.sprite(4750, 675, 'mother');// Add mother
        this.game.physics.arcade.enableBody(this.mother); // Apply physics to mother
        this.mother.body.immovable = true;  // Mother wwill stay in place
        

// PLAYER ATTTRIBUTE =========================== PLAYER ATTTRIBUTE =========================== PLAYER ATTTRIBUTE =========================== PLAYER ATTTRIBUTE =========================== PLAYER ATTTRIBUTE ===========================
        this.player = this.game.add.sprite(25,700, 'player'); // Adding player spritea
        this.player.anchor.setTo(1,.5); // Adding anchor point
        this.player.scale.setTo(1.5); // Resize the player

        this.game.physics.arcade.enableBody(this.player); // Apply physics to our player
        this.player.body.bounce.y=0.2;
        this.player.body.gravity.y=800; // Adding gravity to the player Vertically
        this.player.body.collideWorldBounds = (true); // It will allow player not to fall on the ground, if true
        
        this.player.animations.add('left',[1, 2], 10, true); // Adding animations
        this.player.animations.add('right',[3, 4], 10, true); // Adding animations

// TEXT ATTRIBUTE ============================== TEXT ATTRIBUTE ============================== TEXT ATTRIBUTE ============================== TEXT ATTRIBUTE ============================== TEXT ATTRIBUTE ==============================
        this.scoreText = this.game.add.bitmapText(0,0, 'minecraftia', 'Score: 0', 32); // It will show the score on the upper left corner
        this.scoreText.fixedToCamera = true;// enable to fixed with the camera

        this.playerLifeText = this.game.add.bitmapText(300 ,0, 'minecraftia', 'Hero Life: '+ this.life , 25); // It will show the score on the upper left
        this.playerLifeText.fixedToCamera = true;// enable to fixed with the camera

// AUDIO ATTRIBUTE ================================== AUDIO ATTRIBUTE ================================== AUDIO ATTRIBUTE ================================== AUDIO ATTRIBUTE ================================== AUDIO ATTRIBUTE ==================================
       this.gameMusic = this.game.add.audio('gameMusic');
       this.lifeSound = this.game.add.audio('life');
       this.seedSound = this.game.add.audio('seed');
       this.hitSound = this.game.add.audio('hit');
       this.victorySound = this.game.add.audio('victory');


      this.gameMusic.play('', 0, true); // Enable gamesound track

// Others ===============================================  Others =============================================== Others =============================================== Others ===============================================
       this.seeds = this.game.add.group(); // Adding group of seeds
       this.lives = this.game.add.group(); // Adding group of lives
       this.enemies = this.game.add.group();// Adding group of enemies

       this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); // Register spacebar key
       this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)  // Register S key
       this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A)  // Register A key
       this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)  // Register D key      

    },

      update: function() {
            this.player.body.velocity.x = 0; // Reset the y velocity of hero
   
            if(this.aKey.isDown){
              this.player.body.velocity.x = -350;
              this.player.animations.play('left',true);
              this.game.camera.x-=4.9; //game camera will follow when the left key was pressed
            }

            else if (this.dKey.isDown){
              this.player.body.velocity.x = 350;
              this.player.animations.play('right',true);
              this.game.camera.x+=4.9; //game camera will follow when the right key was pressed
            }
 
            else {      
              this.player.body.velocity.x =+ 0; // Reset the y velocity of hero      
              this.player.animations.stop();
              this.player.frame = 5;  
            }

          if(this.seedTimer < this.game.time.now) {
              this.createSeed(); // Create a seed
              this.seedTimer = this.game.time.now + this.seedRate; // Increment the seed

          }
          
          if(this.enemyTimer < this.game.time.now) {
              this.createEnemy();
              this.enemyTimer = this.game.time.now + this.enemyRate;
          }

          if(this.lifeTimer < this.game.time.now) {
            this.createLife();
            this.lifeTimer = this.game.time.now + this.lifeRate;
        }

        
          this.game.physics.arcade.collide(this.player, this.ground,this.groundHit,  null, this); // WE are telling to the arcade physics to check for collision and apply appropriate physics
          this.game.physics.arcade.collide(this.player, this.mother,this.motherHit,  null, this);
          this.game.physics.arcade.overlap(this.player, this.seeds, this.seedHit, null, this); //when player and seed collide
          this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this); //when player and enemy collide
          this.game.physics.arcade.overlap(this.player, this.lives, this.lifeHit, null, this); //when player and life collide



      },
      shutdown: function() {
        this.player.destroy();
          this.seeds.destroy();
          this.enemies.destroy(); 
          this.lives.destroy();
          this.score = 0;
          this.life =1;
          this.seedTimer = 0;
          this.enemyTimer = 0;
          this.lifeTimer = 0;
      },

      //recycle seed and add to seed group
      createSeed: function() {
          var x = 5000 ; // x position
          // Random seed Y position, relative to the height of the ground
          var y = this.game.world.height-140;

          var seed = this.seeds.getFirstExists(false);
          if(!seed) {
            seed = new Seed(this.game, 0, 0); // x, y
              this.seeds.add(seed); // Add coseedin if not exist
          }

          seed.reset(x, y); // set sprite
          seed.revive();

      },
      createLife: function() {
        var x = this.game.rnd.integerInRange(10, this.game.world.width); // x position
        // Random seed Y position, relative to the height of the ground
        var y = 0;

        var life = this.lives.getFirstExists(false);
        if(!life) {
          life = new Life(this.game, 0, 0); // x, y
            this.lives.add(life); // Add seed if not exist
        }

        life.reset(x, y); // set sprite
        life.revive();

    },
    
      createEnemy: function() {
          var x = 5000;
          var y = this.game.world.height-140;

          var enemy = this.enemies.getFirstExists(false);
          if(!enemy) {
              enemy = new Enemy(this.game, 0, 0);
              this.enemies.add(enemy);
          }
          enemy.reset(x, y);
          enemy.revive();
      },
      lifeHit: function(player, life) {
        this.life++; // increase player life
        life.kill();// will hide the life
        this.lifeSound.play(); // wwill play life.wav

        // get the position of the life and save it to dummylife
        var dummyLife = new Life(this.game, life.x, life.y);
        this.game.add.existing(dummyLife);

        
        dummyLife.animations.play('fly', 40, true);

        //transition to the upper left when the capsule get hit
        var scoreTween = this.game.add.tween(dummyLife).to({x: 50, y:50}, 300, Phaser.Easing.Linear.NONE, true);

        scoreTween.onComplete.add(function(){
            dummyLife.destroy(); // destroy capsule
            this.playerLifeText.text = 'Hero Life: ' + this.life; //show the capsulelife upper left
        }, this);
      },

      motherHit: function(mother){
        mother.kill(); // will hide the safe line
        this.gameMusic.stop(); //end the game music
        this.background.stopScroll(); //will stop sky from scrolling
        this.enemies.setAll('body.velocity.x', 0);// we stop virus from moving forward
        this.lives.setAll('body.velocity.x', 0); //the same with capsule
        this.enemyTimer = Number.MAX_VALUE; //stop generating virus
        this.lifeTimer = Number.MIN_VALUE; //stop generating capsule
        this.seedTimer = Number.MIN_VALUE; //stop generating capsule
        //WINNER!
        var scoreboardWin = new ScoreboardWin(this.game);
        scoreboardWin.show(this.score); //show scoreboardwin
        this.victorySound.play();
    },


      groundHit: function(player, ground) {
        if(this.spaceKey.isDown){
          this.player.body.velocity.y =-700;
        }
      },
      seedHit: function(player, seed) {
          this.score++; //increase our score
          this.seedSound.play(); // Play the seed sound when player hits the seed, no need to loop
          seed.kill();//will hide the seed

          var dummySeed = new Seed (this.game, seed.x, seed.y);
          this.game.add.existing(dummySeed);

          dummySeed.animations.play('spin', 40,true);

          var scoreTween = this.game.add.tween(dummySeed).to({x: 50, y:50}, 300, Phaser.Easing.Linear.NONE, true);

          scoreTween.onComplete.add(function() {
              dummySeed.destroy();
          this.scoreText.text = 'Score: ' + this.score; //will update the seed
          }, this);
        },
      enemyHit: function(player, enemy) {
        this.life--; //decrement the life of hero when hit by virus
        this.hitSound.play(); // wwill play hit.wav
        enemy.kill(); // will hide the enemy
        

        this.playerLifeText.text = 'Hero Life: ' + this.life; //update the remaining hero life if hit
        if (this.life <= 0 ) {
            player.kill(); //will hide the hero
            this.gameMusic.stop(); //end the game music
            this.background.stopScroll(); //will stop sky from scrolling
            this.enemies.setAll('body.velocity.x', 0);// we stop virus from moving forward
            this.lives.setAll('body.velocity.x', 0); //we stop capsule from moving downward
            this.enemyTimer = Number.MAX_VALUE; //stop generating virus
            this.lifeTimer = Number.MIN_VALUE; //stop generating life
            var scoreboard = new Scoreboard(this.game);
            scoreboard.show(this.score); // show the scoreboard
        }

      },

}; 