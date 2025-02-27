# talentmosaiccv

1. Backend init --> npx ts-node src/app.ts
npx ts-node backend/src/app.ts


2. generar la carpeta dist --> desde backend --> npx tsc

3. npm install para node_modules


node_modules: Contiene dependencias de tu proyecto (paquetes instalados).
dist: Contiene la versión compilada de tu código (archivos .js generados desde .ts).



4. npx drizzle-kit generate
5. npx drizzle-kit migrate
6. npx drizzle-kit seed


-- Tabla Users
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Companies
CREATE TABLE Companies (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  industry VARCHAR(100),
  country VARCHAR(100),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Candidates
CREATE TABLE Candidates (
  candidate_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone_number VARCHAR(20),
  linkedin_profile VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Resumes
CREATE TABLE Resumes (
  resume_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES Candidates(candidate_id),
  file_path VARCHAR(255) NOT NULL,
  processed_data JSONB,
  bias_score FLOAT,
  compatibility_score FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Jobs
CREATE TABLE Jobs (
  job_id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES Companies(company_id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Applications
CREATE TABLE Applications (
  application_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES Candidates(candidate_id),
  job_id INTEGER NOT NULL REFERENCES Jobs(job_id),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla LinkedInData (Opcional)
CREATE TABLE LinkedInData (
  linkedin_id SERIAL PRIMARY KEY,
  candidate_id INTEGER REFERENCES Candidates(candidate_id),
  profile_data JSONB,
  imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
