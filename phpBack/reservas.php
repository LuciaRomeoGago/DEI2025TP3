<?php
header('Content-Type: application/json');
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombreAlumno = trim($_POST['alumno'] ?? '');
    $emailAlumno = trim($_POST['email'] ?? '');
    $fecha = trim($_POST['fecha'] ?? '');
    $hora = trim($_POST['hora'] ?? '');
    $profesor_id = intval($_POST['profesor_id'] ?? 0);
    $materia_id = intval($_POST['materia_id'] ?? 0);

    if (!$nombreAlumno || !$emailAlumno || !$fecha || !$hora || !$profesor_id || !$materia_id) {
        echo json_encode(['success' => false, 'msg' => 'Faltan datos']);
        exit;
    }

    // Buscar o crear alumno
    $stmt = $conn->prepare("SELECT id FROM alumno WHERE nombre = ? AND email = ?");
    $stmt->bind_param("ss", $nombreAlumno, $emailAlumno);
    $stmt->execute();
    $stmt->bind_result($alumno_id);
    if (!$stmt->fetch()) {
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO alumno (nombre, email, telefono) VALUES (?, ?, 0)"); // Ajusta teléfono si quieres
        $stmt->bind_param("ss", $nombreAlumno, $emailAlumno);
        if (!$stmt->execute()) {
            echo json_encode(['success' => false, 'msg' => 'Error al crear alumno']);
            exit;
        }
        $alumno_id = $stmt->insert_id;
    }
    $stmt->close();

    // Verificar disponibilidad
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

    // Insertar reserva
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
