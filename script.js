const model_id = "stabilityai/stable-diffusion-xl-base-1.0";
const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

// Function to update image cards with Blob URLs
const updateImageCard = async (imgBlobs) => {
    imgBlobs.forEach((blob, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");

        const blobUrl = URL.createObjectURL(blob);
        imgElement.src = blobUrl;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
        };

        const downloadBtn = imgCard.querySelector(".download-btn");
        downloadBtn.href = blobUrl;
        downloadBtn.download = `sdxl_image_${index + 1}.jpg`;
    });
};

// Function to generate images using the Hugging Face API
const generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        const blobs = [];

        for (let i = 0; i < userImgQuantity; i++) {
            const response = await fetch(`https://api-inference.huggingface.co/models/${model_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    inputs: userPrompt,
                    options: {
                        wait_for_model: true
                    }
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                throw new Error(`Image generation failed: ${errorData.error || "Unknown error"}`);
            }

            const blob = await response.blob(); // Get image as blob
            blobs.push(blob);
        }

        updateImageCard(blobs);
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    }
};

// Handle form submission
const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.target.querySelector(".prompt-input").value.trim();
    const userImgQuantity = parseInt(e.target.querySelector(".img-quantity").value, 10);

    console.log("User Prompt:", userPrompt);
    console.log("Image Quantity:", userImgQuantity);

    // Show loading placeholders
    const imgCardMarkup = Array.from({ length: userImgQuantity }, () =>
        `<div class="img-card loading">
            <img src="./images/loader.svg" alt="Loading..." />
            <a href="#" class="download-btn">
                <img src="./images/download.svg" alt="Download icon" />
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;

    generateAiImages(userPrompt, userImgQuantity);
};

generateForm.addEventListener("submit", handleFormSubmission);
