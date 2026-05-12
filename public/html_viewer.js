const html_input = document.getElementById('html_code');
const html_display = document.getElementById('html_container');

// Buttons
const clearBtn = document.getElementById('clear_btn');
const copyBtn = document.getElementById('copy_btn');
const downloadBtn = document.getElementById('download_btn');
const sampleBtn = document.getElementById('sample_btn');
const fullscreenBtn = document.getElementById('fullscreen_btn');

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; min-height: 100vh; }
        .card {
            font-family: sans-serif;
            border: 2px solid #0d6efd;
            border-radius: 12px;
            padding: 20px;
            max-width: 300px;
            text-align: center;
            margin: 50px auto;
            background: white;
        }
        h2 { color: #0d6efd; }
        p { color: #666; }
        button {
            background: #0d6efd;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Hello World!</h2>
        <p>This is a live HTML preview with iframe isolation.</p>
        <button onclick="alert('Hello from the viewer!')">Click Me</button>
    </div>
</body>
</html>`;

function update_html() {
    const html_raw = html_input.value;
    
    // Create an iframe to safely render HTML
    html_display.innerHTML = '';
    const iframe = document.createElement('iframe');
    html_display.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html_raw);
    doc.close();
}

function clear_editor() {
    html_input.value = '';
    update_html();
}

function copy_to_clipboard() {
    html_input.select();
    document.execCommand('copy');
    
    const originalText = copyBtn.innerText;
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
        copyBtn.innerText = originalText;
    }, 2000);
}

function download_html() {
    const blob = new Blob([html_input.value], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function load_sample() {
    html_input.value = SAMPLE_HTML;
    update_html();
}

function toggle_fullscreen() {
    document.body.classList.toggle('fullscreen');
    const isFullscreen = document.body.classList.contains('fullscreen');
    fullscreenBtn.innerText = isFullscreen ? '❐' : '⛶';
}

// Event Listeners
html_input.addEventListener('input', update_html);
clearBtn.addEventListener('click', clear_editor);
copyBtn.addEventListener('click', copy_to_clipboard);
downloadBtn.addEventListener('click', download_html);
sampleBtn.addEventListener('click', load_sample);
fullscreenBtn.addEventListener('click', toggle_fullscreen);


// Initial focus
window.addEventListener('load', () => {
    html_input.focus();
});
