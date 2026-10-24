import { Artisan, DesignConstraintCheck, DesignProposal, DesignProposalStatus } from './types';
import { ARTISANS } from '../data/artisans';

export interface PromptParseResult {
  detectedCraftKeyword?: string;
  detectedProductType: string;
  requestedMaterials: string[];
  requestedColors: string[];
  intendedOccasion: string;
  budgetEstimated?: number;
  complexity: 'Simple' | 'Moderate' | 'Intricate' | 'Masterpiece';
}

export function parsePrompt(prompt: string): PromptParseResult {
  const lower = prompt.toLowerCase();

  // Detect colors
  const colorMap: Record<string, string> = {
    indigo: 'Deep Indigo',
    blue: 'Cobalt Blue',
    cobalt: 'Cobalt Blue',
    turquoise: 'Persian Turquoise',
    red: 'Royal Crimson',
    crimson: 'Royal Crimson',
    vermilion: 'Royal Crimson',
    gold: 'Antique Gold',
    brass: 'Antique Gold',
    yellow: 'Mustard Yellow',
    ochre: 'Antique Ochre',
    green: 'Forest Green',
    emerald: 'Forest Green',
    black: 'Charcoal Black',
    ivory: 'Ivory Pearl',
    white: 'Ivory White',
    rust: 'Terracotta Rust',
    terracotta: 'Terracotta Rust',
    electric: 'Electric Blue (Synthetic)',
    neon: 'Neon Pigment (Synthetic)',
  };

  const requestedColors: string[] = [];
  for (const [key, val] of Object.entries(colorMap)) {
    if (lower.includes(key) && !requestedColors.includes(val)) {
      requestedColors.push(val);
    }
  }
  if (requestedColors.length === 0) {
    requestedColors.push('Deep Indigo', 'Antique Gold');
  }

  // Detect materials
  const materialKeywords: Record<string, string> = {
    lac: 'Natural Lac Resin',
    brass: 'Pure Brass Micro-beads',
    gold: 'Gold Leaf Foiling',
    silver: 'Sterling Silver',
    clay: 'River Alluvial Clay',
    terracotta: 'River Alluvial Clay',
    quartz: 'Quartz Powder',
    silk: 'Mulberry Silk',
    cotton: 'Handloom Desi Cotton',
    bronze: 'Bell Metal Bronze',
    bell: 'Bell Metal Bronze',
    wood: 'Wrightia Tinctoria Ivory Wood',
    neem: 'Neem Wood',
    sheesham: 'Reclaimed Sheesham',
    plastic: 'Synthetic Polymer Resin',
    neon: 'Synthetic Chemical Pigment',
  };

  const requestedMaterials: string[] = [];
  for (const [key, val] of Object.entries(materialKeywords)) {
    if (lower.includes(key) && !requestedMaterials.includes(val)) {
      requestedMaterials.push(val);
    }
  }
  if (requestedMaterials.length === 0) {
    requestedMaterials.push('Natural Lac Resin', 'Pure Brass Micro-beads');
  }

  // Detect occasion
  let intendedOccasion = 'Everyday Heirloom';
  if (lower.includes('wedding') || lower.includes('bridal') || lower.includes('marriage')) {
    intendedOccasion = 'Wedding / Bridal Celebration';
  } else if (lower.includes('gift') || lower.includes('anniversary')) {
    intendedOccasion = 'Milestone Gift';
  } else if (lower.includes('festival') || lower.includes('diwali') || lower.includes('pooja')) {
    intendedOccasion = 'Auspicious Festive Ceremony';
  }

  // Detect product type
  let detectedProductType = 'Custom Craft Creation';
  if (lower.includes('bangle') || lower.includes('kada') || lower.includes('chooda')) {
    detectedProductType = 'Traditional Bangle Sets';
  } else if (lower.includes('vase') || lower.includes('urn') || lower.includes('pottery')) {
    detectedProductType = 'Decorative Ceramic Vases';
  } else if (lower.includes('planter') || lower.includes('pot')) {
    detectedProductType = 'Sculptural Planters';
  } else if (lower.includes('stole') || lower.includes('scarf') || lower.includes('dupatta')) {
    detectedProductType = 'Block-Printed Stoles';
  } else if (lower.includes('saree') || lower.includes('sari')) {
    detectedProductType = 'Katan Silk Sarees';
  } else if (lower.includes('statue') || lower.includes('sculpture') || lower.includes('totem') || lower.includes('elephant')) {
    detectedProductType = 'Dhokra Elephant Totem';
  } else if (lower.includes('toy') || lower.includes('stacker')) {
    detectedProductType = 'Montessori Wooden Toys';
  }

  // Complexity determination
  let complexity: 'Simple' | 'Moderate' | 'Intricate' | 'Masterpiece' = 'Intricate';
  if (lower.includes('masterpiece') || lower.includes('intricate') || lower.includes('bridal') || lower.includes('wedding')) {
    complexity = 'Masterpiece';
  } else if (lower.includes('minimal') || lower.includes('simple') || lower.includes('basic')) {
    complexity = 'Simple';
  } else if (lower.includes('moderate')) {
    complexity = 'Moderate';
  }

  return {
    detectedProductType,
    requestedMaterials,
    requestedColors,
    intendedOccasion,
    complexity,
  };
}

export function validateDesignAgainstArtisan(
  artisan: Artisan,
  parsed: PromptParseResult
): {
  checks: DesignConstraintCheck[];
  validatedSpec: {
    material: string;
    color: string;
    technique: string;
    finish: string;
    dimensions: string;
    complexity: 'Simple' | 'Moderate' | 'Intricate' | 'Masterpiece';
  };
  suggestedAlternatives: string[];
  estimatedPrice: number;
  estimatedLeadTimeDays: number;
  overallStatus: DesignProposalStatus;
} {
  const checks: DesignConstraintCheck[] = [];
  const suggestedAlternatives: string[] = [];

  const cap = artisan.capabilities;

  // 1. Check Product Type
  const supportsProduct = cap.supportedProductTypes.some(
    (pt) => pt.toLowerCase().includes(parsed.detectedProductType.toLowerCase()) ||
            parsed.detectedProductType.toLowerCase().includes(pt.toLowerCase())
  );

  if (supportsProduct) {
    checks.push({
      item: 'Product Type Compatibility',
      status: 'passed',
      message: `${artisan.name} has verified mastery in producing ${parsed.detectedProductType}.`,
    });
  } else {
    checks.push({
      item: 'Product Type Compatibility',
      status: 'warning',
      message: `${artisan.name} primarily specializes in ${cap.supportedProductTypes.join(', ')}.`,
      alternativeSuggestion: `We can adapt your design concept to a ${cap.supportedProductTypes[0]} within this artisan's guild.`,
    });
    suggestedAlternatives.push(`Adapt design to artisan's signature ${cap.supportedProductTypes[0]}`);
  }

  // 2. Check Colors
  let selectedColor = cap.colors[0];
  for (const reqColor of parsed.requestedColors) {
    if (reqColor.toLowerCase().includes('synthetic') || reqColor.toLowerCase().includes('neon')) {
      checks.push({
        item: `Color Formulation: ${reqColor}`,
        status: 'failed',
        message: `Synthetic volatile pigment cannot be used. ${artisan.name}'s workshop exclusively prepares natural mineral & botanical pigments.`,
        alternativeSuggestion: `Substitute with natural ${cap.colors[0]} or ${cap.colors[1] || 'natural mineral wash'}.`,
      });
      suggestedAlternatives.push(`Use artisan's natural ${cap.colors[0]} instead of synthetic dye.`);
    } else {
      const match = cap.colors.find((c) => c.toLowerCase().includes(reqColor.toLowerCase()) || reqColor.toLowerCase().includes(c.toLowerCase()));
      if (match) {
        selectedColor = match;
        checks.push({
          item: `Color Palette: ${match}`,
          status: 'passed',
          message: `Verified natural ${match} is available in active workshop pigments.`,
        });
      } else {
        checks.push({
          item: `Color Palette: ${reqColor}`,
          status: 'warning',
          message: `${reqColor} is not in current prepared batches. Closest traditional shade is ${cap.colors[0]}.`,
          alternativeSuggestion: `Formulate with available ${cap.colors[0]}.`,
        });
        suggestedAlternatives.push(`Adopt traditional ${cap.colors[0]} finish.`);
      }
    }
  }

  // 3. Check Materials
  let selectedMaterial = cap.materials[0];
  for (const reqMat of parsed.requestedMaterials) {
    if (reqMat.toLowerCase().includes('synthetic') || reqMat.toLowerCase().includes('plastic')) {
      checks.push({
        item: `Material Verification: ${reqMat}`,
        status: 'failed',
        message: 'Non-authentic synthetic polymers violate SphereO heritage craft standards.',
        alternativeSuggestion: `Craft using natural ${cap.materials[0]}.`,
      });
      suggestedAlternatives.push(`Craft with certified sustainable ${cap.materials[0]}.`);
    } else {
      const match = cap.materials.find((m) => m.toLowerCase().includes(reqMat.toLowerCase()) || reqMat.toLowerCase().includes(m.toLowerCase()));
      if (match) {
        selectedMaterial = match;
        checks.push({
          item: `Material Authenticity: ${match}`,
          status: 'passed',
          message: `Certified genuine ${match} in verified workshop inventory.`,
        });
      }
    }
  }

  // 4. Check Disallowed Combinations
  if (cap.customizationRules.disallowedCombinations) {
    for (const rule of cap.customizationRules.disallowedCombinations) {
      if (parsed.requestedMaterials.some((m) => m.toLowerCase().includes(rule.material.toLowerCase()))) {
        checks.push({
          item: `Material Integrity: ${rule.material}`,
          status: 'failed',
          message: rule.reason,
          alternativeSuggestion: `Remove conflicting ${rule.material} and adhere to artisan's tested formula.`,
        });
      }
    }
  }

  // 5. Complexity & Lead Time
  const hasFailed = checks.some((c) => c.status === 'failed');
  const leadTimeDays = parsed.complexity === 'Masterpiece' ? cap.maxLeadTimeDays : cap.minLeadTimeDays + 3;

  // Base pricing calculation
  let priceBase = 3200;
  if (parsed.complexity === 'Masterpiece') priceBase = 5800;
  if (parsed.complexity === 'Simple') priceBase = 1800;
  if (artisan.craftId === 'craft-handloom-textiles') priceBase *= 3.5;
  if (artisan.craftId === 'craft-jewelry') priceBase *= 2.2;

  const overallStatus: DesignProposalStatus = hasFailed ? 'Needs Changes' : 'Ready for Review';

  return {
    checks,
    validatedSpec: {
      material: selectedMaterial,
      color: selectedColor,
      technique: cap.techniques[0] || 'Handcrafted Ancestral Method',
      finish: cap.finishes[0] || 'Hand-Polished Heritage',
      dimensions: 'Custom Artisan Tailored Proportions',
      complexity: parsed.complexity,
    },
    suggestedAlternatives,
    estimatedPrice: Math.round(priceBase),
    estimatedLeadTimeDays: leadTimeDays,
    overallStatus,
  };
}

export function generateDesignProposal(
  customerId: string,
  customerName: string,
  artisanId: string,
  customerPrompt: string
): DesignProposal {
  const artisan = ARTISANS.find((a) => a.id === artisanId) || ARTISANS[0];
  const parsed = parsePrompt(customerPrompt);
  const validation = validateDesignAgainstArtisan(artisan, parsed);

  const conceptTitle = `${artisan.craftName} Bespoke Concept: ${parsed.detectedProductType}`;
  
  // Concept preview reference
  const previewBank: Record<string, string> = {
    'craft-lac-bangles': 'https://images.unsplash.com/photo-1611591475879-1f4803975073?auto=format&fit=crop&w=800&q=80',
    'craft-blue-pottery': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'craft-pottery-ceramics': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    'craft-handloom-textiles': 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    'craft-embroidery': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    'craft-woodcraft': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'craft-metalwork-dhokra': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    'craft-block-printing': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  };

  const previewUrl = previewBank[artisan.craftId] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';

  const proposalId = `prop-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  return {
    id: proposalId,
    customerId,
    customerName,
    artisanId: artisan.id,
    artisanName: artisan.name,
    craftId: artisan.craftId,
    craftName: artisan.craftName,
    productConceptTitle: conceptTitle,
    customerPrompt,
    parsedRequirements: {
      productType: parsed.detectedProductType,
      requestedMaterials: parsed.requestedMaterials,
      requestedColors: parsed.requestedColors,
      intendedOccasion: parsed.intendedOccasion,
    },
    validatedSpecification: validation.validatedSpec,
    constraintChecks: validation.checks,
    previewUrl,
    previewType: 'conceptual_sketch',
    estimatedPrice: validation.estimatedPrice,
    estimatedLeadTimeDays: validation.estimatedLeadTimeDays,
    status: validation.overallStatus,
    suggestedAlternatives: validation.suggestedAlternatives,
    createdAt: now,
    updatedAt: now,
  };
}
