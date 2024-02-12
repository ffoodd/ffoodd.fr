# ffoodd.fr

## À faire

- [ ] Chasser les liens morts (avec `npm run docs:lint:external`)
- [ ] Refondre graphiquement le site : passer à Sass (via LightningCSS ?)
- [ ] Transformer les conférences en collection.
  - Dynamiser la _sidebar_ avec les dernières conférences.
- [ ] Intégrer les slides des conférences (en dur d’abord, puis en tant que collection)
  - Base AccesSlide
  - Base sliide
  - En s’appuyant sur npm et 11ty


## Migration depuis WordPress

On récupère les contenus depuis l’API Rest de WordPress, légèrement étendue pour contenir les champs ACF et les métadonnées personnalisées — puis le JSON obtenu est nettoyé avec [jq](https://jqlang.github.io/jq/) pour générer un fichier json sur-mesure contenant uniquement les clés qui nous intéressent.

### Articles

1. [API Rest](https://www.ffoodd.fr/wp-json/wp/v2/posts?per_page=100&_fields=date,modified,format,slug,title,content,excerpt,metadata,acf).
2. Conversion en Markdown : `npm run wp:migrate:posts`.


### Pages

1. [API Rest](https://www.ffoodd.fr/wp-json/wp/v2/pages?_fields=slug,title,content,excerpt,metadata,acf).
2. Conversion en Markdown : `npm run wp:migrate:pages`.

### Commentaires

1. API Rest, [page 1](https://www.ffoodd.fr/wp-json/wp/v2/comments?per_page=100&_fields=author_name,author_url,date,content,link,author_avatar_urls) et [page 2](https://www.ffoodd.fr/wp-json/wp/v2/comments?per_page=100&page=2&_fields=author_name,author_url,date,content,link,author_avatar_urls).
2. Fusionner les deux JSON (manuellement).
3. Conversion en Markdown : `npm run wp:migrate:comments`.
