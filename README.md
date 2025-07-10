<!-- Dreamweaver AI README.md -->

<h1 align="center">🌌 Dreamweaver AI</h1>
<p align="center"><em>“What you imagine... we generate.”</em></p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Stable%20Diffusion%20XL-blueviolet?style=for-the-badge&logo=OpenAI" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange?style=for-the-badge&logo=javascript" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/API-HuggingFace-ff69b4?style=for-the-badge&logo=huggingface" />
</p>



     ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    ▐░░░░░░░░░░░░░░░░░░░░░░░░░░░░▌
    ▐░ D R E A M W E A V E R   A I ▌
    ▐▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌




> A prompt-to-image generator powered by Stable Diffusion XL.  
> This tool turns your words into beautiful visuals with just one click — perfect for creatives, developers, and dreamers alike.

---

## 🔥 Why Dreamweaver AI?

🧠 Powered by **Stable Diffusion XL**  
🎨 Generate stunning images from text prompts  
🖼️ Multiple outputs in one go (1–4 images)  
🖱️ Clean UI + Download buttons for each image  
⚙️ Modular codebase: Easy to extend, learn, and deploy  

---

## 🖼️ Demo Preview

> ⚠️ Not deployed yet (due to API limits), but fully working locally!

| Prompt | Output |
|--------|--------|
| *"Astronaut riding a unicorn in space"* | <img width="240" height="240" alt="image" src="https://github.com/user-attachments/assets/e802ea7d-8bc8-46b1-be93-61c663c0f62b" />|
| *"Cyberpunk city in the rain, at night"* | <img width="240" height="240" alt="image" src="https://github.com/user-attachments/assets/c831c648-d83d-4783-8623-b66416d0a56b" />
 |

---

## 🧠 How It Works (In English)

1. You type your idea.
2. The frontend sends your prompt to the backend.
3. The backend talks to Hugging Face’s Stable Diffusion XL model.
4. The image gets generated and streamed back.
5. The frontend renders your image beautifully and lets you download it.

---

## 🧬 Technical Workflow (Graphical)

```mermaid
sequenceDiagram
    User->>Frontend: Input prompt + image count
    Frontend->>Backend: POST /generate-image
    Backend->>HF API: Send prompt to SDXL
    HF API-->>Backend: Return image buffer
    Backend-->>Frontend: Return blob/image
    Frontend-->>User: Display image(s) + download option
````

---

## 🧪 Tech Stack

| Layer        | Tech                                       |
| ------------ | ------------------------------------------ |
| **Frontend** | HTML, CSS, JavaScript                      |
| **Backend**  | Node.js + Express                          |
| **Model**    | `stabilityai/stable-diffusion-xl-base-1.0` |
| **API**      | Hugging Face Inference API                 |

---

## 🛠️ Local Setup

> Run it locally in under 2 minutes!

```bash
# 1. Clone the repository
git clone https://github.com/Tanbir03/dreamweaver_ai.git
cd dreamweaver_ai

# 2. Install dependencies
npm install

# 3. Add your Hugging Face token
echo HUGGINGFACE_TOKEN=your_token_here > .env

# 4. Start the server
node server.js

# 5. Visit the app
http://localhost:5000
```

---

## 🌟 Features

* 🔁 Generate 1–4 images per prompt
* ⚡ Real-time image display and download
* 🌀 Loading animation while generating
* 💬 Fully customizable UI + backend API
* 🛠️ Ready for future local deployment with `diffusers`



## 📁 File Structure

```
dreamweaver_ai/
├── public/
│   ├── images/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── .env
├── package.json
└── README.md ← You're here!
```


## ✨ UI Preview

> A glimpse of the Dreamweaver AI interface:

<p align="center">
  <img src="https://github.com/user-attachments/assets/e4d1b714-3d36-40b9-bd64-476d4b2bb65e" alt="Dreamweaver UI" width="90%">
</p>



---

## 🤝 Collaboration & Credits

👨‍💻 **Frontend:** [Tanbir Aman](https://github.com/Tanbir03)
🔧 **Backend & AI Integration:** [Mrinal Mondal](https://github.com/mrin9)

A perfect balance of design & deep tech — thank you, Tanbir!

---

## 🧭 Roadmap

* [ ] 🌍 Deploy on Render/Vercel with model switch
* [ ] 🧾 Prompt templates and creative mode
* [ ] 🖌️ Style + image conditioning
* [ ] 💡 Offline support via `diffusers`
* [ ] 🌐 Multilingual prompt support

---

## 💬 Sample Prompts to Try

* *“Futuristic samurai in neon Tokyo”*
* *“An enchanted forest glowing at night”*
* *“A robot meditating on a mountain”*

---

## ❤️ Show Some Love

If this project inspired you, please:

⭐ Star this repo
🍴 Fork it and remix
📢 Share your generated images on social media with `#DreamweaverAI`

---

## 📜 License

MIT License © [Mrinal Mondal](https://github.com/mrin9)
Use it, modify it, break it, fix it — just don’t forget to dream with it ✨


