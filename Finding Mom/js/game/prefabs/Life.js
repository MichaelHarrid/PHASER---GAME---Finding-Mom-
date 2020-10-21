var Life = function(game, x, y, key, frame) { 
    key = 'life';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(0.5); // To resize the life

    this.animations.add('spin1'); // name this animation as 'spin', see preload.js

    this.game.physics.arcade.enableBody(this); // Enable physics

    this.checkWorldBounds = true; // Phaser will check if seed is inside the gameworld or not
    this.onOutOfBoundsKill = true; // Hidde or kill the life when it goes off screen

    this.events.onKilled.add(this.onKilled, this); // See function Below
    this.events.onRevived.add(this.onRevived, this); // See function below

};
Life.prototype = Object.create(Phaser.Sprite.prototype); // Standard javascript inheritance
Life.prototype.constructor = Life;

Life.prototype.onRevived = function() {
    this.body.velocity.y = 150; // Horizontally speed of the Life
    this.animations.play('spin1', 10, true); // SPIN animation at 10fps
};

Life.prototype.onKilled = function() {
    this.animations.frame = 0; // The life will face the screen when it spin, using fram number 0
};