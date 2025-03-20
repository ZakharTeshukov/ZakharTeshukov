// Blog Post Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Table of Contents
    generateTableOfContents();
    
    // Initialize Share Buttons
    initializeShareButtons();
    
    // Initialize Code Blocks
    initializeCodeBlocks();
    
    // Initialize Reading Time
    calculateReadingTime();
    
    // Initialize Smooth Scrolling
    initializeSmoothScrolling();
});

// Generate Table of Contents
function generateTableOfContents() {
    const tocContainer = document.querySelector('.toc-container');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.post-content h2, .post-content h3');
    if (headings.length === 0) return;

    const toc = document.createElement('ul');
    let currentLevel = 2;
    let currentList = toc;
    let previousList = null;

    headings.forEach((heading, index) => {
        // Add id to heading if not present
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const level = parseInt(heading.tagName.charAt(1));
        const item = document.createElement('li');
        const link = document.createElement('a');
        
        link.textContent = heading.textContent;
        link.href = `#${heading.id}`;
        item.appendChild(link);

        if (level > currentLevel) {
            const newList = document.createElement('ul');
            currentList.lastElementChild.appendChild(newList);
            previousList = currentList;
            currentList = newList;
        } else if (level < currentLevel) {
            currentList = previousList || toc;
        }

        currentList.appendChild(item);
        currentLevel = level;
    });

    tocContainer.appendChild(toc);
}

// Initialize Share Buttons
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl;
            
            switch(button.dataset.platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// Initialize Code Blocks
function initializeCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-example pre');
    
    codeBlocks.forEach(block => {
        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        block.parentNode.insertBefore(copyButton, block);
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
        
        // Add language indicator if present
        const language = block.className.match(/language-(\w+)/);
        if (language) {
            const langIndicator = document.createElement('span');
            langIndicator.className = 'code-language';
            langIndicator.textContent = language[1];
            block.parentNode.insertBefore(langIndicator, block);
        }
    });
}

// Calculate Reading Time
function calculateReadingTime() {
    const content = document.querySelector('.post-content');
    if (!content) return;

    const text = content.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    const readingTimeElement = document.querySelector('.reading-time');
    if (readingTimeElement) {
        readingTimeElement.textContent = `${readingTime} min read`;
    }
}

// Initialize Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
}

// Handle Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Handle Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// Handle Image Loading
document.querySelectorAll('.post-content img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // Add loading="lazy" attribute for better performance
    img.loading = 'lazy';
});

// Export functions for potential reuse
export {
    generateTableOfContents,
    initializeShareButtons,
    initializeCodeBlocks,
    calculateReadingTime,
    initializeSmoothScrolling
}; 