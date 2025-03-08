# TalentMosaicCV

TalentMosaicCV es una plataforma basada en inteligencia artificial diseñada para optimizar el proceso de selección de candidatos. Utiliza tecnologías avanzadas de procesamiento de lenguaje natural (NLP) para analizar y clasificar CVs de forma automatizada, proporcionando puntuaciones de compatibilidad entre los candidatos y las ofertas de trabajo.

## Tecnologías Utilizadas

- **Backend**: TypeScript, Node.js, Drizzle ORM, PostgreSQL, Docker.
- **Frontend**: Vue.js, Vuetify.
- **AI y Machine Learning**: Python, GPT-4 (opcional), spaCy, NLTK, TensorFlow.
- **Infraestructura**: AWS (S3, Lambda, RDS, SageMaker).
- **Otras Herramientas**: PyMuPDF, pdfplumber, Scikit-learn, TF-IDF, BERT.

## Fases del Proyecto

### Fase 1: Extracción y Normalización de Datos
**Objetivo**: Leer y extraer información clave de CVs en diferentes formatos (PDF, DOCX) y almacenarla en la base de datos.

- **Tecnologías necesarias**:
  - **Python**: Procesamiento de texto y CVs.
  - **PyMuPDF** o **pdfplumber**: Para extraer texto de PDFs.
  - **spaCy** / **NLTK**: Para procesamiento de lenguaje natural.
  - **GPT-4 (opcional)**: Para refinar datos y evitar la exposición de información sensible.
  
**Pasos**:
1. **Subida de CV**: El reclutador sube el CV (PDF, DOCX) y el backend lo almacena temporalmente.
2. **Extracción de texto**: Utilizamos PyMuPDF para leer PDFs y extraer el texto.
3. **Limpieza y Normalización**: El texto extraído se limpia de encabezados, pies de página y símbolos no deseados.
4. **Análisis y Estructuración**: spaCy identifica entidades clave como fechas, títulos de trabajo y empresas, y se almacena en la base de datos.

### Fase 2: Comparación con Vacantes y Asignación de Puntuación
**Objetivo**: Comparar el CV con los requisitos de la oferta de trabajo y calcular una puntuación.

- **Tecnologías necesarias**:
  - **PostgreSQL + Drizzle ORM**: Para gestionar y almacenar datos.
  - **TF-IDF / Embeddings**: Para comparación de texto.
  - **GPT-4 (opcional)**: Para mejorar la evaluación semántica.

**Pasos**:
1. **Cargar oferta de trabajo**: Se toman los requisitos desde la tabla de trabajos.
2. **Comparación de experiencia**: Se compara la experiencia del candidato con la oferta de trabajo.
3. **Comparación de habilidades**: Se compara las habilidades requeridas con las del candidato.
4. **Comparación de educación**: Se compara el nivel educativo con el requerido.
5. **Asignación de puntuación**: Se asignan puntos en función de la experiencia, habilidades y educación, y se genera un ranking.

### Fase 3: Aprendizaje y Mejora Continua del Algoritmo
**Objetivo**: Mejorar la precisión del ranking mediante Machine Learning, ajustando los pesos del algoritmo con el feedback de usuarios.

- **Tecnologías necesarias**:
  - **Scikit-learn / TensorFlow**: Para entrenar modelos de ML.
  - **Feedback de usuarios**: Para ajustar los pesos del algoritmo.

**Pasos**:
1. **Recolectar feedback**: Los reclutadores proporcionan feedback sobre la selección de candidatos.
2. **Entrenamiento del modelo**: Se entrena un modelo de regresión logística para ajustar los pesos.
3. **Ajuste de puntuaciones**: Se recalibran los puntajes de experiencia, habilidades y educación.

### Fase 4: Entrega de Resultados y Explicaciones Transparentes
**Objetivo**: Mostrar el ranking de candidatos con justificación objetiva sobre la puntuación final.

- **Tecnologías necesarias**:
  - **Frontend**: Vue.js para mostrar los rankings.
  - **Backend**: Lógica para calcular y justificar las puntuaciones.

**Pasos**:
1. **Generación del ranking**: Los candidatos se ordenan según su compatibilidad con la oferta.
2. **Visualización de la justificación**: Se muestra la puntuación final con la justificación para cada candidato.

### Fase 5: Integración y Comercialización
**Objetivo**: Escalar la solución a nivel empresarial con planes de suscripción y características premium.

**Planes de suscripción**:
| Plan        | Límite de CVs | Funciones Avanzadas     | Precio    |
|-------------|---------------|-------------------------|-----------|
| Básico      | 50/mes        | No ranking IA           | $49/mes   |
| Pro         | 500/mes       | IA + Ajustes            | $99/mes   |
| Enterprise  | Ilimitado     | IA Avanzada + Soporte   | $499/mes  |

**Estrategia de comercialización**:
1. **Promoción** en LinkedIn y redes sociales.
2. **Prueba gratuita de 7 días** para atraer usuarios.
3. **Casos de éxito** para demostrar la efectividad de la IA en la selección de candidatos.

## Cómo Empezar

### Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/talentmosaiccv.git
   cd talentmosaiccv
   ```

2. **Configura el entorno**:
   ```bash
   npm install
   ```

3. **Inicia el backend**:
   ```bash
   npx ts-node backend/src/app.ts
   ```

4. **Genera la base de datos**:
   ```bash
   npx tsc
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

5. **Inicia el frontend**:
   ```bash
   npm run serve
   ```

6. **Ejecuta el servidor en modo de desarrollo**:
   ```bash
   npx tsc --watch
   ```

### Docker

1. **Construir y ejecutar los contenedores**:
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

### Subir un CV

1. Sube un CV desde el frontend.
2. El backend extraerá la información y la almacenará en la base de datos.

## Contribuciones

Si deseas contribuir a este proyecto, siéntete libre de hacer un fork, enviar pull requests o abrir problemas para mejorar el algoritmo y la plataforma.
