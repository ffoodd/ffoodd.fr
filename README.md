# ffoodd.fr

## Migration depuis WordPress

On récupère les contenus depuis l’API Rest de WordPress, légèrement étendue pour contenir les champs ACF et les métadonnées personnalisées — puis le JSON obtenu est nettoyé avec [jq](https://jqlang.github.io/jq/) pour générer un fichier json sur-mesure contenant uniquement les clés qui nous intéressent.

### Articles

1. [API Rest](https://www.ffoodd.fr/wp-json/wp/v2/posts?per_page=100).
2. `cat _export/posts.json | jq 'map({date,modified,format,slug,title,content,excerpt,metadata,acf})' > _export/posts.min.json`.
3. Conversion en Markdown : `npm run wp:migrate:posts`.


### Pages

1. [API Rest](https://www.ffoodd.fr/wp-json/wp/v2/pages).
2. `cat _export/pages.json | jq 'map({slug,title,content,excerpt})' > _export/pages.min.json`.
3. Conversion en Markdown : `npm run wp:migrate:pages`.

### Commentaires

1. [API Rest](https://www.ffoodd.fr/wp-json/wp/v2/comments/).
2. `cat _export/comments.json | jq 'map({post,author_name,author_url,date,content,link,author_avatar_urls})' > _export/comments.min.json`.
3. Conversion en Markdown : `npm run wp:migrate:comments`.
