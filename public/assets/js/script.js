$(document).ready(function() {

	if($('#form_paste')) {
		$('#form_paste').tabby();
	}

	hljs.tabReplace = '    ';
	hljs.initHighlightingOnLoad();

	if($('#style')) {

		if($.cookie('pastecode-style')) {
			$('link.lang-style').attr('href', 'http://pastecode.com/assets/css/themes/'+$.cookie('pastecode-style')+'.css');
			$('#style').val($.cookie('pastecode-style'));
		}

		$('#style').change(function() {
			$('link.lang-style').attr('href', 'http://pastecode.com/assets/css/themes/'+$(this).val()+'.css');
			$.cookie('pastecode-style', $(this).val(), {expires: 365, path: '/'});
			return false;
		});

		if($.cookie('pastecode-style')) {
			$('#style').val($.cookie('pastecode-style'));
		}
	}

	if ($('#do-not-fill-this-out')) {
		var today = new Date();
		$('#do-not-fill-this-out').val(today.getUTCFullYear() + '' + (today.getUTCMonth() + 1) + '' + today.getUTCDate())
	}

});