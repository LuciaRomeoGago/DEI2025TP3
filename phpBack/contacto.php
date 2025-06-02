<?php
header('Content-Type: application/json');
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir datos del formulario
    $nombreAlumno = trim($_POST['alumno'] ?? '');
    $emailAlumno = trim($_POST['email'] ?? '');
    $fecha = trim($_POST['fecha'] ?? '');
    $hora = trim($_POST['hora'] ?? '');
    $nombreProfesor = trim($_POST['profesor'] ?? '');
    $materia = trim($_POST['materia'] ?? '');

    // Validación básica
    if (!$nombreAlumno || !$emailAlumno || !$fecha || !$hora || !$nombreProfesor || !$materia) {
        echo json_encode(['success' => false, 'msg' => 'Faltan datos']);
        exit;
    }

    // 1. Buscar o crear alumno
    $stmt = $conn->prepare("SELECT id FROM alumno WHERE nombre = ? AND email = ?");
    $stmt->bind_param("ss", $nombreAlumno, $emailAlumno);
    $stmt->execute();
    $stmt->bind_result($alumno_id);
    if (!$stmt->fetch()) {
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO alumno (nombre, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombreAlumno, $emailAlumno);
        $stmt->execute();
        $alumno_id = $stmt->insert_id;
    }
    $stmt->close();

    // 2. Buscar profesor por nombre
    $stmt = $conn->prepare("SELECT id FROM profesor WHERE nombre = ?");
    $stmt->bind_param("s", $nombreProfesor);
    $stmt->execute();
    $stmt->bind_result($profesor_id);
    if (!$stmt->fetch()) {
        echo json_encode(['success' => false, 'msg' => 'Profesor no encontrado']);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();

    // 3. Buscar materia por nombre
    $stmt = $conn->prepare("SELECT id FROM materia WHERE nombre = ?");
    $stmt->bind_param("s", $materia);
    $stmt->execute();
    $stmt->bind_result($materia_id);
    if (!$stmt->fetch()) {
        echo json_encode(['success' => false, 'msg' => 'Materia no encontrada']);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();

    // 4. Verificar disponibilidad
    $stmt = $conn->prepare("SELECT COUNT(*) FROM reserva WHERE profesor_id = ? AND fecha = ? AND hora = ?");
    $stmt->bind_param("iss", $profesor_id, $fecha, $hora);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        echo json_encode(['success' => false, 'msg' => 'Horario ya reservado, elige otro']);
        $conn->close();
        exit;
    }

    // 5. Insertar reserva
    $stmt = $conn->prepare("INSERT INTO reserva (alumno_id, profesor_id, materia_id, fecha, hora, estado) VALUES (?, ?, ?, ?, ?, 'pendiente')");
    $stmt->bind_param("iiiss", $alumno_id, $profesor_id, $materia_id, $fecha, $hora);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'msg' => 'Reserva confirmada']);
    } else {
        echo json_encode(['success' => false, 'msg' => 'Error al guardar la reserva']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'msg' => 'Método no permitido']);
}
?>
