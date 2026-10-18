import http.server
import socketserver
import os

PORT = 4173
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

class UTF8Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.txt': 'text/plain; charset=utf-8',
        '.md': 'text/plain; charset=utf-8',
        '.xml': 'application/xml; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
    }

    def end_headers(self):
        # Enable CORS and disable caching during preview
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), UTF8Handler) as httpd:
        print(f"Serving {DIST_DIR} on port {PORT} with UTF-8 charset...")
        httpd.serve_forever()
