# tools.fabianternis.de

A PHP-based collection of tools for web development and networking.

## Features
- **HTML Viewer**: Live preview for HTML code.
- **WHOIS Lookup**: Retrieve WHOIS/RDAP information for domains (via PHP backend proxy).

## Project Structure
- `public/`: Web-accessible directory (Document Root).
- `src/`: PHP application logic and classes.
- `bootstrap.php`: Application initialization and autoloader.
- `public/api/`: Backend API endpoints.

## Setup
To run this application locally, you can use the built-in PHP server:
```bash
php -S localhost:8000 -t public
```
Then visit `http://localhost:8000` in your browser.

## Backend Proxy
The WHOIS lookup is performed through a PHP proxy located in `src/WhoisProxy.php`, which fetches data from the NetworkCalc API. This prevents CORS issues and allows for future enhancements like caching or multi-source lookups.
