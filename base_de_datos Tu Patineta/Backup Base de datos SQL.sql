IF NOT EXISTS (
    SELECT name 
    FROM sys.databases 
    WHERE name = 'tupatineta'
)
BEGIN
    CREATE DATABASE tupatineta;
END


-- Eliminar la tabla si existe
IF OBJECT_ID(N'dbo.usuario', N'U') IS NOT NULL
    DROP TABLE dbo.usuario;

CREATE TABLE dbo.usuario (
  id_usuario INT IDENTITY(1,1) NOT NULL,
  nombre_usuario VARCHAR(45) NOT NULL,
  apellidos_usuario VARCHAR(45) NOT NULL,
  identificacion_usuario VARCHAR(45) NOT NULL,
  telefono_usuario VARCHAR(45) NOT NULL,
  direccion_usuario VARCHAR(45) NOT NULL,
  correo_usuario VARCHAR(45) NOT NULL,
  contraseña_usuario VARCHAR(45) NOT NULL,
  [role] VARCHAR(20) NOT NULL DEFAULT 'usuario', -- Cambiar ENUM a VARCHAR
  PRIMARY KEY (id_usuario),
  UNIQUE (id_usuario)
);

-- Eliminar la tabla si existe
IF OBJECT_ID(N'dbo.tipo_servicio', N'U') IS NOT NULL
    DROP TABLE dbo.tipo_servicio;

CREATE TABLE dbo.tipo_servicio (
  id_tipo_servicio INT NOT NULL,
  nombre_servicio VARCHAR(45) NOT NULL,
  descripcion VARCHAR(45) NOT NULL,
  tarifa_base INT NOT NULL,
  PRIMARY KEY (id_tipo_servicio),
  UNIQUE (id_tipo_servicio)
);

-- Eliminar la tabla si existe
IF OBJECT_ID(N'dbo.servicio', N'U') IS NOT NULL
    DROP TABLE dbo.servicio;

CREATE TABLE dbo.servicio (
  fecha_inicio VARCHAR(30) NOT NULL,
  fecha_fin VARCHAR(30) NOT NULL,
  tarifa_fin INT NOT NULL,
  estado VARCHAR(45) NOT NULL,
  id_tipo_servicio INT NOT NULL,
  id_servicio INT IDENTITY(1,1) NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_servicio),
  FOREIGN KEY (id_tipo_servicio) REFERENCES dbo.tipo_servicio (id_tipo_servicio) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (id_usuario) REFERENCES dbo.usuario (id_usuario) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Insertar datos en la tabla `usuario`
INSERT INTO dbo.usuario (nombre_usuario, apellidos_usuario, identificacion_usuario, telefono_usuario, direccion_usuario, correo_usuario, contraseña_usuario, [role]) VALUES 
('administrador', 'administrador', '123', '123456789', 'calle 34 bis', 'admin@gmail.com', '56e0e6859b4220b08c238f0df3494e2ecf1b0421', 'administrador'),
('Maria Helena', 'Benitez Herrera', '101478965', 'carrera 8 # 15 n 25', '321856974', 'MariaH@gmail.com', 'a7ff0036c335801994031326786b0a2bfc40fa6f', 'usuario'),
('Jose Hernando', 'Gutierrez Paez', '98745212', 'calle 58 sur # 36 c 75', '3207896541', 'Josegupa@outlook.com', '7b0705b01e2dc94bbdd0a903acfaeffd4b927702', 'usuario'),
('Milena', 'Restrepo Cifuentes', '85471236', 'Diagonal 36 b # 63 - 14', '3152069874', 'MilenaRC@yahoo.com', '66ea1dfdc3bc28438631374c3455888a8a703858', 'usuario'),
('Esteban', 'Henao Bustamante', '1025963214', 'Kr 25 # 84 n 36', '3139518677', 'Esteban@gmail.com', 'cd8ba83702bcafe235ee54dc4faf3563c6700558', 'usuario');

-- Insertar datos en la tabla `tipo_servicio`
INSERT INTO dbo.tipo_servicio (id_tipo_servicio, nombre_servicio, descripcion, tarifa_base) VALUES 
(1, 'Alquiler de patineta', 'Alquiler de patineta', 2000),
(2, 'Tour guiado', 'Tour guiado', 2000),
(3, 'Asistencia en carretera', 'Asistencia en carretera', 3000),
(4, 'Alquiler corporativo', 'Alquiler corporativo', 5000);

-- Insertar datos en la tabla `servicio`
INSERT INTO dbo.servicio (fecha_inicio, fecha_fin, tarifa_fin, estado, id_tipo_servicio, id_usuario) VALUES 
('2024-07-26T19:00', '2024-08-02T18:58', 131014, 'activo', 1,3),
('2024-08-09T11:03', '2024-08-11T10:58', 37375, 'activo', 1, 2),
('2024-08-13T14:05', '2024-08-19T13:01', 111488, 'activo', 2, 1),
('2024-07-27T08:02', '2024-07-27T16:00', 14340, 'activo', 2, 4)
