/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/globaldata/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Allows you to have data which is available across all savefiles
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.3.1
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to have global data that will be
 * available across all save files. It supports manual global data such as
 * text or numbers as well as automatic variable / switch data. Saving global
 * data can be done separately from saving regular game data.
 * ----------------------------------------------------------------------------
 * Documentation:
 * By default, global data is saved whenever a game is saved. You can use
 * plugin command to manually save global data without saving the game.
 * 
 * Keys are case sensitive.
 *
 * You can only store one piece of data per key. For example, you cannot store
 * both a number and a piece of text under the same key. The last piece of
 * data assigned to that key will overwrite whatever was stored previously.
 *
 * @command Save Data
 * @desc Saves global data without saving the rest of the game.
 *
 * @command Add Text Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg Text
 * @desc The text to store under this key
 *
 * @command Add Number Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg number
 * @type number
 * @default 0
 * @desc The number to store under this key
 *
 * @command Add Variable Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg Variable
 * @type variable
 * @default 0
 * @desc The variable to store under this key
 *
 * @command Add Switch Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg Switch
 * @type switch
 * @default 0
 * @desc The switch to store under this key
 *
 * @command Get Data
 * @desc Retrieves a piece of data
 *
 * @arg Key
 * @desc The string set when stored to access the data
 *
 * @arg variable
 * @type variable
 * @desc The variable to store the data in
 *
 * @command Get Switch Data
 * @desc Retrieves a piece of data and stores it in a switch
 *
 * @arg Key
 * @desc The string set when stored to access the data
 *
 * @arg Switch
 * @type switch
 * @desc The switch to store the data in
 *
 * @command Clear Data
 * @desc Removes a piece of data
 *
 * @arg Key
 * @desc The string set when stored to access the data
 *
 * @param Global Switches
 * @type switch[]
 * @default []
 * @desc Switches listed here will permanently become global, and will be saved in Global Data
 *
 * @param Global Variables
 * @type variable[]
 * @default []
 * @desc Variables listed here will permanently become global, and will be saved in Global Data
*/
var Imported = Imported || {};
Imported.CGMZ_Core = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Global Data"] = "1.0.0";
CGMZ.GlobalData = CGMZ.GlobalData || {};
CGMZ.GlobalData.parameters = PluginManager.parameters('CGMZ_GlobalData');
CGMZ.GlobalData.GlobalSwitches = JSON.parse(CGMZ.GlobalData.parameters["Global Switches"]).map(x=>Number(x));
CGMZ.GlobalData.GlobalVariables = JSON.parse(CGMZ.GlobalData.parameters["Global Variables"]).map(x=>Number(x));
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin commands for global data
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_GlobalData_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Text Data", this.pluginCommandGlobalDataAddDataString);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Number Data", this.pluginCommandGlobalDataAddDataNumber);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Variable Data", this.pluginCommandGlobalDataAddDataVariable);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Switch Data", this.pluginCommandGlobalDataAddDataSwitch);
	PluginManager.registerCommand("CGMZ_GlobalData", "Get Data", this.pluginCommandGlobalDataGetData);
	PluginManager.registerCommand("CGMZ_GlobalData", "Get Switch Data", this.pluginCommandGlobalDataGetSwitchData);
	PluginManager.registerCommand("CGMZ_GlobalData", "Clear Data", this.pluginCommandGlobalDataClearData);
	PluginManager.registerCommand("CGMZ_GlobalData", "Save Data", this.pluginCommandGlobalDataSaveData);
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataString = function(args) {
	$cgmzGlobal.addData(args.Key, args.Text);
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataNumber = function(args) {
	$cgmzGlobal.addData(args.Key, Number(args.number));
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataVariable = function(args) {
	$cgmzGlobal.addData(args.Key, $gameVariables.value(Number(args.Variable)));
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataSwitch = function(args) {
	$cgmzGlobal.addData(args.Key, $gameSwitches.value(Number(args.Switch)));
};
//-----------------------------------------------------------------------------
// Plugin command for retrieving data into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataGetData = function(args) {
	$gameVariables.setValue(Number(args.variable), $cgmzGlobal.getData(args.Key));
};
//-----------------------------------------------------------------------------
// Plugin command for retrieving data into a switch
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataGetSwitchData = function(args) {
	$gameSwitches.setValue(Number(args.Switch), $cgmzGlobal.getData(args.Key));
};
//-----------------------------------------------------------------------------
// Plugin command for clearing a single piece of data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataClearData = function(args) {
	$cgmzGlobal.clearData(args.Key);
};
//-----------------------------------------------------------------------------
// Plugin command for saving global data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataSaveData = function() {
	DataManager.CGMZ_saveGlobalCGMZInfo();
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Apply global data after game is loaded
//=============================================================================
//-----------------------------------------------------------------------------
// Apply global data after game load
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_GlobalData_CGMZCore_onAfterLoad.call(this);
	$cgmzGlobal.apply();
};
//=============================================================================
// CGMZ_GlobalData
//-----------------------------------------------------------------------------
// This class stores data that is available to all save files
//=============================================================================
function CGMZ_GlobalData() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.initialize = function() {
	this._data = {};
	this._globalSwitches = {};
	for(const id of CGMZ.GlobalData.GlobalSwitches) {
		this._globalSwitches[id] = false;
	}
	this._globalVariables = {};
	for(const id of CGMZ.GlobalData.GlobalVariables) {
		this._globalVariables[id] = 0;
	}
};
//-----------------------------------------------------------------------------
// Apply automatic global data
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.apply = function() {
	if(!$gameSwitches || !$gameVariables) return;
	for(const id of Object.keys(this._globalSwitches)) {
		$gameSwitches.setValue(id, this._globalSwitches[id]);
	}
	for(const id of Object.keys(this._globalVariables)) {
		$gameVariables.setValue(id, this._globalVariables[id]);
	}
};
//-----------------------------------------------------------------------------
// Add Data, does not check if data exists
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.addData = function(key, contents) {
	this._data[key] = contents;
};
//-----------------------------------------------------------------------------
// Get Data, returns 0 if data does not exist
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.getData = function(key) {
	if(this._data) {
		return this._data[key];
	}
};
//-----------------------------------------------------------------------------
// Get Data, returns undefined if data does not exist
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.clearData = function(key) {
	if(this._data) {
		delete this._data[key];
	}
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Saving and loading CGMZ global data.
//=============================================================================
$cgmzGlobal = null;
//-----------------------------------------------------------------------------
// Initialize the $cgmzGlobal variable
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    alias_CGMZ_GlobalData_createGameObjects.call(this);
	if(!$cgmzGlobal) {
		$cgmzGlobal = new CGMZ_GlobalData();
	}
};
//-----------------------------------------------------------------------------
// Set the global switch / variables to global values
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    alias_CGMZ_GlobalData_DataManager_setupNewGame.call(this);
	$cgmzGlobal.apply();
};
//-----------------------------------------------------------------------------
// Automatic saving of cgmz global info when saving other global info
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_saveGlobalInfo = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function() {
	alias_CGMZ_GlobalData_saveGlobalInfo.call(this);
	this.CGMZ_saveGlobalCGMZInfo();
};
//-----------------------------------------------------------------------------
// Save CGMZ Global data
//-----------------------------------------------------------------------------
DataManager.CGMZ_saveGlobalCGMZInfo = function() {
	const contents = this.CGMZ_GlobalData_createGlobalSaveContents();
    StorageManager.saveObject("cgmz", contents);
};
//-----------------------------------------------------------------------------
// Make global save file info
//-----------------------------------------------------------------------------
DataManager.CGMZ_GlobalData_createGlobalSaveContents = function() {
	contents = {};
	contents.cgmz = $cgmzGlobal;
    return contents;
};
//-----------------------------------------------------------------------------
// Load global CGMZ data
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_loadGlobalInfo = DataManager.loadGlobalInfo;
DataManager.loadGlobalInfo = function() {
	alias_CGMZ_GlobalData_loadGlobalInfo.call(this);
    StorageManager.loadObject("cgmz").then(cgmzInfo => {
			this.CGMZ_GlobalData_loadCGMZGlobalData(cgmzInfo);
            return 0;
        })
        .catch(() => {
            console.warn("Could not load CGMZ global data!");
        });
};
//-----------------------------------------------------------------------------
// Load global CGMZ data
//-----------------------------------------------------------------------------
DataManager.CGMZ_GlobalData_loadCGMZGlobalData = function(contents) {
	$cgmzGlobal = contents.cgmz;
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Check if switch is global, make appropriate changes and save if so
//=============================================================================
//-----------------------------------------------------------------------------
// Also change global switch
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_GameSwitch_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
	alias_CGMZ_GlobalData_GameSwitch_setValue.call(this, switchId, value);
    if($cgmzGlobal._globalSwitches.hasOwnProperty(switchId)) {
		$cgmzGlobal._globalSwitches[switchId] = value;
	}
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Check if variable is global, make appropriate changes and save if so
//=============================================================================
//-----------------------------------------------------------------------------
// Also change global variable
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_GameVariables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
	alias_CGMZ_GlobalData_GameVariables_setValue.call(this, variableId, value);
	if($cgmzGlobal._globalVariables.hasOwnProperty(variableId)) {
		$cgmzGlobal._globalVariables[variableId] = value;
	}
};