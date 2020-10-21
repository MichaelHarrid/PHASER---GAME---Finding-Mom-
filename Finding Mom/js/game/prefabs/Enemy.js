var Enemy = function(game, x, y, key, frame) {
    key = 'cat';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(1); // To resize
    this.anchor.setTo(0.5); // Set an anchor point

    this.animations.add('walk'); // Adding animations

    this.game.physics.arcade.enableBody(this); //Adding physics to the enemy
    this.body.allowGravity = false; // Adding gravity

    this.checkWorldBounds = true; // Phaser will check if enemy is inside the gameworld or not
    this.onOutOfBoundsKill = true; // Hidde or kill the enemy when it goes off screen

    this.events.onRevived.add(this.onRevived, this); // Check funttion below

};
Enemy.prototype = Object.create(Phaser.Sprite.prototype); // Standard javascript inheritance
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {

    this.body.velocity.x = -200; // Enemy will respawn on the right side corner of the game and will walk from right to left
    this.animations.play('walk', 5, true); // Auto play walk animation att  fps
};