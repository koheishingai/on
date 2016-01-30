(function() {
	// initialize all
	[].slice.call( document.querySelectorAll( '.si-icons-default > .si-icon' ) ).forEach( function( el ) {
		console.log(el);
		var svgicon = new svgIcon( el, svgIconConfig );
	} );
})();
		