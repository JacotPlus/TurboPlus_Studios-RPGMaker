var Zerbu = Zerbu || {};

//=============================================================================
/*:
 * @plugindesc Skips the title screen and goes straight to the map. This will automatically be disabled if there are any save games.
 * @author Zerbu
 *
 * @param Playtest Only
 * @desc true/false 
 * Default: false
 * @default false
 */
//=============================================================================

Zerbu.Parameters = PluginManager.parameters('Zerbu_SkipTitle');
Zerbu.Param = Zerbu.Param || {};

Zerbu.Param.DebugOnly = String(Zerbu.Parameters['Playtest Only']);

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
		if (!DataManager.isAnySavefileExists() && (Utils.isOptionValid('test') || !eval(Zerbu.Param.DebugOnly)))
		{
			 $gameSwitches.setValue(56, false);
			
			
		}
		else
		{
			$gameSwitches.setValue(56, true);
		
			
		}
SceneManager.goto(Scene_Map);
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
};