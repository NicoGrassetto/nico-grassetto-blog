---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

const siteUrl = 'https://nico-grassetto.github.io/nico-grassetto-blog';
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nico Grassetto's Blog</title>
    <link>{siteUrl}</link>
    <description>Engineering thoughtful web experiences with modern technologies.</description>
    <language>en-us</language>
    <atom:link href={`${siteUrl}/feed.xml`} rel="self" type="application/rss+xml" />
    
    {sortedPosts.map((post) => (
      <item>
        <title>{post.data.title}</title>
        <link>{siteUrl}/blog/{post.slug}</link>
        <description>{post.data.description}</description>
        <pubDate>{new Date(post.data.date).toUTCString()}</pubDate>
        <guid>{siteUrl}/blog/{post.slug}</guid>
      </item>
    ))}
  </channel>
</rss>
