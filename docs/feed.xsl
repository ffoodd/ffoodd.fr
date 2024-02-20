<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:atom="http://www.w3.org/2005/Atom">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title><xsl:value-of select="/rss/channel/title"/> — Flux RSS</title>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<link rel="stylesheet" href="/assets/styles.min.css" />
				<style type="text/css">
					[role="main"] { border-radius: 0; }
					.aside { min-height: auto; }
					[role="main"] a[href*="ffoodd.fr"]::after { display: none; }
				</style>
			</head>
			<body>
				<header class="aside mw--site center pa1">
					<h1 class="tk-bello-pro mb0"><xsl:value-of select="/rss/channel/title" /></h1>
					<a hreflang="fr" target="_blank">
						<xsl:attribute name="href">
							<xsl:value-of select="/rss/channel/link"/>
						</xsl:attribute>
						Consulter le site &#x2192;
					</a>
				</header>
				<main role="main" class="mw--site center pa1">
					<h2 class="tk-bello-pro">Articles récents</h2>
					<xsl:for-each select="/rss/channel/item">
						<article class="mb2">
							<h3 class="mb0">
								<a hreflang="en" target="_blank">
									<xsl:attribute name="href">
										<xsl:value-of select="link"/>
									</xsl:attribute>
									<xsl:value-of select="title"/>
								</a>
							</h3>
							<footer>
								Publié le
								<time>
									<xsl:value-of select="frDate" />
								</time>
							</footer>
						</article>
					</xsl:for-each>
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
