// ==UserScript==
// @name         Pytems
// @namespace    https://py9.dev/
// @version      1.0.6
// @description  Create & Manage Items in Infinite Craft with an Easy to use Menu!
// @author       Py9
// @match        https://neal.fun/infinite-craft/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neal.fun
// @grant        none
// ==/UserScript==

(function() {
    const version = '1.0.6';
    var updateAvailable = false;
    let checkVersion = async () => {
        let response = await fetch('https://raw.githubusercontent.com/Proyo9/Infinite-Hack/main/version.txt');
        let text = await response.text();
        let latestVersion = text.trim();
        if (compareVersions(version, latestVersion) === -1) {
            updateAvailable = true;
            document.getElementById('pytems-update').innerText = `Update (v${latestVersion})`;
            document.getElementById('pytems-update').style.display = 'flex';
            console.log('%cYour Pytems is not up to date, get the latest update from: %chttps://greasyfork.org/en/scripts/487439-pytems', 'color: red; font-weight: bold;', 'color: blue; text-decoration: underline;');
            let items = document.querySelectorAll('.item');
            /*items.forEach(item => {
                if (item.textContent.includes('Thank you for using Pytems')) {
                    item.innerHTML = `<span data-v-adfd717a="" class="item-emoji">❗</span> Pytems Update Available (v${latestVersion})`;
                }
            });*/
        }
    }
    function compareVersions(version1, version2) {
        const parts1 = version1.split('.');
        const parts2 = version2.split('.');
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const num1 = parseInt(parts1[i]) || 0;
            const num2 = parseInt(parts2[i]) || 0;

            if (num1 < num2) {
                return -1;
            } else if (num1 > num2) {
                return 1;
            }
        }
        return 0;
    }
    checkVersion();
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js';
    script.type = 'module';
    document.head.appendChild(script);
    let ht = localStorage.getItem('pytems:hidethanks');
    let items = localStorage.getItem('infinite-craft-data')
    if (ht && !updateAvailable) {
        items = JSON.parse(items);
        items.elements = items.elements.filter(e => e.text !== 'Thank you for using Pytems');
        localStorage.setItem('infinite-craft-data', JSON.stringify(items));
    } else {
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
    }
 
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
        document.querySelectorAll('.sidebar-input').forEach(input => input.disabled = true);
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
        document.querySelectorAll('.sidebar-input').forEach(input => input.disabled = true);
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
        document.querySelectorAll('.sidebar-input').forEach(input => input.disabled = true);
        magicCreateMenu.style.display = 'flex';
    });

    let magicCreateMenu = document.createElement('div');
    magicCreateMenu.style.position = 'fixed';
    magicCreateMenu.style.top = '15%';
    magicCreateMenu.style.left = '50%';
    magicCreateMenu.style.transform = 'translateX(-50%)';
    magicCreateMenu.style.zIndex = 1000000;
    magicCreateMenu.style.padding = '20px';
    magicCreateMenu.style.backgroundColor = 'white';
    magicCreateMenu.style.borderRadius = '5px';
    magicCreateMenu.style.display = 'none';
    magicCreateMenu.style.flexDirection = 'column';
    magicCreateMenu.style.alignItems = 'center';
    magicCreateMenu.style.justifyContent = 'center';
    magicCreateMenu.style.border = '1px solid #ddd';
    magicCreateMenu.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    document.body.appendChild(magicCreateMenu);

    let firstElementInput = document.createElement('input');
    firstElementInput.style.padding = '10px';
    firstElementInput.style.margin = '5px';
    firstElementInput.style.width = '100%';
    firstElementInput.style.border = '1px solid #ddd';
    firstElementInput.style.borderRadius = '5px';
    firstElementInput.style.fontSize = '16px';
    firstElementInput.style.outline = 'none';
    firstElementInput.placeholder = "Element One";
    magicCreateMenu.appendChild(firstElementInput);

    let secondElementInput = document.createElement('input');
    secondElementInput.style.padding = '10px';
    secondElementInput.style.margin = '5px';
    secondElementInput.style.width = '100%';
    secondElementInput.style.border = '1px solid #ddd';
    secondElementInput.style.borderRadius = '5px';
    secondElementInput.style.fontSize = '16px';
    secondElementInput.style.outline = 'none';
    secondElementInput.placeholder = "Element Two";
    magicCreateMenu.appendChild(secondElementInput);

    let magicCreateButton2 = document.createElement('button');
    magicCreateButton2.textContent = 'Create';
    magicCreateButton2.style.zIndex = 1000000;
    magicCreateButton2.style.padding = '10px 20px';
    magicCreateButton2.style.backgroundColor = '#6779d0';
    magicCreateButton2.style.color = 'white';
    magicCreateButton2.style.border = 'none';
    magicCreateButton2.style.borderRadius = '5px';
    magicCreateButton2.style.cursor = 'pointer';
    magicCreateButton2.style.marginTop = '10px';
    magicCreateMenu.appendChild(magicCreateButton2);

    magicCreateButton2.addEventListener('click', function() {
        const firstElement = firstElementInput.value;
        const secondElement = secondElementInput.value;
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

        magicCreateMenu.remove();
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

    let updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.style.zIndex = 1000000;
    updateButton.style.padding = '10px 20px';
    updateButton.style.backgroundColor = '#2196F3';
    updateButton.style.color = 'white';
    updateButton.style.border = 'none';
    updateButton.style.borderRadius = '5px';
    updateButton.style.cursor = 'pointer';
    updateButton.style.marginLeft = '10px';
    updateButton.style.marginTop = '10px';
    updateButton.style.display = 'none';
    updateButton.id = 'pytems-update';
    buttonContainer.appendChild(updateButton);
    updateButton.addEventListener('click', function() {
        window.location.href = 'https://greasyfork.org/en/scripts/487439-pytems';
    });

    let settingsMenu = document.createElement('div');
    settingsMenu.style.position = 'fixed';
    settingsMenu.style.top = '15%';
    settingsMenu.style.right = '50%';
    settingsMenu.style.transform = 'translateX(50%)';
    settingsMenu.style.zIndex = 1000000;
    settingsMenu.style.padding = '20px';
    settingsMenu.style.backgroundColor = 'white';
    settingsMenu.style.borderRadius = '5px';
    settingsMenu.style.display = 'none';
    settingsMenu.style.flexDirection = 'column';
    settingsMenu.style.alignItems = 'center';
    settingsMenu.style.justifyContent = 'center';
    settingsMenu.style.border = '1px solid #ddd';
    settingsMenu.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    document.body.appendChild(settingsMenu);

    settingsMenu.innerHTML = `
    <style>
    #pytems-github {
        margin-top: 10px;
        color: #2196F3;
        text-decoration: none;
    }
    #pytems-github:hover {
        text-decoration: underline;
    }
    #pytems-settings-close {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    #pytems-settings-close:hover {
        background-color: #ff6666;
    }
    .checkbox-info {
        margin-top: 10px;
    }
    .pytems-label {
        margin-left: 10px;
    }
    </style>
    <h1>Pytems Settings</h1>
    <span class="checkbox-info"><input type="checkbox" id="pytems-setting-hidethanks"></input><label for="pytems-setting-hidethanks" class="pytems-label">Hide Thanks Item</label></span>
    <a href="https://github.com/Proyo9/Infinite-Hack/" target="_blank" id="pytems-github">GitHub</a>
    <button id="pytems-settings-close">Close</button>
    `;

    let settingsClose = document.getElementById('pytems-settings-close');
    settingsClose.addEventListener('click', function() {
        // save settings
        let hideThanks = document.getElementById('pytems-setting-hidethanks').checked;
        hideThanks ? localStorage.setItem('pytems:hidethanks', hideThanks) : localStorage.removeItem('pytems:hidethanks');

        window.location.reload();
    });

    let hideThanks = localStorage.getItem('pytems:hidethanks');
    if (hideThanks) {
        document.getElementById('pytems-setting-hidethanks').checked = true;
    }
    
    let darkmodesetting = localStorage.getItem('pytems:darkmode');
    if (darkmodesetting) {
        setTimeout(() => {
            // darkmode
            let customstyle = document.createElement('style');
            customstyle.id = 'pytems-style';
            customstyle.innerHTML = `
            body {
                color: white !important;
            }   
            .items {
                background-color: #1e1e1e !important;
                color: white !important;
            }
            .item {
                background-color: #2e2e2e !important;
                color: white !important;
            }
            .item:hover {
                background: #3e3e3e !important;
            }
            .container {
                background-color: #1e1e1e !important;
            }
            .reset {
                color: white !important;
            }
            .sidebar-sorting-item {
                background-color: #2e2e2e !important;
                color: white !important;
            }
            .sidebar-input {
                background-color: #2e2e2e !important;
                color: white !important;
            }
            .item-selected {
                background: #3e3e3e !important;
            }
            .instance {
                background: #2e2e2e !important;
            }
            ::-webkit-scrollbar {
                width: 10px;
            }
            ::-webkit-scrollbar-track {
                background: #2e2e2e;
            }
            ::-webkit-scrollbar-thumb {
                background: #3e3e3e;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #4e4e4e;
            }
            input {
                color: white !important;
                background-color: #2e2e2e !important;
            }
            img {
                filter: invert(1) !important;
            }
            `
            let emojiPicker = document.querySelector('emoji-picker');
            emojiPicker.classList.add('dark');
            createButton.style.backgroundColor = 'transparent';
            createButton.style.border = 'solid 2px #4CAF50';
            deleteButton.style.backgroundColor = 'transparent';
            deleteButton.style.border = 'solid 2px #f44336';
            magicCreateButton.style.backgroundColor = 'transparent';
            magicCreateButton.style.border = 'solid 2px #6779d0';
            document.head.appendChild(customstyle);
            let checkImagesInterval = setInterval(() => {
                let images = document.querySelectorAll('img');
                if (images.length === 9) {
                    clearInterval(checkImagesInterval);
                    images.forEach(image => {
                        image.style.filter = 'invert(1)';
                    });
                }
            }, 100);
            let canvas = document.querySelector('.particles');
            canvas.style.filter = 'invert(1)';
            createItemMenu.style.backgroundColor = '#2e2e2e';
            deleteItemMenu.style.backgroundColor = '#2e2e2e';
            magicCreateMenu.style.backgroundColor = '#2e2e2e';
            settingsMenu.style.backgroundColor = '#2e2e2e';
        }, 10);
    }

    setTimeout(() => {
        let darkmodeToggle = `
        <a data-v-0d6976f8="" target="_blank" class="darkmodetoggle" id="darkmodetoggle" style="margin-top: 3.5px;">
            <img data-v-0d6976f8="" src="https://static-00.iconduck.com/assets.00/moon-icon-1868x2048-ifpp8fum.png" class="coffee">
        </a>
        `
        let settingsToggle = `
        <a data-v-0d6976f8="" target="_blank" class="settingstoggle" id="settingstoggle" style="margin-top: 4px;">
            <img data-v-0d6976f8="" src="https://static-00.iconduck.com/assets.00/gear-icon-2048x2048-5lk2g86a.png" class="coffee">
        </a>
        `
        let sideControls = document.querySelector('.side-controls');
        sideControls.innerHTML = darkmodeToggle + settingsToggle + sideControls.innerHTML;
        let darkmodeButton = document.getElementById('darkmodetoggle');
        darkmodeButton.addEventListener('click', function() {
            if (localStorage.getItem('pytems:darkmode')) {
                localStorage.removeItem('pytems:darkmode');
                location.reload();
            } else {
                localStorage.setItem('pytems:darkmode', 'true');
                location.reload();
            }
        });
        let settingsButton = document.getElementById('settingstoggle');
        settingsButton.addEventListener('click', function() {
            settingsMenu.style.display = 'flex';
        });
    }, 500);
})();