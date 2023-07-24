/*:============================================================================

  @target MZ

  @author Chaucer

  @plugindesc | Mimosa Mouse Cursor : Version - 1.1.1 | This plugin allows you to change the cursor of your mouse while in the game window!.

  @url http://rosedale-studios.com

  @orderAfter ButtonPicture

  @help

============================================================================
  Introduction :
============================================================================

  ()()
  (^.^)
  c(")(")

  This plugin allows you to set a custom mouse cursor for your game, as well
  as provides the ability to change the mouse cursor any time during the game.

============================================================================
  Requirements :
============================================================================

  ---------------------------------------
  None.
  ---------------------------------------

============================================================================
  Instructions :
============================================================================

  This plugin requires little in terms of getting setup, First you'll need
  to setup plugin parameters in the plugin manager, the only required
  parameters, are "Enabled By Default", and "Default Cursor Image"

============================================================================
  Plugin Commands :
============================================================================

   command : enable_cursor
  ---------------------------------------
   description : Activates Custom Cursor Images .

   command : disable_cursor
  ---------------------------------------
   description : Deactivates Custom Cursor Images .

   command : set_default_cursor CURSOR_NAME
  ---------------------------------------
   description : Change the default custom cursor image to the cursor with
   the name specified( the cursor must be defined in the "presets" parameter
   list ).

   command : set_battle_cursor CURSOR_NAME
  ---------------------------------------
   description : Change the battle custom cursor image to the cursor with
   the name specified( the cursor must be defined in the "presets" parameter
   list ).

   command : set_menu_cursor CURSOR_NAME
  ---------------------------------------
   description : Change the menu custom cursor image to the cursor with
   the name specified( the cursor must be defined in the "presets" parameter
   list ).

============================================================================
  Terms Of Use :
============================================================================

  This Plugin may be used commercially, or non commercially. This plugin may
  be extended upon, and or shared freely as long as credit is given to it's
  author(s). This plugin may NOT be sold, or plagiarized.

============================================================================
  Version History :
============================================================================

  ● Version : 1.0.0
  ● Date : 11/29/2020
    ★ Release.

  ● Version : 1.0.1
  ● Date : 12/08/2020
    ✩ Fix - Cursor now starts at screen center instead of top left.
    ✩ Fix - Minor adjustments to reduce file size.

  ● Version : 1.0.2
  ● Date : 12/29/2020
    ✩ Fix - Mouse stays visible with MousePointerExtend.js plugin.
    ✩ Fix - MadeWithMv cursor movement lag( possibly ).
    ✩ Fix - PictureDrag.js conflict error( possibly ).
    ✩ Fix - Cursor improper position in full screen.
    ✩ Fix - Missing Image Files on exported games.
    ✩ Fix - Cursor not visible on scene change.

  ● Version : 1.0.3
  ● Date : 12/29/2020
    ✩ Fix - Rpg maker MV crash on click.

  ● Version : 1.1.0
  ● Date : 12/30/2020
    ★ Add - onMouseOut listener/snap to edge option in plugin manager.

  ● Version : 1.1.1
  ● Date : 06/18/2022
    ✩ Fix - performance issue in rendering the cursor.

============================================================================
  Contact Me :
============================================================================

  If you have questions, about this plugin, or commissioning me, or have
  a bug to report, please feel free to contact me by any of the below
  methods.

  rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
  email : chaucer(at)rosedale-studios(dot)com
  website : rosedale-studios.com
  discord : chaucer#7538
  skypeId : chaucer1991

============================================================================
  Support My Work :
============================================================================

  If you like the content I create, and want to contribute to help me
  making more plugins on a regular basis, please consider becoming a patron,
  supporting me on ko-fi, or donating via the links listed below!

  patreon : https://www.patreon.com/rosedalestudios
  ko-fi : https://ko-fi.com/rosedalestudios
  paypal.me : https://paypal.me/chaucer91

============================================================================
  Special Thanks :
============================================================================

  Patrons :

  ★ Benjamin Humphrey
  ★ Whitney & Tyrell White

============================================================================
@

//=============================================================================
// PLUGIN COMMANDS :
//=============================================================================

  @command enable_cursor
  @text Enable Cursor
  @desc Enable the custom cursor.

  @command disable_cursor
  @text Disable Cursor
  @desc Disable the custom cursor.

  @command set_default_cursor
  @text Set Default Cursor
  @desc Set the default cursor to the cursor specified.

  @arg cursor_name
  @text Cursor Name
  @desc The name of the cursor in "Cursor Presets" in the plugin manager.
  @default default
  @type combo
  @option default
  @value default

  @command set_battle_cursor
  @text Set Battle Cursor
  @desc Set the battle cursor to the cursor specified.

  @arg cursor_name
  @text Cursor Name
  @desc The name of the cursor in "Cursor Presets" in the plugin manager.
  @default default
  @type combo
  @option default
  @value default

  @command set_menu_cursor
  @text Set Menu Cursor
  @desc Set the menu cursor to the cursor specified.

  @arg cursor_name
  @text Cursor Name
  @desc The name of the cursor in "Cursor Presets" in the plugin manager.
  @default default
  @type combo
  @option default
  @value default

//=============================================================================
// PLUGIN PARAMETERS :
//=============================================================================

  @param enabled
  @text Enabled by Default
  @desc Should this plugin be turned on at the start of the game?.
  @default true
  @type boolean

  @param defaultCursor
  @text Default Cursor
  @desc The cursor image that will be enabled by default.
  @default {"name":"default","cursorImage":"","cursorAnchor":"{\"x\":0,\"y\":0}","cursorFrames":"1","cursorSpeed":"40","clickImage":"","clickFrames":"1","clickSpeed":"40"}
  @type struct<Default>
  @parent enabled

  @param battleCursor
  @text Battle Cursor
  @desc The cursor image that will be enabled by default.
  @default {"name":"default","cursorImage":"","cursorAnchor":"{\"x\":0,\"y\":0}","cursorFrames":"1","cursorSpeed":"40","clickImage":"","clickFrames":"1","clickSpeed":"40"}
  @type struct<Default>
  @parent enabled

  @param menuCursor
  @text Menu Cursor
  @desc The cursor image that will be enabled by default.
  @default {"name":"default","cursorImage":"","cursorAnchor":"{\"x\":0,\"y\":0}","cursorFrames":"1","cursorSpeed":"40","clickImage":"","clickFrames":"1","clickSpeed":"40"}
  @type struct<Default>
  @parent enabled

  @param presets
  @text Cursor Presets
  @desc List additional predefined cursors here which can be toggled between via plugin command.
  @default []
  @type struct<Presets>[]

  @param detectMouseOut
  @text Snap To Edge
  @desc If enabled, the plugin will detect when the mouse moves out of screen and will snap the cursor to the nearest edge.
  @default false
  @type boolean

*/
/*~struct~Default:

 @param name
 @text Cursor Name
 @desc Used in plugin commands to reference this specific cursor.
 @default default
 @type select
 @option default


 @param cursorImage
 @text Cursor Image
 @desc The image that will replace your cursor.
 @default
 @type file
 @dir img/system/
 @require 1
 @parent name

 @param cursorAnchor
 @text Cursor Focal Point
 @desc The part of the image that will be used for registering clicks.
 @default {"x":0,"y":0}
 @type select
 @option Top-Left
 @value {"x":0,"y":0}
 @option Top-Right
 @value {"x":1,"y":0}
 @option Bottom-Left
 @value {"x":0,"y":1}
 @option Bottom-Right
 @value {"x":1,"y":1}
 @option Center
 @value {"x":0.5,"y":0.5}
 @parent cursorImage

 @param clickImage
 @text Click Cursor Image
 @desc On left click, the cursor will be changed to this image.
 @default
 @type file
 @dir img/system/
 @require 1
 @parent name

*/

 /*~struct~Presets:

  @param name
  @text Cursor Name
  @desc Used in plugin commands to reference this specific cursor.
  @default
  @type text


  @param cursorImage
  @text Cursor Image
  @desc The image that will replace your cursor.
  @default
  @type file
  @dir img/system/
  @require 1
  @parent name

  @param cursorAnchor
  @text Cursor Focal Point
  @desc The part of the image that will be used for registering clicks.
  @default {"x":0,"y":0}
  @type select
  @option Top-Left
  @value {"x":0,"y":0}
  @option Top-Right
  @value {"x":1,"y":0}
  @option Bottom-Left
  @value {"x":0,"y":1}
  @option Bottom-Right
  @value {"x":1,"y":1}
  @option Center
  @value {"x":0.5,"y":0.5}
  @parent cursorImage

  @param clickImage
  @text Click Cursor Image
  @desc On left click, the cursor will be changed to this image.
  @default
  @type file
  @dir img/system/
  @require 1
  @parent name

*/

//=============================================================================
var Imported = Imported || {};
Imported['Mimosa Mouse Cursor'.toUpperCase()] = true;
//=============================================================================
var Chaucer = Chaucer || {};
Chaucer.mmCursor = {};
//=============================================================================

( function ( $ ) { // CONFIG:

  $ = $ || {};
//============================================================================
  //Create plugin information.
//============================================================================

  $._identifier =  /(Mimosa Mouse Cursor) : Version - (\d+\.\d+\.\d+)/;
  $._nameError = 'Mimosa Mouse Cursor was unable to load! Please revert any changes back to normal!';


  for ( var i = 0, l = $plugins.length; i < l; i++ ) {

    if ( !$plugins[i].description.match( $._identifier ) ) continue;

    $._author = 'Chaucer';
    $._name = RegExp.$1;
    $._version = RegExp.$2;
    $._pluginName = $plugins[i].name;
    $._params = Parse( $plugins[i].parameters );
    $._commands = {};
    $._alias = {};

  };

  if ( !$._name ) throw new Error( $._nameError );

//============================================================================


//=============================================================================
// Custom :
//=============================================================================

//--------------------------------------------------------------------------
  function Parse( data )
  { // parse data.
//--------------------------------------------------------------------------
    try { data = JSON.parse( data ); }
    catch ( error ) { data = data; }
    finally {

      if ( typeof data === 'object' ) {
        var keys = Object.keys( data );

        for (var i = 0, l = keys.length; i < l; i++ ) {
          data[keys[i]] = Parse( data[keys[i]] );
        }

      }

    }

    return data;

  };

//-----------------------------------------------------------------------------
  $.alias = function ( className, method, fn, isStatic )
  { // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

    var key = `${className.name}.${( isStatic ? '' : 'prototype.' ) + method}`;

    if ( $._alias[key] ) throw new Error( `${key} already aliased!` );
    eval( `
      $._alias[key] = ${key};
      ${key} = ${fn.toString().replace( /alias/g, `$._alias["${key}"].call` )};
    `)

  };

//-----------------------------------------------------------------------------
  $.expand = function ( className, method, fn, isStatic )
  { // use this method to quickly expand a method of a particular class.
//-----------------------------------------------------------------------------

    if ( !isStatic )
      className.prototype[method] = fn;

    else
      className[method] = fn;

  };

//-----------------------------------------------------------------------------
  $.compareVersion = function ( current, target )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    var v1 = current.split( '.' );
    var v2 = target.split( '.' );
    for ( var i = 0, l = v1.length; i < l; i++ ) {
      if ( v1[i] < v2[i] ) return -1; // version is lower!
      if ( v1[i] > v2[i] ) return 1; // version is higher!
    }
    return 0; // same version!

  };

//-----------------------------------------------------------------------------
  $.registerPluginCommand = function ( command, fn )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    if ( Utils.RPGMAKER_NAME === 'MV' )
      $._registerMVPluginCommand( command, fn );

    else if ( Utils.RPGMAKER_NAME === 'MZ' )
      $._registerMZPluginCommand( $._pluginName, command, fn );

  };

//-----------------------------------------------------------------------------
  $._registerMVPluginCommand = function ( command, fn )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    $._commands[command] = fn;

  };

//-----------------------------------------------------------------------------
  $._registerMZPluginCommand = function ( pluginName, command, fn )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    PluginManager.registerCommand( pluginName, command, fn );

  };

  // CSS STYLE :
  $.style = document.createElement('style');
  $.style.type = 'text/css';
  $.style.innerHTML = '* { cursor: none; }';
  $.styleParent = document.getElementsByTagName( 'head' )[0];

  // MMC VARIABLES :
  $._ticker = new ( PIXI.Ticker ? PIXI.Ticker : PIXI.ticker.Ticker )();
  $.eventId = 0;
  $.pictureId = 0;
  $.cursorPosition = new Point( 0, 0 ),
  $.menuCursor = { cursorAnchor: new Point( 0, 0 ) };
  $.battleCursor = { cursorAnchor: new Point( 0, 0 ) };
  $.defaultCursor = { cursorAnchor: new Point( 0, 0 ) };

//=============================================================================
  $.enableCursor = function ()
  { // enable mouse cursor.
//=============================================================================

    if ( $.enabled  ) return;
    if ( Utils.isMobileDevice() ) return false;

    $.styleParent.appendChild( $.style );
    $.enabled = true;
  }

//=============================================================================
  $.disableCursor = function ()
  { // disable the mouse cursor.
//=============================================================================

    if ( !$.enabled  ) return;
    $.styleParent.removeChild( $.style );
    $.enabled = false;

  }

//=============================================================================
  $.setClickImage = function ( cursor, filename )
  { // set the cursor to the filename provided.
//=============================================================================

    cursor.clickBitmap = ImageManager.loadSystem( filename || '' );

  }

//=============================================================================
  $.setCursorImage = function ( cursor, filename )
  { // set the cursor to the filename provided.
//=============================================================================

    cursor.cursorBitmap = ImageManager.loadSystem( filename || '' );

  }

//=============================================================================
  $.setCursorAnchor = function ( cursor, x, y )
  { // set the anchor value of the cursor image.
//=============================================================================

    if ( typeof x === "object" ) { x = x.y; y = x.y; }
    cursor.cursorAnchor.set( x, y );

  }

//=============================================================================
  $.setCursorPosition = function ( x, y )
  { // set the cursors position.
//=============================================================================

    $.cursorPosition.set( x, y );

  }

//=============================================================================
  $.setDefaultCursor = function ( cursorName )
  { // set the default cursor.
//=============================================================================

    $.setCursorData( $.defaultCursor, cursorName );

  }

//=============================================================================
  $.setBattleCursor = function ( cursorName )
  { // set the default cursor.
//=============================================================================

    cursorName = cursorName === 'default' ? 'battle' : cursorName;
    $.setCursorData( $.battleCursor, cursorName );

  }

//=============================================================================
  $.setMenuCursor = function ( cursorName )
  { // set the default cursor.
//=============================================================================

    cursorName = cursorName === 'default' ? 'menu' : cursorName;
    $.setCursorData( $.menuCursor, cursorName );

  }

//=============================================================================
  $.setCursorData = function ( cursor, name )
  { // reset cursor to default values.
//=============================================================================

     var data = $.cursorDataByName( name );

     if ( !data ) return;

     $.setClickImage( cursor, data.clickImage );
     $.setCursorImage( cursor, data.cursorImage );
     $.setCursorAnchor( cursor, data.cursorAnchor );

  }

//=============================================================================
  $.cursorDataByName = function ( name )
  { // reset cursor to default values.
//=============================================================================

    if ( name === 'default' ) return $._params.defaultCursor;
    if ( name === 'battle' ) return $._params.battleCursor;
    if ( name === 'menu' ) return $._params.menuCursor;

    for ( var i = 0, l = $._params.presets.length; i < l; i++ ) {

      if ( $._params.presets[i].name === name )
        return $._params.presets[i];

    }

    return null;

  }

//=============================================================================
  $.isCursorOverSprite = function ( sprite, pixelPrecise )
  { // return characters that are under our mouse!.
//=============================================================================

      var { x, y, width, height, anchor, scale, opacity, visible } = sprite;

      if ( !visible || opacity == 0 ) return false;

      var baseW = width * scale.x;
      var baseH = height * scale.y;
      var baseX = x - baseW * anchor.x;
      var baseY = y - baseH * anchor.y;

      var position = $.cursorPosition;

      collidedX = position.x > baseX && position.x < baseX + width;
      collidedY = position.y > baseY && position.y < baseY + height;

      if ( pixelPrecise && collidedX && collidedY )
        return $.isPixelValid( sprite, position );

      else
        return collidedX && collidedY;

    }

//-----------------------------------------------------------------------------
  $._ticker.add( function ( _delta )
  { // update the mouse cursor.
//-----------------------------------------------------------------------------

    const scene = SceneManager ? SceneManager._scene : null;
    if ( scene && $._mouseCursor ) $._mouseCursor.update();

  } ).start();


//=============================================================================
// MV SPECIFIC CODE :
//=============================================================================

  if ( Utils.RPGMAKER_NAME === 'MV' ) {

//-----------------------------------------------------------------------------
    $.alias( Game_Interpreter, 'pluginCommand', function( command, args ) {
//-----------------------------------------------------------------------------

      alias( this, command, args );
      command = command.toLowerCase();
      if ( $._commands[command] ) $._commands[command]( args );

    } );

  };

//=============================================================================
// TouchInput :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( TouchInput, '_onMouseMove', function( event )
  { // Aliased _setupEventHandlers of class TouchInput.
//-----------------------------------------------------------------------------

    alias( this, event );
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    $.setCursorPosition( x, y );

  }, true );

//-----------------------------------------------------------------------------
  $.alias( TouchInput, '_onMouseDown', function( event )
  { // Aliased _onTouchStart of class TouchInput.
//-----------------------------------------------------------------------------

    alias( this, event );

    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);

    $.setCursorPosition( x, y );

  }, true );

if ( $._params.detectMouseOut ) {

//-----------------------------------------------------------------------------
  $.expand( TouchInput, '_onMouseOut', function( event )
  { // adds onmouseout method for touch input.
//-----------------------------------------------------------------------------

    var x = Graphics.pageToCanvasX( event.pageX ).clamp( 0, Graphics.width );
    var y = Graphics.pageToCanvasY( event.pageY ).clamp( 0, Graphics.height );

    $.setCursorPosition( x, y );

  }, true );

  document.addEventListener( 'mouseout', TouchInput._onMouseOut.bind( this ) );

}

//=============================================================================
// SceneManager :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( SceneManager, 'updateMousePointer', function()
  { // Aliased updateMousePointer of class SceneManager.
//-----------------------------------------------------------------------------

    alias( this );
    const MPECursor = document.getElementById('MousePointer').style;
    const { visible, bitmap } =  $._mouseCursor;
    const hidden = visible && bitmap && bitmap.url;
    if ( MPECursor.cursor != 'none' )
      MPECursor.cursor = hidden ? 'none' : MPECursor.cursor;

  }, true );

//=============================================================================
// Scene_Base :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Base, 'pictureDragging', function()
  { // Aliased pictureDragging of class Scene_Base.
//-----------------------------------------------------------------------------

    if ( !this._spriteset ) return [];
    return alias( this );

  } );

//-----------------------------------------------------------------------------
  $.alias( Scene_Base, 'forceReleasePicture', function()
  { // Aliased pictureDragging of class Scene_Base.
//-----------------------------------------------------------------------------

    if ( !this._spriteset ) return [];
    return alias( this );

  } );

//=============================================================================
// Scene_MenuBase
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_MenuBase, 'initialize', function()
  { // Aliased initialize of class Scene_MenuBase.
//-----------------------------------------------------------------------------

    alias( this );
    this._isMenu = true;

  } );

//=============================================================================
// Graphics :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Graphics, '_createPixiApp', function()
  { // Aliased _createPixiApp of class Graphics.
//-----------------------------------------------------------------------------

    alias( this );
    this._app.render = function() {
      this.stage.addChild( $._mouseCursor );
      this.renderer.render( this.stage );
      this.stage.removeChild( $._mouseCursor );
    }

    $._renderer = this._app.renderer;

  }, true );

//-----------------------------------------------------------------------------
  $.alias( Graphics, '_createRenderer', function()
  { // Aliased _createRenderer  of class Graphics.
//-----------------------------------------------------------------------------

    alias( this );
    $._renderer = this._renderer.renderer;

  }, true );

//-----------------------------------------------------------------------------
  $.alias( Graphics, 'render', function( stage )
  { // Aliased render of class Graphics.
//-----------------------------------------------------------------------------

    renderMouse = this._skipCount == 0;
    alias( this, stage );
    if ( renderMouse ) this._renderer.render( $._mouseCursor, undefined, false );

  }, true );

//=============================================================================
// Scene_Boot :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Boot, 'start', function()
  { // Aliased onDatabaseLoaded of class Scene_Boot.
//-----------------------------------------------------------------------------

    alias( this );
    $.setDefaultCursor( 'default' );
    $.setBattleCursor( 'default' );
    $.setMenuCursor( 'default' );

  } );

//-----------------------------------------------------------------------------
  $.alias( Scene_Boot, 'resizeScreen', function()
  { // Aliased method of class Graphics.
//-----------------------------------------------------------------------------

    alias( this );
    $.cursorPosition.set( Graphics.boxWidth / 2, Graphics.boxHeight / 2 );

  } );

//=============================================================================
// Plugin Commands :
//=============================================================================

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'enable_cursor', function()
  { // register command for enableCursor.
//-----------------------------------------------------------------------------

    $.enableCursor();

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'disable_cursor', function()
  { // register command for disable_cursor.
//-----------------------------------------------------------------------------

    $.disableCursor();

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_default_cursor', function( args )
  { // register command for set_default_cursor.
//-----------------------------------------------------------------------------

    if ( Utils.RPGMAKER_NAME === 'MV' )
      $.setDefaultCursor( args[0] );

    else if ( Utils.RPGMAKER_NAME === 'MZ' )
      $.setDefaultCursor( args.cursor_name );

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_battle_cursor', function( args )
  { // register command for set_battle_cursor.
//-----------------------------------------------------------------------------

    if ( Utils.RPGMAKER_NAME === 'MV' )
      $.setBattleCursor( args[0] );

    else if ( Utils.RPGMAKER_NAME === 'MZ' )
      $.setBattleCursor( args.cursor_name );

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'set_menu_cursor', function( args )
  { // register command for set_menu_cursor.
//-----------------------------------------------------------------------------

    if ( Utils.RPGMAKER_NAME === 'MV' )
      $.setMenuCursor( args[0] );

    else if ( Utils.RPGMAKER_NAME === 'MZ' )
      $.setMenuCursor( args.cursor_name );

  } );

  if ( !$._params.enabled ) return;
  $.enableCursor();

//=============================================================================
} )( Chaucer.mmCursor );
//=============================================================================

//=============================================================================
// Sprite_MouseCursor :
//=============================================================================

//=============================================================================
class Sprite_MouseCursor extends Sprite
{ // Sprite_MouseCursor

//=============================================================================
  constructor()
  { // Called on object creation.
//=============================================================================

    super();

  }

//=============================================================================
  getCursorData()
  { // return cursor data based on event, picture.
//=============================================================================

    var $ = Chaucer.mmCursor;
    var sceneName = SceneManager._scene.constructor.name;

    if ( sceneName === 'Scene_Battle' ) {
      if ( !!$.battleCursor.cursorBitmap._url ) return $.battleCursor;

    } else if ( SceneManager._scene._isMenu ) {
      if ( !!$.menuCursor.cursorBitmap._url ) return $.menuCursor;

    }

    return this._hoverCursor || $.defaultCursor;

  }

//=============================================================================
  refreshBitmap()
  { // refresh the bitmap for the cursor.
//=============================================================================

    var bitmap = this.getBitmap( TouchInput.isPressed() );

    bitmap.addLoadListener( function() {
      this._pattern = 0;
      this.bitmap = bitmap;
      this.width = bitmap.width;
      this.height = bitmap.height;

    }.bind( this ) );

  }

//=============================================================================
  getBitmap( clicked = false )
  { // return the bitmap based on click or not.
//=============================================================================

    var { clickBitmap, cursorBitmap } = this.getCursorData();

    return ( clicked && !!clickBitmap._url ) ? clickBitmap : cursorBitmap;

  }

//=============================================================================
  update()
  { // update our sprite mouse cursor.
//=============================================================================

    super.update();
    this.updateMouse();

  }

//=============================================================================
  updateMouse()
  { // update mouse related variables.
//=============================================================================

    this.updateVisibility();
    if ( this.visible ) {

      this.updateBitmap();
      this.updateAnchor();
      this.updatePosition();

    }


  }

//=============================================================================
  updateVisibility()
  { // update our visibility based on if mouse cursor is enabled.
//=============================================================================

    this.visible = Chaucer.mmCursor.enabled;

  }

//=============================================================================
  updateBitmap()
  { // update our bitmap.
//=============================================================================

      var bitmap = this.getBitmap( TouchInput.isPressed() );
      if ( bitmap && bitmap !== this.bitmap ) this.refreshBitmap();

  }

//=============================================================================
  updateAnchor()
  { // update our anchor.
//=============================================================================

    var { cursorAnchor } = this.getCursorData();
    if ( cursorAnchor !== this.anchor ) this.refreshAnchor();

  }

//=============================================================================
  refreshAnchor()
  { // refresh the anchor of our cursor.
//=============================================================================

    var { cursorAnchor } = this.getCursorData();
    this.anchor = cursorAnchor;

  }

//=============================================================================
  updatePosition()
  { // update our position.
//=============================================================================

    if ( Utils.RPGMAKER_NAME === 'MV' )
      this.position.copy( Chaucer.mmCursor.cursorPosition );

    else if ( Utils.RPGMAKER_NAME == 'MZ' )
      this.position.copyFrom( Chaucer.mmCursor.cursorPosition );

  }

}

Chaucer.mmCursor._mouseCursor = new Sprite_MouseCursor();
