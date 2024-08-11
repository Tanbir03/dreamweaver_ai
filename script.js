const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const HF_API_KEY = "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";

const updateImageCard = async (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
        };
    });
};

const generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora", {
            method: "POST",
            headers: { // Updated from 'header' to 'headers'
                "Content-Type": "application/json", // Ensure correct casing for content type
                "Authorization": `Bearer ${HF_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        if (!response.ok){
            const errorData = await response.json();  // Get the error details from the response
            console.error("Error details:", errorData);
            throw new Error("Failed to generate images! Please try again.");
        };

        const { data } = await response.json(); // Updated to destructure 'data'
        updateImageCard(data); // Removed spread operator and used directly
    } catch (error) {
        alert(error.message);
    }
};

const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.target[0].value;
    const userImgQuantity = e.target[1].value;

    const imgCardMarkup = Array.from({ length: userImgQuantity }, () =>
        `<div class="img-card loading">
            <img src="./images/loader.svg" alt="generated image" />
            <a href="#" class="download-btn">
                <img src="./images/download.svg" alt="download icon" />
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImgQuantity);
};

generateForm.addEventListener("submit", handleFormSubmission);