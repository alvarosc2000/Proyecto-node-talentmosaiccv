-- Eliminar los enums
DO $$
BEGIN
    -- Verificar si el enum 'statusEnum' existe y eliminarlo
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'statusenum') THEN
        DROP TYPE statusEnum;
    END IF;

    -- Verificar si el enum 'sourceEnum' existe y eliminarlo
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sourceenum') THEN
        DROP TYPE sourceEnum;
    END IF;

    -- Verificar si el enum 'rolesEnum' existe y eliminarlo
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rolesenum') THEN
        DROP TYPE rolesEnum;
    END IF;
END $$;

-- Eliminar las tablas
DROP TABLE IF EXISTS candidate_feedbacks CASCADE;
DROP TABLE IF EXISTS candidate_rankings CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS source;
DROP TYPE IF EXISTS role;
DROP TYPE IF EXISTS status;
