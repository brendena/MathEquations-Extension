## Disable/Enable comments

Inside webPackContentScripts.js there a function called log.setDefaultLevel("trace"),  That set the trace level.  Below are teh valid levels of debug you can have.  

* trace
* debug
* info
* warn
* error



## Auto load

```json
//add this to the manifest to auto load the extension for debugging.
"content_scripts": [
      {
        "matches":["<all_urls>"],
        "js": ["custom-mathjax.min.js","contentScript.js"],
        "run_at": "document_end"
      }
    ],
```

