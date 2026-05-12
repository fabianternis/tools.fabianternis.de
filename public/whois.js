document.addEventListener('DOMContentLoaded', () => {
    const domainInput = document.getElementById('domain_input');
    const lookupBtn = document.getElementById('lookup_btn');
    const clearBtn = document.getElementById('clear_btn');
    const copyBtn = document.getElementById('copy_btn');
    const whoisOutput = document.getElementById('whois_output');
    const statusBadge = document.getElementById('status_badge');

    let currentData = null;

    const setStatus = (text, type) => {
        statusBadge.textContent = text;
        statusBadge.className = 'badge ' + type;
    };

    const lookupDomain = async () => {
        const domain = domainInput.value.trim();
        if (!domain) {
            setStatus('Error: Please enter a domain', 'error');
            return;
        }

        setStatus('Loading...', 'loading');
        whoisOutput.textContent = 'Fetching data...';

        try {
            // Using our local PHP proxy backend
            const response = await fetch(`api/whois.php?domain=${encodeURIComponent(domain)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.status === 'error' || !data.whois) {
                whoisOutput.textContent = `No WHOIS information found for ${domain}.\n\nDetailed response:\n${JSON.stringify(data, null, 2)}`;
                setStatus('Not Found', 'error');
            } else {
                currentData = data;
                whoisOutput.textContent = data.whois;
                setStatus('Success', 'success');
            }
        } catch (error) {
            console.error('Lookup failed:', error);
            whoisOutput.textContent = `Error: ${error.message}\n\nNote: Some domains might not be supported by this public API or CORS might be blocking the request.`;
            setStatus('Error', 'error');
        }
    };

    lookupBtn.addEventListener('click', lookupDomain);

    domainInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            lookupDomain();
        }
    });

    clearBtn.addEventListener('click', () => {
        domainInput.value = '';
        whoisOutput.textContent = 'Results will appear here...';
        setStatus('Ready', '');
        currentData = null;
    });

    copyBtn.addEventListener('click', () => {
        if (!whoisOutput.textContent || whoisOutput.textContent === 'Results will appear here...') {
            return;
        }

        const textToCopy = currentData ? JSON.stringify(currentData, null, 2) : whoisOutput.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
});
