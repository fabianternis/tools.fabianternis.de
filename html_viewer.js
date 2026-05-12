const html_input = document.getElementById('html_code');
const html_display = document.getElementById('html_container');
let html_raw = '';

function update_html() {
    let html_raw = html_input.value;

    html_display.innerHTML = html_raw;
}

html_input.addEventListener('input', update_html)