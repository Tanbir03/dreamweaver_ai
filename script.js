

const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const HF_KEY = "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"

const generateAIImage = async (userPrompt, userImgQuantity) => {
    try{
        const response = await fetch("https://huggingface.co/CompVis/stable-diffusion-v1-4", {
                method: "POST",
                headers: {
                    "Content-Type: application/json",
                    "Authorization": `Bearer ${HF_KEY}}`
                },
            body: JSON.stringify({
                "prompt": userPrompt,
                n: userImgQuantity,
                response_format:"b64_json"
            })
        });
    }catch(error){
        console.log(error);
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `<div class="img-card loading">
            <img src="./images/loader.svg" alt="generated image" />
            <a href="#" class="download-btn">
                <img src="./images/download.svg" alt="download icon" />
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAIImage(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);
