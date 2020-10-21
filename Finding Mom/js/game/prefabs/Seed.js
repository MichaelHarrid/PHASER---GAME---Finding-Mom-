var Seed = function(game, x, y, key, frame) { // The same parameters as sprite does
    key = 'seeds';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(0.5);
    this.anchor.setTo(0.5);

    this.animations.add('spin'); // name this animation as 'spin', see preload.js

    this.game.physics.arcade.enableBody(this); // Enable physics
    this.body.allowGravity = false; // Not allow seed to fall

    this.checkWorldBounds = true; // Phaser will check if seed is inside the gameworld or not
    this.onOutOfBoundsKill = true; // Hidde or kill the seed when it goes off screen

    this.events.onKilled.add(this.onKilled, this); // See function Belo
    this.events.onRevived.add(this.onRevived, this); // See function below

};

//standard javascript inheritance
Seed.prototype = Object.create(Phaser.Sprite.prototype);
Seed.prototype.constructor = Seed;

Seed.prototype.onRevived = function() {
    this.body.velocity.x = -300; // Horizontally speed of the seed
    this.animations.play('spin', 100, true); //SPIN animation at 10fps
    this.game.add.tween(this).to({y: this.y - 200}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
};

Seed.prototype.onKilled = function() {
    this.animations.frame = 0; // The seed will facec the screen when it spin
};