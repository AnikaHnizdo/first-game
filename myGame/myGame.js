/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update
});
var platforms;
var player;
var cursors;
var stars;
var ledge;
var ground;
var hitPlatform;
var score = 0;               
var scoreText;

function preload() {
    game.load.image('flower', 'assets/flower.jpg');
    game.load.image('ground', 'assets/purpleground.jpg');
    game.load.image('plat', 'assets/purple.jpg');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 128, 128);
}



function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //a simple backround for my game
    game.add.sprite(0, 0, 'flower');
    // game.add.sprite(0, 0, 'star');
    platforms = game.add.group();
    platforms.enableBody = true;
    
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(5,5);
    ground.body.immovable = false;
    
    ledge = platforms.create(200, 100, 'plat');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 250, 'plat');
    ledge.body.immovable = true;
    ledge = platforms.create(4, 70, 'plat');
    ledge.body.immovable = false;
    ledge = platforms.create(50, 70, 'plat');
    ledge.body.immovable = false;
     ledge = platforms.create(96, 70, 'plat');
      ledge.body.immovable = false;
    ledge = platforms.create(410, 375, 'plat');
    ledge.body.immovable = true;
    ledge = platforms.create(445, 375, 'plat');
    ledge.body.immovable = true;
    ledge = platforms.create(455, 375, 'plat');
    ledge.body.immovable = true;
    ledge = platforms.create(387, 375, 'plat');
    ledge.body.immovable = true;
     ledge = platforms.create(635, 460, 'plat');
    ledge.body.immovable = true;
      ledge = platforms.create(700, 70, 'plat');
      ledge.body.immovable = true;
      ledge = platforms.create(730, 70, 'plat');
      ledge.body.immovable = true;
      ledge = platforms.create(760, 70, 'plat');
      ledge.body.immovable = true;
       ledge = platforms.create(670, 70, 'plat');
      ledge.body.immovable = true;
       ledge = platforms.create(750, 590, 'plat');
      ledge.body.immovable = true;
      
    ledge.body.immovable = true;
    player = game.add.sprite(32, game.world.height - 250, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.5;
    player.body.gravity.y = 150;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [2,3], 10, true);
    player.body.setSize(50, 50, 50, 50);
    
    cursors = game.input.keyboard.createCursorKeys();
    
    
    
    stars = game.add.group();
    stars.enableBody = true;
    game.physics.arcade.enable(stars);
    
    //here create 12 of them evenly spaced apart
    for (var i = 0; i < 1000; i++)
    {
        console.log("making a star");
        //create a star inside of the 'stars' group
        var star = stars.create(i * 10, 0, 'star');
        // let gravity do its thing 
        star.body.gravity.y = 100;
        //this just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
     }
     
     scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#999'});
}

function update() {
   
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown)
    {
        //move to the left
        player.body.velocity.x = -150;
        
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        // stand still
        player.animations.stop();
        player.frame = 4;
    }
    //Allow the player to jump if they are touching the ground
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
     } 
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
}
function collectStar (player, star) {
    // Removes the star from the screen
    star.kill();
    score += 1;
    scoreText.text = "score" + score; + "score";
}