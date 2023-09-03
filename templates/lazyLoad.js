document.addEventListener("DOMContentLoaded", function() {
    // Lazy load text
    fetch('/generate-text')
        .then(response => response.json())
        .then(data => {
            document.getElementById("lazyText").innerHTML = data.text;
        })
        .catch(error => {
            console.error("Error fetching lazy text:", error);
        });

    // Lazy load images
    const lazyImages = Array.from(document.querySelectorAll(".lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
        });
    }
});
