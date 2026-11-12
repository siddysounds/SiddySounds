(function () {
  'use strict';
  const container = document.getElementById('blog-posts');
  if (!container) return;
  let page = 0;
  let posts = [];
  const pageSize = 5;
  const previous = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const status = document.getElementById('blog-status');
  const feed = document.createElement('script');
  let settled = false;
  function fail() {
    if (settled) return;
    settled = true;
    status.textContent = 'The blog feed is unavailable. You can still read posts on Blogger.';
    feed.remove();
  }
  const timeout = setTimeout(fail, 12000);
  function render() {
    container.replaceChildren();
    posts.slice(page * pageSize, (page + 1) * pageSize).forEach(post => {
      const article = document.createElement('article');
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      link.href = post.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = post.title;
      heading.appendChild(link);
      const summary = document.createElement('p');
      summary.textContent = post.summary;
      article.append(heading, summary);
      container.appendChild(article);
    });
    previous.disabled = page === 0;
    next.disabled = (page + 1) * pageSize >= posts.length;
    status.textContent = posts.length ? 'Page ' + (page + 1) + ' of ' + Math.ceil(posts.length / pageSize) : 'No posts are available yet.';
  }
  window.fetchBlogPosts = data => {
    if (settled) return;
    settled = true;
    clearTimeout(timeout);
    posts = (data && data.feed && data.feed.entry || []).map(post => {
      const alternate = (post.link || []).find(link => link.rel === 'alternate');
      const url = alternate && alternate.href;
      if (!url || !/^https:\/\//i.test(url)) return null;
      // Feed HTML is never injected into the live page.
      const plain = (post.content && post.content.$t || '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ');
      const decoder = document.createElement('textarea');
      decoder.innerHTML = plain;
      return { title: post.title && post.title.$t || 'Read post', url, summary: decoder.value.replace(/\s+/g, ' ').trim().slice(0, 600) };
    }).filter(Boolean);
    render();
  };
  previous.addEventListener('click', () => { if (page > 0) { page--; render(); } });
  next.addEventListener('click', () => { if ((page + 1) * pageSize < posts.length) { page++; render(); } });
  feed.async = true;
  feed.src = 'https://siddysounds.blogspot.com/feeds/posts/default?alt=json-in-script&callback=fetchBlogPosts';
  feed.onerror = () => { clearTimeout(timeout); fail(); };
  document.head.appendChild(feed);
})();
