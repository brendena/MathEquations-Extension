https://discourse.mozilla.org/t/how-to-detect-the-dark-theme-in-a-webextension/38604

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action#Syntax

browser actions
Theme_icons - dark -light



It refering to the color of the text so
light -- is a dark theme
dark  -- is a light them


Inside browser actions
      "theme_icons": [{
        "light": "Img/16x16.png",
        "dark":  "Img/Dark16x16.png",
        "size": 16
      }],