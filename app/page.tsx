'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Archive,
  Download,
  Eye,
  EyeOff,
  ImagePlus,
  RotateCcw,
  Shuffle,
  Sparkles,
  Trash2,
} from 'lucide-react';

type RecipeId =
  | 'eternity'
  | 'silence-salt'
  | 'afterimage'
  | 'expired-98'
  | 'motel-polaroid'
  | 'found-drawer'
  | 'three-seventeen'
  | 'memory-failure';
  
type ExtendedRecipeId = RecipeId | 'newspaper' | 'silver-gelatin' | 'red-leak' | 'flare-bloom' | 'scratch-reel' | 'cinestill-night' | 'bleach-bypass' | 'expired-roll';

type Adjustments = {
  intensity: number;
  exposure: number;
  fade: number;
  temperature: number;
  grain: number;
  damage: number;
  glow: number;
  obscurity: number;
  frame: number;
  contrast: number;
  brightness: number;
  blacks: number;
  whites: number;
  saturation: number;
  monochrome: number;
  newspaper: number;
  flare: number;
  leaks: number;
  glare: number;
  scratches: number;
  halation: number;
  bleach: number;
  crossProcess: number;
  fog: number;
  weave: number;
};

type Recipe = {
  id: ExtendedRecipeId;
  index: string;
  name: string;
  use: string;
  base: Adjustments;
  accent: string;
};

type PhotoItem = {
  id: string;
  name: string;
  url: string;
  seed: number;
  recipeId: ExtendedRecipeId;
  adjustments: Adjustments;
};

type ExportSize = 'original' | 'portrait' | 'square' | 'story';
type ExportFormat = 'image/jpeg' | 'image/png';

const defaultAdjustments: Adjustments = {
  intensity: 0.82,
  exposure: 0,
  fade: 0.44,
  temperature: 0,
  grain: 0.35,
  damage: 0.28,
  glow: 0.2,
  obscurity: 0.12,
  frame: 0,
  contrast: 0,
  brightness: 0,
  blacks: 0,
  whites: 0,
  saturation: 0,
  monochrome: 0,
  newspaper: 0,
  flare: 0,
  leaks: 0,
  glare: 0,
  scratches: 0,
  halation: 0,
  bleach: 0,
  crossProcess: 0,
  fog: 0,
  weave: 0,
};

const recipes: Recipe[] = [
  {
    id: 'eternity',
    index: '01',
    name: 'ETERNITY',
    use: 'cool faded film / lonely night images',
    accent: '#95b9c6',
    base: { ...defaultAdjustments, exposure: -0.04, fade: 0.58, temperature: -0.36, grain: 0.28, damage: 0.22, glow: 0.18 },
  },
  {
    id: 'silence-salt',
    index: '02',
    name: 'SILENCE & SALT',
    use: 'pale haze / skin, ocean, empty spaces',
    accent: '#d8d8cc',
    base: { ...defaultAdjustments, exposure: 0.2, fade: 0.72, temperature: -0.16, grain: 0.18, damage: 0.1, glow: 0.38 },
  },
  {
    id: 'afterimage',
    index: '03',
    name: 'AFTERIMAGE',
    use: 'ghosted glow / motion and silhouettes',
    accent: '#b8808c',
    base: { ...defaultAdjustments, exposure: -0.1, fade: 0.42, temperature: -0.08, grain: 0.32, damage: 0.18, glow: 0.46, obscurity: 0.42 },
  },
  {
    id: 'expired-98',
    index: '04',
    name: 'EXPIRED 98',
    use: 'warm consumer film / carousel default',
    accent: '#c9985b',
    base: { ...defaultAdjustments, exposure: 0.06, fade: 0.5, temperature: 0.3, grain: 0.52, damage: 0.4, glow: 0.18 },
  },
  {
    id: 'motel-polaroid',
    index: '05',
    name: 'MOTEL POLAROID',
    use: 'dirty instant flash / portraits and rooms',
    accent: '#e5d3ae',
    base: { ...defaultAdjustments, exposure: 0.12, fade: 0.38, temperature: 0.28, grain: 0.36, damage: 0.34, glow: 0.24, frame: 1 },
  },
  {
    id: 'found-drawer',
    index: '06',
    name: 'FOUND IN A DRAWER',
    use: 'aged print scan / strongest artifact',
    accent: '#b7986c',
    base: { ...defaultAdjustments, exposure: -0.02, fade: 0.68, temperature: 0.42, grain: 0.42, damage: 0.66, glow: 0.14 },
  },
  {
    id: 'three-seventeen',
    index: '07',
    name: '3:17 AM',
    use: 'underexposed flash / nightlife',
    accent: '#6e878d',
    base: { ...defaultAdjustments, exposure: -0.42, fade: 0.24, temperature: -0.34, grain: 0.68, damage: 0.32, glow: 0.32, obscurity: 0.2 },
  },
  {
    id: 'memory-failure',
    index: '08',
    name: 'MEMORY FAILURE',
    use: 'damaged abstraction / accent image',
    accent: '#cc8676',
    base: { ...defaultAdjustments, exposure: 0.04, fade: 0.62, temperature: 0.08, grain: 0.46, damage: 0.72, glow: 0.34, obscurity: 0.62 },
  },
  {
    id: 'newspaper', index: '09', name: 'NEWSPAPER', use: 'hard ink / halftone monochrome / high contrast', accent: '#d6ccb8',
    base: { ...defaultAdjustments, exposure: 0.02, fade: 0.04, temperature: 0, grain: 0.3, damage: 0.08, glow: 0.02, contrast: 0.78, blacks: -0.38, whites: 0.28, saturation: -1, monochrome: 1, newspaper: 1 },
  },
  {
    id: 'silver-gelatin', index: '10', name: 'SILVER GELATIN', use: 'soft black and white / darkroom print', accent: '#b7c2c0',
    base: { ...defaultAdjustments, exposure: 0.04, fade: 0.18, temperature: -0.02, grain: 0.42, damage: 0.12, glow: 0.12, contrast: 0.18, blacks: -0.12, whites: 0.12, saturation: -1, monochrome: 1 },
  },
  {
    id: 'red-leak', index: '11', name: 'RED LEAK', use: 'burnt edges / crimson film spill / expired roll', accent: '#b8604e',
    base: { ...defaultAdjustments, exposure: 0.02, fade: 0.38, temperature: 0.14, grain: 0.48, damage: 0.48, glow: 0.18, leaks: 0.82, flare: 0.16 },
  },
  {
    id: 'flare-bloom', index: '12', name: 'FLARE BLOOM', use: 'sun hit / washed lens / electric glare', accent: '#e0a86c',
    base: { ...defaultAdjustments, exposure: 0.12, fade: 0.52, temperature: 0.24, grain: 0.24, damage: 0.16, glow: 0.62, flare: 0.86, glare: 0.72, whites: 0.18 },
  },
  {
    id: 'scratch-reel', index: '13', name: 'SCRATCH REEL', use: 'rough negative / dust / random emulsion damage', accent: '#d7a37a',
    base: { ...defaultAdjustments, exposure: -0.02, fade: 0.3, temperature: 0.08, grain: 0.56, damage: 0.86, glow: 0.08, scratches: 0.94, leaks: 0.18 },
  },
  {
    id: 'cinestill-night', index: '14', name: 'CINESTILL NIGHT', use: 'tungsten lights / red halation / night color', accent: '#d87858',
    base: { ...defaultAdjustments, exposure: -0.08, fade: 0.18, temperature: -0.28, grain: 0.38, damage: 0.12, glow: 0.26, halation: 0.82, leaks: 0.1 },
  },
  {
    id: 'bleach-bypass', index: '15', name: 'BLEACH BYPASS', use: 'retained silver / hard contrast / muted color', accent: '#a9a39b',
    base: { ...defaultAdjustments, exposure: -0.04, fade: 0.06, temperature: -0.04, grain: 0.52, damage: 0.16, contrast: 0.62, blacks: -0.26, whites: 0.24, bleach: 0.86 },
  },
  {
    id: 'expired-roll', index: '16', name: 'EXPIRED ROLL', use: 'uneven fog / faded dyes / old consumer film', accent: '#b5a06c',
    base: { ...defaultAdjustments, exposure: 0.08, fade: 0.72, temperature: 0.22, grain: 0.5, damage: 0.32, fog: 0.72, leaks: 0.2, weave: 0.24 },
  },
];

const controlLabels: Array<{ key: keyof Adjustments; label: string; min: number; max: number; step: number }> = [
  { key: 'intensity', label: 'Intensity', min: 0, max: 1, step: 0.01 },
  { key: 'exposure', label: 'Exposure', min: -1, max: 1, step: 0.01 },
  { key: 'fade', label: 'Fade', min: 0, max: 1, step: 0.01 },
  { key: 'temperature', label: 'Temperature', min: -1, max: 1, step: 0.01 },
  { key: 'grain', label: 'Grain', min: 0, max: 1, step: 0.01 },
  { key: 'damage', label: 'Damage', min: 0, max: 1, step: 0.01 },
  { key: 'glow', label: 'Blur / Glow', min: 0, max: 1, step: 0.01 },
  { key: 'obscurity', label: 'Obscurity', min: 0, max: 1, step: 0.01 },
  { key: 'frame', label: 'Instant Frame', min: 0, max: 1, step: 0.01 },
  { key: 'contrast', label: 'Contrast', min: -1, max: 1, step: 0.01 },
  { key: 'brightness', label: 'Brightness', min: -1, max: 1, step: 0.01 },
  { key: 'blacks', label: 'Blacks', min: -1, max: 1, step: 0.01 },
  { key: 'whites', label: 'Whites', min: -1, max: 1, step: 0.01 },
  { key: 'saturation', label: 'Saturation', min: -1, max: 1, step: 0.01 },
  { key: 'monochrome', label: 'Monochrome', min: 0, max: 1, step: 0.01 },
  { key: 'newspaper', label: 'Newspaper Ink', min: 0, max: 1, step: 0.01 },
  { key: 'flare', label: 'Lens Flare', min: 0, max: 1, step: 0.01 },
  { key: 'leaks', label: 'Red Leaks', min: 0, max: 1, step: 0.01 },
  { key: 'glare', label: 'Glare / Bloom', min: 0, max: 1, step: 0.01 },
  { key: 'scratches', label: 'Scratches', min: 0, max: 1, step: 0.01 },
  { key: 'halation', label: 'Halation', min: 0, max: 1, step: 0.01 },
  { key: 'bleach', label: 'Bleach Bypass', min: 0, max: 1, step: 0.01 },
  { key: 'crossProcess', label: 'Cross Process', min: 0, max: 1, step: 0.01 },
  { key: 'fog', label: 'Film Fog', min: 0, max: 1, step: 0.01 },
  { key: 'weave', label: 'Gate Weave', min: 0, max: 1, step: 0.01 },
];

function clamp(value: number, min = 0, max = 255) {
  return Math.max(min, Math.min(max, value));
}

function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromName(name: string) {
  let hash = 2166136261;
  for (const char of name) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mergedAdjustments(recipeId: ExtendedRecipeId, previous?: Partial<Adjustments>) {
  const base = recipes.find((recipe) => recipe.id === recipeId)?.base ?? defaultAdjustments;
  return { ...base, ...previous };
}

function getExportDimensions(sourceWidth: number, sourceHeight: number, size: ExportSize) {
  if (size === 'portrait') return { width: 1080, height: 1350 };
  if (size === 'square') return { width: 1080, height: 1080 };
  if (size === 'story') return { width: 1080, height: 1920 };
  const scale = Math.min(1, 2200 / Math.max(sourceWidth, sourceHeight));
  return { width: Math.round(sourceWidth * scale), height: Math.round(sourceHeight * scale) };
}

async function loadImage(url: string) {
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function drawCovered(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  let sx = 0;
  let sy = 0;
  let sw = image.naturalWidth;
  let sh = image.naturalHeight;

  if (sourceRatio > targetRatio) {
    sw = image.naturalHeight * targetRatio;
    sx = (image.naturalWidth - sw) / 2;
  } else {
    sh = image.naturalWidth / targetRatio;
    sy = (image.naturalHeight - sh) / 2;
  }

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
}

function processCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  photo: PhotoItem,
  size: ExportSize,
  originalOnly = false,
) {
  const { width, height } = getExportDimensions(image.naturalWidth, image.naturalHeight, size);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);
  drawCovered(ctx, image, width, height);
  if (originalOnly) return;

  const recipe = recipes.find((entry) => entry.id === photo.recipeId) ?? recipes[0];
  const settings = photo.adjustments;
  const intensity = settings.intensity;
  const rng = createRng(photo.seed + seedFromName(photo.recipeId));

  if (settings.obscurity > 0.05) {
    ctx.save();
    ctx.globalAlpha = settings.obscurity * 0.28 * intensity;
    ctx.globalCompositeOperation = 'screen';
    const offset = Math.round((rng() - 0.5) * settings.obscurity * 42);
    ctx.drawImage(canvas, offset, Math.round(settings.obscurity * -14));
    ctx.restore();
  }

  if (settings.glow > 0.03) {
    ctx.save();
    ctx.globalAlpha = settings.glow * 0.32 * intensity;
    ctx.globalCompositeOperation = 'screen';
    ctx.filter = `blur(${3 + settings.glow * 13}px) saturate(1.12)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
    ctx.filter = 'none';
  }

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const fade = settings.fade * intensity;
  const exposure = settings.exposure * 52 * intensity;
  const temp = settings.temperature * 30 * intensity;
  const contrast = 1 - fade * 0.34 + (photo.recipeId === 'three-seventeen' ? 0.16 : 0) + settings.contrast * 0.9 + settings.bleach * 0.52;
  const saturation = Math.max(0, 1 - fade * 0.45 - settings.damage * 0.1 + settings.saturation - settings.bleach * 0.62);
  const blackLift = 23 * fade + settings.blacks * 38;
  const brightness = settings.brightness * 64;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722;
    r = (r - 128) * contrast + 128 + exposure + temp + blackLift + brightness;
    g = (g - 128) * contrast + 128 + exposure + (settings.temperature < 0 ? Math.abs(temp) * 0.12 : -temp * 0.06) + blackLift + brightness;
    b = (b - 128) * contrast + 128 + exposure - temp * 0.68 + blackLift + (settings.temperature < 0 ? Math.abs(temp) * 0.48 : 0) + brightness;
    r += (r - 128) * settings.whites * 0.36;
    g += (g - 128) * settings.whites * 0.36;
    b += (b - 128) * settings.whites * 0.36;
    r += (255 - r) * settings.fog * 0.18;
    g += (255 - g) * settings.fog * 0.14;
    b += (255 - b) * settings.fog * 0.1;
    if (settings.crossProcess > 0) {
      const cross = settings.crossProcess;
      r += (b - r) * cross * 0.12;
      g += (r - g) * cross * 0.1;
      b += (r - b) * cross * 0.18;
    }
    if (settings.monochrome > 0) {
      const mono = r * 0.2126 + g * 0.7152 + b * 0.0722;
      r = r + (mono - r) * settings.monochrome;
      g = g + (mono - g) * settings.monochrome;
      b = b + (mono - b) * settings.monochrome;
    }
    r = luminance + (r - luminance) * saturation;
    g = luminance + (g - luminance) * saturation;
    b = luminance + (b - luminance) * saturation;
    const noise = (rng() - 0.5) * settings.grain * 72 * intensity;
    const shadowBias = (1 - luminance / 255) * settings.grain * 20;
    data[i] = clamp(r + noise + shadowBias);
    data[i + 1] = clamp(g + noise * 0.86);
    data[i + 2] = clamp(b + noise * 0.72);
  }
  ctx.putImageData(imageData, 0, 0);

  if (settings.halation > 0.03) {
    const highlight = document.createElement('canvas');
    highlight.width = width;
    highlight.height = height;
    const hctx = highlight.getContext('2d');
    if (hctx) {
      const source = ctx.getImageData(0, 0, width, height);
      const mask = hctx.createImageData(width, height);
      for (let i = 0; i < source.data.length; i += 4) {
        const luminance = source.data[i] * 0.2126 + source.data[i + 1] * 0.7152 + source.data[i + 2] * 0.0722;
        const amount = Math.max(0, (luminance - 178) / 77) * settings.halation;
        mask.data[i] = 244;
        mask.data[i + 1] = 54;
        mask.data[i + 2] = 26;
        mask.data[i + 3] = amount * 115;
      }
      hctx.putImageData(mask, 0, 0);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.42;
      ctx.filter = `blur(${2 + settings.halation * 11}px)`;
      ctx.drawImage(highlight, 0, 0);
      ctx.restore();
    }
  }

  if (settings.weave > 0.03) {
    ctx.save();
    ctx.globalCompositeOperation = 'soft-light';
    ctx.globalAlpha = settings.weave * 0.12;
    const bandHeight = Math.max(2, Math.round(height / 90));
    for (let y = Math.round(rng() * bandHeight); y < height; y += bandHeight * (2 + Math.round(rng() * 3))) {
      ctx.fillStyle = rng() > 0.5 ? '#f2dfbc' : '#392b27';
      ctx.fillRect(0, y, width, bandHeight * (0.2 + rng() * 0.8));
    }
    ctx.restore();
  }

  const vignette = ctx.createRadialGradient(width * 0.5, height * 0.46, width * 0.18, width * 0.5, height * 0.5, Math.max(width, height) * 0.72);
  vignette.addColorStop(0, 'rgba(255,255,255,0)');
  vignette.addColorStop(1, `rgba(13,10,8,${0.34 * intensity + settings.damage * 0.18})`);
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  if (settings.damage > 0.02) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < Math.round(settings.damage * 11); i++) {
      const leak = ctx.createRadialGradient(
        (rng() < 0.5 ? 0 : width) + (rng() - 0.5) * width * 0.3,
        rng() * height,
        0,
        rng() * width,
        rng() * height,
        Math.max(width, height) * (0.24 + rng() * 0.22),
      );
      leak.addColorStop(0, `rgba(255,${132 + rng() * 80},${72 + rng() * 70},${settings.damage * 0.18 * intensity})`);
      leak.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = leak;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = settings.damage * 0.7 * intensity;
    ctx.strokeStyle = 'rgba(244,237,215,0.72)';
    ctx.lineWidth = Math.max(1, width / 900);
    for (let i = 0; i < settings.damage * 90 + settings.scratches * 260; i++) {
      const x = rng() * width;
      const y = rng() * height;
      if (rng() > 0.42 || settings.scratches > 0.5) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (rng() - 0.5) * width * 0.04, y + height * settings.scratches * (0.12 + rng() * 0.48));
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(245,239,220,${0.16 + rng() * 0.42})`;
        ctx.fillRect(x, y, 1 + rng() * 2.5, 1 + rng() * 2.5);
      }
    }
    ctx.restore();
  }

  if (settings.scratches > 0.03) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = settings.scratches * 0.68;
    ctx.strokeStyle = 'rgba(250,243,224,0.72)';
    for (let i = 0; i < 10 + settings.scratches * 34; i++) {
      const x = rng() * width;
      const y = rng() * height;
      const direction = rng();
      const length = height * (0.12 + rng() * 0.72);
      ctx.lineWidth = Math.max(1, width / (700 + rng() * 900));
      ctx.beginPath();
      ctx.moveTo(x, y);
      if (direction < 0.25) {
        ctx.lineTo(x + (rng() - 0.5) * width * 0.42, y + (rng() - 0.5) * height * 0.08);
      } else {
        ctx.bezierCurveTo(x + (rng() - 0.5) * width * 0.06, y + length * 0.28, x + (rng() - 0.5) * width * 0.05, y + length * 0.7, x + (rng() - 0.5) * width * 0.08, y + length);
      }
      ctx.stroke();
    }
    for (let i = 0; i < settings.scratches * 240; i++) {
      const size = 1 + rng() * Math.max(2, width / 260);
      ctx.fillStyle = `rgba(250,243,224,${0.08 + rng() * 0.5})`;
      ctx.fillRect(rng() * width, rng() * height, size, size * (0.4 + rng() * 2.8));
    }
    ctx.restore();
  }

  if (settings.frame > 0.03) {
    const border = Math.round(Math.min(width, height) * 0.055 * settings.frame);
    const bottom = Math.round(border * 2.7);
    ctx.save();
    ctx.fillStyle = `rgba(239,231,207,${0.92 * settings.frame})`;
    ctx.fillRect(0, 0, width, border);
    ctx.fillRect(0, 0, border, height);
    ctx.fillRect(width - border, 0, border, height);
    ctx.fillRect(0, height - bottom, width, bottom);
    ctx.globalAlpha = settings.damage * 0.28;
    ctx.fillStyle = '#8c765c';
    for (let i = 0; i < 32; i++) ctx.fillRect(rng() * width, rng() * height, rng() * 3, rng() * 3);
    ctx.restore();
  }

  ctx.save();
  ctx.globalCompositeOperation = 'soft-light';
  ctx.globalAlpha = 0.24 * intensity;
  ctx.fillStyle = recipe.accent;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  if (settings.newspaper > 0.03) {
    const printData = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < printData.data.length; i += 4) {
      const luminance = printData.data[i] * 0.2126 + printData.data[i + 1] * 0.7152 + printData.data[i + 2] * 0.0722;
      const ink = clamp((luminance - 128) * (1.9 + settings.newspaper * 0.8) + 128);
      const paper = 244 - settings.newspaper * 12;
      const value = ink < 112 ? ink * 0.54 : paper - (255 - ink) * 0.88;
      printData.data[i] = clamp(value + 6);
      printData.data[i + 1] = clamp(value + 4);
      printData.data[i + 2] = clamp(value - 2);
    }
    ctx.putImageData(printData, 0, 0);
    ctx.save();
    ctx.globalAlpha = settings.newspaper * 0.12;
    ctx.fillStyle = '#aa9673';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  if (settings.leaks > 0.03) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < Math.round(4 + settings.leaks * 14); i++) {
      const side = rng() < 0.5 ? 0 : width;
      const y = rng() * height;
      const spread = width * (0.18 + rng() * 0.62);
      const direction = side === 0 ? 1 : -1;
      const leak = ctx.createLinearGradient(side, y, side + direction * spread, y + (rng() - 0.5) * height * 0.24);
      leak.addColorStop(0, `rgba(${150 + rng() * 105},${22 + rng() * 42},${18 + rng() * 38},${settings.leaks * 0.42 * intensity})`);
      leak.addColorStop(0.22, `rgba(255,${45 + rng() * 70},${22 + rng() * 48},${settings.leaks * 0.22 * intensity})`);
      leak.addColorStop(1, 'rgba(255,80,30,0)');
      ctx.fillStyle = leak;
      ctx.save();
      ctx.translate(0, y);
      ctx.rotate((rng() - 0.5) * 0.22);
      ctx.fillRect(side === 0 ? 0 : width * 0.18, -height * (0.06 + rng() * 0.16), width * 0.82, height * (0.08 + rng() * 0.24));
      ctx.restore();
    }
    for (let i = 0; i < Math.round(settings.leaks * 12); i++) {
      const x = rng() < 0.5 ? rng() * width * 0.22 : width * (0.78 + rng() * 0.22);
      const y = rng() * height;
      const radius = Math.max(width, height) * (0.03 + rng() * 0.14);
      const stain = ctx.createRadialGradient(x, y, 0, x, y, radius);
      stain.addColorStop(0, `rgba(210,${25 + rng() * 45},${18 + rng() * 28},${settings.leaks * 0.28 * intensity})`);
      stain.addColorStop(0.5, `rgba(160,20,18,${settings.leaks * 0.12 * intensity})`);
      stain.addColorStop(1, 'rgba(120,20,20,0)');
      ctx.fillStyle = stain;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    ctx.restore();
  }

  if (settings.flare > 0.03 || settings.glare > 0.03) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const x = rng() < 0.5 ? width * (0.05 + rng() * 0.18) : width * (0.78 + rng() * 0.17);
    const y = height * (0.1 + rng() * 0.35);
    const radius = Math.max(width, height) * (0.14 + settings.flare * 0.2 + settings.glare * 0.14);
    const bloom = ctx.createRadialGradient(x, y, 0, x, y, radius);
    bloom.addColorStop(0, `rgba(255,238,193,${0.28 * settings.glare})`);
    bloom.addColorStop(0.28, `rgba(255,159,92,${0.15 * settings.flare})`);
    bloom.addColorStop(1, 'rgba(255,90,30,0)');
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = settings.flare * 0.22;
    ctx.strokeStyle = '#ffc48e';
    ctx.lineWidth = Math.max(1, width / 500);
    ctx.beginPath();
    ctx.moveTo(x - radius * 1.2, y + radius * 0.58);
    ctx.lineTo(x + radius * 1.4, y - radius * 0.46);
    ctx.stroke();
    ctx.restore();
  }
}

async function renderPhoto(photo: PhotoItem, size: ExportSize, format: ExportFormat, quality: number) {
  const image = await loadImage(photo.url);
  const canvas = document.createElement('canvas');
  processCanvas(canvas, image, photo, size);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob((value) => resolve(value as Blob), format, quality));
  return new Uint8Array(await blob.arrayBuffer());
}

function crc32(bytes: Uint8Array) {
  let crc = -1;
  for (const byte of bytes) {
    crc ^= byte;
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ -1) >>> 0;
}

function makeZip(files: Array<{ name: string; bytes: Uint8Array }>) {
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  const write16 = (view: DataView, at: number, value: number) => view.setUint16(at, value, true);
  const write32 = (view: DataView, at: number, value: number) => view.setUint32(at, value, true);

  for (const file of files) {
    const name = encoder.encode(file.name);
    const crc = crc32(file.bytes);
    const local = new Uint8Array(30 + name.length);
    const localView = new DataView(local.buffer);
    write32(localView, 0, 0x04034b50);
    write16(localView, 4, 20);
    write16(localView, 8, 0);
    write32(localView, 14, crc);
    write32(localView, 18, file.bytes.length);
    write32(localView, 22, file.bytes.length);
    write16(localView, 26, name.length);
    local.set(name, 30);
    parts.push(local, file.bytes);

    const entry = new Uint8Array(46 + name.length);
    const entryView = new DataView(entry.buffer);
    write32(entryView, 0, 0x02014b50);
    write16(entryView, 4, 20);
    write16(entryView, 6, 20);
    write32(entryView, 16, crc);
    write32(entryView, 20, file.bytes.length);
    write32(entryView, 24, file.bytes.length);
    write16(entryView, 28, name.length);
    write32(entryView, 42, offset);
    entry.set(name, 46);
    central.push(entry);
    offset += local.length + file.bytes.length;
  }

  const centralSize = central.reduce((sum, entry) => sum + entry.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  write32(endView, 0, 0x06054b50);
  write16(endView, 8, files.length);
  write16(endView, 10, files.length);
  write32(endView, 12, centralSize);
  write32(endView, 16, offset);
  return new Blob([...parts, ...central, end], { type: 'application/zip' });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeRecipeId, setActiveRecipeId] = useState<ExtendedRecipeId>('expired-98');
  const [showOriginal, setShowOriginal] = useState(false);
  const [exportSize, setExportSize] = useState<ExportSize>('portrait');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('image/jpeg');
  const [isExporting, setIsExporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selected = photos.find((photo) => photo.id === selectedId) ?? photos[0] ?? null;
  const activeRecipe = recipes.find((recipe) => recipe.id === activeRecipeId) ?? recipes[0];

  const addFiles = (files: FileList | File[]) => {
    const incoming = Array.from(files).filter((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return file.type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(extension ?? '');
    });
    if (incoming.length === 0) return;
    const next = incoming.slice(0, 20 - photos.length).map((file, index) => {
      const recipeId = activeRecipeId;
      return {
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID?.() ?? `${Date.now()}-${index}`}`,
        name: file.name,
        url: URL.createObjectURL(file),
        seed: seedFromName(`${file.name}-${file.lastModified}-${index}`),
        recipeId,
        adjustments: mergedAdjustments(recipeId),
      };
    });
    setPhotos((current) => [...current, ...next]);
    setSelectedId((current) => current ?? next[0]?.id ?? null);
  };

  const updateSelected = (patch: Partial<PhotoItem>) => {
    if (!selected) return;
    setPhotos((current) => current.map((photo) => (photo.id === selected.id ? { ...photo, ...patch } : photo)));
  };

  const chooseRecipe = (recipeId: ExtendedRecipeId) => {
    setActiveRecipeId(recipeId);
    if (selected) updateSelected({ recipeId, adjustments: mergedAdjustments(recipeId, { intensity: selected.adjustments.intensity }) });
  };

  const applyToAll = () => {
    setPhotos((current) =>
      current.map((photo) => ({ ...photo, recipeId: activeRecipeId, adjustments: mergedAdjustments(activeRecipeId, { intensity: photo.adjustments.intensity }) })),
    );
  };

  const removePhoto = (id: string) => {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.url);
      const next = current.filter((photo) => photo.id !== id);
      if (selectedId === id) setSelectedId(next[0]?.id ?? null);
      return next;
    });
  };

  const reseed = (all = false) => {
    setPhotos((current) =>
      current.map((photo) => (all || photo.id === selected?.id ? { ...photo, seed: seedFromName(`${photo.name}-${Date.now()}-${Math.random()}`) } : photo)),
    );
  };

  const resetSelected = () => {
    if (!selected) return;
    updateSelected({ adjustments: mergedAdjustments(selected.recipeId), seed: seedFromName(`${selected.name}-${Date.now()}`) });
  };

  useEffect(() => {
    if (!selected || !canvasRef.current) return;
    let cancelled = false;
    loadImage(selected.url).then((image) => {
      if (cancelled || !canvasRef.current) return;
      processCanvas(canvasRef.current, image, selected, exportSize === 'original' ? 'original' : exportSize, showOriginal);
    });
    return () => {
      cancelled = true;
    };
  }, [selected, exportSize, showOriginal]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (photos.length === 0) return;
      const index = photos.findIndex((photo) => photo.id === selected?.id);
      if (event.key === 'ArrowRight') setSelectedId(photos[(index + 1) % photos.length].id);
      if (event.key === 'ArrowLeft') setSelectedId(photos[(index - 1 + photos.length) % photos.length].id);
      if (event.key.toLowerCase() === 'r') reseed(false);
      const digit = Number(event.key);
      if (digit >= 1 && digit <= recipes.length) chooseRecipe(recipes[digit - 1].id);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const exportCurrent = async () => {
    if (!selected) return;
    setIsExporting(true);
    try {
      const bytes = await renderPhoto(selected, exportSize, exportFormat, 0.92);
      const extension = exportFormat === 'image/png' ? 'png' : 'jpg';
      downloadBlob(new Blob([bytes], { type: exportFormat }), `kolosus_${selected.name.replace(/\.[^.]+$/, '')}.${extension}`);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAll = async () => {
    if (photos.length === 0) return;
    setIsExporting(true);
    try {
      const extension = exportFormat === 'image/png' ? 'png' : 'jpg';
      const today = new Date().toISOString().slice(0, 10);
      const files = [];
      for (let index = 0; index < photos.length; index++) {
        files.push({
          name: `kolosus_${today}_${String(index + 1).padStart(2, '0')}.${extension}`,
          bytes: await renderPhoto(photos[index], exportSize, exportFormat, 0.92),
        });
      }
      downloadBlob(makeZip(files), `KOLOSUS_CAROUSEL_${today}.zip`);
    } finally {
      setIsExporting(false);
    }
  };

  const recipeControls = useMemo(() => selected?.adjustments ?? activeRecipe.base, [selected, activeRecipe]);

  return (
    <main className="lab-shell">
      <input ref={inputRef} hidden type="file" accept="image/*,.jpg,.jpeg,.png,.webp,.avif" multiple onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.currentTarget.value = ''; }} />

      <section className="lab-sidebar left-rail" aria-label="Photo batch">
        <div className="brand-block">
          <span>KOLØSUS</span>
          <strong>PHOTO LAB</strong>
          <small>MEMORY PROCESSOR</small>
        </div>

        <button
          className={`drop-zone ${isDragging ? 'is-dragging' : ''}`}
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
          onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; }}
          onDragLeave={(event) => { if (event.currentTarget === event.target) setIsDragging(false); }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            addFiles(event.dataTransfer.files);
          }}
        >
          <ImagePlus />
          <span>Drop photos or choose files</span>
          <small>JPEG / PNG / WebP, up to 20</small>
        </button>

        <div className="thumb-list">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              className={`thumb ${selected?.id === photo.id ? 'is-selected' : ''}`}
              type="button"
              onClick={() => setSelectedId(photo.id)}
            >
              <img src={photo.url} alt="" />
              <span>{String(index + 1).padStart(2, '0')}</span>
              <small>{recipes.find((recipe) => recipe.id === photo.recipeId)?.name}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="preview-stage" aria-label="Image preview">
        <div className="top-bar">
          <div>
            <span className="status-dot" />
            <strong>{selected ? selected.name : 'No photograph loaded'}</strong>
          </div>
          <div className="top-actions">
            <button type="button" onMouseDown={() => setShowOriginal(true)} onMouseUp={() => setShowOriginal(false)} onMouseLeave={() => setShowOriginal(false)}>
              {showOriginal ? <EyeOff /> : <Eye />}
              Before
            </button>
            <button type="button" onClick={() => reseed(false)} disabled={!selected}>
              <Shuffle />
              Reseed
            </button>
            <button type="button" onClick={resetSelected} disabled={!selected}>
              <RotateCcw />
              Reset
            </button>
          </div>
        </div>

        <div className="canvas-wrap">
          {selected ? (
            <canvas ref={canvasRef} aria-label="Processed photo preview" />
          ) : (
            <div className="empty-state">
              <Sparkles />
              <h1>KOLØSUS PHOTO LAB</h1>
              <p>Load a carousel, choose a recipe, tune the damage, and export aged photographic artifacts locally.</p>
            </div>
          )}
        </div>

        <div className="export-bar">
          <label>
            Size
            <select value={exportSize} onChange={(event) => setExportSize(event.target.value as ExportSize)}>
              <option value="portrait">Instagram 4:5</option>
              <option value="square">Square 1:1</option>
              <option value="story">Story 9:16</option>
              <option value="original">Original max</option>
            </select>
          </label>
          <label>
            Format
            <select value={exportFormat} onChange={(event) => setExportFormat(event.target.value as ExportFormat)}>
              <option value="image/jpeg">JPEG 92%</option>
              <option value="image/png">PNG</option>
            </select>
          </label>
          <button type="button" onClick={exportCurrent} disabled={!selected || isExporting}>
            <Download />
            Export Image
          </button>
          <button type="button" onClick={exportAll} disabled={photos.length === 0 || isExporting}>
            <Archive />
            Export ZIP
          </button>
        </div>
      </section>

      <section className="lab-sidebar right-rail" aria-label="Recipes and controls">
        <div className="panel-head">
          <span>Recipe</span>
          <button type="button" onClick={applyToAll} disabled={photos.length === 0}>Apply to all</button>
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              className={`recipe-card ${activeRecipeId === recipe.id ? 'is-active' : ''}`}
              style={{ '--accent': recipe.accent } as React.CSSProperties}
              type="button"
              onClick={() => chooseRecipe(recipe.id)}
            >
              <span>{recipe.index}</span>
              <strong>{recipe.name}</strong>
              <small>{recipe.use}</small>
            </button>
          ))}
        </div>

        <div className="controls-stack">
          <div className="panel-head">
            <span>Manual</span>
            <button type="button" onClick={() => reseed(true)} disabled={photos.length === 0}>Reseed all</button>
          </div>
          {controlLabels.map((control) => (
            <label className="control-row" key={control.key}>
              <span>
                {control.label}
                <b>{recipeControls[control.key].toFixed(2)}</b>
              </span>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={recipeControls[control.key]}
                disabled={!selected}
                onChange={(event) => {
                  if (!selected) return;
                  updateSelected({ adjustments: { ...selected.adjustments, [control.key]: Number(event.target.value) } });
                }}
              />
            </label>
          ))}
        </div>

        {selected && (
          <button className="remove-button" type="button" onClick={() => removePhoto(selected.id)}>
            <Trash2 />
            Remove selected
          </button>
        )}
      </section>
    </main>
  );
}
