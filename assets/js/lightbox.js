// lightbox.js

        function openLightbox(img_src) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            // Set the image source
            lightboxImage.src = img_src;
            // Show lightbox
            lightbox.classList.add('active');
            
            // Prevent body scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        }

        // Close lightbox when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });

        // Handle image loading errors - fallback to placeholder
        document.getElementById('lightbox-image').addEventListener('error', function() {
            // If high-res image fails to load, you could fallback to the thumbnail
            console.log('High-res image failed to load');
        });