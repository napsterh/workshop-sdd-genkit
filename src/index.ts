import { clasificarTareaFlow } from './genkit.js';

async function main() {
  console.log('🚀 Iniciando servicio de IA (Spec-Driven Development)...\n');

  const tareaEjemplo = "El servidor principal de producción se cayó y la base de datos no responde.";
  console.log(`📌 Evaluando Tarea: "${tareaEjemplo}"\n`);

  try {
    const resultado = await clasificarTareaFlow(tareaEjemplo);
    console.log('✅ Resultado Estructurado recibido de Gemini Vertex AI:');
    console.table(resultado);
  } catch (error) {
    console.error('❌ Error al ejecutar el flujo:', error);
  }
}

main();