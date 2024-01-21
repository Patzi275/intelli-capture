const API_TOKEN = "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";

async function getImageDescription(url) {
    return fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify({image: url}),
        }
    );
}

async function tempFileUpload(file) {
    var data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pdj3mlho");

    return fetch("https://api.cloudinary.com/v1_1/dwpnfr1mr/image/upload", {
        method: "POST",
        body: data,
    })
        .then((response) => response.json())
        .then((result) => {
            return {
                url: result.secure_url,
                public_id: result.public_id,
            };
        });
}

async function tempFileDelete(public_id) {
    var data = new FormData();
    data.append("public_id", public_id);
    data.append("upload_preset", "pdj3mlho");

    return fetch("https://api.cloudinary.com/v1_1/dwpnfr1mr/image/destroy", {
        method: "POST",
        body: data,
    });
}

async function processImage(image) {
  try {
    const uploadResponse = await tempFileUpload(image);

    const descriptionResponse = await getImageDescription(uploadResponse.url);
    const descriptionTextData = await descriptionResponse.text();
    
    const description = JSON.parse(descriptionTextData)[0].generated_text;
    // const deleteResponse = await tempFileDelete(descriptionResponse.public_id);

    console.log(description);
    return description;
  } catch (error) {
    alert(JSON.stringify(error));
  }
}
