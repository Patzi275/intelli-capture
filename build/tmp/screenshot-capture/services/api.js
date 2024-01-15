const API_TOKEN = "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";

function getMessage(data, done, onError) {
    fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    )
        .then((response) => response.json())
        .then((result) => done(result))
        .catch((error) => onError(error));
}

function tempFileUpload(file) {
    // https://tmpfiles.org/api/v1/upload

    var data = new FormData();
    data.append("file", file);
    console.log('uplaoding', file)
    fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: data,
    })
        .then((response) => response.json())
        .then((result) => console.log("upload", result))
        .catch((error) => console.log("error", error));
}