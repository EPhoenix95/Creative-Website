let page = 1;
let loading = false;
const gallery = document.getElementById('art-gallery');
const pdfGallery = document.querySelector('.pdf-gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const pdfModal = document.getElementById('pdf-modal');
const pdfContent = document.getElementById('pdf-content');
const closePdfModal = document.getElementById('close-pdf-modal');

// List of local images
const localImages = [
    'Anime girl 1.jpg', 
    'Anime girl 2.jpg', 
    'Anime girl 3.jpg', 
    'Anime girl 6.jpg'
];

// List of local PDFs and their preview images
const localPDFs = [
    { pdf: 'Documents/PDF1.pdf', preview: 'images/PDF1.jpg', title: 'Sample PDF 1' },
    { pdf: 'Documents/PDF2.pdf', preview: 'images/PDF2.jpg', title: 'Sample PDF 2' },
    { pdf: 'Documents/PDF3.pdf', preview: 'images/PDF3.jpg', title: 'Sample PDF 3' },
    { pdf: 'Documents/PDF1.pdf', preview: 'images/PDF1.jpg', title: 'Sample PDF 4' },
    { pdf: 'Documents/PDF2.pdf', preview: 'images/PDF2.jpg', title: 'Sample PDF 5' },
    { pdf: 'Documents/PDF3.pdf', preview: 'images/PDF3.jpg', title: 'Sample PDF 6' },
    { pdf: 'Documents/PDF1.pdf', preview: 'images/PDF1.jpg', title: 'Sample PDF 7' },
    { pdf: 'Documents/PDF2.pdf', preview: 'images/PDF2.jpg', title: 'Sample PDF 8' },
    { pdf: 'Documents/PDF3.pdf', preview: 'images/PDF3.jpg', title: 'Sample PDF 9' },
    { pdf: 'Documents/PDF3.pdf', preview: 'images/PDF3.jpg', title: 'Sample PDF 10' },
    
];

// Load images from local folder
function loadImages() {
    const imagePath = 'images/';
    localImages.forEach((imageFile) => {
        const img = document.createElement('img');
        img.src = imagePath + imageFile;
        img.alt = 'Art Image';
        img.onclick = () => showImageInModal(img.src); // Click to enlarge
        gallery.appendChild(img);
    });
}

// Load PDF previews into the gallery
function loadPDFs() {
    pdfGallery.innerHTML = ''; // Clear existing content if reloading
    localPDFs.forEach((pdfData) => {
        const pdfDiv = document.createElement('div');
        pdfDiv.classList.add('pdf-preview');
        pdfDiv.dataset.pdf = pdfData.pdf;

        // Create image element for preview
        const img = document.createElement('img');
        img.src = pdfData.preview;
        img.alt = pdfData.title;

        // Add error handler to log any issues with image loading
        img.onerror = () => {
            console.error(`Could not load preview image: ${pdfData.preview}`);
        };

        // Create title for the PDF
        const title = document.createElement('p');
        title.textContent = pdfData.title;

        // Append the image and title to the div
        pdfDiv.appendChild(img);
        pdfDiv.appendChild(title);

        // Add click handler to open the PDF in modal
        pdfDiv.onclick = () => showPDFInModal(pdfData.pdf);

        // Append the div to the gallery
        pdfGallery.appendChild(pdfDiv);
    });
}


// Function to show image in modal
function showImageInModal(src) {
    modalImage.src = src;
    modal.classList.remove('hidden');
}

// Function to show PDF in modal
function showPDFInModal(pdfPath) {
    pdfContent.src = pdfPath;
    pdfModal.classList.remove('hidden');
}

// Close the image modal
closeModal.onclick = () => {
    modal.classList.add('hidden');
};

// Close the PDF modal
closePdfModal.onclick = () => {
    pdfModal.classList.add('hidden');
};

// Infinite scroll: Load more images on horizontal scroll
gallery.addEventListener('scroll', () => {
    if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 50 && !loading) {
        loading = true;
        document.getElementById('loading').classList.remove('hidden');
        // Simulate a delay for loading more images
        setTimeout(() => {
            loadImages();
            loading = false;
            document.getElementById('loading').classList.add('hidden');
        }, 1000);
    }
});

// Initial load of images and PDFs
loadImages();
loadPDFs();
