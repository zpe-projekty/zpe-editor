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

export interface ExerciseEditorApi {
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
// [x] Czy init jest Promise? - TAK!
// [ ] Czy setState jest wywoływany zawsze?
// [ ] Czy addEditorTab można wywołać z setState?
// [ ] Co dzieje się z defaultData jeżeli zostanie coś dodane/usunięte


export function create() {
    let _api: ExerciseEditorApi | null = null;
    let _data: State = {};
    let editor: Editor | null = null;

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
                editor = new Editor(container as HTMLElement, api);
            }
        },
        destroyTab(tabId: string, container: Element) {
            if (editor) {
                editor.dispose();
                editor = null;
            }
        },

        setState(stateData: State) {
            if (editor) {
                _data = stateData;
                editor.run(_data);
            } else {
                console.warn("Editor instance is not initialized yet.");
            }
        },
        getState(): State {
            return _data;
        }
    }
}

export default create;
