const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Source and destination directories
const srcDir = path.join(__dirname, 'src', 'assets');
const publicDir = path.join(__dirname, 'public', 'assets');

// Create destination directories if they don't exist
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Function to optimize and copy image
async function optimizeAndCopyImage(srcPath, destPath) {
    try {
        const ext = path.extname(srcPath).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            // Optimize image
            await sharp(srcPath)
                .resize(1200, 1200, { // Max dimensions
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
                .toFile(destPath.replace(ext, '.jpg'));
            
            console.log(`Optimized and copied: ${path.basename(srcPath)}`);
        } else {
            // For non-image files, just copy
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${path.basename(srcPath)}`);
        }
    } catch (error) {
        console.error(`Error processing ${srcPath}:`, error);
        // Fallback to direct copy if optimization fails
        fs.copyFileSync(srcPath, destPath);
    }
}

// Function to copy directory recursively
async function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await optimizeAndCopyImage(srcPath, destPath);
        }
    }
}

// Copy assets
async function main() {
    try {
        await copyDir(srcDir, publicDir);
        console.log('Assets copied and optimized successfully!');
    } catch (error) {
        console.error('Error copying assets:', error);
    }
}

main(); 