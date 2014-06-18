// ==UserScript==
// @name           SMz user template
// @namespace      surrealmoviez.info
// @description    Loads a user-definded template in the "HTML editing box"
// @include        http://www.surrealmoviez.info/readarticle.php?article_id=*
// @version        0.1
// ==/UserScript==

/*
 * 
 * Script to be included as option in the main script and deleted
 * 
 */

$('[name="post_adv_html"]').ready(function(){
    // Go to http://www.surrealmoviez.info/viewpage.php?page_id=144 to create a formated template to paste here.
	// Then, paste it between the "**************" lines.
	// Finally, save this file and drop it into a browser window.
	$('[name="post_adv_html"]').val(""
	// **************


	
	// **************
	);
});
