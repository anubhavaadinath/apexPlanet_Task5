
let currentView = 'home';
let selectedCategory = null;
let searchQuery = '';
let isLoading = false;
let likedArticles = new Set();


let currentTheme = localStorage.getItem('theme') || 'system';


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}


function initializeTheme() {
    applyTheme(currentTheme);
    updateThemeIcon();
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.setAttribute('data-theme', systemTheme);
    } else {
        root.setAttribute('data-theme', theme);
    }
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const icons = {
        light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>`,
        dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
               </svg>`,
        system: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                     <line x1="8" y1="21" x2="16" y2="21"></line>
                     <line x1="12" y1="17" x2="12" y2="21"></line>
                 </svg>`
    };
    
    themeToggle.innerHTML = icons[currentTheme];
}

function cycleTheme() {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];
    
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
    updateThemeIcon();
}


const debouncedSearch = debounce((query) => {
    searchQuery = query;
    setLoading(false);
    renderArticles();
}, 300);

function handleSearch(query) {
    setLoading(true);
    debouncedSearch(query);
}


function setLoading(loading) {
    isLoading = loading;
    const spinner = document.getElementById('loadingSpinner');
    if (loading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}


function getFilteredArticles() {
    return measurePerformance('Article filtering', () => {
        return articles.filter(article => {
            const matchesCategory = selectedCategory === null || article.category.id === selectedCategory;
            const matchesSearch = searchQuery === '' || 
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
            
            return matchesCategory && matchesSearch;
        });
    });
}


function renderStats() {
    const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
    const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
    const totalComments = comments.length;
    const avgReadingTime = Math.round(articles.reduce((sum, article) => sum + article.readingTime, 0) / articles.length);

    const statsData = [
        { icon: 'eye', label: 'Total Views', value: totalViews.toLocaleString(), color: 'blue' },
        { icon: 'heart', label: 'Total Likes', value: totalLikes.toLocaleString(), color: 'red' },
        { icon: 'message', label: 'Comments', value: totalComments.toLocaleString(), color: 'green' },
        { icon: 'clock', label: 'Avg. Read Time', value: `${avgReadingTime} min`, color: 'purple' },
    ];

    const statsSection = document.getElementById('statsSection');
    statsSection.innerHTML = statsData.map(stat => `
        <div class="stat-card">
            <div class="stat-content">
                <div class="stat-info">
                    <h3>${stat.label}</h3>
                    <p>${stat.value}</p>
                </div>
                <div class="stat-icon ${stat.color}">
                    ${getStatIcon(stat.icon)}
                </div>
            </div>
        </div>
    `).join('');
}

function getStatIcon(type) {
    const icons = {
        eye: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
        heart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
        message: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
        clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>'
    };
    return icons[type] || '';
}

function renderCategoryFilter() {
    const categoryButtons = document.getElementById('categoryButtons');
    
    const allButton = `
        <button class="category-btn ${selectedCategory === null ? 'active' : ''}" 
                onclick="selectCategory(null)">
            All Categories
        </button>
    `;
    
    const categoryButtonsHtml = categories.map(category => `
        <button class="category-btn ${selectedCategory === category.id ? 'active' : ''}" 
                onclick="selectCategory('${category.id}')"
                style="${selectedCategory === category.id ? `background-color: ${category.color}` : ''}">
            ${category.name}
        </button>
    `).join('');
    
    categoryButtons.innerHTML = allButton + categoryButtonsHtml;
}

function renderSearchInfo() {
    const searchInfo = document.getElementById('searchInfo');
    const filteredArticles = getFilteredArticles();
    
    if (searchQuery || selectedCategory) {
        let message = '';
        if (searchQuery && selectedCategory) {
            const categoryName = categories.find(c => c.id === selectedCategory)?.name;
            message = `Showing ${filteredArticles.length} results for "${searchQuery}" in ${categoryName}`;
        } else if (searchQuery) {
            message = `Showing ${filteredArticles.length} results for "${searchQuery}"`;
        } else {
            const categoryName = categories.find(c => c.id === selectedCategory)?.name;
            message = `Showing ${filteredArticles.length} articles in ${categoryName}`;
        }
        
        searchInfo.innerHTML = `<p>${message}</p>`;
        searchInfo.classList.remove('hidden');
    } else {
        searchInfo.classList.add('hidden');
    }
}

function renderFeaturedArticles() {
    const filteredArticles = getFilteredArticles();
    const featuredArticles = filteredArticles.filter(article => article.featured);
    const featuredSection = document.getElementById('featuredSection');
    
    if (featuredArticles.length > 0 && !searchQuery && !selectedCategory) {
        const featuredHtml = featuredArticles.map(article => createArticleCard(article, true)).join('');
        document.getElementById('featuredArticles').innerHTML = featuredHtml;
        featuredSection.classList.remove('hidden');
    } else {
        featuredSection.classList.add('hidden');
    }
}

function renderArticles() {
    const filteredArticles = getFilteredArticles();
    const articlesGrid = document.getElementById('articlesGrid');
    const articlesSection = document.getElementById('articlesSection');
    const noResults = document.getElementById('noResults');
    const articlesSectionTitle = document.getElementById('articlesSectionTitle');
    const articlesCount = document.getElementById('articlesCount');
    
    renderSearchInfo();
    renderFeaturedArticles();
    
    if (filteredArticles.length > 0) {
        const featuredArticles = filteredArticles.filter(article => article.featured);
        const regularArticles = searchQuery || selectedCategory ? filteredArticles : filteredArticles.filter(article => !article.featured);
        
        articlesSectionTitle.textContent = featuredArticles.length > 0 && !searchQuery && !selectedCategory ? 'Latest Articles' : 'Articles';
        articlesCount.textContent = `${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'}`;
        
        const articlesHtml = regularArticles.map(article => createArticleCard(article, false)).join('');
        articlesGrid.innerHTML = articlesHtml;
        
        articlesSection.classList.remove('hidden');
        noResults.classList.add('hidden');
    } else if (!isLoading) {
        let message = 'No articles available';
        if (searchQuery) {
            message = `No articles match your search for "${searchQuery}"`;
        } else if (selectedCategory) {
            const categoryName = categories.find(c => c.id === selectedCategory)?.name;
            message = `No articles found in ${categoryName}`;
        }
        
        document.getElementById('noResultsMessage').textContent = message;
        articlesSection.classList.add('hidden');
        noResults.classList.remove('hidden');
    }
}

function createArticleCard(article, featured = false) {
    const isLiked = likedArticles.has(article.id);
    const currentLikes = isLiked ? article.likes + 1 : article.likes;
    
    return `
        <article class="article-card ${featured ? 'featured' : ''}" onclick="showArticleDetail('${article.id}')">
            <div class="article-image">
                <img src="${article.imageUrl}" alt="${article.title}" loading="lazy">
                <div class="category-badge" style="background-color: ${article.category.color}">
                    ${article.category.name}
                </div>
                ${article.featured ? '<div class="featured-badge">Featured</div>' : ''}
            </div>
            
            <div class="article-content">
                <div class="article-meta">
                    <div class="author-info">
                        <img src="${article.author.avatar}" alt="${article.author.name}" class="author-avatar">
                        <span class="author-name">${article.author.name}</span>
                        ${article.author.verified ? `
                            <div class="verified-badge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                            </div>
                        ` : ''}
                    </div>
                    <div class="date-info">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>${new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                </div>
                
                <h2 class="article-title">${article.title}</h2>
                <p class="article-excerpt">${article.excerpt}</p>
                
                <div class="article-tags">
                    ${article.tags.slice(0, 3).map(tag => `
                        <span class="tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                            </svg>
                            ${tag.name}
                        </span>
                    `).join('')}
                </div>
                
                <div class="article-footer">
                    <div class="article-stats">
                        <div class="stat-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            <span>${article.readingTime} min read</span>
                        </div>
                        <div class="stat-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>${article.views.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div class="article-actions">
                        <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${article.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span>${currentLikes}</span>
                        </button>
                        <button class="read-more-btn" onclick="event.stopPropagation(); showArticleDetail('${article.id}')">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function renderFooterCategories() {
    const footerCategories = document.getElementById('footerCategories');
    footerCategories.innerHTML = categories.slice(0, 4).map(category => `
        <li>
            <button class="footer-link" onclick="selectCategory('${category.id}')">
                ${category.name}
            </button>
        </li>
    `).join('');
}

function showArticleDetail(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    currentView = 'article';
    
    const homeView = document.getElementById('homeView');
    const articleDetail = document.getElementById('articleDetail');
    const articleContent = document.getElementById('articleContent');
    
    homeView.classList.add('hidden');
    articleDetail.classList.remove('hidden');
    
    const isLiked = likedArticles.has(article.id);
    const currentLikes = isLiked ? article.likes + 1 : article.likes;
    const articleComments = comments.filter(comment => comment.articleId === article.id);
    
    articleContent.innerHTML = `
        <div class="article-header">
            <div class="article-badges">
                <span class="category-badge" style="background-color: ${article.category.color}">
                    ${article.category.name}
                </span>
                ${article.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            
            <h1 class="article-detail-title">${article.title}</h1>
            <p class="article-detail-excerpt">${article.excerpt}</p>
            
            <div class="article-detail-meta">
                <div class="author-detail">
                    <img src="${article.author.avatar}" alt="${article.author.name}">
                    <div>
                        <div class="author-name">
                            ${article.author.name}
                            ${article.author.verified ? `
                                <div class="verified-badge">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                </div>
                            ` : ''}
                        </div>
                        <div class="author-bio">${article.author.bio}</div>
                    </div>
                </div>
                
                <div class="date-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>${new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                </div>
                
                <div class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    <span>${article.readingTime} min read</span>
                </div>
                
                <div class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>${article.views.toLocaleString()} views</span>
                </div>
            </div>
            
            <div class="article-detail-image">
                <img src="${article.imageUrl}" alt="${article.title}">
            </div>
            
            <div class="article-tags">
                ${article.tags.map(tag => `
                    <span class="tag">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        ${tag.name}
                    </span>
                `).join('')}
            </div>
        </div>
        
        <div class="article-body">
            ${article.content}
        </div>
        
        <div class="article-actions-bar">
            <div class="action-buttons">
                <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${article.id}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>${currentLikes}</span>
                </button>
                
                <button class="action-btn" onclick="shareArticle('${article.id}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span>Share</span>
                </button>
            </div>
            
            <div class="comments-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>${articleComments.length} comments</span>
            </div>
        </div>
    `;
    
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
 
    updateReadingProgress();
}

function goBack() {
    currentView = 'home';
    
    const homeView = document.getElementById('homeView');
    const articleDetail = document.getElementById('articleDetail');
    
    homeView.classList.remove('hidden');
    articleDetail.classList.add('hidden');
    
    document.getElementById('readingProgress').style.width = '0%';
}


function updateReadingProgress() {
    if (currentView !== 'article') return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    document.getElementById('readingProgress').style.width = `${Math.min(progress, 100)}%`;
}


function selectCategory(categoryId) {
    selectedCategory = categoryId;
    renderCategoryFilter();
    renderArticles();
}

function toggleLike(articleId) {
    if (likedArticles.has(articleId)) {
        likedArticles.delete(articleId);
    } else {
        likedArticles.add(articleId);
    }
    
    if (currentView === 'home') {
        renderArticles();
    } else {
        showArticleDetail(articleId);
    }
}

function shareArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    if (navigator.share) {
        navigator.share({
            title: article.title,
            text: article.excerpt,
            url: window.location.href,
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            alert('Unable to copy link');
        });
    }
}

function clearFilters() {
    selectedCategory = null;
    searchQuery = '';
    document.getElementById('searchInput').value = '';
    renderCategoryFilter();
    renderArticles();
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}


function init() {
   
    initializeTheme();
    
    renderStats();
    renderCategoryFilter();
    renderArticles();
    renderFooterCategories();
    
    document.getElementById('themeToggle').addEventListener('click', cycleTheme);
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    document.getElementById('backButton').addEventListener('click', goBack);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    
    window.addEventListener('scroll', updateReadingProgress);
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });
    
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

document.addEventListener('DOMContentLoaded', init);