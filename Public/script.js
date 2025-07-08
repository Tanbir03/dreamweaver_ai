const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

// Update image cards with AI-generated blobs
const updateImageCard = async (imgBlobs) => {
  const imgCards = imageGallery.querySelectorAll(".img-card");

  imgBlobs.forEach((blob, index) => {
    const imgCard = imgCards[index];
    if (!imgCard) return; // Prevent crash if cards mismatch

    const imgElement = imgCard.querySelector("img");
    const blobUrl = URL.createObjectURL(blob);
    imgElement.src = blobUrl;

    imgElement.onload = () => {
      imgCard.classList.remove("loading");
    };

    const downloadBtn = imgCard.querySelector(".download-btn");
    downloadBtn.href = blobUrl;
    downloadBtn.download = `dreamweaver_image_${index + 1}.jpg`;
  });
};

// Generate images via local server endpoint
const generateAiImages = async (userPrompt, userImgQuantity) => {
  try {
    const blobs = [];

    for (let i = 0; i < userImgQuantity; i++) {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Generation failed:", errorText);
        throw new Error(errorText || "Image generation failed");
      }

      const blob = await response.blob();
      blobs.push(blob);
    }

    updateImageCard(blobs);
  } catch (error) {
    console.error("Error generating images:", error);
    alert(`❌ ${error.message}`);
  }
};

// Handle form submission
generateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userPrompt = e.target.querySelector(".prompt-input").value.trim();
  const userImgQuantity = parseInt(e.target.querySelector(".img-quantity").value, 10);

  if (!userPrompt) {
    alert("Please enter a prompt.");
    return;
  }

  // Generate loading placeholders
  const loadingCards = Array.from({ length: userImgQuantity }, () => `
    <div class="img-card loading">
      <img src="./images/loader.svg" alt="Loading..." />
      <a href="#" class="download-btn">
        <img src="./images/download.svg" alt="Download icon" />
      </a>
    </div>
  `).join("");

  imageGallery.innerHTML = loadingCards;

  // Trigger image generation
  generateAiImages(userPrompt, userImgQuantity);
});
