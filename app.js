const generateForm = document.querySelector(".generate-form");
const handleFormSubmission = (e) => {
    e.preventDefault();
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[0].value;

    const imgCardMarkup = Array.from({length:userImgQuantity}() => 
    


        
    ).join("");
}
generateForm.addEventListener("Submit",handleFormSubmission);