---
layout: "template/archive.njk"
title: "Journal"
permalink: "journal/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
description: "Articles récents"
metadescription: "Intégrateur web à Nantes"
pagination:
  data: collections.posts
  size: 5
  alias: posts
  reverse: true
---
