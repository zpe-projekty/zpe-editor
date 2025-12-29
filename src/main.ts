import { Editor } from "./editor";
import "~/styles/styles.css";

type State = Record<string, any>;

interface EngineOptions {
    [key: string]: any;
}

interface EngineEditor {
    init(api: ExerciseEditorApi, options: EngineOptions): void
    destroy(): void
    initTab(tabId: string, container: Element, api: ExerciseEditorApi): Promise<void> | any
    destroyTab(tabId: string, container: Element): void
    setState(stateData: State): void
    getState(): State
}

interface ExerciseEditorApi {
    addEditorTab(tabId: string, name: string): ExerciseEditorApi;
    triggerStateSave(): Promise<void>;
    enginePath(path: string): string;
    dataPath(path: string): string;
    loadCss(realPath: string): Promise<void>;
    typesetMath(dom: Element): Promise<void>;
    // embedWidget(container: Element, manifest, widgetOptions): Promise<void>;
    // createWidgetSlot(container: Element, slotName, slotOptions, widgetOptions): Promise<void>;
    // isWidgetSlotFilled(slotName): boolean;
}

//TODO:
// [ ] Czy init jest Promise?
// [ ] Czy setState jest wywoływany zawsze?
// [ ] Czy addEditorTab można wywołać z setState?
// [ ] Co dzieje się z defaultData jeżeli zostanie coś dodane/usunięte

var editor: Editor | null = null;

export function create() {
    let _api = null;
    let _data: State = {};

    return {
        init(api: ExerciseEditorApi, options: EngineOptions) {
            _api = api;
            _api.addEditorTab("tab_data", "Edycja");
        },
        destroy() {
            // Cleanup code here
        },

        initTab(tabId: string, container: Element, api: ExerciseEditorApi) {
            if (tabId === "tab_data") {
                console.log("Initializing tab:", tabId);
                container.classList.add("oseditor-nmzzpp1hty");
                editor = new Editor(container as HTMLElement, _data);
                editor.run();
            }
        },
        destroyTab(tabId: string, container: Element) {
            if (editor) {
                editor.dispose();
                editor = null;
            }
        },

        setState(stateData: State) {
            _data = stateData;
        },
        getState(): State {
            return _data;
        }
    }
}

export default create;

// let _data = {
//     extraValue: 42,
//     message: "Hello, Editor!"
// };

// let _api = null;
// let _input = null;

// return function () {
//     return {
//         init: function (api, options) {
//             _api = api;
//             _api.addEditorTab("tab01", "Edycja");
//         },
//         destroy: function () {},

//         initTab(tab, container, api) {
//             // Initialize the tab content
//             console.log("Initializing tab:", tab);

//             if (tab == "tab01") {
//                 _input = document.createElement("input");
//                 _input.type = "text";
//                 _input.value = _data.message;
//                 _input.addEventListener("input", () => {
//                     _data.message = _input.value;
//                 });
//                 _input.addEventListener("change", () => {
//                     _api.triggerStateSave().then(() => {
//                         console.log("State saved from editor tab.");
//                     });
//                 });
//                 container.appendChild(_input);
//             }
//         },
//         destroyTab(tab, container) {
//             // Clean up the tab content
//             console.log("Destroying tab:", tab);
//             if (tab == "tab01" && _input) {
//                 container.removeChild(_input);
//                 _input = null;
//             }
//         },

//         setState(stateData) {
//             console.log("Setting state in editor:", stateData);
//             _data = { ..._data, ...stateData };
//         },
//         getState() {
//             console.log("Getting state from editor");
//             return _data;
//         }
//     };
// };
