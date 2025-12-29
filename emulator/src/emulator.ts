import "./styles/emulator.css";

type StateData = Record<string, any>;

type Manifest = Record<string, any>;

interface EngineEditor {
    init(api: ExerciseEditorApi, options: EngineEditorOptions): void
    destroy(): void
    initTab(tab: string, container: HTMLElement, api: ExerciseEditorApi): Promise<void> | any
    destroyTab(tab: string, container: HTMLElement): void
    setState(stateData: StateData): void
    getState(): Object
}

type EngineEditorOptions = Record<string, any>;

interface ExerciseEditorApi {
    addEditorTab(id: string, name: string): ExerciseEditorApi;
    triggerStateSave(): Promise<void>;
    enginePath(path: string): string;
    dataPath(path: string): string;
    loadCss(realPath: string): Promise<void>;
    typesetMath(dom: HTMLElement): Promise<void>;
    embedWidget(container: HTMLElement, manifest: Manifest, widgetOptions: Record<string, any>): Promise<void>;
    createWidgetSlot(container: HTMLElement, slotName: string, slotOptions: Record<string, any>, widgetOptions: Record<string, any>): Promise<void>;
    isWidgetSlotFilled(slotName: string): boolean;
}

declare global {
    interface Window {
        define: (fn: () => any) => void;
    }
}

interface TabData {
    id: string;
    name: string;
    container: HTMLElement;
}

const _tabs = new Map<string, TabData>();
let _firstTabId: string | null = null;

window.define = function define(fn: () => any) {
    const entry = fn().default() as EngineEditor;
    const api: ExerciseEditorApi = {
        enginePath: (path: string) => path,
        addEditorTab: (tabId: string, name: string) => {
            if (!_firstTabId) {
                _firstTabId = tabId;
            }

            const container = document.createElement("div");
            container.id = `tab-${tabId}`;
            container.classList.add("emulator-container");
            document.getElementById("emulator-container")?.appendChild(container);

            const tabButton = document.createElement("button");
            tabButton.innerText = name;
            tabButton.onclick = () => {
                document.querySelectorAll(".emulator-container").forEach((el) => {
                    (el as HTMLElement).style.display = "none";
                });
                container.style.display = "block";
            };
            document.getElementById("emulator-tabs")?.appendChild(tabButton);

            _tabs.set(tabId, { id: tabId, name, container });

            return api;
        }
    } as any;
    const options = {} as any;

    entry.init(api, options);

    fetch('defaultData.json').then(async (response) => {
        const defaultData = await response.json() as StateData;
        entry.setState(defaultData);
    }).then(() => {
        _tabs.forEach((tab) => {
            entry.initTab(tab.id, tab.container, api);
        });

        if (_firstTabId) {
            const firstTab = _tabs.get(_firstTabId);
            if (firstTab) {
                firstTab.container.style.display = "block";
            }
        }
    });
};