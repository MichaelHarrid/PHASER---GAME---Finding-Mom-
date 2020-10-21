ZenvaRunner.MainMenu = function() {};

ZenvaRunner.MainMenu.prototype  = {
    create: function() {

        //Moving Background: our asset key for this are 'background 'foreground', and ground
        this.background = this.game.add.tileSprite(0, 0,3000,1000, 'background');
        this.background.autoScroll(-100, 0); // this will move the background to the left

        this.ground = this.game.add.tileSprite(0, this.game.height - 70, this.game.width, 110, 'ground');

        // Adding our logo at the first part of our game
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        // Adding our text menu: position, asset key, text to show, pixel size
        this.startText = this.game.add.bitmapText(0,0, 'minecraftia', 'tap to start', 32);

        // Calculating the text positioning
        this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
        this.startText.y = this.game.height / 2 + this.spheight / 2;

    },
    update: function() {
        if(this.game.input.activePointer.justPressed()) {// this line is the trigger, 'activePointer' in phaser can be the mouse or touch depends on the device
            this.game.state.start('Game'); // call the start state when the condition above is met
        }
    }
};