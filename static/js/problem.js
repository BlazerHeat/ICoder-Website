const theme = document.getElementById('theme');
const editor = CodeMirror.fromTextArea(document.getElementById('script'), {
    mode: 'text/x-java',
    theme: theme.value,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
        "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
    }
});

theme.addEventListener('change', () => {
    editor.setOption("theme", theme.value);
});