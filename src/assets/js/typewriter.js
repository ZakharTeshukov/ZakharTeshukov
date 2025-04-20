// Typewriter animation handler
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter');
    const fullText = typewriterElement.textContent;
    const isMobile = window.innerWidth <= 768;
    
    // Clear the element for the animation
    typewriterElement.textContent = '';
    
    // Add the highlight span back empty (to be filled during animation)
    const highlightSpan = document.createElement('span');
    highlightSpan.classList.add('highlight');
    
    // Separate the text into two parts - before the name and the name itself
    const beforeName = "Hello, I'm ";
    const name = "Zakhar Teshukov";
    
    // Function to simulate typewriter effect
    function typeWriter() {
        // Type "Hello, I'm " first
        let i = 0;
        const typeBeforeName = setInterval(function() {
            if (i < beforeName.length) {
                typewriterElement.textContent += beforeName.charAt(i);
                i++;
            } else {
                clearInterval(typeBeforeName);
                
                // Now start typing the name with highlight
                typewriterElement.appendChild(highlightSpan);
                let j = 0;
                const typeName = setInterval(function() {
                    if (j < name.length) {
                        highlightSpan.textContent += name.charAt(j);
                        j++;
                    } else {
                        clearInterval(typeName);
                        
                        // Add the underline animation class after typing is complete
                        setTimeout(function() {
                            highlightSpan.classList.add('typed');
                        }, 300);
                    }
                }, 100);
            }
        }, 100);
    }
    
    // Start the typewriter animation
    setTimeout(typeWriter, 500);
}); 