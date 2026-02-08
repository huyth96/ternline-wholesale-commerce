import path from "node:path";
import { readdir } from "node:fs/promises";
import sharp from "sharp";

const productDirectory = path.resolve("public/products");
const files = (await readdir(productDirectory)).filter((file) =>
  file.endsWith(".png"),
);

await Promise.all(
  files.map(async (file) => {
    const source = path.join(productDirectory, file);
    const destination = path.join(
      productDirectory,
      file.replace(/\.png$/i, ".webp"),
    );

    await sharp(source)
      .resize(960, 720, { fit: "cover", position: "centre" })
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toFile(destination);
  }),
);

console.log(`Optimized ${files.length} product images to 960×720 WebP.`);
