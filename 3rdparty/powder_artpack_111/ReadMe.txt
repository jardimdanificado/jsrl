////////////////////////////////////////////////////////////////////////
// POWDER ArtPack.  Version 111
////////////////////////////////////////////////////////////////////////

    This is the ArtPack for POWDER.  It is present to allow you to
    have a starting point for trying out your own custom tilesets.
    While the source code for POWDER is available, would be artists
    often do not want to master the arcane magic of makefiles to tweak
    a few pixels.

    The splicebmp program was used to patch a POWDER ROM with these
    tiles.  It is no longer supported.  GBA users that want a new
    tileset need to recompile from scratch.

    For the Linux, Windows, and Mac versions, place the files in a gfx
    subdirectory of your POWDER installation and a new tile option,
    "From Disk", should appear in the tile choice menu.

    For the DS version, place the files in the DATA/POWDER/gfx
    directory on the root of your flash cartridge.  Again, on startup
    it should report detecting the tileset and a new menu option
    should show up.

    The .bmp files should be directly in the gfx directory, not in a
    subdirectory thereof.

    Colour #0, pure black, is transparent.  Bright green is remapped
    to pure black.  There can be a maximum of 256 unique colours
    picked from a 15 bit palette.  External .bmps will be converted to
    15 bit colour space and then the first 256 unique colours used.  A
    warning will be printed if overflow occurs.  This means you can
    provide 24-bit bitmaps, but be warned that only the first 256
    colours will be used.

    The sprites use an independent palette from the other bitsmaps.

    The DS and PSP versions require the bitmaps be 8x8 based.  This
    means the alphabets are 8x8 characters and tiles are 16x16.  The
    Windows, Linux, and Mac platforms can have any sized tile,
    however.  Provided all bitmaps are the same relative scale, you
    could build a tileset arounda 10x10, 16x16, or any other tilesize
    you wish.  Note that if you just scale the current bitmaps up you
    likely will introduce intermediate colours and exceed the 256
    colour limit.
    
////////////////////////////////////////////////////////////////////////
// File List
////////////////////////////////////////////////////////////////////////

    tilelist.txt	- A list of all the tiles and what their
			  symbolic names are.
    dungeon16.bmp	- The main dungeon tiles.  These are used for
			  items, creatures, and background tiles.
    mini16.bmp		- The paperdoll overlays for the main
			  character.
    minif16.bmp		- The paperdoll overlays for female main
			  characters.  French feminists are free to
			  criticize my choice of making women
			  signified by the presense.
    sprite16.bmp	- The sprites used for cursors and the action
			  buttons.
    alphabet_*.bmp	- The plain text alphabet, also containing a
			  few bonus symbols.
    ReadMe.txt		- This file.

    The alphabet set comes in several flavours: classic, brass,
    shadow, heavy, and light.

////////////////////////////////////////////////////////////////////////
// Distribution
////////////////////////////////////////////////////////////////////////

    These tiles are distributed for use with POWDER only.  Each 16x16 
    tile is considered an individual file for the purpose of derivative
    works.

    You are free to use the tiles distributed in the classic folder
    in any fashion you choose.  
    
    The alphabet_classic, alphabet_brass, alphabet_shadow files have
    been derived from a screen shot of the window's console font, the
    first by Jeff Lait and second two by Markus Maier.  If you want a
    specific license, consider them CC3.0-BY.  

    The alphabet_light and alphabet_heavy were created by Markus
    Maier.  He has licensed them under CC3.0-BY.  
    
    NOTE: To my knowledge, bitmapped fonts aren't copyrightable so the
    font related notices are merely advisory.

    The adambolt folder are a rearrangement of Adam Bolt's tileset.

    The nethack folder, the Nethackish Tileset was adapted from the
    Classic set by Andrea Menga (Widar)

    The Ascii tileset is thanks to Kelly Bailey.  He has licensed
    it under CC3.0-BY.

    The Akoi Meexx tileset is thanks to Akoi Meexx.  He has licensed
    it under CC3.0-BY.

    The Chris Lomaka tileset is thanks to Chris Lomaka.  He has
    licensed it under CC3.0-BY.

    The ibsongrey folder is from Ibson the Grey who based it off the
    public domain rltiles.  He has kept his modifications in the
    public domain.  Note they are 32x32, so only usable on
    non-handheld builds.

    If you construct an improved tileset, feel free to send it to me.
    However, please let me know the origins of the tiles (if they were
    not drawn by you) and the desired distribution rules (ideally
    you will allow reuse and redistribution in other projects, I
    recommend the CC3.0-BY license so your hard work can provide the
    most good possible).  And, of course, please understand if I
    choose not to use them.
