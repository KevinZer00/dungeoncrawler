function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


class UIScene extends Phaser.Scene {
  constructor(knight, health) {
    super({key: 'UIScene'});
    this.knight = knight;
    this.health = health;
    this.chestsFound = 0;
    this.totalChests = 4;

  }

  init(data) {
    this.knight = data.knight;
    this.health = data.health;
}

  preload()
  {
    //load health lives atlas 
    this.load.atlas('lives', 'UI/lives.png', 'UI/lives.json');

    //load the menu icon
    this.load.image('menuIcon', 'person.png');

    //load the email (black) icon
    this.load.image('emailIcon', 'email.png');

    //load the Github (black) icon
    this.load.image('githubIcon', 'github.png');

    //load the LinkedIn (black) icon
    this.load.image('linkedinIcon', 'linkedin.png');

    //load the Discord (black) icon
    this.load.image('discordIcon', 'discord.png');


    //load the email icon
    this.load.image('emailIcon2', 'email2.png');

    //load the Github icon
    this.load.image('githubIcon2', 'github2.png');

    //load the LinkedIn icon
    this.load.image('linkedinIcon2', 'linkedin2.png');

    //load the Discord icon
    this.load.image('discordIcon2', 'discord2.png');

  }

  create()
  {
    this.anims.create({
      key: 'heart_full',
      frames: [{key: 'lives', frame: 'ui_heart_full.png'}],
      repeat: 0,
      frameRate: 10
    });

    this.anims.create({
      key: 'heart_empty',
      frames: [{key: 'lives', frame: 'ui_heart_empty.png'}],
      repeat: 0,
      frameRate: 10
    });

    
      //health system 
      let totalHeartsWidth = this.knight.health * 18 * 2.5;  // 45 is the width of one heart, 3 is the scale

      // Step 2: Find the starting x-coordinate
      let startX = (this.sys.game.config.width - totalHeartsWidth) / 2;
      
      this.hearts = this.add.group();
      this.hearts.clear(true, true);
      
      for (let i = 0; i < this.knight.health; i++) 
      {
          if (this.sys.game.config.width < 600) {
              // Step 3: Position each heart relative to the first
              let heart = this.add.sprite(startX + i * 18 * 2.5, 10, 'lives', 'ui_heart_full.png');
              heart.setOrigin(0, 0);
              heart.setScale(3);
              heart.fixedToCamera = true;
              this.hearts.add(heart);
          }
          else {
            let heart = this.add.sprite(10 + i * 50, 10, 'lives', 'ui_heart_full.png');
            heart.setOrigin(0, 0);
            heart.setScale(3.5);
            heart.fixedToCamera = true;
            this.hearts.add(heart);
          }
    }


   if (!isMobileDevice()) {
    const textYPosition =  + 100;
    // Add text for the keyboard controls.
    this.add.text(20, textYPosition, 'CONTROLS:', { font: '18px Dungeon', fill: '#ffffff' });
    this.add.text(20, textYPosition + 40, 'Arrow Keys: Move', { font: '18px Dungeon', fill: '#ffffff' });
    this.add.text(20, textYPosition + 80, 'F Key: Open Chest', { font: '18px Dungeon', fill: '#ffffff' });
    this.add.text(20, textYPosition + 120, 'Space: Attack', { font: '18px Dungeon', fill: '#ffffff' });
   }
        

    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    let somePadding = 50;

    let iconVerticalSpacing = 50;  // Adjust as needed for vertical spacing on mobile
    let iconHorizontalSpacing = 70;  // Adjust as needed for horizontal spacing on mobile
    
    if (isMobileDevice()) {

      const gameWidth = this.sys.game.config.width;
      const gameHeight = this.sys.game.config.height;


      //menu icon setup
      let menuIcon = this.add.sprite(gameWidth / 2, this.sys.game.config.width * 0.25, 'menuIcon').setScale(0.16).setInteractive();
      menuIcon.on('pointerdown', this.toggleMenu, this);

      //scials icons setup
      this.emailIcon = this.add.sprite(gameWidth / 2 - 60, gameHeight / 2, 'emailIcon').setScale(0.25).setVisible(false).setInteractive();
      this.githubIcon = this.add.sprite(gameWidth / 2, gameHeight / 2, 'githubIcon').setScale(0.20).setVisible(false).setInteractive();
      this.linkedinIcon = this.add.sprite(gameWidth / 2 + 60, gameHeight / 2, 'linkedinIcon').setScale(0.20).setVisible(false).setInteractive();
      this.discordIcon = this.add.sprite(gameWidth / 2 + 120, gameHeight / 2, 'discordIcon').setScale(0.25).setVisible(false).setInteractive();

      //event listeners for other icons
      this.emailIcon.on('pointerdown', () => this.showContactMenu());
      this.githubIcon.on('pointerdown', function () {
        window.open('https://github.com/KevinZer00/', '_blank');
      });
      this.linkedinIcon.on('pointerdown', function () {
        window.open('https://www.linkedin.com/in/kevinyu99/', '_blank');
      });
      this.discordIcon.on('pointerdown', function () {
        window.open('https://discordapp.com/users/92475534600073216', '_blank');
      });
      
      document.getElementById('close-button2').addEventListener('click', () => {
        const menu = document.getElementById('iconMenu');
        menu.style.display = 'none';
      });
    }
else {

  let emailIcon = this.add.sprite(gameWidth - somePadding, somePadding, 'emailIcon2').setOrigin(1, 0);
    emailIcon.y = 10; 
    emailIcon.x = gameWidth - 10;
    emailIcon.on('pointerdown', () => this.showContactMenu());
    emailIcon.setScale(0.25);
    emailIcon.setInteractive();
    emailIcon.on('pointerover', () => {
      this.sys.game.canvas.style.cursor = 'pointer';
    });

    emailIcon.on('pointerout', () => {
      this.sys.game.canvas.style.cursor = 'default';
    });

    let githubIcon = this.add.sprite(gameWidth - somePadding, somePadding, 'githubIcon2').setOrigin(1, 0);
    githubIcon.y = 15; 
    githubIcon.x = gameWidth - 100;
    githubIcon.setScale(0.20);
    githubIcon.setDepth(500);
    githubIcon.setInteractive();
    githubIcon.on('pointerdown', function () {
      window.open('https://github.com/KevinZer00/', '_blank');
    });
    githubIcon.on('pointerover', () => {
      this.sys.game.canvas.style.cursor = 'pointer';
    });

    githubIcon.on('pointerout', () => {
      this.sys.game.canvas.style.cursor = 'default';
    });

    let linkedinIcon = this.add.sprite(gameWidth - somePadding, somePadding, 'linkedinIcon2').setOrigin(1, 0);
    linkedinIcon.y = 15; 
    linkedinIcon.x = gameWidth - 180;
    linkedinIcon.setScale(0.20);
    linkedinIcon.setInteractive();
    linkedinIcon.on('pointerdown', function () {
      window.open('https://www.linkedin.com/in/kevinyu99/', '_blank');
    });
    linkedinIcon.on('pointerover', () => {
      this.sys.game.canvas.style.cursor = 'pointer';
    });

    linkedinIcon.on('pointerout', () => {
      this.sys.game.canvas.style.cursor = 'default';
    });

    let discordIcon = this.add.sprite(gameWidth - somePadding, somePadding, 'discordIcon2').setOrigin(1, 0);
    discordIcon.y = 10; 
    discordIcon.x = gameWidth - 260;
    discordIcon.setScale(0.25);
    discordIcon.setInteractive();
    discordIcon.on('pointerdown', function () {
      window.open('https://discordapp.com/users/92475534600073216', '_blank');
    });
    discordIcon.on('pointerover', () => {
      this.sys.game.canvas.style.cursor = 'pointer';
    });

    discordIcon.on('pointerout', () => {
      this.sys.game.canvas.style.cursor = 'default';
    });
}

    


  /*
    this.chestsText = this.add.text(this.cameras.main.width / 2, 10, 'Chests Found: ' + this.chestsFound, {
      fontFamily: 'Dungeon',
      fontSize: 50,
      color: '#fff'
    }).setOrigin(0.5,0);
    this.chestsText.setDepth(1);
    this.chestsText.setScrollFactor(0);

    this.scene.get('MyGame').events.on('chest-opened', () => 
    {
      this.chestsFound++;
    })
  */

  }

  update() {
    //check if the knight's health has changed
    if (this.knight.health !== this.prevHealth) {
      //get the most recent heart sprite and update its frame
      let heartIndex = this.knight.health;
      if (heartIndex >= 0 && heartIndex < this.hearts.children.size) {
        let heart = this.hearts.children.entries[heartIndex];
        heart.anims.play('heart_empty');
        //adjust the sprite's origin point to be at the center
      heart.setOrigin(0.35, 0.35);

      //adjust the sprite's position to keep it centered
      heart.x += (heart.displayWidth / 2) - (heart.width / 2);
      heart.y += (heart.displayHeight / 2) - (heart.height / 2);
      }
  
      //update the previous health variable
      this.prevHealth = this.knight.health;
    }

    //this.chestsText.setText('Chests Found: ' + this.chestsFound);
  }

  showContactMenu() {
    //create a div for the contact menu
    const menuDiv = document.createElement('div');
    menuDiv.setAttribute('id', 'contact-menu');

    //HTML content for the contact menu
    menuDiv.innerHTML = `
        <p>Want to send me an email? Let's chat!</p>
        <a href="mailto:kevinyuzer0@gmail.com">Send an Email</a><p>
        <button id="closeContactMenu">Close</button>
    `;

    //append the contact menu to the document body
    document.body.appendChild(menuDiv);

    //add an event listener to the close button to remove the menu and resume the game
    const closeButton = document.getElementById('closeContactMenu');
    closeButton.addEventListener('click', () => {
        menuDiv.remove();
        this.scene.resume('MyGame');  // Resume the game if it was paused
    });

    //pause the game while the contact menu is active
    this.scene.pause('MyGame');
}

toggleMenu() {
  const menu = document.getElementById('iconMenu');
  if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'flex';
  } else {
      menu.style.display = 'none';
  }
}




}





class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: 'MyGame' });

    this.showMenu = function(chestNum) {
      const menuDiv = document.createElement('div');
      menuDiv.setAttribute('id', 'menu');
    
      let menuText = '';
      let menuLink = '';
      switch (chestNum) {
        case 1:
          menuText = '<p>You have opened chest 1!</p> This is a project that was built for a client. It is a website for a personal trainer. It utilizes primarily HTML and CSS for the design and layout and JavaScript for the email functionality. The site also integrates the Calendly widget to allow users to view/book available appointments. It is responsive for a wide variety of screen sizes.<p>'
          menuLink = '<p><a href = "https://pushpastlimits.com/" target = "_blank">Push Past Limits</a><p>'        
          break;
        case 2:
          menuText = '<p>You have opened chest 2!</p> This project is a website for a fictional robotics company. It has a futuristic theme and relies heavily on HTML and CSS for the design. The main highlight of this project is its implementation of the Three.JS framework. It features a fully rendered 3D model with proper lighting/shading and can be fully rotated left/right. It is responsive for a wide variety of screen sizes.<p>';
          menuLink = '<p><a href = "https://kevinzer00.github.io/YUGEN-site/" target = "_blank">YUGEN Robotics</a><p>'
          break;
        case 3:
          menuText = '<p>You have opened chest 3!</p> This project is an FFMI (Fat-Free Mass Index) and BMI (Body Mass Index) calculator site built with React. It accepts various user parameters such as height and weight, and generates the corresponding values based on widely accepted FFMI/BMI formulas. The site also integrates responsive charts via Chart.js that plots the user FFMI/BMI on two different graphs in relation to the average statistics in America.';
          menuLink = '<p><a href = "https://ffmibmicalculator.netlify.app/" target = "_blank">FFMI and BMI Calculator</a><p>'
          break;
        case 4:
          menuText = '<p>You have opened chest 4!</p> This is the dungeon crawler game you are playing! This portfolio was built using Phaser.JS, a framework designed specifically for 2D games! In this project, there are collisions, enemy logics, player damage, health and movement controls implemented. The assets are obtained through the itch.io asset store.';
          menuLink = '<p><a href = "https://github.com/KevinZer00/dungeoncrawler.git/" target = "_blank">Dungeon Crawler Github Repository</a><p>'
          break;
        //add more cases for additional chests
      }
      menuDiv.innerHTML = menuText + menuLink + '<button id="close-button" class="close-button">Close</button>';
    
      document.body.appendChild(menuDiv);
    
      const closeButton = document.getElementById('close-button');
      closeButton.addEventListener('click', () => {
        menuDiv.remove();
        this.scene.resume();
      });
    
      this.scene.pause();
    };

    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', () => {
        const mainMenu1Div = document.getElementById('main-menu1');
        const mainMenu2Div = document.getElementById('main-menu2');
        mainMenu1Div.style.display = 'none';
        mainMenu2Div.style.display = 'block';
    });
    
    //when the "BEGIN" button is clicked, hide main-menu2
    const beginButton = document.getElementById('begin-button');
    beginButton.addEventListener('click', () => {
        const mainMenu2Div = document.getElementById('main-menu2');
        mainMenu2Div.style.display = 'none';
    });

   

this.gameOver = function()
{
  //check if the gameOverDiv already exists and remove it
  const existingGameOverDiv = document.getElementById('game-over');
  if (existingGameOverDiv) {
    existingGameOverDiv.remove();
  }

  const gameOverDiv = document.createElement('div');
  gameOverDiv.setAttribute('id', 'game-over');
  gameOverDiv.innerHTML = '<p>You have fallen!</p><p>Thankfully, the Light has blessed you with infinite respawns because it is very insistent that you need to open every chest! You may select "Restart" to restart the level.<p> <button id="restart-button" class="restart-button">Restart</button>';
  document.body.appendChild(gameOverDiv);

  this.scene.pause();

  const restartButton = document.getElementById('restart-button');
  
  //remove any existing event listener
  restartButton.removeEventListener('click', this.restartGame);

  //add the event listener
  restartButton.addEventListener('click', this.restartGame.bind(this));
};

//separate restart logic into its own function
this.restartGame = function() {
  game.destroy(true);
  game = new Phaser.Game(config);
  const gameOverDiv = document.getElementById('game-over');
  if (gameOverDiv) {
    gameOverDiv.remove();
  }
};

 
  
}


preload() 
{

  this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);


    this.load.image('tileset', 'assets/dungeontiles2.png');
    this.load.tilemapTiledJSON('tilemap', 'map/dungeon2.json');


    //load mask for fog of war effect
    this.load.image('mask', 'mask/mask1.png');

    //load red fountain 
    this.load.atlas('red', 'fountains/redfountain.png', 'fountains/redfountain.json');
    this.load.atlas('redBase', 'fountains/redfountainbase.png', 'fountains/redfountainbase.json');

    //load blue fountain 
    this.load.atlas('blue', 'fountains/bluefountain.png', 'fountains/bluefountain.json');
    this.load.atlas('blueBase', 'fountains/bluefountainbase.png', 'fountains/bluefountainbase.json');

    //load spikes
    this.load.atlas('spikes', 'spikes/spikes.png', 'spikes/spikes.json');

    //load door atlas
    this.load.atlas('door', 'doors/door-open-close.png', 'doors/door-open-close.json');

    //load chest atlas
    this.load.atlas('chest', 'chests/chest.png', 'chests/chest.json');
    
    //load player character atlas
    this.load.atlas('knight', 'hero/knight.png', 'hero/knight.json');

    //load sword atlas
    this.load.atlas('sword', 'weapon/sword.png', 'weapon/sword.json');

    //load skeleton enemy atlas 
    this.load.atlas('skeleton', 'enemies/skeleton.png', 'enemies/skeleton.json');

    //load demon enemy atlas
    this.load.atlas('demon', 'enemies/demon.png', 'enemies/demon.json');

    //load orc enemy atlas
    this.load.atlas('orc', 'enemies/orc.png', 'enemies/orc.json');

    //load demon enemy atlas
    this.load.atlas('zombie', 'enemies/zombie.png', 'enemies/zombie.json');

    //load swamp enemy atlas
    this.load.atlas('swamp', 'enemies/swamp.png', 'enemies/swamp.json');

    //load chort enemy atlas
    this.load.atlas('chort', 'enemies/chort.png', 'enemies/chort.json');



    this.cursors = this.input.keyboard.createCursorKeys()



    
}

create() 
{

    console.log(this.scene.key);
    console.log(this.cache.tilemap.get('tilemap'));
    console.log(this.cache.tilemap.has('tilemap'));



    
    const map = this.make.tilemap({key: 'tilemap'});
 
    const tileset = map.addTilesetImage('dungeontiles2', 'tileset');
  
    const floorLayer = map.createStaticLayer(0, tileset, 0, 0);

    console.log('floorLayer: collides', floorLayer.filterTiles(tile => tile.collides));
    
    const wallsLayer = map.createStaticLayer(1, tileset, 0, 0);
    this.wallsLayer = wallsLayer;


    //add collisions
    wallsLayer.setCollisionByProperty({collides: true}, true);

  
    //creating the door opening animation 
    this.anims.create({
      key: 'door_closed',
      frames: [{key: 'door', frame: 'doors_leaf_closed.png'}],
      repeat: 0,
      frameRate: 10
    });


    //creating the door opening animation 
    this.anims.create({
      key: 'door_open',
      frames: [{key: 'door', frame: 'doors_leaf_open.png'}],
      repeat: 0,
      frameRate: 10
    });

    //red fountain animation 
    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNames('red', {start: 0, end: 2, prefix: 'wall_fountain_mid_red_anim_f', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'red2',
      frames: this.anims.generateFrameNames('redBase', {start: 0, end: 2, prefix: 'wall_fountain_basin_red_anim_f', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    })

    this.redFountain1 = this.physics.add.sprite(72, 104, 'red', 'wall_fountain_mid_red_anim_f0.png');
    this.redFountain1.depth = 2;
    this.redFountain1.anims.play('red');
    this.redFountainBase1 = this.physics.add.sprite(72, 120, 'redBase', 'wall_fountain_basin_red_anim_f0.png');
    this.redFountainBase1.anims.play('red2');

    this.redFountain2 = this.physics.add.sprite(168, 40, 'red', 'wall_fountain_mid_red_anim_f0.png');
    this.redFountain2.depth = 2;
    this.redFountain2.anims.play('red');
    this.redFountainBase2 = this.physics.add.sprite(168, 56, 'redBase', 'wall_fountain_basin_red_anim_f0.png');
    this.redFountainBase2.anims.play('red2');


     //blue fountain animation 
     this.anims.create({
      key: 'blue',
      frames: this.anims.generateFrameNames('blue', {start: 0, end: 2, prefix: 'wall_fountain_mid_blue_anim_f', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'blue2',
      frames: this.anims.generateFrameNames('blueBase', {start: 0, end: 2, prefix: 'wall_fountain_basin_blue_anim_f', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    })

    this.blueFountain1 = this.physics.add.sprite(712, 360, 'blue', 'wall_fountain_mid_blue_anim_f0.png');
    this.blueFountain1.depth = 2;
    this.blueFountain1.anims.play('blue');
    this.blueFountainBase1 = this.physics.add.sprite(712, 376, 'blueBase', 'wall_fountain_basin_blue_anim_f0.png');
    this.blueFountainBase1.anims.play('blue2');

    this.blueFountain2 = this.physics.add.sprite(104, 488, 'blue', 'wall_fountain_mid_blue_anim_f0.png');
    this.blueFountain2.depth = 2;
    this.blueFountain2.anims.play('blue');
    this.blueFountainBase2 = this.physics.add.sprite(104, 504, 'blueBase', 'wall_fountain_basin_blue_anim_f0.png');
    this.blueFountainBase2.anims.play('blue2');

    //creating the spikes animation
    this.anims.create({
      key: "spikes",
      repeat: -1,
      duration: 0.75,
      defaultTextureKey: "spikes",
      frames: [
        { frame: "floor_spikes_anim_f0.png", duration: 3000 },
        { frame: "floor_spikes_anim_f1.png", duration: 100 },
        { frame: "floor_spikes_anim_f2.png", duration: 100 },
        { frame: "floor_spikes_anim_f3.png", duration: 2000 },
        { frame: "floor_spikes_anim_f2.png", duration: 100 },
        { frame: "floor_spikes_anim_f1.png", duration: 100 }
      ]
    });


    this.spikes = this.add.group();
    this.spike1 = this.physics.add.sprite(136, 200, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike1);
    this.spike2 = this.physics.add.sprite(136, 216, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike2);
    this.spike3 = this.physics.add.sprite(136, 232, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike3);
    this.spike4 = this.physics.add.sprite(136, 248, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike4);

    this.spike5 = this.physics.add.sprite(616, 504, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike5);
    this.spike6 = this.physics.add.sprite(648, 504, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike6);
    this.spike7 = this.physics.add.sprite(632, 488, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike7);
    this.spike8 = this.physics.add.sprite(616, 472, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike8);
    this.spike9 = this.physics.add.sprite(648, 472, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike9);

    this.spike10 = this.physics.add.sprite(696, 104, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike10);
    this.spike11 = this.physics.add.sprite(712, 104, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike11);
    this.spike12 = this.physics.add.sprite(696, 152, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike12);
    this.spike13 = this.physics.add.sprite(712, 152, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike13);
    this.spike14 = this.physics.add.sprite(696, 200, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike14);
    this.spike15 = this.physics.add.sprite(712, 200, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike15);

    this.spike16 = this.physics.add.sprite(264, 552, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike16);
    this.spike17 = this.physics.add.sprite(248, 536, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike17);
    this.spike18 = this.physics.add.sprite(232, 520, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike18);
    this.spike19 = this.physics.add.sprite(280, 568, 'spikes', 'floor_spikes_anim_f0.png');
    this.spikes.add(this.spike19);

    this.spike1.anims.play('spikes');
    this.spike2.anims.play('spikes');
    this.spike3.anims.play('spikes');
    this.spike4.anims.play('spikes');
    this.spike5.anims.play('spikes');
    this.spike6.anims.play('spikes');
    this.spike7.anims.play('spikes');
    this.spike8.anims.play('spikes');
    this.spike9.anims.play('spikes');
    this.spike10.anims.play('spikes');
    this.spike11.anims.play('spikes');
    this.spike12.anims.play('spikes');
    this.spike13.anims.play('spikes');
    this.spike14.anims.play('spikes');
    this.spike15.anims.play('spikes');
    this.spike16.anims.play('spikes');
    this.spike17.anims.play('spikes');
    this.spike18.anims.play('spikes');
    this.spike19.anims.play('spikes');








    //hero player animations
    this.knight = this.add.sprite(350,325,'knight', 'knight_f_idle_anim_f1.png');
    this.physics.add.existing(this.knight);
    this.knight.body.setSize(this.knight.width * 1, this.knight.height * 0.75);
    this.knight.body.isKinematic = true;
    this.knight.body.immovable = true;
    this.knight.body.offset.y = 6;

    this.knight.health = 8;


    this.scene.stop('UIScene'); // Stop the previous instance
    this.scene.launch('UIScene', { knight: this.knight, health: this.knight.health }); // Launch a new instance

    this.physics.add.collider(this.knight, wallsLayer);
   this.anims.create
   ({
        key: 'knight-idle-right',
        frames: this.anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_idle_anim_f', suffix: '.png'}),
        frameRate: 10,
        repeat: -1
   })

   this.anims.create
   ({
        key: 'knight-idle-left',
        frames: this.anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_idle_anim_f', suffix: '.png'}),
        frameRate: 10,
        repeat: -1 
   })

   this.anims.create
   ({
        key: 'knight-run-right',
        frames: this.anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_run_anim_f', suffix: '.png'}),
        frameRate: 10,
        repeat: -1 
   })

   this.anims.create
   ({
        key: 'knight-run-left',
        frames: this.anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_run_anim_f', suffix: '.png'}),
        frameRate: 10,
        repeat: -1 
   })

   this.anims.create
   ({
        key: 'knight-run-up',
        frames: this.anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_run_anim_f', suffix: '.png'}),
        frameRate: 10,
        repeat: -1 
   })

   this.anims.create
   ({
        key: 'knight-run-down',
        frames: this.anims.generateFrameNames('knight', {start: 0, end: 3, prefix: 'knight_m_run_anim_f', suffix: '.png'}),
        frameRate: 10,
        repeat: -1 
   })

   this.anims.create
   ({
      key: 'knight-hit',
      frames: this.anims.generateFrameNames('knight', {start: 0, end: 0, prefix: 'knight_m_hit_anim_f', suffix: '.png'}),
      frameRate: 10,
      repeat: 0
   })

   //creating the chest sprites
   this.chest1 = this.add.sprite(80, 140, 'chest', 'chest_empty_open_anim_f0.png');
   this.physics.add.existing(this.chest1);
   this.chest1.body.setImmovable(true);

   this.chest2 = this.add.sprite(120, 70, 'chest', 'chest_empty_open_anim_f0.png');
   this.physics.add.existing(this.chest2);
   this.chest2.body.setImmovable(true);

   this.chest3 = this.add.sprite(110, 530, 'chest', 'chest_empty_open_anim_f0.png');
   this.physics.add.existing(this.chest3);
   this.chest3.body.setImmovable(true);

   this.chest4 = this.add.sprite(720, 400, 'chest', 'chest_empty_open_anim_f0.png');
   this.physics.add.existing(this.chest4);
   this.chest4.body.setImmovable(true);


   this.chestKnightCollider = this.physics.add.collider(this.knight, this.chests, () => {
    this.chests.getChildren().forEach((chest) => {
        console.log("collision");
        chest.body.setCollideWorldBounds(false);
        chest.body.setImmovable(true);
    });
});

  this.physics.add.collider(this.knight, this.chest1);
  this.physics.add.collider(this.knight, this.chest2);
  this.physics.add.collider(this.knight, this.chest3);
  this.physics.add.collider(this.knight, this.chest4);
 

   this.anims.create
   ({
     key: 'chest-open',
     frames: this.anims.generateFrameNames('chest', {start: 0, end: 2, prefix: 'chest_empty_open_anim_f', suffix: '.png'}),
     frameRate: 10,
     repeat: 0
   })

   this.anims.create
   ({
     key: 'chest-close',
     frames: this.anims.generateFrameNames('chest', {start: 2, end: 0, prefix: 'chest_empty_open_anim_f', suffix: '.png'}),
     frameRate: 10,
     repeat: 0
   })

   this.chest1Text = this.add.text(this.chest1.x, this.chest1.y - 20, 'Open me!',
  {
    fontFamily: 'Dungeon',
    fontSize: '18px',
    color: '#fff',
  });
   this.chest1Text.setOrigin(0.5, 0.25);
   this.chest1Text.setVisible(false);
   this.chest1Text.setScale(0.4);

   this.chest2Text = this.add.text(this.chest2.x, this.chest2.y - 20, 'Open me!',
   {
     fontFamily: 'Dungeon',
     fontSize: '18px',
     color: '#fff',
   });
   this.chest2Text.setOrigin(0.5, 0.25);
   this.chest2Text.setVisible(false);
   this.chest2Text.setScale(0.4);

   this.chest3Text = this.add.text(this.chest3.x, this.chest3.y - 20, 'Open me!',
   {
     fontFamily: 'Dungeon',
     fontSize: '18px',
     color: '#fff',
   });
   this.chest3Text.setOrigin(0.5, 0.25);
   this.chest3Text.setVisible(false);
   this.chest3Text.setScale(0.4);

   this.chest4Text = this.add.text(this.chest4.x, this.chest4.y - 20, 'Open me!',
   {
     fontFamily: 'Dungeon',
     fontSize: '18px',
     color: '#fff',
   });
   this.chest4Text.setOrigin(0.5, 0.25);
   this.chest4Text.setVisible(false);
   this.chest4Text.setScale(0.4);



   this.chestsFound = 0;




   this.isOpen1 = false;
   this.isOpen2 = false;
   this.isOpen3 = false;
   this.isOpen4 = false;
   const keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
   this.keyF = keyF;

  



   //sword animations
   this.sword = this.add.sprite('sword', 'weapon_red_gem_sword_f0.png');
   this.physics.add.existing(this.sword);

   this.knight.sword = this.sword;
   this.sword.body.setSize(30,30);
   this.sword.body.setAllowGravity(false);

   


   this.anims.create 
   ({
    key: 'sword_attack',
    frames: this.anims.generateFrameNames('sword', {start: 0, end: 2, prefix: 'weapon_red_gem_sword_f', suffix: '.png'}),
    frameRate: 20,
    repeat: 0,
    duration: 500
   });


   this.sword.visible = false;
   this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);




   //making the camera to follow the player
   this.cameras.main.startFollow(this.knight, true);
   if (this.sys.game.config.width < 600) { // You can adjust this threshold as needed
    this.cameras.main.zoom = 2; // Zoom out by 50%
}
else {
  this.cameras.main.zoom = 3;
}



   //skeleton enemies animations
   this.skeletons = this.add.group();

   this.skeleton = this.add.sprite(150, 256, 'skeleton', 'skelet_idle_anim_f0.png');
   this.skeleton.health = 1;
   this.skeletons.add(this.skeleton);
   this.physics.add.existing(this.skeleton);
   
   this.skeleton2 = this.add.sprite(600, 200, 'skeleton', 'skelet_idle_anim_f0.png');
   this.skeleton2.health = 1;
   this.skeletons.add(this.skeleton2);
   this.physics.add.existing(this.skeleton2);
   
   this.skeleton3 = this.add.sprite(400, 500, 'skeleton', 'skelet_idle_anim_f0.png');
   this.skeleton3.health = 1;
   this.skeletons.add(this.skeleton3);
   this.physics.add.existing(this.skeleton3);
   
   this.physics.add.collider(this.skeletons, this.skeletons);
   this.physics.add.collider(this.skeletons, wallsLayer);
   this.physics.add.collider(this.skeletons, this.demon);
   this.physics.add.collider(this.skeletons, this.orcs);

   
   
    this.anims.create
      ({
          key: 'skeleton-idle-right',
          frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_idle_anim_f', suffix: '.png'}),
          repeat: -1,
          frameRate: 10
      })
    this.anims.create
      ({
          key: 'skeleton-idle-left',
          frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_idle_anim_f', suffix: '.png'}),
          repeat: -1,
          frameRate: 10
      })

    this.anims.create
      ({
          key: 'skeleton-run-right',
          frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_run_anim_f', suffix: '.png'}),
          repeat: -1,
          frameRate: 10
        })
      
    this.anims.create
      ({
          key: 'skeleton-run-left',
          frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_run_anim_f', suffix: '.png'}),
          repeat: -1,
          frameRate: 10,
          scaleX: -1
      })

    this.anims.create
      ({
          key: 'skeleton-run-up',
          frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_run_anim_f', suffix: '.png'}),
          repeat: -1,
          frameRate: 10
      })

    this.anims.create
      ({
          key: 'skeleton-run-down',
          frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_run_anim_f', suffix: '.png'}),
          repeat: -1,
          frameRate: 10
      })


  //demon enemy animations 
  this.demon = this.add.sprite(600, 130, 'demon', 'big_demon_idle_anim_f0.png');
  this.demon.health = 2;
  this.physics.add.existing(this.demon);

  this.physics.add.collider(this.demon, wallsLayer);
  this.physics.add.collider(this.demon, this.skeletons);
  this.physics.add.collider(this.demon, this.orcs);

  this.anims.create
  ({
    key: 'demon-idle-right',
    frames: this.anims.generateFrameNames('demon', {start: 0, end: 3, prefix: 'big_demon_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'demon-idle-left',
    frames: this.anims.generateFrameNames('demon', {start: 0, end: 3, prefix: 'big_demon_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'demon-run-right',
    frames: this.anims.generateFrameNames('demon', {start: 0, end: 3, prefix: 'big_demon_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'demon-run-left',
    frames: this.anims.generateFrameNames('demon', {start: 0, end: 3, prefix: 'big_demon_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
    scaleX: -1
  })

  this.anims.create
  ({
    key: 'demon-run-down',
    frames: this.anims.generateFrameNames('demon', {start: 0, end: 3, prefix: 'big_demon_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
  })

  this.anims.create
  ({
    key: 'demon-run-up',
    frames: this.anims.generateFrameNames('demon', {start: 0, end: 3, prefix: 'big_demon_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
  })





  //orc enemy animations
  this.orcs = this.add.group();

  this.orc = this.add.sprite(650, 250, 'orc', 'orc_warrior_idle_anim_f0.png');
  this.orc.health = 1;
  this.orcs.add(this.orc);
  this.physics.add.existing(this.orc);

  this.orc2 = this.add.sprite(200, 175, 'orc', 'orc_warrior_idle_anim_f0.png');
  this.orc2.health = 1;
  this.orcs.add(this.orc2);
  this.physics.add.existing(this.orc2);

  this.orc3 = this.add.sprite(500, 475, 'orc', 'orc_warrior_idle_anim_f0.png');
  this.orc3.health = 1;
  this.orcs.add(this.orc3);
  this.physics.add.existing(this.orc3);

  this.physics.add.collider(this.orcs, wallsLayer);
  this.physics.add.collider(this.orcs, this.demon);
  this.physics.add.collider(this.orcs, this.skeletons);

  this.anims.create
  ({
    key: 'orc-idle-right',
    frames: this.anims.generateFrameNames('orc', {start: 0, end: 3, prefix: 'orc_warrior_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'orc-idle-left',
    frames: this.anims.generateFrameNames('orc', {start: 0, end: 3, prefix: 'orc_warrior_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'orc-run-right',
    frames: this.anims.generateFrameNames('orc', {start: 0, end: 3, prefix: 'orc_warrior_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'orc-run-left',
    frames: this.anims.generateFrameNames('orc', {start: 0, end: 3, prefix: 'orc_warrior_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
    scaleX: -1
  })

  this.anims.create
  ({
    key: 'orc-run-down',
    frames: this.anims.generateFrameNames('orc', {start: 0, end: 3, prefix: 'orc_warrior_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
  })

  this.anims.create
  ({
    key: 'orc-run-up',
    frames: this.anims.generateFrameNames('orc', {start: 0, end: 3, prefix: 'orc_warrior_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
  })

  this.zombie = this.add.sprite(700, 280, 'zombie', 'big_zombie_idle_anim_f0.png');
  this.zombie.health = 2;
  this.physics.add.existing(this.zombie);
  this.physics.add.collider(this.zombie, wallsLayer);
  this.physics.add.collider(this.zombie, this.skeletons);
  this.physics.add.collider(this.zombie, this.demon);
  this.physics.add.collider(this.zombie, this.orcs);

  this.anims.create
  ({
    key: 'zombie-idle-right',
    frames: this.anims.generateFrameNames('zombie', {start: 0, end: 3, prefix: 'big_zombie_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'zombie-idle-left',
    frames: this.anims.generateFrameNames('zombie', {start: 0, end: 3, prefix: 'big_zombie_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'zombie-run-right',
    frames: this.anims.generateFrameNames('zombie', {start: 0, end: 3, prefix: 'big_zombie_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  this.anims.create
  ({
    key: 'zombie-run-left',
    frames: this.anims.generateFrameNames('zombie', {start: 0, end: 3, prefix: 'big_zombie_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
    scaleX: -1
  })

  this.anims.create
  ({
    key: 'zombie-run-down',
    frames: this.anims.generateFrameNames('zombie', {start: 0, end: 3, prefix: 'big_zombie_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
  })

  this.anims.create
  ({
    key: 'zombie-run-up',
    frames: this.anims.generateFrameNames('zombie', {start: 0, end: 3, prefix: 'big_zombie_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate: 10,
  })


  this.swamps = this.add.group();

  this.swamp = this.add.sprite(50, 200, 'swamp', 'swampy_idle_anim_f0.png');
  this.swamp.health = 1;
  this.swamps.add(this.swamp);
  this.physics.add.existing(this.swamp);
  this.swamp.health = 1;

  this.swamp2 = this.add.sprite(70, 160, 'swamp', 'swampy_idle_anim_f0.png');
  this.swamp2.health = 1;
  this.swamps.add(this.swamp2);
  this.physics.add.existing(this.swamp2);
  this.swamp2.health = 1;

  this.swamp3 = this.add.sprite(65, 230, 'swamp', 'swampy_idle_anim_f0.png');
  this.swamp3.health = 1;
  this.swamps.add(this.swamp3);
  this.physics.add.existing(this.swamp3);
  this.swamp3.health = 1;


  this.physics.add.existing(this.swamps);
  this.physics.add.collider(this.swamps, wallsLayer);
  this.physics.add.collider(this.swamps, this.skeletons);
  this.physics.add.collider(this.swamps, this.demon);
  this.physics.add.collider(this.swamps, this.orcs);
  this.physics.add.collider(this.swamps, this.zombie);

  this.anims.create
  ({
    key: 'swamp-idle-right',
    frames: this.anims.generateFrameNames('swamp', {start: 0, end: 3, prefix: 'swampy_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })

  this.anims.create
  ({
    key: 'swamp-idle-left',
    frames: this.anims.generateFrameNames('swamp', {start: 0, end: 3, prefix: 'swampy_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10,
    scaleX: -1
  })

  this.anims.create
  ({
    key: 'swamp-run-right',
    frames: this.anims.generateFrameNames('swamp', {start: 0, end: 3, prefix: 'swampy_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })
  
  this.anims.create
  ({
    key: 'swamp-run-left',
    frames: this.anims.generateFrameNames('swamp', {start: 0, end: 3, prefix: 'swampy_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10,
    scaleX: -1
  })

  this.anims.create
  ({
    key: 'swamp-run-down',
    frames: this.anims.generateFrameNames('swamp', {start: 0, end: 3, prefix: 'swampy_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })

  this.anims.create
  ({
    key: 'swamp-run-up',
    frames: this.anims.generateFrameNames('swamp', {start: 0, end: 3, prefix: 'swampy_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })


  this.chorts = this.add.group();

  this.chort = this.add.sprite(195, 55, 'chort', 'chort_idle_anim_f0.png');
  this.chort.health = 1;
  this.chorts.add(this.chort);
  this.physics.add.existing(this.chort);
  this.chort.health = 1;

  this.chort2 = this.add.sprite(230, 65, 'chort', 'chort_idle_anim_f0.png');
  this.chort2.health = 1;
  this.chorts.add(this.chort2);
  this.physics.add.existing(this.chort2);
  this.chort2.health = 1;

  this.chort3 = this.add.sprite(275, 60, 'chort', 'chort_idle_anim_f0.png');
  this.chort3.health = 1;
  this.chorts.add(this.chort3);
  this.physics.add.existing(this.chort3);
  this.chort3.health = 1;

  this.chort4 = this.add.sprite(320, 65, 'chort', 'chort_idle_anim_f0.png');
  this.chort4.health = 1;
  this.chorts.add(this.chort4);
  this.physics.add.existing(this.chort4);
  this.chort4.health = 1;


  this.physics.add.existing(this.chorts);
  this.physics.add.collider(this.chorts, wallsLayer);
  this.physics.add.collider(this.chorts, this.skeletons);
  this.physics.add.collider(this.chorts, this.demon);
  this.physics.add.collider(this.chorts, this.orcs);
  this.physics.add.collider(this.chorts, this.zombie);
  this.physics.add.collider(this.chorts, this.swamps);

  this.anims.create
  ({
    key: 'chort-idle-right',
    frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })

  this.anims.create
  ({
    key: 'chort-idle-left',
    frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort_idle_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10,
    scaleX: -1
  })

  this.anims.create
  ({
    key: 'chort-run-right',
    frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })
  
  this.anims.create
  ({
    key: 'chort-run-left',
    frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10,
    scaleX: -1
  })

  this.anims.create
  ({
    key: 'chort-run-down',
    frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })

  this.anims.create
  ({
    key: 'chort-run-up',
    frames: this.anims.generateFrameNames('chort', {start: 0, end: 3, prefix: 'chort_run_anim_f', suffix: '.png'}),
    repeat: -1,
    frameRate:10
  })



  this.knightHit = false;

  // this.scene.add('ui', new UIScene(this.knight, this.knight.health), true);

  this.knight.isBeingHit = false;

// ...

let spikeHit = false;
this.physics.add.overlap(this.knight, this.spikes, (knight, spikes) => 
{
  if (spikes.anims.currentFrame.textureFrame === 'floor_spikes_anim_f3.png' && !spikeHit)
  {
    this.knight.health--;
    console.log(this.knight.health);
    knight.setTint(0xff0000);
    spikeHit = true;

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        spikeHit = false;
      },
      repeat: 0
    });

    let uiScene = this.scene.get('UIScene');
    if (uiScene) {
      uiScene.update(knight.health);
    }

    setTimeout(() => {
      this.knightHit = false;
      knight.clearTint();
  }, 1000);
  }
}, null, this);






  this.knightSkeletonCollider  = this.physics.add.collider(this.knight, this.skeletons, (knight, skeletons) =>
  {
    if (!this.knightHit)
    {
      knightSkeletonCollision.bind(this)(knight, skeletons);
    }
  }, null, this);

  function knightSkeletonCollision (knight, skeleton) {
    // check if the knight has already been hit
    if (!this.knightHit) {
        // mark the knight as hit and play the hit animation
        this.knightHit = true;
        knight.anims.play("knight-hit");

      
        knight.health--;
        console.log(knight.health);
        
        // tint the knight red
        knight.setTint(0xff0000);

        //update the health
        let uiScene = this.scene.get('UIScene');
        if (uiScene) {
          uiScene.update(knight.health);
        }

        // remove the collider if the knight's health is zero
        if (knight.health <= 1) {
            this.physics.world.removeCollider(this.knightSkeletonCollider);
        }
        
        // set a timeout to remove the hit status from the knight after 1 second
        setTimeout(() => {
            this.knightHit = false;
            knight.clearTint();
        }, 1000);
    }
  }


  this.knightDemonCollider  = this.physics.add.collider(this.knight, this.demon, (knight, demon) =>
  {
    if (!this.knightHit)
    {
      knightDemonCollision.bind(this)(knight, demon);
    }
  }, null, this);

  function knightDemonCollision (knight, demon) {
    // check if the knight has already been hit
    if (!this.knightHit) {
        // mark the knight as hit and play the hit animation
        this.knightHit = true;
        knight.anims.play("knight-hit");

     
        knight.health--;
        console.log(knight.health);
        
        // tint the knight red
        knight.setTint(0xff0000);

        //update the health
        let uiScene = this.scene.get('UIScene');
        if (uiScene) {
          uiScene.update(knight.health);
        }

        // remove the collider if the knight's health is zero
        if (knight.health <= 1) {
            this.physics.world.removeCollider(this.knightDemonCollider);
        }
        
        // set a timeout to remove the hit status from the knight after 1 second
        setTimeout(() => {
            this.knightHit = false;
            knight.clearTint();
        }, 1000);
    }
  }


  this.knightOrcsCollider  = this.physics.add.collider(this.knight, this.orcs, (knight, orcs) =>
  {
    if (!this.knightHit)
    {
      knightOrcsCollision.bind(this)(knight, orcs);
    }
  }, null, this);

  function knightOrcsCollision (knight, orcs) {
    // check if the knight has already been hit
    if (!this.knightHit) {
        // mark the knight as hit and play the hit animation
        this.knightHit = true;
        knight.anims.play("knight-hit");

     
        knight.health--;
        console.log(knight.health);
        
        // tint the knight red
        knight.setTint(0xff0000);

        let uiScene = this.scene.get('UIScene');
        if (uiScene) {
          uiScene.update(knight.health);
        }

        // remove the collider if the knight's health is zero
        if (knight.health <= 1) {
            this.physics.world.removeCollider(this.knightOrcsCollider);
        }
        
        // set a timeout to remove the hit status from the knight after 1 second
        setTimeout(() => {
            this.knightHit = false;
            knight.clearTint();
        }, 1000);
    }
  }

  this.knightZombieCollider  = this.physics.add.collider(this.knight, this.zombie, (knight, zombie) =>
  {
    if (!this.knightHit)
    {
      knightZombieCollision.bind(this)(knight, zombie);
    }
  }, null, this);

  function knightZombieCollision (knight, zombie) {
    // check if the knight has already been hit
    if (!this.knightHit) {
        // mark the knight as hit and play the hit animation
        this.knightHit = true;
        knight.anims.play("knight-hit");

       
        knight.health--;
        console.log(knight.health);
        
        // tint the knight red
        knight.setTint(0xff0000);

        //update the health
        let uiScene = this.scene.get('UIScene');
        if (uiScene) {
          uiScene.update(knight.health);
        }

        // remove the collider if the knight's health is zero
        if (knight.health <= 1) {
            this.physics.world.removeCollider(this.knightZombieCollider);
        }
        
        // set a timeout to remove the hit status from the knight after 1 second
        setTimeout(() => {
            this.knightHit = false;
            knight.clearTint();
        }, 1000);
    }
  }

  this.knightSwampCollider  = this.physics.add.collider(this.knight, this.swamps, (knight, swamps) =>
  {
    if (!this.knightHit)
    {
      knightSwampCollision.bind(this)(knight, swamps);
    }
  }, null, this);

  function knightSwampCollision (knight, swamps) {
    // check if the knight has already been hit
    if (!this.knightHit) {
        // mark the knight as hit and play the hit animation
        this.knightHit = true;
        knight.anims.play("knight-hit");

        knight.health--;
        console.log(knight.health);
        
        // tint the knight red
        knight.setTint(0xff0000);

        //update the health
        let uiScene = this.scene.get('UIScene');
        if (uiScene) {
          uiScene.update(knight.health);
        }

        // remove the collider if the knight's health is zero
        if (knight.health <= 1) {
            this.physics.world.removeCollider(this.knightSwampCollider);
        }
        
        // set a timeout to remove the hit status from the knight after 1 second
        setTimeout(() => {
            this.knightHit = false;
            knight.clearTint();
        }, 1000);
    }
  }


  this.knightChortCollider  = this.physics.add.collider(this.knight, this.chorts, (knight, chorts) =>
  {
    if (!this.knightHit)
    {
      knightChortCollision.bind(this)(knight, chorts);
    }
  }, null, this);

  function knightChortCollision (knight, chorts) {
    // check if the knight has already been hit
    if (!this.knightHit) {
        // mark the knight as hit and play the hit animation
        this.knightHit = true;
        knight.anims.play("knight-hit");

      
        knight.health--;
        console.log(knight.health);
        
        // tint the knight red
        knight.setTint(0xff0000);

        //update the health
        let uiScene = this.scene.get('UIScene');
        if (uiScene) {
          uiScene.update(knight.health);
        }

        // remove the collider if the knight's health is zero
        if (knight.health <= 1) {
            this.physics.world.removeCollider(this.knightChortCollider);
        }
        
        // set a timeout to remove the hit status from the knight after 1 second
        setTimeout(() => {
            this.knightHit = false;
            knight.clearTint();
        }, 1000);
    }
  }



  

 
    /*
  //code dealing with the damage animations from enemies 
  this.knightEnemyCollider = this.physics.add.collider(this.knight, [this.skeletons.getChildren(), this.demon, this.orcs.getChildren()], (knight, enemy) => {
    if (!this.knightHit) {
      knightEnemyCollision.bind(this)(knight, enemy);
    }
  }, null, this);
  */



/*
function knightEnemyCollision (knight, enemy) 
{
  console.log('asdf');
  if (!this.knightHit) 
  {
    this.knightHit = true;
    knight.anims.play("knight-hit");
    console.log('Before: ', knight.body.velocity);
    knight.body.setVelocityX(Phaser.Math.Between(-200, 200));
    knight.body.setVelocityY(Phaser.Math.Between(-200, 200));
    console.log('After: ', knight.body.velocity);
    knight.health--;
    console.log(knight.health);
    knight.setTint(0xff0000);
  
    if (knight.health <= 0)
    {
      this.physics.world.removeCollider(this.knightEnemyCollider);
    }
  
    setTimeout(() => 
    {
      this.knightHit = false;
      knight.clearTint();
    }, 1000);
  }
}

*/

  /*  
  function knightSkeletonCollision (knight, skeletons) 
  {
    if (!this.knightHit) 
    {
      this.knightHit = true;
      knight.anims.play("knight-hit");
      console.log('Before: ', knight.body.velocity);
      knight.body.setVelocityX(Phaser.Math.Between(-200, 200));
      knight.body.setVelocityY(Phaser.Math.Between(-200, 200));
      console.log('After: ', knight.body.velocity);
      knight.health--;
      console.log(knight.health);
      knight.setTint(0xff0000);
  
      for (let i = 0; i < skeletons.length; i++)
      {
        const skeleton = skeletons[i];
      }
      if (knight.health <= 0)
      {
        this.physics.world.removeCollider(this.knightSkeletonCollider);
      }
  
      setTimeout(() => 
      {
        this.knightHit = false;
        knight.clearTint();
      }, 1000);
    }
  }
  */

  /*
  function knightDemonCollision (knight, demon)
  {
    if (!this.knightHit)
    {
      this.knightHit = true;
      knight.anims.play("knight-hit");
      knight.health--;
      console.log(knight.health);
      knight.setTint(0xff0000);

      if (knight.health <= 0)
      {
        this.physics.world.removeCollider(this.knightDemonCollider);
      }
      
      setTimeout(() => 
      {
        this.knightHit = false;
        knight.clearTint();
      }, 1000);
    }
  }
*/
  this.door = this.physics.add.sprite(400, 272, 'door', 'door-open-close.png');

    
  this.doorCollider2 = this.physics.add.collider(this.knight, this.door, () => {
    this.door.anims.play('door_open');
    this.door.body.setCollideWorldBounds(false);
    this.door.body.setImmovable(true);
    this.door.body.velocity.x = 0;
    this.door.body.velocity.y = 0;
    this.door.depth = 1;
    this.knight.depth = 10;
    this.sword.depth = 10;
    this.time.delayedCall(500, () => {
      this.knight.depth = 0;
    });
  }, null, this);



  //creating the fog of war effect
    const width = this.scale.width * 2;
    const height = this.scale.height;

    const rt = this.make.renderTexture
    ({
      width, 
      height
    }, true);

    rt.depth = 2;
    rt.fill(0x000000, 1);
    rt.draw(floorLayer);
    rt.draw(wallsLayer);
    rt.setTint(0x0a2948);

    const mask = this.make.image
    ({
      x: this.knight.x,
      y: this.knight.y,
      key: 'mask',
      add: false
    })
    mask.scale = 0.8;
  
    this.mask = mask;
    rt.mask = new Phaser.Display.Masks.BitmapMask(this, mask)
    rt.mask.invertAlpha = true



    if (isMobileDevice()) {
      this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: this.sys.game.config.width * 0.6,
        y: this.sys.game.config.height * 0.655,
        radius: 15,
        base: this.add.circle(0, 0, 20, 0xFDF5E6),
        thumb: this.add.circle(0, 0, 10, 0xff0000),
        dir: '8dir',
        forceMin: 16,
        fixed: true,
        enable: true
      });
     
      console.log("Joystick initialized:", this.joyStick);
      this.joyStick.base.setDepth(2);
      this.joyStick.thumb.setDepth(3);

    }
    
    
    
    


  if (isMobileDevice()) {
    this.attackButton = this.add.circle(this.sys.game.config.width * 0.37, this.sys.game.config.height * 0.655, 15, 0xFDF5E6);
    this.attackButtonText = this.add.text(this.attackButton.x, this.attackButton.y, "ATK", {
      font: "10px Arial",
      fill: "#000000"
    }).setOrigin(0.5, 0.5);
    this.attackButton.setInteractive();
    this.attackButton.setScrollFactor(0);
    if (this.attackButton) {
      this.attackButton.on('pointerdown', () => {
          this.performAttack();
      });
    }
  
    console.log("Attack button intialized:", this.attackButton);
    this.attackButton.setDepth(10);
    this.attackButtonText.setDepth(11);
    this.attackButtonText.setScrollFactor(0);
  }



  if (isMobileDevice()) {
    this.openChestButton = this.add.circle(this.sys.game.config.width * 0.465, this.sys.game.config.height * 0.655, 15, 0xFDF5E6);
    this.openButtonText = this.add.text(this.openChestButton.x, this.openChestButton.y, "OPEN", {
      font: "10px Arial",
      fill: "#000000"
    }).setOrigin(0.5, 0.5); 
    this.openButtonText.setPosition(this.openChestButton.x, this.openChestButton.y);
    this.openChestButton.setInteractive();
    this.openChestButton.setScrollFactor(0); 
    this.openChestButton.setDepth(11);
    this.openButtonText.setDepth(12);
    this.openButtonText.setScrollFactor(0);



    this.chestButtonPressed = false;
    this.openChestButton.on('pointerdown', () => {
      this.chestButtonPressed = true;
    });

    this.openChestButton.on('pointerup', () => {
      this.chestButtonPressed = false;
    });

  }


}


update()
{


  let isJoystickActive = false;


  if (this.joyStick) {
    let dx = this.joyStick.thumb.x - this.joyStick.base.x;
    let dy = this.joyStick.thumb.y - this.joyStick.base.y;

    let magnitude = Math.sqrt(dx * dx + dy * dy);
    console.log("dx:", dx, "dy:", dy, "magnitude:", magnitude);

    if (magnitude > 0) {
        isJoystickActive = true;
        let nx = dx / magnitude;
        let ny = dy / magnitude;
        
        let speed = 100;  // Adjust as needed
        this.knight.body.setVelocityX(nx * speed);
        this.knight.body.setVelocityY(ny * speed);

        // Joystick Animation Logic
        if (nx < 0 && Math.abs(ny) * 0.1 < Math.abs(nx)) {
            this.knight.anims.play('knight-run-right', true); // Use run-right animation
            this.knight.setScale(-1, 1); // Flip sprite horizontally
            this.knight.body.offset.x = 15;
        } else if (nx > 0 && Math.abs(ny)< Math.abs(nx)) {
            this.knight.anims.play('knight-run-right', true);
            this.knight.setScale(1, 1); // Reset to normal scale
            this.knight.body.offset.x = 0;
        } else if (ny < 0) {
            this.knight.anims.play('knight-run-down', true);
            this.knight.setScale(1, 1); // Reset to normal scale
        } else {
            this.knight.anims.play('knight-run-up', true);
            this.knight.setScale(1, 1); // Reset to normal scale
        }
    } else {
        this.knight.anims.play('knight-idle-right', true);
        this.knight.body.setVelocity(0, 0);
    }
}



if (!isJoystickActive && this.cursors && this.knight) {
  // If joystick is not active, use keyboard controls
  let velocityX = 0;
  let velocityY = 0;

  if (this.cursors.left.isDown) {
      velocityX = -100;
      this.knight.scaleX = -1;
      this.knight.body.offset.x = 15;
  } else if (this.cursors.right.isDown) {
      velocityX = 100;
      this.knight.scaleX = 1;
      this.knight.body.offset.x = 0;
  }

  if (this.cursors.up.isDown) {
      velocityY = -100;
  } else if (this.cursors.down.isDown) {
      velocityY = 100;
  }

  if (this.cursors.left.isDown && this.cursors.up.isDown) {
      velocityX = -100 * Math.cos(Math.PI / 4);
      velocityY = -100 * Math.sin(Math.PI / 4);
  } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
      velocityX = 100 * Math.cos(Math.PI / 4);
      velocityY = -100 * Math.sin(Math.PI / 4);
  } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
      velocityX = -100 * Math.cos(Math.PI / 4);
      velocityY = 100 * Math.sin(Math.PI / 4);
  } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
      velocityX = 100 * Math.cos(Math.PI / 4);
      velocityY = 100 * Math.sin(Math.PI / 4);
  }

  if (velocityX !== 0 || velocityY !== 0) {
      this.knight.body.setVelocity(velocityX, velocityY);
      if (velocityX < 0 && velocityY === 0) {
          this.knight.anims.play('knight-run-left', true);
      } else if (velocityX > 0 && velocityY === 0) {
          this.knight.anims.play('knight-run-right', true);
      } else if (velocityY < 0) {
          this.knight.anims.play('knight-run-down', true);
      } else {
          this.knight.anims.play('knight-run-up', true);
      }
  } else {
      this.knight.anims.play('knight-idle-right', true);
      this.knight.body.setVelocity(0, 0);
  }
}





    //move fog of war with player
    if (this.mask)
    {
      this.mask.x = this.knight.x;
      this.mask.y = this.knight.y;
    }


    //set up the chest opening animation for chest #1
    const distanceChest1 = Phaser.Math.Distance.Between(this.chest1.x, this.chest1.y, this.knight.x, this.knight.y);

    if (distanceChest1 < 20 && !this.isOpen1 && !this.menuOpened1) {
      this.chest1Text.setVisible(true);
      this.chest1Text.setText('Open me!');
    
      if (Phaser.Input.Keyboard.JustDown(this.keyF) || this.chestButtonPressed) {
        this.isOpen1 = true;
        this.chestsFound++;
        this.events.emit('chest-opened');
        this.chest1.anims.play('chest-open');
        this.chest1.once('animationcomplete', () => {
          this.menuOpened1 = true;
          this.showMenu(1);
          this.chest1.anims.play('chest-close');
          this.isOpen1 = false;
          this.events.emit('chest1-opened');
          this.menuOpened1 = false;
        });
      }
    } 
    else 
    {
      this.chest1Text.setVisible(false);
    }

  //set up the chest opening animation for chest #1
  const distanceChest2 = Phaser.Math.Distance.Between(this.chest2.x, this.chest2.y, this.knight.x, this.knight.y);

  if (distanceChest2 < 20 && !this.isOpen2 && !this.menuOpened2) {
    this.chest2Text.setVisible(true);

    if (Phaser.Input.Keyboard.JustDown(this.keyF) || this.chestButtonPressed) {
      this.isOpen2 = true;
      this.chestsFound++;
      this.events.emit('chest-opened');
      this.chest2.anims.play('chest-open');
      this.chest2.once('animationcomplete', () => {
        this.menuOpened2 = true;
        this.showMenu(2);
        this.chest2.anims.play('chest-close');
        this.isOpen2 = false;
        this.events.emit('chest2-opened');
        this.menuOpened2 = false;
      });
    }
  } 
  else 
  {
    this.chest2Text.setVisible(false);
  }

  //set up the chest opening animation for chest #3
  const distanceChest3 = Phaser.Math.Distance.Between(this.chest3.x, this.chest3.y, this.knight.x, this.knight.y);

  if (distanceChest3 < 20 && !this.isOpen3 && !this.menuOpened3) {
    this.chest3Text.setVisible(true);

    if (Phaser.Input.Keyboard.JustDown(this.keyF) || this.chestButtonPressed) {
      this.isOpen3 = true;
      this.chestsCollected++;
      this.events.emit('chest-opened');
      this.chest3.anims.play('chest-open');
      this.chest3.once('animationcomplete', () => {
        this.menuOpened3 = true;
        this.showMenu(3);
        this.chest3.anims.play('chest-close');
        this.isOpen3 = false;
        this.events.emit('chest3-opened');
        this.menuOpened3 = false;
      });
    }
  } 
  else 
  {
    this.chest3Text.setVisible(false);
  }

  //set up the chest opening animation for chest #4
  const distanceChest4 = Phaser.Math.Distance.Between(this.chest4.x, this.chest4.y, this.knight.x, this.knight.y);

  if (distanceChest4 < 20 && !this.isOpen4 && !this.menuOpened4) {
    this.chest4Text.setVisible(true);

    if (Phaser.Input.Keyboard.JustDown(this.keyF) || this.chestButtonPressed) {
      this.isOpen4 = true;
      this.chestsCollected++;
      this.events.emit('chest-opened');
      this.chest4.anims.play('chest-open');
      this.chest4.once('animationcomplete', () => {
        this.menuOpened4 = true;
        this.showMenu(4);
        this.chest4.anims.play('chest-close');
        this.isOpen4 = false;
        this.events.emit('chest4-opened');
        this.menuOpened4 = false;
      });
    }
  } 
  else 
  {
    this.chest4Text.setVisible(false);
  }

    
  
    
    // Set up the collision detection and damage
if (this.sword)
{
  this.sword.x = this.knight.x + 5;
  this.sword.y = this.knight.y + 5;

  if (this.spacebar.isDown && !this.isAttacking) 
  {
    this.isAttacking = true;
    if (this.sword) 
    {
      this.sword.setVisible(true);
      this.sword.anims.play('sword_attack', true);
      this.physics.world.overlap(this.sword, this.skeleton, () =>
      {
        this.skeleton.health--;
        if (this.skeleton.health <= 0)
        {
          this.skeleton.destroy();
        }
      })
      this.physics.world.overlap(this.sword, this.skeleton2, () =>
      {
        this.skeleton2.health--;
        if (this.skeleton2.health <= 0)
        {
          this.skeleton2.destroy();
        }
      })
      this.physics.world.overlap(this.sword, this.skeleton3, () =>
      {
        this.skeleton3.health--;
        if (this.skeleton3.health <= 0)
        {
          this.skeleton3.destroy();
        }
      })
      this.physics.world.overlap(this.sword, this.demon, () =>
      {
        this.demon.health--;
        if (this.demon.health <= 0)
        {
          this.demon.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.orc, () =>
      {
        this.orc.health--;
        if (this.orc.health <= 0)
        {
          this.orc.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.orc2, () =>
      {
        this.orc2.health--;
        if (this.orc2.health <= 0)
        {
          this.orc2.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.orc3, () =>
      {
        this.orc3.health--;
        if (this.orc3.health <= 0)
        {
          this.orc3.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.zombie, () =>
      {
        this.zombie.health--;
        if (this.zombie.health <= 0)
        {
          this.zombie.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.swamp, () =>
      {
        this.swamp.health--;
        if (this.swamp.health <= 0)
        {
          this.swamp.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.swamp2, () =>
      {
        this.swamp2.health--;
        if (this.swamp2.health <= 0)
        {
          this.swamp2.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.swamp3, () =>
      {
        this.swamp3.health--;
        if (this.swamp3.health <= 0)
        {
          this.swamp3.destroy();
        }
      })


      this.physics.world.overlap(this.sword, this.chort, () =>
      {
        this.chort.health--;
        if (this.chort.health <= 0)
        {
          this.chort.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.chort2, () =>
      {
        this.chort2.health--;
        if (this.chort2.health <= 0)
        {
          this.chort2.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.chort3, () =>
      {
        this.chort3.health--;
        if (this.chort3.health <= 0)
        {
          this.chort3.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.chort4, () =>
      {
        this.chort4.health--;
        if (this.chort4.health <= 0)
        {
          this.chort4.destroy();
        }
      })

      

      setTimeout(() => 
      {
        this.sword.setVisible(false);
        this.isAttacking = false;
      }, 250); // hide the sword after 1 second
    }
  }
}

if (this.knight.scaleX < 0)
{
  this.sword.scaleX = -1;
  this.swordOffsetX = -5;
  this.sword.x = this.knight.x + this.swordOffsetX;
  this.sword.body.offset.x = 35;
  this.sword.body.offset.y = -5;
  
}

else 
{
  this.sword.scaleX = 1;
  this.swordOffsetX = -10;
  this.sword.body.offset.x = 5;
  this.sword.body.offset.y = -5;
}


  //code dealing with enemy AI behavior. Once the player reaches a certain radial distance, the enemy will 
  //begin to follow the player in an attempt to attack
  const followRadius = 75;
  const followRadius2 = 90;
  const followRadiusSwamp = 75;
  const followRadiusChort = 50;
  const followSpeed = 20;
  const followSpeed2 = 15;
  const threshold = 5;


  //skeleton #1
  const distance = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.skeleton.x, this.skeleton.y);
  const isSkeletonCollidingWithWalls = this.physics.collide(this.skeleton, this.wallsLayer);

  if (this.skeleton.body && distance < threshold) {
    this.skeleton.body.setVelocity(0);
    this.skeleton.anims.play('skeleton-idle-right', true);
    if (this.knight.x < this.skeleton.x) 
    {
      this.skeleton.scaleX = -1;
      this.skeleton.body.offset.x = 15
    } 
    else 
    {
      this.skeleton.scaleX = 1;
      this.skeleton.body.offset.x = 0
    }
  } 
  else if (this.skeleton.body && distance < followRadius) 
  {
    let direction = Phaser.Math.Angle.Between(this.skeleton.x, this.skeleton.y, this.knight.x, this.knight.y);
    this.skeleton.body.setVelocityX(Math.cos(direction) * followSpeed);
    this.skeleton.body.setVelocityY(Math.sin(direction) * followSpeed);
    this.skeleton.anims.play('skeleton-run-right', true);
    if (this.knight.x < this.skeleton.x) {
      this.skeleton.scaleX = -1;
      this.skeleton.body.offset.x = 15
    } 
    else 
    {
      this.skeleton.scaleX = 1;
      this.skeleton.body.offset.x = 0
      
    }
  }
  else if (this.skeleton.body)
  {
    this.skeleton.body.setVelocity(0);
    this.skeleton.anims.play('skeleton-idle-right', true);
    if (this.knight.x < this.skeleton.x) {
      this.skeleton.scaleX = -1;
      this.skeleton.body.offset.x = 15
    } 
    else 
    {
      this.skeleton.scaleX = 1;
      this.skeleton.body.offset.x = 0
    }
  }



  //skeleton #2
  const distance2 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.skeleton2.x, this.skeleton2.y);
  
  if (this.skeleton2.body && distance2 < threshold) {
    this.skeleton2.body.setVelocity(0);
    this.skeleton2.anims.play('skeleton-idle-right', true);
    if (this.knight.x < this.skeleton2.x) 
    {
      this.skeleton2.scaleX = -1;
      this.skeleton2.body.offset.x = 15
    } 
    else 
    {
      this.skeleton2.scaleX = 1;
      this.skeleton2.body.offset.x = 0
    }
  } 
  else if (this.skeleton2.body && distance2 < followRadius) 
  {
    let direction2 = Phaser.Math.Angle.Between(this.skeleton2.x, this.skeleton2.y, this.knight.x, this.knight.y);
    this.skeleton2.body.setVelocityX(Math.cos(direction2) * followSpeed);
    this.skeleton2.body.setVelocityY(Math.sin(direction2) * followSpeed);
    this.skeleton2.anims.play('skeleton-run-right', true);
    if (this.knight.x < this.skeleton2.x) {
      this.skeleton2.scaleX = -1;
      this.skeleton2.body.offset.x = 15
    } 
    else 
    {
      this.skeleton2.scaleX = 1;
      this.skeleton2.body.offset.x = 0
      
    }
  }
  else if (this.skeleton2.body)
  {
    this.skeleton2.body.setVelocity(0);
    this.skeleton2.anims.play('skeleton-idle-right', true);
    if (this.knight.x < this.skeleton2.x) {
      this.skeleton2.scaleX = -1;
      this.skeleton2.body.offset.x = 15
    } 
    else 
    {
      this.skeleton2.scaleX = 1;
      this.skeleton2.body.offset.x = 0
    }
  }


  //skeleton #3
  const distance3 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.skeleton3.x, this.skeleton3.y);
  if (this.skeleton3.body && distance3 < threshold) {
    this.skeleton3.body.setVelocity(0);
    this.skeleton3.anims.play('skeleton-idle-right', true);
    if (this.knight.x < this.skeleton3.x) 
    {
      this.skeleton3.scaleX = -1;
      this.skeleton3.body.offset.x = 15
      
    } 
    else 
    {
      this.skeleton3.scaleX = 1;
      this.skeleton3.body.offset.x = 0
    }
  } 
  else if (this.skeleton3.body && distance3 < followRadius) 
  {
    let direction3 = Phaser.Math.Angle.Between(this.skeleton3.x, this.skeleton3.y, this.knight.x, this.knight.y);
    this.skeleton3.body.setVelocityX(Math.cos(direction3) * followSpeed);
    this.skeleton3.body.setVelocityY(Math.sin(direction3) * followSpeed);
    this.skeleton3.anims.play('skeleton-run-right', true);
    if (this.knight.x < this.skeleton3.x) {
      this.skeleton3.scaleX = -1;
      this.skeleton3.body.offset.x = 15
    } 
    else 
    {
      this.skeleton3.scaleX = 1;
      this.skeleton3.body.offset.x = 0
      
    }
  }
  else if (this.skeleton3.body)
  {
    this.skeleton3.body.setVelocity(0);
    this.skeleton3.anims.play('skeleton-idle-right', true);
    if (this.knight.x < this.skeleton3.x) {
      this.skeleton3.scaleX = -1;
      this.skeleton3.body.offset.x = 15
    } 
    else 
    {
      this.skeleton3.scaleX = 1;
      this.skeleton3.body.offset.x = 0
    }
  }


//big demon
const distance4 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.demon.x, this.demon.y);
  
  if (this.demon.body && distance4 < threshold) {
    this.demon.body.setVelocity(0);
    this.demon.anims.play('demon-idle-right', true);
    if (this.knight.x < this.demon.x) 
    {
      this.demon.scaleX = -1;
      this.demon.body.offset.x = 30
    } 
    else 
    {
      this.demon.scaleX = 1;
      this.demon.body.offset.x = 0
    }
  } 
  else if (this.demon.body && distance4 < followRadius2) 
  {
    let direction4 = Phaser.Math.Angle.Between(this.demon.x, this.demon.y, this.knight.x, this.knight.y);
    this.demon.body.setVelocityX(Math.cos(direction4) * followSpeed2);
    this.demon.body.setVelocityY(Math.sin(direction4) * followSpeed2);
    this.demon.anims.play('demon-run-right', true);
    if (this.knight.x < this.demon.x) {
      this.demon.scaleX = -1;
      this.demon.body.offset.x = 30
    } 
    else 
    {
      this.demon.scaleX = 1;
      this.demon.body.offset.x = 0
    }
  }
  else if (this.demon.body)
  {
    this.demon.body.setVelocity(0);
    this.demon.anims.play('demon-idle-right', true);
    if (this.knight.x < this.demon.x) {
      this.demon.scaleX = -1;
      this.demon.body.offset.x = 30
    } 
    else 
    {
      this.demon.scaleX = 1;
      this.demon.body.offset.x = 0
    }
  }

  //orc #1
  const distance5 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.orc.x, this.orc.y);
  
  if (this.orc.body && distance5 < threshold) {
    this.orc.body.setVelocity(0);
    this.orc.anims.play('orc-idle-right', true);
    if (this.knight.x < this.orc.x) 
    {
      this.orc.scaleX = -1;
      this.orc.body.offset.x = 15
    } 
    else 
    {
      this.orc.scaleX = 1;
      this.orc.body.offset.x = 0
    }
  } 
  else if (this.orc.body && distance5 < followRadius) 
  {
    let direction5 = Phaser.Math.Angle.Between(this.orc.x, this.orc.y, this.knight.x, this.knight.y);
    this.orc.body.setVelocityX(Math.cos(direction5) * followSpeed);
    this.orc.body.setVelocityY(Math.sin(direction5) * followSpeed);
    this.orc.anims.play('orc-run-right', true);
    if (this.knight.x < this.orc.x) {
      this.orc.scaleX = -1;
      this.orc.body.offset.x = 15
    } 
    else 
    {
      this.orc.scaleX = 1;
      this.orc.body.offset.x = 0
      
    }
  }
  else if (this.orc.body)
  {
    this.orc.body.setVelocity(0);
    this.orc.anims.play('orc-idle-right', true);
    if (this.knight.x < this.orc.x) {
      this.orc.scaleX = -1;
      this.orc.body.offset.x = 15
    } 
    else 
    {
      this.orc.scaleX = 1;
      this.orc.body.offset.x = 0
    }
  }

  //orc #2
  const distance6 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.orc2.x, this.orc2.y);
  
  if (this.orc2.body && distance6 < threshold) {
    this.orc2.body.setVelocity(0);
    this.orc2.anims.play('orc-idle-right', true);
    if (this.knight.x < this.orc2.x) 
    {
      this.orc2.scaleX = -1;
      this.orc2.body.offset.x = 15
    } 
    else 
    {
      this.orc2.scaleX = 1;
      this.orc2.body.offset.x = 0
    }
  } 
  else if (this.orc2.body && distance6 < followRadius) 
  {
    let direction6 = Phaser.Math.Angle.Between(this.orc2.x, this.orc2.y, this.knight.x, this.knight.y);
    this.orc2.body.setVelocityX(Math.cos(direction6) * followSpeed);
    this.orc2.body.setVelocityY(Math.sin(direction6) * followSpeed);
    this.orc2.anims.play('orc-run-right', true);
    if (this.knight.x < this.orc2.x) {
      this.orc2.scaleX = -1;
      this.orc2.body.offset.x = 15
    } 
    else 
    {
      this.orc2.scaleX = 1;
      this.orc2.body.offset.x = 0
      
    }
  }
  else if (this.orc2.body)
  {
    this.orc2.body.setVelocity(0);
    this.orc2.anims.play('orc-idle-right', true);
    if (this.knight.x < this.orc2.x) {
      this.orc2.scaleX = -1;
      this.orc2.body.offset.x = 15
    } 
    else 
    {
      this.orc2.scaleX = 1;
      this.orc2.body.offset.x = 0
    }
  }

//orc #3
const distance7 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.orc3.x, this.orc3.y);
  
if (this.orc3.body && distance7 < threshold) {
  this.orc3.body.setVelocity(0);
  this.orc3.anims.play('orc-idle-right', true);
  if (this.knight.x < this.orc3.x) 
  {
    this.orc3.scaleX = -1;
    this.orc3.body.offset.x = 15
  } 
  else 
  {
    this.orc3.scaleX = 1;
    this.orc3.body.offset.x = 0
  }
} 
else if (this.orc3.body && distance7 < followRadius) 
{
  let direction7 = Phaser.Math.Angle.Between(this.orc3.x, this.orc3.y, this.knight.x, this.knight.y);
  this.orc3.body.setVelocityX(Math.cos(direction7) * followSpeed);
  this.orc3.body.setVelocityY(Math.sin(direction7) * followSpeed);
  this.orc3.anims.play('orc-run-right', true);
  if (this.knight.x < this.orc3.x) {
    this.orc3.scaleX = -1;
    this.orc3.body.offset.x = 15
  } 
  else 
  {
    this.orc3.scaleX = 1;
    this.orc3.body.offset.x = 0
    
  }
}
else if (this.orc3.body)
{
  this.orc3.body.setVelocity(0);
  this.orc3.anims.play('orc-idle-right', true);
  if (this.knight.x < this.orc3.x) {
    this.orc3.scaleX = -1;
    this.orc3.body.offset.x = 15
  } 
  else 
  {
    this.orc3.scaleX = 1;
    this.orc3.body.offset.x = 0
  }
}

//big zombie
const distance8 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.zombie.x, this.zombie.y);
  
if (this.zombie.body && distance8 < threshold) {
  this.zombie.body.setVelocity(0);
  this.zombie.anims.play('zombie-idle-right', true);
  if (this.knight.x < this.zombie.x) 
  {
    this.zombie.scaleX = -1;
    this.zombie.body.offset.x = 30
  } 
  else 
  {
    this.zombie.scaleX = 1;
    this.zombie.body.offset.x = 0
  }
} 
else if (this.zombie.body && distance8 < followRadius2) 
{
  let direction8 = Phaser.Math.Angle.Between(this.zombie.x, this.zombie.y, this.knight.x, this.knight.y);
  this.zombie.body.setVelocityX(Math.cos(direction8) * followSpeed2);
  this.zombie.body.setVelocityY(Math.sin(direction8) * followSpeed2);
  this.zombie.anims.play('zombie-run-right', true);
  if (this.knight.x < this.zombie.x) {
    this.zombie.scaleX = -1;
    this.zombie.body.offset.x = 30;
  } 
  else 
  {
    this.zombie.scaleX = 1;
    this.zombie.body.offset.x = 0;
    
  }
}
else if (this.zombie.body)
{
  this.zombie.body.setVelocity(0);
  this.zombie.anims.play('zombie-idle-right', true);
  if (this.knight.x < this.zombie.x) {
    this.zombie.scaleX = -1;
    this.zombie.body.offset.x = 30
  } 
  else 
  {
    this.zombie.scaleX = 1;
    this.zombie.body.offset.x = 0
  }
}

//swamp #1
const distance9 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.swamp.x, this.swamp.y);
  
if (this.swamp.body && distance9 < threshold) {
  this.swamp.body.setVelocity(0);
  this.swamp.anims.play('swamp-idle-right', true);
  if (this.knight.x < this.swamp.x) 
  {
    this.swamp.scaleX = -1;
    this.swamp.body.offset.x = 15
  } 
  else 
  {
    this.swamp.scaleX = 1;
    this.swamp.body.offset.x = 0
  }
} 
else if (this.swamp.body && distance9 < followRadiusSwamp) 
{
  let direction9 = Phaser.Math.Angle.Between(this.swamp.x, this.swamp.y, this.knight.x, this.knight.y);
  this.swamp.body.setVelocityX(Math.cos(direction9) * followSpeed);
  this.swamp.body.setVelocityY(Math.sin(direction9) * followSpeed);
  this.swamp.anims.play('swamp-run-right', true);
  if (this.knight.x < this.swamp.x) {
    this.swamp.scaleX = -1;
    this.swamp.body.offset.x = 15
  } 
  else 
  {
    this.swamp.scaleX = 1;
    this.swamp.body.offset.x = 0
    
  }
}
else if (this.swamp.body)
{
  this.swamp.body.setVelocity(0);
  this.swamp.anims.play('swamp-idle-right', true);
  if (this.knight.x < this.swamp.x) {
    this.swamp.scaleX = -1;
    this.swamp.body.offset.x = 15
  } 
  else 
  {
    this.swamp.scaleX = 1;
    this.swamp.body.offset.x = 0
  }
}

//swamp #2
const distance10 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.swamp2.x, this.swamp2.y);
  
if (this.swamp2.body && distance10 < threshold) {
  this.swamp2.body.setVelocity(0);
  this.swamp2.anims.play('swamp-idle-right', true);
  if (this.knight.x < this.swamp2.x) 
  {
    this.swamp2.scaleX = -1;
    this.swamp2.body.offset.x = 15
  } 
  else 
  {
    this.swamp2.scaleX = 1;
    this.swamp2.body.offset.x = 0
  }
} 
else if (this.swamp2.body && distance10 < followRadiusSwamp) 
{
  let direction10 = Phaser.Math.Angle.Between(this.swamp2.x, this.swamp2.y, this.knight.x, this.knight.y);
  this.swamp2.body.setVelocityX(Math.cos(direction10) * followSpeed);
  this.swamp2.body.setVelocityY(Math.sin(direction10) * followSpeed);
  this.swamp2.anims.play('swamp-run-right', true);
  if (this.knight.x < this.swamp2.x) {
    this.swamp2.scaleX = -1;
    this.swamp2.body.offset.x = 15
  } 
  else 
  {
    this.swamp2.scaleX = 1;
    this.swamp2.body.offset.x = 0
    
  }
}
else if (this.swamp2.body)
{
  this.swamp2.body.setVelocity(0);
  this.swamp2.anims.play('swamp-idle-right', true);
  if (this.knight.x < this.swamp2.x) {
    this.swamp2.scaleX = -1;
    this.swamp2.body.offset.x = 15
  } 
  else 
  {
    this.swamp2.scaleX = 1;
    this.swamp2.body.offset.x = 0
  }
}

//swamp #3
const distance11 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.swamp3.x, this.swamp3.y);
  
if (this.swamp3.body && distance11 < threshold) {
  this.swamp3.body.setVelocity(0);
  this.swamp3.anims.play('swamp-idle-right', true);
  if (this.knight.x < this.swamp3.x) 
  {
    this.swamp3.scaleX = -1;
    this.swamp3.body.offset.x = 15
  } 
  else 
  {
    this.swamp3.scaleX = 1;
    this.swamp3.body.offset.x = 0
  }
} 
else if (this.swamp3.body && distance11 < followRadiusSwamp) 
{
  let direction11 = Phaser.Math.Angle.Between(this.swamp3.x, this.swamp3.y, this.knight.x, this.knight.y);
  this.swamp3.body.setVelocityX(Math.cos(direction11) * followSpeed);
  this.swamp3.body.setVelocityY(Math.sin(direction11) * followSpeed);
  this.swamp3.anims.play('swamp-run-right', true);
  if (this.knight.x < this.swamp3.x) {
    this.swamp3.scaleX = -1;
    this.swamp3.body.offset.x = 15
  } 
  else 
  {
    this.swamp3.scaleX = 1;
    this.swamp3.body.offset.x = 0
    
  }
}
else if (this.swamp3.body)
{
  this.swamp3.body.setVelocity(0);
  this.swamp3.anims.play('swamp-idle-right', true);
  if (this.knight.x < this.swamp3.x) {
    this.swamp3.scaleX = -1;
    this.swamp3.body.offset.x = 15
  } 
  else 
  {
    this.swamp3.scaleX = 1;
    this.swamp3.body.offset.x = 0
  }
}

//chort #1
const distance12 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.chort.x, this.chort.y);
  
if (this.chort.body && distance12 < threshold) {
  this.chort.body.setVelocity(0);
  this.chort.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort.x) 
  {
    this.chort.scaleX = -1;
    this.chort.body.offset.x = 15
  } 
  else 
  {
    this.chort.scaleX = 1;
    this.chort.body.offset.x = 0
  }
} 
else if (this.chort.body && distance12 < followRadiusChort) 
{
  let direction12 = Phaser.Math.Angle.Between(this.chort.x, this.chort.y, this.knight.x, this.knight.y);
  this.chort.body.setVelocityX(Math.cos(direction12) * followSpeed);
  this.chort.body.setVelocityY(Math.sin(direction12) * followSpeed);
  this.chort.anims.play('chort-run-right', true);
  if (this.knight.x < this.chort.x) {
    this.chort.scaleX = -1;
    this.chort.body.offset.x = 15
  } 
  else 
  {
    this.chort.scaleX = 1;
    this.chort.body.offset.x = 0
    
  }
}
else if (this.chort.body)
{
  this.chort.body.setVelocity(0);
  this.chort.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort.x) {
    this.chort.scaleX = -1;
    this.chort.body.offset.x = 15
  } 
  else 
  {
    this.chort.scaleX = 1;
    this.chort.body.offset.x = 0
  }
}

//chort #2
const distance13 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.chort2.x, this.chort2.y);

if (this.chort2.body && distance13 < threshold) {
  this.chort2.body.setVelocity(0);
  this.chort2.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort2.x) 
  {
    this.chort2.scaleX = -1;
    this.chort2.body.offset.x = 15
  } 
  else 
  {
    this.chort2.scaleX = 1;
    this.chort2.body.offset.x = 0
  }
} 
else if (this.chort2.body && distance13 < followRadiusChort) 
{
  let direction13 = Phaser.Math.Angle.Between(this.chort2.x, this.chort2.y, this.knight.x, this.knight.y);
  this.chort2.body.setVelocityX(Math.cos(direction13) * followSpeed);
  this.chort2.body.setVelocityY(Math.sin(direction13) * followSpeed);
  this.chort2.anims.play('chort-run-right', true);
  if (this.knight.x < this.chort2.x) {
    this.chort2.scaleX = -1;
    this.chort2.body.offset.x = 15
  } 
  else 
  {
    this.chort2.scaleX = 1;
    this.chort2.body.offset.x = 0
    
  }
}
else if (this.chort2.body)
{
  this.chort2.body.setVelocity(0);
  this.chort2.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort2.x) {
    this.chort2.scaleX = -1;
    this.chort2.body.offset.x = 15
  } 
  else 
  {
    this.chort2.scaleX = 1;
    this.chort2.body.offset.x = 0
  }
}

//chort #3
const distance14 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.chort3.x, this.chort3.y);

if (this.chort3.body && distance14 < threshold) {
  this.chort3.body.setVelocity(0);
  this.chort3.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort3.x) 
  {
    this.chort3.scaleX = -1;
    this.chort3.body.offset.x = 15
  } 
  else 
  {
    this.chort3.scaleX = 1;
    this.chort3.body.offset.x = 0
  }
} 
else if (this.chort3.body && distance14 < followRadiusChort) 
{
  let direction14 = Phaser.Math.Angle.Between(this.chort3.x, this.chort3.y, this.knight.x, this.knight.y);
  this.chort3.body.setVelocityX(Math.cos(direction14) * followSpeed);
  this.chort3.body.setVelocityY(Math.sin(direction14) * followSpeed);
  this.chort3.anims.play('chort-run-right', true);
  if (this.knight.x < this.chort3.x) {
    this.chort3.scaleX = -1;
    this.chort3.body.offset.x = 15
  } 
  else 
  {
    this.chort3.scaleX = 1;
    this.chort3.body.offset.x = 0
    
  }
}
else if (this.chort3.body)
{
  this.chort3.body.setVelocity(0);
  this.chort3.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort2.x) {
    this.chort3.scaleX = -1;
    this.chort3.body.offset.x = 15
  } 
  else 
  {
    this.chort3.scaleX = 1;
    this.chort3.body.offset.x = 0
  }
}

//chort #4
const distance15 = Phaser.Math.Distance.Between(this.knight.x, this.knight.y, this.chort4.x, this.chort4.y);
  
if (this.chort4.body && distance15 < threshold) {
  this.chort4.body.setVelocity(0);
  this.chort4.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort4.x) 
  {
    this.chort4.scaleX = -1;
    this.chort4.body.offset.x = 15
  } 
  else 
  {
    this.chort4.scaleX = 1;
    this.chort4.body.offset.x = 0
  }
} 
else if (this.chort4.body && distance15 < followRadiusChort) 
{
  let direction15 = Phaser.Math.Angle.Between(this.chort4.x, this.chort4.y, this.knight.x, this.knight.y);
  this.chort4.body.setVelocityX(Math.cos(direction15) * followSpeed);
  this.chort4.body.setVelocityY(Math.sin(direction15) * followSpeed);
  this.chort4.anims.play('chort-run-right', true);
  if (this.knight.x < this.chort4.x) {
    this.chort4.scaleX = -1;
    this.chort4.body.offset.x = 15
  } 
  else 
  {
    this.chort4.scaleX = 1;
    this.chort4.body.offset.x = 0
    
  }
}
else if (this.chort4.body)
{
  this.chort4.body.setVelocity(0);
  this.chort4.anims.play('chort-idle-right', true);
  if (this.knight.x < this.chort4.x) {
    this.chort4.scaleX = -1;
    this.chort4.body.offset.x = 15
  } 
  else 
  {
    this.chort4.scaleX = 1;
    this.chort4.body.offset.x = 0
  }
}

  //check if player reached health of 0 
if (this.knight.health === 0)
{
  this.gameOver();
}
}

performAttack() {
  if (!this.isAttacking) {
      this.isAttacking = true;
      this.sword.setVisible(true);
      this.sword.anims.play('sword_attack', true);

      // Overlap logic with various enemies
      this.physics.world.overlap(this.sword, this.skeleton, () => {
          this.skeleton.health--;
          if (this.skeleton.health <= 0) {
              this.skeleton.destroy();
          }
      });

      this.physics.world.overlap(this.sword, this.skeleton2, () => {
          this.skeleton2.health--;
          if (this.skeleton2.health <= 0) {
              this.skeleton2.destroy();
          }
      });

      this.physics.world.overlap(this.sword, this.skeleton3, () =>
      {
        this.skeleton3.health--;
        if (this.skeleton3.health <= 0)
        {
          this.skeleton3.destroy();
        }
      })
      this.physics.world.overlap(this.sword, this.demon, () =>
      {
        this.demon.health--;
        if (this.demon.health <= 0)
        {
          this.demon.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.orc, () =>
      {
        this.orc.health--;
        if (this.orc.health <= 0)
        {
          this.orc.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.orc2, () =>
      {
        this.orc2.health--;
        if (this.orc2.health <= 0)
        {
          this.orc2.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.orc3, () =>
      {
        this.orc3.health--;
        if (this.orc3.health <= 0)
        {
          this.orc3.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.zombie, () =>
      {
        this.zombie.health--;
        if (this.zombie.health <= 0)
        {
          this.zombie.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.swamp, () =>
      {
        this.swamp.health--;
        if (this.swamp.health <= 0)
        {
          this.swamp.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.swamp2, () =>
      {
        this.swamp2.health--;
        if (this.swamp2.health <= 0)
        {
          this.swamp2.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.swamp3, () =>
      {
        this.swamp3.health--;
        if (this.swamp3.health <= 0)
        {
          this.swamp3.destroy();
        }
      })


      this.physics.world.overlap(this.sword, this.chort, () =>
      {
        this.chort.health--;
        if (this.chort.health <= 0)
        {
          this.chort.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.chort2, () =>
      {
        this.chort2.health--;
        if (this.chort2.health <= 0)
        {
          this.chort2.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.chort3, () =>
      {
        this.chort3.health--;
        if (this.chort3.health <= 0)
        {
          this.chort3.destroy();
        }
      })

      this.physics.world.overlap(this.sword, this.chort4, () => {
          this.chort4.health--;
          if (this.chort4.health <= 0) {
              this.chort4.destroy();
          }
      });

      setTimeout(() => {
          this.sword.setVisible(false);
          this.isAttacking = false;
      }, 250); // hide the sword after 1 second
  }
}


}


const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: gameWidth,
  height: gameHeight,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  },
  scene: [MyGame, UIScene],
  scale: {
    mode: Phaser.Scale.FIT, 
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  plugins: {
      scene: [
          {
              key: 'rexVirtualJoystick',
              plugin: Phaser.Plugins.ScenePlugin,
              mapping: 'rexVirtualJoystick'
          }
      ]
  }
};

let game = new Phaser.Game(config);
window.addEventListener('resize', function() {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

