const MAX_SOURCE_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_SIDE = 1200;
const OUTPUT_QUALITY = 0.76;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Nao foi possivel ler a imagem."));
    });

    reader.addEventListener("error", () => {
      reject(new Error("Nao foi possivel ler a imagem."));
    });

    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => {
      reject(new Error("A imagem selecionada nao pode ser processada."));
    });

    image.src = src;
  });
}

export async function createLocalProductImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem valido.");
  }

  if (file.size > MAX_SOURCE_IMAGE_BYTES) {
    throw new Error("Use uma imagem com ate 10 MB.");
  }

  const source = await readFileAsDataUrl(file);
  const image = await loadImage(source);
  const scale = Math.min(
    1,
    MAX_IMAGE_SIDE / Math.max(image.naturalWidth, image.naturalHeight),
  );
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("O navegador nao conseguiu preparar a imagem.");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/webp", OUTPUT_QUALITY);
}

export function isLocalProductImage(src: string) {
  return src.startsWith("data:");
}
