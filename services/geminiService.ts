import { GoogleGenAI, Type } from "@google/genai";
import type { Language, Recipe } from '../types';

// Gemini API Guidelines: Always use new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: 'The name of the recipe.' },
        description: { type: Type.STRING, description: 'A short, enticing description of the dish.' },
        prepTime: { type: Type.STRING, description: 'Preparation time, e.g., "15 mins".' },
        cookTime: { type: Type.STRING, description: 'Cooking time, e.g., "30 mins".' },
        calories: { type: Type.STRING, description: 'Estimated calorie count, e.g., "450 kcal".' },
        ingredients: {
            type: Type.ARRAY,
            description: 'A list of ingredients with quantities.',
            items: { type: Type.STRING },
        },
        instructions: {
            type: Type.ARRAY,
            description: 'Step-by-step instructions for preparing the dish.',
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.STRING, description: 'The instruction for this step.' },
                    iconName: {
                        type: Type.STRING,
                        description: "A single keyword for an icon representing the step. Choose from: chop, slice, dice, mix, whisk, season, pour, heat, boil, fry, preheat, bake, serve, garnish, rest."
                    },
                },
                required: ['step', 'iconName'],
            },
        },
    },
    required: ['title', 'description', 'prepTime', 'cookTime', 'calories', 'ingredients', 'instructions'],
};

const getLanguageName = (langCode: Language) => {
    return langCode === 'ru' ? 'Russian' : 'English';
}

export const generateRecipeText = async (ingredients: string[], timeConstraint: string, language: Language): Promise<Recipe> => {
    const languageName = getLanguageName(language);
    
    let prompt = `Generate a recipe in ${languageName} using the following ingredients: ${ingredients.join(', ')}.`;
    if (timeConstraint) {
        prompt += ` The total preparation and cooking time should be a maximum of ${timeConstraint} minutes.`;
    }
    prompt += ` Provide a short description, prep time, cook time, calorie count, a list of ingredients, and step-by-step instructions. For each instruction, provide a relevant icon name from the allowed list.`;

    try {
        // Gemini API Guidelines: Use ai.models.generateContent for text answers.
        const response = await ai.models.generateContent({
            // Gemini API Guidelines: Use 'gemini-2.5-flash' for general text tasks.
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });

        // Gemini API Guidelines: Use response.text to get the generated text content.
        const recipeJsonString = response.text;
        return JSON.parse(recipeJsonString);

    } catch (error) {
        console.error("Error generating recipe text with Gemini:", error);
        throw new Error("Failed to generate recipe text.");
    }
};

export const generateRecipeImage = async (recipeTitle: string): Promise<string> => {
    try {
        const imagePrompt = `A delicious, high-quality photograph of ${recipeTitle}, ready to be served.`;

        // Gemini API Guidelines: Use ai.models.generateImages for image generation.
        const imageResponse = await ai.models.generateImages({
            // Gemini API Guidelines: Use 'imagen-4.0-generate-001' for image generation.
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });
        
        // Gemini API Guidelines: Access the generated image bytes.
        const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;

    } catch (error) {
        console.error("Error generating recipe image with Gemini:", error);
        // Don't throw, just return an empty string or handle it gracefully
        return "";
    }
}