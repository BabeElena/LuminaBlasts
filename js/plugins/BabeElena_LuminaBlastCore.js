
//Window Mode Optimization & Skip Title Scene 
var _LILIA_FullScreen_Boot = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _LILIA_FullScreen_Boot.call(this);
	SoundManager.preloadImportantSounds();
    //resizeGameWindow();
	    this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
		this.resizeScreen();
		this.updateDocumentTitle();
};

function resizeGameWindow() {
    var gameWindow = nw.Window.get();
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    
    // Set the game window size to fit the screen dimensions
    gameWindow.resizeTo(screenWidth, screenHeight);
    
    // Move the game window to the top-left corner
    gameWindow.moveTo(0, 0);
    
    // Maximize the game window
    gameWindow.maximize();
}

//Execute Scene_Title to Lilia Title

Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    this.createCommandWindow();
    DataManager.setupNewGame();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
};

//Fix GameEnd

Scene_GameEnd.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
	this._commandWindow.opacity = 0
};

	Scene_GameEnd.prototype.commandToTitle = function() {
		this.fadeOutAll();
	    this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
};

Scene_GameEnd.prototype.checkPlayerLocation = function() {
    if ($dataSystem.startMapId === 0) {
        throw new Error("Player's starting position is not set");
    }
};

//Adds "Continue Button"

Scene_Menu.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    const commandWindow = new Window_MenuCommand(rect);
	commandWindow.setHandler("continue", this.popScene.bind(this));
    commandWindow.setHandler("options", this.commandOptions.bind(this));
    commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
    commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(commandWindow);
    this._commandWindow = commandWindow;
};


Window_MenuCommand.prototype.makeCommandList = function() {
	this.addContinueCommand();
    this.addOptionsCommand();
    this.addGameEndCommand();
};

Window_MenuCommand.prototype.addContinueCommand = function() {
    const enabled = this.isContinueEnabled();
    this.addCommand(TextManager.continue_, "continue", enabled);
};

Window_MenuCommand.prototype.isContinueEnabled = function() {
    return true;
};


//Optimization Scene_Options

Scene_Options.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createOptionsWindow();
		this._optionsWindow.y = 164
		this._optionsWindow.opacity = 0
};

//Disable Touch UI and RPG Settings
ConfigManager.touchUI = false;
ConfigManager.alwaysDash = true;

	Window_Options.prototype.addGeneralOptions = function() {
		//this.addCommand(TextManager.alwaysDash, "alwaysDash");
		//this.addCommand(TextManager.commandRemember, "commandRemember");
		//this.addCommand(TextManager.touchUI, "touchUI");
	};

//Fix Menu

	Scene_Menu.prototype.create = function() {

		Scene_MenuBase.prototype.create.call(this);
		this.createCommandWindow();
		//this.createGoldWindow();
		//this.createStatusWindow();

		this._commandWindow.x = 288
		this._commandWindow.y = 208
		this._commandWindow.height = 158
		this._commandWindow.opacity = 0
		
	};
	
	Scene_Menu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._statusWindow.refresh();
	
};

//Fix Cursors


ColorManager.itemBackColor1 = function() {
    return "rgba(0,0,0,0)";
};

ColorManager.itemBackColor2 = function() {
    return "rgba(0,0,0,0)";
};

//Change Keyboard

Input.keyMapper[87] = "up"; //W
Input.keyMapper[65] = "left"; //A
Input.keyMapper[83] = "down"; //S
Input.keyMapper[68] = "right"; //D

	Input.keyMapper[81] = "pageup"; //Q
	Input.keyMapper[69] = "pagedown"; //E