"use strict";
var scripts = document.getElementsByTagName("script"),
    scriptUrl = scripts[scripts.length - 1].src,
    root = scriptUrl.split("master-loader.js")[0],
    loaders = {
        unity: "unity.js", "unity-2020": "unity-2020.js"
    };
if (0 <= window.location.href.indexOf("pokiForceLocalLoader") 
	&& (loaders.unity = "unity.js", 
		
		root = "/loaders"), !window.config) throw Error("window.config not found");
var loader = loaders[window.config.loader];
if (!loader) throw Error('Loader "' + window.config.loader + '" not found');
if (!window.config.unityWebglLoaderUrl) {
    var versionSplit = window.config.unityVersion ? window.config.unityVersion.split(".") : [],
        year = versionSplit[0],
        minor = versionSplit[1];
          window.config.unityWebglLoaderUrl ="./UnityLoader.2019.2.js";
    // switch (year) {
    //     case "2019":
    //         window.config.unityWebglLoaderUrl = 1 === minor ? "./UnityLoader.2019.1.js" : "./UnityLoader.2019.2.js";
    //         break;
    //     default:
    //         window.config.unityWebglLoaderUrl = "UnityLoader.js"
    // }
}
var sdkScript = document.createElement("script");

// Check if we have extracted assets and poki-sdk.js is available
if (window.extractedAssets && window.extractedAssets['poki-sdk.js']) {
    console.log('Loading poki-sdk.js from extracted assets');
    sdkScript.textContent = window.extractedAssets['poki-sdk.js'];
    
    // For inline scripts, onload doesn't fire automatically, so we need to trigger it manually
    document.body.appendChild(sdkScript);
    
    // Manually trigger the onload functionality
    setTimeout(function() {
        var i = document.createElement("script");
        
        // Also check for unity.js in extracted assets
        if (window.extractedAssets && window.extractedAssets[loader]) {
            console.log('Loading', loader, 'from extracted assets');
            i.textContent = window.extractedAssets[loader];
            document.body.appendChild(i);
            
            // Ensure Unity loader is also loaded
            setTimeout(function() {
                if (window.config && window.config.unityWebglLoaderUrl) {
                    var unityLoaderFile = window.config.unityWebglLoaderUrl.replace('./', '');
                    if (window.extractedAssets && window.extractedAssets[unityLoaderFile]) {
                        console.log('Loading Unity loader from extracted assets:', unityLoaderFile);
                        var unityScript = document.createElement("script");
                        unityScript.textContent = window.extractedAssets[unityLoaderFile];
                        document.body.appendChild(unityScript);
                    }
                }
            }, 50);
        } else {
            console.log('Loading', loader, 'from URL:', root + loader);
            i.src = root + loader;
            document.body.appendChild(i);
        }
    }, 10); // Small delay to ensure poki-sdk.js executes first
    
} else {
    console.log('Loading poki-sdk.js from URL (fallback)');
    sdkScript.src = "https://cdn.jsdelivr.net/gh/pixelnebulatesting/ZIPs@1MTD/PaperyPlane/poki-sdk.js";
    sdkScript.onload = function() {
        var i = document.createElement("script");
        
        // Also check for unity.js in extracted assets
        if (window.extractedAssets && window.extractedAssets[loader]) {
            console.log('Loading', loader, 'from extracted assets');
            i.textContent = window.extractedAssets[loader];
            document.body.appendChild(i);
            
            // Ensure Unity loader is also loaded
            setTimeout(function() {
                if (window.config && window.config.unityWebglLoaderUrl) {
                    var unityLoaderFile = window.config.unityWebglLoaderUrl.replace('./', '');
                    if (window.extractedAssets && window.extractedAssets[unityLoaderFile]) {
                        console.log('Loading Unity loader from extracted assets:', unityLoaderFile);
                        var unityScript = document.createElement("script");
                        unityScript.textContent = window.extractedAssets[unityLoaderFile];
                        document.body.appendChild(unityScript);
                    }
                }
            }, 50);
        } else {
            console.log('Loading', loader, 'from URL:', root + loader);
            i.src = root + loader;
            document.body.appendChild(i);
        }
    };
    document.body.appendChild(sdkScript);
}
