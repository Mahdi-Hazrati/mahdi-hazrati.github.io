import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "assets", "bad-apple");

const FILES = [
  {
    name: "framesData.lz",
    urls: [
      "https://raw.githubusercontent.com/EmirXK/bad_apple/master/framesData.lz",
      "https://cdn.jsdelivr.net/gh/EmirXK/bad_apple@master/framesData.lz",
      "https://ghproxy.net/https://raw.githubusercontent.com/EmirXK/bad_apple/master/framesData.lz",
    ],
  },
  {
    name: "bad_apple.mp3",
    urls: [
      "https://raw.githubusercontent.com/EmirXK/bad_apple/master/bad_apple.mp3",
      "https://cdn.jsdelivr.net/gh/EmirXK/bad_apple@master/bad_apple.mp3",
      "https://ghproxy.net/https://raw.githubusercontent.com/EmirXK/bad_apple/master/bad_apple.mp3",
    ],
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        const next = res.headers.location;
        if (!next) {
          reject(new Error(`Redirect without location: ${url}`));
          return;
        }
        return download(next, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    });
    request.on("error", (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function downloadWithFallback(name, urls) {
  const dest = path.join(OUT_DIR, name);
  let lastError;

  for (const url of urls) {
    process.stdout.write(`  trying ${url}\n`);
    try {
      await download(url, dest);
      const size = fs.statSync(dest).size;
      if (size < 1000) {
        fs.unlinkSync(dest);
        throw new Error("File too small — likely a bad response");
      }
      process.stdout.write(`  ✓ ${name} (${(size / 1024 / 1024).toFixed(2)} MB)\n`);
      return;
    } catch (err) {
      lastError = err;
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }
  }

  throw lastError ?? new Error(`All mirrors failed for ${name}`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const { name, urls } of FILES) {
    process.stdout.write(`Downloading ${name}...\n`);
    await downloadWithFallback(name, urls);
  }

  process.stdout.write(`\nBad Apple assets saved to public/assets/bad-apple/\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
