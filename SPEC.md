=# Especificación Técnica: AI Task Classifier Service

## 1. Objetivo del Sistema
Crear un servicio de backend determinista impulsado por IA para clasificar tareas según su nivel de urgencia y generar un resumen de acción.

## 2. Reglas de Arquitectura y Tecnologías
- **Lenguaje:** TypeScript (Strict Mode).
- **Orquestación de IA:** Firebase Genkit con el plugin de Vertex AI.
- **Modelo:** `vertexai/gemini-1.5-flash`.
- **Autenticación Cloud:** Google Cloud Application Default Credentials (gcloud ADC).
- **Validación de Datos:** Zod para esquemas de entrada y salida estructurados.

## 3. Contrato de Entrada y Salida (Data Schema)

### Input Schema (Entrada)
- `tarea`: string (mínimo 5 caracteres).

### Output Schema (Salida JSON Estricta)
- `prioridad`: Enum (`ALTA`, `MEDIA`, `BAJA`).
- `razon`: string (máximo 120 caracteres explicando la razón de la prioridad).
- `tiempoEstimadoMinutos`: number (estimación sugerida para resolverla).

## 4. Requisitos de Ejecución
- Debe exponer un flujo ejecutable mediante Genkit.
- Debe incluir una prueba por consola en `src/index.ts` evaluando el texto de una tarea de prueba.