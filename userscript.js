// ==UserScript==
// @name         Pytems
// @namespace    https://py9.dev/
// @version      1.0.2
// @description  Create & Manage Items in Infinite Craft with an Easy to use Menu!
// @author       Py9
// @match        https://neal.fun/infinite-craft/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neal.fun
// @grant        none
// ==/UserScript==

(function() {
    const version = '1.0.2';
    let checkVersion = async () => {
        let response = await fetch('https://raw.githubusercontent.com/Proyo9/Infinite-Hack/main/version.txt');
        let text = await response.text();
        if (!text.includes(version)) {
            alert('A new version of Pytems is available! Check console for more info.');
            console.info('Pytems | New version available at https://greasyfork.org/en/scripts/487439-pytems');
        }
    }
    checkVersion();
 
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js';
    script.type = 'module';
    document.head.appendChild(script);
    let items = localStorage.getItem('infinite-craft-data')
    if (items === null) {
        items = {"elements":[{"text":"Water","emoji":"💧","discovered":false},{"text":"Fire","emoji":"🔥","discovered":false},{"text":"Wind","emoji":"🌬️","discovered":false},{"text":"Earth","emoji":"🌍","discovered":false}]}
    } else {
        items = JSON.parse(items)
    }
    localStorage.setItem('infinite-craft-data', JSON.stringify(items))
    let thanks = {"text":"Thank you for using Pytems","emoji":"🍉","discovered":false}
    if (!items.elements.some(e => e.text === thanks.text)) {
        items.elements.unshift(thanks)
 
    }
    localStorage.setItem('infinite-craft-data', JSON.stringify(items))
 
    let buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    document.body.appendChild(buttonContainer);
 
    let createButton = document.createElement('button');
    createButton.textContent = 'Create Item';
    createButton.style.zIndex = 1000000;
    createButton.style.padding = '10px 20px';
    createButton.style.backgroundColor = '#4CAF50';
    createButton.style.color = 'white';
    createButton.style.border = 'none';
    createButton.style.borderRadius = '5px';
    createButton.style.cursor = 'pointer';
    createButton.style.marginTop = '10px';
    buttonContainer.appendChild(createButton);
    createButton.addEventListener('click', function() {
        createItemMenu.style.display = 'flex';
    });
 
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Item';
    deleteButton.style.zIndex = 1000000;
    deleteButton.style.padding = '10px 20px';
    deleteButton.style.backgroundColor = '#f44336';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.marginTop = '10px';
    buttonContainer.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() {
        deleteItemMenu.style.display = 'flex';
    });
 
    let magicCreateButton = document.createElement('button');
    magicCreateButton.textContent = 'Magic Create';
    magicCreateButton.style.zIndex = 1000000;
    magicCreateButton.style.padding = '10px 20px';
    magicCreateButton.style.backgroundColor = '#6779d0';
    magicCreateButton.style.color = 'white';
    magicCreateButton.style.border = 'none';
    magicCreateButton.style.borderRadius = '5px';
    magicCreateButton.style.cursor = 'pointer';
    magicCreateButton.style.marginLeft = '10px';
    magicCreateButton.style.marginTop = '10px';
    buttonContainer.appendChild(magicCreateButton);
    magicCreateButton.addEventListener('click', function() {
        const firstElement = prompt("First element's name...");
        const secondElement = prompt("Second element's name...");
        var text = '';
        fetch(`https://neal.fun/api/infinite-craft/pair?first=${firstElement}&second=${secondElement}`)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                // Return the ReadableStream directly
                return response.body;
            })
            .then(body => {
                const reader = body.getReader();

                const readStream = () => {
                return reader.read().then(({ done, value }) => {
                    if (done) {
                        responseJSON = JSON.parse(text);
                        let newItem = {"text":responseJSON.result,"emoji":responseJSON.emoji,"discovered":responseJSON.isNew};
                        items = localStorage.getItem('infinite-craft-data')
                        items = JSON.parse(items)
                        items.elements.push(newItem);
                        localStorage.setItem('infinite-craft-data', JSON.stringify(items))
                        location.reload();
                        return;
                    }
                    text += new TextDecoder().decode(value);
                    return readStream();
                });
                };

                return readStream();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });

    let createItemMenu = document.createElement('div');
    createItemMenu.style.position = 'fixed';
    createItemMenu.style.top = '15%';
    createItemMenu.style.left = '50%';
    createItemMenu.style.transform = 'translateX(-50%)';
    createItemMenu.style.zIndex = 1000000;
    createItemMenu.style.padding = '20px';
    createItemMenu.style.backgroundColor = 'white';
    createItemMenu.style.borderRadius = '5px';
    createItemMenu.style.display = 'none';
    createItemMenu.style.flexDirection = 'column';
    createItemMenu.style.alignItems = 'center';
    createItemMenu.style.justifyContent = 'center';
    createItemMenu.style.border = '1px solid #ddd';
    createItemMenu.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    document.body.appendChild(createItemMenu);

 
    let createItemInput = document.createElement('input');
    createItemInput.style.padding = '10px';
    createItemInput.style.margin = '5px';
    createItemInput.style.width = '100%';
    createItemInput.style.border = '1px solid #ddd';
    createItemInput.style.borderRadius = '5px';
    createItemInput.style.fontSize = '16px';
    createItemInput.style.outline = 'none';
    createItemInput.placeholder = 'Enter the name of the item';
    createItemInput.value = 'New Item';
    createItemMenu.appendChild(createItemInput);
    
    let createItemEmoji = document.createElement('input');
    createItemEmoji.style.padding = '10px';
    createItemEmoji.style.margin = '5px';
    createItemEmoji.style.width = '100%';
    createItemEmoji.style.border = '1px solid #ddd';
    createItemEmoji.style.borderRadius = '5px';
    createItemEmoji.style.fontSize = '16px';
    createItemEmoji.style.outline = 'none';
    createItemEmoji.placeholder = 'Enter the emoji for the item';
    createItemEmoji.value = '📋';
    createItemMenu.appendChild(createItemEmoji);
 
    let pickerButton = document.createElement('button');
    pickerButton.textContent = 'Pick Emoji';
    pickerButton.style.padding = '10px 20px';
    pickerButton.style.backgroundColor = '#2196F3';
    pickerButton.style.color = 'white';
    pickerButton.style.border = 'none';
    pickerButton.style.borderRadius = '5px';
    pickerButton.style.cursor = 'pointer';
    pickerButton.style.marginBottom = '10px';
    createItemMenu.appendChild(pickerButton);
    pickerButton.addEventListener('click', function() {
        pickerButton.style.display = 'none';
        emojiPicker.style.display = 'flex';
    }
    );
 
    let emojiPicker = document.createElement('emoji-picker');
    emojiPicker.style.marginTop = '10px';
    emojiPicker.style.marginBottom = '10px';
    emojiPicker.style.display = 'none';
    emojiPicker.addEventListener('emoji-click', (event) => {
        createItemEmoji.value = event.detail.emoji.unicode;
        emojiPicker.style.display = 'none';
        pickerButton.style.display = 'flex';
    });
    createItemMenu.appendChild(emojiPicker);
 
    let createItemDiscoveredLabel = document.createElement('label');
    createItemDiscoveredLabel.textContent = 'Discovered';
    createItemDiscoveredLabel.style.fontSize = '16px';
    createItemDiscoveredLabel.style.outline = 'none';
    createItemMenu.appendChild(createItemDiscoveredLabel);
 
    let createItemDiscovered = document.createElement('input');
    createItemDiscovered.type = 'checkbox';
    createItemDiscovered.style.border = '1px solid #ddd';
    createItemDiscovered.style.borderRadius = '5px';
    createItemDiscovered.style.fontSize = '16px';
    createItemDiscovered.style.outline = 'none';
    createItemDiscovered.style.marginBottom = '5px';
    createItemMenu.appendChild(createItemDiscovered);
 
    let createItemSubmit = document.createElement('button');
    createItemSubmit.textContent = 'Create Item';
    createItemSubmit.style.padding = '10px 20px';
    createItemSubmit.style.backgroundColor = '#4CAF50';
    createItemSubmit.style.color = 'white';
    createItemSubmit.style.border = 'none';
    createItemSubmit.style.borderRadius = '5px';
    createItemSubmit.style.cursor = 'pointer';
    createItemMenu.appendChild(createItemSubmit);
 
    createItemSubmit.addEventListener('click', function() {
        let newItem = {"text":createItemInput.value,"emoji":createItemEmoji.value,"discovered":createItemDiscovered.checked};
        items = localStorage.getItem('infinite-craft-data')
        items = JSON.parse(items)
        items.elements.push(newItem);
        localStorage.setItem('infinite-craft-data', JSON.stringify(items))
        location.reload();
    });
 
    let deleteItemMenu = document.createElement('div');
    deleteItemMenu.style.position = 'fixed';
    deleteItemMenu.style.top = '15%';
    deleteItemMenu.style.left = '50%';
    deleteItemMenu.style.transform = 'translateX(-50%)';
    deleteItemMenu.style.zIndex = 1000000;
    deleteItemMenu.style.padding = '20px';
    deleteItemMenu.style.backgroundColor = 'white';
    deleteItemMenu.style.borderRadius = '5px';
    deleteItemMenu.style.display = 'none';
    deleteItemMenu.style.flexDirection = 'column';
    deleteItemMenu.style.alignItems = 'center';
    deleteItemMenu.style.justifyContent = 'center';
    deleteItemMenu.style.border = '1px solid #ddd';
    deleteItemMenu.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    document.body.appendChild(deleteItemMenu);
 


    let deleteItemInput = document.createElement('input');
    deleteItemInput.style.padding = '10px';
    deleteItemInput.style.margin = '5px';
    deleteItemInput.style.width = '100%';
    deleteItemInput.style.border = '1px solid #ddd';
    deleteItemInput.style.borderRadius = '5px';
    deleteItemInput.style.fontSize = '16px';
    deleteItemInput.style.outline = 'none';
    deleteItemInput.placeholder = 'Enter the name of the item';
    deleteItemMenu.appendChild(deleteItemInput);
 
    let deleteItemSubmit = document.createElement('button');
    deleteItemSubmit.textContent = 'Delete Item';
    deleteItemSubmit.style.padding = '10px 20px';
    deleteItemSubmit.style.backgroundColor = '#f44336';
    deleteItemSubmit.style.color = 'white';
    deleteItemSubmit.style.border = 'none';
    deleteItemSubmit.style.borderRadius = '5px';
    deleteItemSubmit.style.cursor = 'pointer';
    deleteItemMenu.appendChild(deleteItemSubmit);
 
    deleteItemSubmit.addEventListener('click', function() {
        items = localStorage.getItem('infinite-craft-data')
        items = JSON.parse(items)
        items.elements = items.elements.filter(e => e.text !== deleteItemInput.value)
        localStorage.setItem('infinite-craft-data', JSON.stringify(items))
        location.reload();
    });
    
})();
