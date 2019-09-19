export default class CodeMirrorEditor {
    static get THEME_DRACULA()          {return 'dracula';}
    static get THEME_MATERIAL()         {return 'material';}
    static get THEME_DUOTONE_LIGHT()    {return 'duotone-light';}
    static get THEME_DUOTONE_DARK()     {return 'duotone-dark';}
    static get THEME_ECLIPSE()          {return 'eclipse';}
    static get THEME_ELEGANT()          {return 'elegant';}

    static get MODE_JAVASCRIPT()    {return 'javascript';}
    static get MODE_PHP()           {return 'php';}

    constructor (selector, theme, mode) {
        this.selector = selector;
        this.theme = theme;
        this.mode = mode;

        this.codeMirror = CodeMirror(this.selector, {
            value: "",
            theme: this.theme,
            mode:  this.mode,
            autoFocus: true,
            lineNumbers: true,
            autoRefresh: true,
            styleActiveLine: true,
            styleSelectedText: true,
            showCursorWhenSelecting: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            extraKeys: {
                "Ctrl-Space": "autocomplete",
            },
        });
    }

    getCodeMirror () {
        return this.codeMirror;
    }

    setTheme (theme) {
        this.codeMirror.setOption('theme', theme);
        this.setFocus();
    }

    setFocus () {
        this.codeMirror.focus();
    }
}
