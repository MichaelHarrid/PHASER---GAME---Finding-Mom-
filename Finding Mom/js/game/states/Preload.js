ZenvaRunner.Preload=function(){
    this.ready=false;
};

ZenvaRunner.Preload.prototype={
    preload: function(){
        this.splash=this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'logo' );
        this.splash.anchor.setTo(0.5);

        this.preloadBar=this.add.sprite(this.game.world.centerX,this.game.world.centerY+175, 'preloadbar' );
        this.preloadBar.anchor.setTo(0.5);
      
        this.load.setPreloadSprite(this.preloadBar);
      

        this.load.image('ground','assets/images/ground.png'); //=============GOOD==================
        this.load.image('background','assets/images/background.png'); //=============GOOD==================
        this.load.image('mother','assets/images/mother.png');
        
        this.load.spritesheet('seeds','assets/images/seed.png',75,70,6); //=============GOOD==================
        this.load.spritesheet('player','assets/images/player.png',108,72,6); //=============GOOD==================
        this.load.spritesheet('cat','assets/images/cat.png',288,144,4); //=============GOOD==================
        this.load.spritesheet('life','assets/images/life.png',112,75,5); //=============GOOD==================

        

        this.load.audio('gameMusic','assets/audio/startingSoundTrack.mp3');
        this.load.audio('hit','assets/audio/hit.wav');
        this.load.audio('life','assets/audio/life.wav');
        this.load.audio('seed','assets/audio/seed.wav');
        this.load.audio('victory','assets/audio/victory.mp3');


        this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

        this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    create: function(){
        this.preloadBar.cropEnable=false;
    },
    update: function(){
        if(this.cache.isSoundDecoded('gameMusic') && this.ready === true){
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready=true;
    }
};