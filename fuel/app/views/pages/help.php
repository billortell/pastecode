<h1><?php echo (isset($title) ? $title : 'Help'); ?></h1>
<p>
	This is our help page, below you can find a list of most frequently asked
	questions or general information about Pastecode.com
</p>

<h3>So what is Paste Code all about?</h3>
<p>
	Pastecode.com is a website where you can store text indefinately. The web
	site is mainly used by programmers to store pieces of source code or
	configuration information, but anyone is more than welcome to paste any type
	of text. The idea behind the site is to make it more convenient for people
	to share large amounts of text online, and be able to collaborate on the
	text any way they need to.
</p>

<h3>How can I contact Pastecode?</h3>
<p>
	Our latest contact information is always available on our
	<?php echo \Html::anchor('contact', 'contact page'); ?>.
</p>

<h3>What is your Acceptable Use Policy?</h3>
<p>
	Broadly speaking, this site was created to help programmers. Any paste or
	usage pattern not related to that goal which results in unusually high
	traffic will be flagged for investigation. Your paste may be deleted and
	your IP blocked. In particular, please do not paste email lists, password
	lists or personal information. Do not aggressively spider the site.
	Exceptions can be arranged, but you will need to contact us to discuss it.
	If you can access pastecode.com from one location, but not another, it's
	likely your IP address has been blocked for violating this policy. Get in
	touch with us and the block can be lifted.
</p>

<h3>Is there an API?</h3>
<p>
	There is currently no public API available, but we have plans to implement
	one in the near future. Stay tuned to see when it is released.
</p>

<h3>Who can see my pastes?</h3>
<p>
	Currently, the only people who can see your paste are those who can either
	guess your generated url or people you've shared it with. Eventually, all
	public pastes will be searchable and indexable by search engines. We will
	always keep private pastes private, and tell search engines to stay away
	from them.
</p>

<h3>What is the max paste size?</h3>
<p>
	We allow pastes up to 500 kilobytes. This should be enough for almost any
	script, and prevents people from jamming our servers.
</p>

<h3>For what languages do you offer syntax highlighting?</h3>
<p>
	<?php

		$languages = implode(', ', Pastecode::$languages);
		$pos = strrpos($languages, ', ');
		
		echo substr_replace($languages, ', and '.end(Pastecode::$languages), $pos, strlen($languages)).'.';
		
	?>
	<br><br>
	Please contact us if you wish to suggest a new language.
</p>