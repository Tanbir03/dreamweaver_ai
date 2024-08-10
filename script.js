const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const generateAIImage = async (userPrompt, userImgQuantity) => {
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            
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