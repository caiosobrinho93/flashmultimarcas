const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\Caio\\Documents\\vscode-sites\\flashmultimarcas\\src\\app\\globals.css';

try {
    // Read the file as a buffer to detect null bytes or UTF-16 markers
    const buffer = fs.readFileSync(filePath);
    
    // Check if it's UTF-16 (contains null bytes or specific BOM)
    // If it's corrupted with spaces between chars, it's likely UTF-16 being read as ASCII/UTF-8
    let content = '';
    
    // Try to detect if it's UTF-16 LE
    if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
        content = buffer.toString('utf16le');
    } else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
        content = buffer.toString('utf16be');
    } else {
        // Check for null bytes which indicate UTF-16 without BOM or corrupted text
        let hasNulls = false;
        for (let i = 0; i < buffer.length; i++) {
            if (buffer[i] === 0) {
                hasNulls = true;
                break;
            }
        }
        
        if (hasNulls) {
            // It's likely UTF-16 LE without BOM
            content = buffer.toString('utf16le');
        } else {
            content = buffer.toString('utf8');
        }
    }

    // Remove any potential garbage or double encoding issues
    // If every second character is a space/null, we need to clean it
    // But toString('utf16le') should handle that.

    // Force write as pure UTF-8
    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
    console.log('File successfully converted to UTF-8');
} catch (err) {
    console.error('Error fixing file encoding:', err);
    process.exit(1);
}
