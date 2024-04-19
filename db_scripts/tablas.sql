CREATE SEQUENCE public.periodos_idperiodo_seq;

CREATE TABLE public.Periodos (
                idPeriodo INTEGER NOT NULL DEFAULT nextval('public.periodos_idperiodo_seq'),
                periodo VARCHAR NOT NULL,
                CONSTRAINT idperiodo PRIMARY KEY (idPeriodo)
);


ALTER SEQUENCE public.periodos_idperiodo_seq OWNED BY public.Periodos.idPeriodo;

CREATE SEQUENCE public.usuarios_idusuario_seq;

CREATE TABLE public.Usuarios (
                idUsuario INTEGER NOT NULL DEFAULT nextval('public.usuarios_idusuario_seq'),
                nombreUsuario VARCHAR NOT NULL,
                contrasenia VARCHAR NOT NULL,
                dirCorreo VARCHAR NOT NULL,
                tipoUsuario VARCHAR NOT NULL,
                CONSTRAINT idusuario PRIMARY KEY (idUsuario)
);


ALTER SEQUENCE public.usuarios_idusuario_seq OWNED BY public.Usuarios.idUsuario;

CREATE SEQUENCE public.aulas_idaula_seq;

CREATE TABLE public.Aulas (
                idAula INTEGER NOT NULL DEFAULT nextval('public.aulas_idaula_seq'),
                nombre VARCHAR NOT NULL,
                capacidad INTEGER NOT NULL,
                ubicacion VARCHAR NOT NULL,
                descripcion VARCHAR NOT NULL,
                CONSTRAINT idaula PRIMARY KEY (idAula)
);


ALTER SEQUENCE public.aulas_idaula_seq OWNED BY public.Aulas.idAula;

CREATE TABLE public.Reservas (
                idAula INTEGER NOT NULL,
                idPeriodo INTEGER NOT NULL,
                fecha DATE NOT NULL,
                idUsuario INTEGER NOT NULL,
                CONSTRAINT idreserva PRIMARY KEY (idAula, idPeriodo, fecha)
);


ALTER TABLE public.Reservas ADD CONSTRAINT periodos_reservas_fk
FOREIGN KEY (idPeriodo)
REFERENCES public.Periodos (idPeriodo)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Reservas ADD CONSTRAINT usuarios_reservas_fk
FOREIGN KEY (idUsuario)
REFERENCES public.Usuarios (idUsuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Reservas ADD CONSTRAINT aulas_reservas_fk
FOREIGN KEY (idAula)
REFERENCES public.Aulas (idAula)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;