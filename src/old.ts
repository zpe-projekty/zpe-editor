define([], function () {
    let _data = {
        extraValue: 42,
        message: "Hello, Editor!"
    };

    let _api = null;
    let _input = null;

    return function () {
        return {
            init: function (api, options) {
                _api = api;
                _api.addEditorTab("tab01", "Edycja");
            },
            destroy: function () { },

            initTab(tab, container, api) {
                // Initialize the tab content
                console.log("Initializing tab:", tab);

                if (tab == "tab01") {
                    _input = document.createElement("input");
                    _input.type = "text";
                    _input.value = _data.message;
                    _input.addEventListener("input", () => {
                        _data.message = _input.value;
                    });
                    _input.addEventListener("change", () => {
                        _api.triggerStateSave().then(() => {
                            console.log("State saved from editor tab.");
                        });
                    });
                    container.appendChild(_input);
                }
            },
            destroyTab(tab, container) {
                // Clean up the tab content
                console.log("Destroying tab:", tab);
                if (tab == "tab01" && _input) {
                    container.removeChild(_input);
                    _input = null;
                }
            },

            setState(stateData) {
                console.log("Setting state in editor:", stateData);
                _data = { ..._data, ...stateData };
            },
            getState() {
                console.log("Getting state from editor");
                return _data;
            }
        };
    };
});