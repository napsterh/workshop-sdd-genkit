import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';

// 1. Inicializar Genkit conectado a Google Cloud Vertex AI mediante gcloud ADC
export const ai = genkit({
  plugins: [
    vertexAI({ location: 'us-central1' })
  ],
});

// 2. Definición del Esquema de Salida según SPEC.md
export const ClasificacionOutputSchema = z.object({
  prioridad: z.enum(['ALTA', 'MEDIA', 'BAJA']),
  razon: z.string().max(120),
  tiempoEstimadoMinutos: z.number(),
});

// 3. Definición del Flujo Estructurado (Flow)
export const clasificarTareaFlow = ai.defineFlow(
  {
    name: 'clasificarTareaFlow',
    inputSchema: z.string().min(5),
    outputSchema: ClasificacionOutputSchema,
  },
  async (textoTarea) => {
    const response = await ai.generate({
      model: 'vertexai/gemini-1.5-flash',
      prompt: `Analiza la siguiente tarea y determina su nivel de prioridad, la razón breve y el tiempo estimado en minutos: "${textoTarea}"`,
      output: {
        schema: ClasificacionOutputSchema,
      },
    });

    if (!response.output) {
      throw new Error('La IA no generó una respuesta estructurada válida.');
    }

    return response.output;
  }
);