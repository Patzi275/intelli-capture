
function generateBox(_image, _selection, done) {
    var container = document.createElement('div');
    container.id = 'container';
    container.style = `
        position: absolute;
        z-index: 9999;
    `;

    var darkBackground = document.createElement('div');
    darkBackground.id = 'dark-background';
    darkBackground.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.5;
        z-index: 999;
        cursor: pointer;
    `;
    darkBackground.addEventListener('click', () => {
        document.body.removeChild(container);
    });


    var image = document.createElement('img');
    const padding = 10;
    image.src = _image;
    image.style = `
        position: fixed;
        background-color: white;
        padding: ${padding}px;
        top: ${_selection.y - padding}px;
        left: ${_selection.x - padding}px;
        width: ${_selection.w}px;
        height: ${_selection.h}px;
        object-fit: cover;
        z-index: 1000;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        border-radius: 5px;
    `;

    var tooltip = document.createElement('div');
    const offset = 15;
    tooltip.id = 'tooltip';
    tooltip.style = `
        max-width: ${_selection.w}px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: ${_selection.y + _selection.h + padding + offset}px;
        left: ${_selection.x - padding}px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        padding: 10px;
        z-index: 1000;
        font-size: 1.5rem;
    `;
    const loader = generateLoader();
    tooltip.appendChild(loader);

    const changeContent = (content) => {
        content = content.charAt(0).toUpperCase() + content.slice(1);

        tooltip.style.display = "block";
        tooltip.removeChild(loader);

        const interval = setInterval(() => {
            if (content.length > 0) {
                tooltip.innerHTML += content[0];
                content = content.slice(1);
            } else {
                clearInterval(interval);
            }
        }, 50);
    };



    container.appendChild(darkBackground);
    container.appendChild(tooltip);
    container.appendChild(image);

    done({container, changeContent});
}

function generateLoader() {
    var loader = document.createElement('div');
    loader.id = 'loader';
    loader.style = `
        border: 4px solid #575757;
        border-radius: 50%;
        border-top: 4px solid #fff;
        width: 12px;
        height: 12px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation:spin 2s linear infinite;
    `;

    return loader;
}