
<?php
/*
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: DELETE, POST, GET, PUT, OPTIONS");
header("Content-Type: application/json");

define('API_URL', 'http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php');

global $conn;

$servername = "localhost";
$username = "root";
$password = "Tester2023*";
$dbname = "tupatineta";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$resource = array_shift($request);

switch ($method) {  
    case 'GET':
        if ($resource == 'tipo_servicio') {
            get_tipo_servicio($conn);
        } elseif ($resource == 'usuario_validar' && !empty($_GET['correo']) && !empty($_GET['contrasena'])) {
            $input_usuario = $_GET['correo'];
            $input_contrasena = $_GET['contrasena'];
            get_usuario_validar($conn, $input_usuario, $input_contrasena);
        } else if ($resource == 'servicio'&& !empty($_GET['id_usuario'])) {
            $id2 = $_GET['id_usuario'];
            get_servicio($conn, $id2);
        } else if ($resource == 'servicios' && !empty($_GET['id']) ) {
            $id = $_GET['id'];
            get_servicio_by_id($conn, $id);
        }
        else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    case 'POST':
        if ($resource == 'servicio') {
            post_servicio($conn);
        } elseif ($resource == 'usuario') {
            post_usuario($conn);
        } else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    case 'PUT':
        if ($resource == 'servicio') {
            put_servicio($conn);
        } else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    case 'DELETE':
        if ($resource == 'servicio') {
            delete_servicio($conn);
        } else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$conn->close();

function get_usuario_validar($conn, $input_usuario, $input_contrasena) {
    $query = "SELECT * FROM tupatineta.usuario";
    
    $result = $conn->query($query);
    $usuarios = array();
    $usuario_valido = false;

    while ($usuario = $result->fetch_assoc()) {
        $usuarios[] = $usuario;

        // Verifica si el usuario y la contraseña coinciden
        if ($usuario['correo_usuario'] == $input_usuario && $usuario['contraseña_usuario'] == $input_contrasena) {
            $usuario_valido = true;
            $usuario_id = $usuario['id_usuario'];
        }
    }

    // Resultado de la validación
    $respuesta = array(
        'usuario_valido' => $usuario_valido,
        'usuario_id' => $usuario_id
    );

    echo json_encode($respuesta);
}


function get_tipo_servicio($conn) {
    $query = "SELECT * FROM tupatineta.tipo_servicio";
    
    $result = $conn->query($query);
    $tipos = array();
    while ($tipo = $result->fetch_assoc()) {
        $tipos[] = $tipo;
    }
    echo json_encode($tipos);
}

function get_servicio($conn, $id) {
    $query = "SELECT
    s.id_servicio,
    ts.nombre_servicio,
    u.correo_usuario,
    u.direccion_usuario,
    s.fecha_inicio,
    s.fecha_fin,
    s.tarifa_fin,
    s.estado
    FROM tupatineta.servicio s
    INNER JOIN tupatineta.usuario u ON (s.id_usuario = u.id_usuario)
    INNER JOIN tupatineta.tipo_servicio ts ON (s.id_tipo_servicio = ts.id_tipo_servicio)
    WHERE u.id_usuario = $id";
    
    $result = $conn->query($query);
    $servicios = array();
    while ($servicio = $result->fetch_assoc()) {
        $servicios[] = $servicio;
    }
    echo json_encode($servicios);
}

function get_servicio_by_id($conn, $id) {
    $query = "SELECT
    s.id_servicio,
    ts.id_tipo_servicio,
    ts.nombre_servicio,
    u.id_usuario,
    u.correo_usuario,
    u.direccion_usuario,
    s.fecha_inicio,
    s.fecha_fin,
    s.tarifa_fin,
    s.estado
    FROM tupatineta.servicio s
    INNER JOIN tupatineta.usuario u ON (s.id_usuario = u.id_usuario)
    INNER JOIN tupatineta.tipo_servicio ts ON (s.id_tipo_servicio = ts.id_tipo_servicio)
    WHERE s.id_servicio = $id";
    
    $result = $conn->query($query);
    $soporte = $result->fetch_assoc();
    echo json_encode($soporte);
}

function post_servicio($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $id_tipo_servicio = $data['id_tipo_servicio'];
    $id_usuario = $data['id_usuario'];
    $fecha_inicio = $data['fecha_inicio'];
    $fecha_fin = $data['fecha_fin'];
    $tarifa_fin = $data['tarifa_fin'];
    $estado = $data['estado'];
    $sql = "INSERT INTO tupatineta.servicio (id_tipo_servicio,id_usuario, fecha_inicio,fecha_fin,tarifa_fin,estado) 
    VALUES ('$id_tipo_servicio', '$id_usuario', '$fecha_inicio', '$fecha_fin', '$tarifa_fin','$estado')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Nuevo registro creado con éxito"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function post_usuario($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $nombre_usuario = $data['nombre_usuario'];
    $apellidos_usuario = $data['apellidos_usuario'];
    $identificacion_usuario = $data['identificacion_usuario'];
    $telefono_usuario = $data['telefono_usuario'];
    $direccion_usuario = $data['direccion_usuario'];
    $correo_usuario = $data['correo_usuario'];
    $contraseña_usuario = $data['contraseña_usuario'];
    $sql = "INSERT INTO usuario (nombre_usuario,apellidos_usuario,identificacion_usuario,telefono_usuario,direccion_usuario,correo_usuario,contraseña_usuario) VALUES ('$nombre_usuario','$apellidos_usuario','$identificacion_usuario','$telefono_usuario','$direccion_usuario','$correo_usuario','$contraseña_usuario')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Nuevo usuario creado con éxito"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function put_servicio($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $id_servicio = $data['id_servicio'];
    $id_tipo_servicio = $data['id_tipo_servicio'];
    $id_usuario = $data['id_usuario'];
    $fecha_inicio = $data['fecha_inicio'];
    $fecha_fin = $data['fecha_fin'];
    $tarifa_fin = $data['tarifa_fin'];
    $estado = $data['estado'];
    
    $sql = "UPDATE tupatineta.servicio  SET id_tipo_servicio = '$id_tipo_servicio' , id_usuario = '$id_usuario', fecha_inicio = '$fecha_inicio', fecha_fin = '$fecha_fin', tarifa_fin = '$tarifa_fin', estado = '$estado' WHERE id_servicio = '$id_servicio'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Registro actualizado con exito"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function delete_servicio($conn) {
    // Obtener el id_servicio de la URL
    if (!isset($_GET['id_servicio'])) {
        echo json_encode(["error" => "Id_servicio no proporcionado"]);
        return;
    }

    $id_servicio = intval($_GET['id_servicio']);
    $sql = "DELETE FROM tupatineta.servicio WHERE id_servicio = '$id_servicio'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "registro eliminado con exito" ]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

?>*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: DELETE, POST, GET, PUT, OPTIONS");
header("Content-Type: application/json");

define('API_URL', 'http://localhost/TuPatinetaV2/API_Tupatineta/API_Tupatineta.php');

global $conn;

$servername = "localhost";
$username = "root";
$password = "Tester2023*";
$dbname = "tupatineta";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$resource = array_shift($request);

switch ($method) {  
    case 'GET':
        if ($resource == 'tipo_servicio') {
            get_tipo_servicio($conn);
        } elseif ($resource == 'usuario_validar' && !empty($_GET['correo']) && !empty($_GET['contrasena'])) {
            $input_usuario = $_GET['correo'];
            $input_contrasena = $_GET['contrasena'];
            get_usuario_validar($conn, $input_usuario, $input_contrasena);
        } else if ($resource == 'servicio'&& !empty($_GET['id_usuario'])) {
            $id2 = $_GET['id_usuario'];
            get_servicio($conn, $id2);
        } else if ($resource == 'servicios' ) {
            get_servicio_All($conn);
        }
        else if ($resource == 'serviciosbyid' && !empty($_GET['id']) ) {
        $id = $_GET['id'];
        get_servicio_by_id($conn, $id);
        }
        else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    case 'POST':
        if ($resource == 'servicio') {
            post_servicio($conn);
        } elseif ($resource == 'usuario') {
            post_usuario($conn);
        } else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    case 'PUT':
        if ($resource == 'servicio') {
            put_servicio($conn);
        } else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    case 'DELETE':
        if ($resource == 'servicio') {
            delete_servicio($conn);
        } else {
            echo json_encode(["error" => "Recurso no encontrado"]);
        }
        break;
    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}

$conn->close();

function get_usuario_validar($conn, $input_usuario, $input_contrasena) {

        $input_contrasena = sha1($input_contrasena);
    $query = "SELECT * FROM tupatineta.usuario";
    
    $result = $conn->query($query);
    $usuarios = array();
    $usuario_valido = false;
    $usuario_id = "";
    $usuario_rol = "";

    while ($usuario = $result->fetch_assoc()) {
        $usuarios[] = $usuario;

        // Verifica si el usuario y la contraseña coinciden
        if ($usuario['correo_usuario'] == $input_usuario && $usuario['contraseña_usuario'] == $input_contrasena) {
            $usuario_valido = true;
            $usuario_id = $usuario['id_usuario'];
            $usuario_rol = $usuario['role'];
        }
    }

    // Resultado de la validación
    $respuesta = array(
        'usuario_valido' => $usuario_valido,
        'usuario_id' => $usuario_id,
        'usuario_rol' => $usuario_rol
    );

    echo json_encode($respuesta);
}

function get_servicio_by_id($conn, $id) {
    $query = "SELECT
    s.id_servicio,
    ts.id_tipo_servicio,
    ts.nombre_servicio,
    u.id_usuario,
    u.correo_usuario,
    u.direccion_usuario,
    s.fecha_inicio,
    s.fecha_fin,
    s.tarifa_fin,
    s.estado
    FROM tupatineta.servicio s
    INNER JOIN tupatineta.usuario u ON (s.id_usuario = u.id_usuario)
    INNER JOIN tupatineta.tipo_servicio ts ON (s.id_tipo_servicio = ts.id_tipo_servicio)
    WHERE s.id_servicio = $id";
    
    $result = $conn->query($query);
    $soporte = $result->fetch_assoc();
    echo json_encode($soporte);
}


function get_tipo_servicio($conn) {
    $query = "SELECT * FROM tupatineta.tipo_servicio";
    
    $result = $conn->query($query);
    $tipos = array();
    while ($tipo = $result->fetch_assoc()) {
        $tipos[] = $tipo;
    }
    echo json_encode($tipos);
}

function get_servicio($conn, $id) {
    $query = "SELECT
    s.id_servicio,
    ts.nombre_servicio,
    u.correo_usuario,
    u.direccion_usuario,
    s.fecha_inicio,
    s.fecha_fin,
    s.tarifa_fin,
    s.estado
    FROM tupatineta.servicio s
    INNER JOIN tupatineta.usuario u ON (s.id_usuario = u.id_usuario)
    INNER JOIN tupatineta.tipo_servicio ts ON (s.id_tipo_servicio = ts.id_tipo_servicio)
    WHERE u.id_usuario = $id";
    
    $result = $conn->query($query);
    $servicios = array();
    while ($servicio = $result->fetch_assoc()) {
        $servicios[] = $servicio;
    }
    echo json_encode($servicios);
}

function get_servicio_All($conn) {
    $query = "SELECT
    s.id_servicio,
    ts.id_tipo_servicio,
    ts.nombre_servicio,
    u.id_usuario,
    u.correo_usuario,
    u.direccion_usuario,
    s.fecha_inicio,
    s.fecha_fin,
    s.tarifa_fin,
    s.estado
    FROM tupatineta.servicio s
    INNER JOIN tupatineta.usuario u ON (s.id_usuario = u.id_usuario)
    INNER JOIN tupatineta.tipo_servicio ts ON (s.id_tipo_servicio = ts.id_tipo_servicio)";
    
    $result = $conn->query($query);
    $servicios = array();
    while ($servicio = $result->fetch_assoc()) {
        $servicios[] = $servicio;
    }
    echo json_encode($servicios);
}

function post_servicio($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $id_tipo_servicio = $data['id_tipo_servicio'];
    $id_usuario = $data['id_usuario'];
    $fecha_inicio = $data['fecha_inicio'];
    $fecha_fin = $data['fecha_fin'];
    $tarifa_fin = $data['tarifa_fin'];
    $estado = $data['estado'];
    $sql = "INSERT INTO tupatineta.servicio (id_tipo_servicio,id_usuario, fecha_inicio,fecha_fin,tarifa_fin,estado) 
    VALUES ('$id_tipo_servicio', '$id_usuario', '$fecha_inicio', '$fecha_fin', '$tarifa_fin','$estado')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Nuevo registro creado con éxito"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function post_usuario($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $nombre_usuario = $data['nombre_usuario'];
    $apellidos_usuario = $data['apellidos_usuario'];
    $identificacion_usuario = $data['identificacion_usuario'];
    $telefono_usuario = $data['telefono_usuario'];
    $direccion_usuario = $data['direccion_usuario'];
    $correo_usuario = $data['correo_usuario'];
    $contraseña_usuario = sha1($data['contraseña_usuario']);
    $sql = "INSERT INTO usuario (nombre_usuario,apellidos_usuario,identificacion_usuario,telefono_usuario,direccion_usuario,correo_usuario,contraseña_usuario) VALUES ('$nombre_usuario','$apellidos_usuario','$identificacion_usuario','$telefono_usuario','$direccion_usuario','$correo_usuario','$contraseña_usuario')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Nuevo usuario creado con éxito"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function put_servicio($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $id_servicio = $data['id_servicio'];
    $id_tipo_servicio = $data['id_tipo_servicio'];
    $id_usuario = $data['id_usuario'];
    $fecha_inicio = $data['fecha_inicio'];
    $fecha_fin = $data['fecha_fin'];
    $tarifa_fin = $data['tarifa_fin'];
    $estado = $data['estado'];
    
    $sql = "UPDATE tupatineta.servicio  SET id_tipo_servicio = '$id_tipo_servicio' , id_usuario = '$id_usuario', fecha_inicio = '$fecha_inicio', fecha_fin = '$fecha_fin', tarifa_fin = '$tarifa_fin', estado = '$estado' WHERE id_servicio = '$id_servicio'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Registro actualizado con exito"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function delete_servicio($conn) {
    // Obtener el id_servicio de la URL
    if (!isset($_GET['id_servicio'])) {
        echo json_encode(["error" => "Id_servicio no proporcionado"]);
        return;
    }

    $id_servicio = intval($_GET['id_servicio']);
    $sql = "DELETE FROM tupatineta.servicio WHERE id_servicio = '$id_servicio'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "registro eliminado con exito" ]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}



?>

 

