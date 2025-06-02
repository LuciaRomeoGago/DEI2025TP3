<?php
header('Content-Type: application/json');
include 'conexion.php';

$sql = "SELECT p.id AS profesor_id, p.nombre AS profesor_nombre, m.id AS materia_id, m.nombre AS materia_nombre
        FROM profesor p
        JOIN profesor_materia pm ON p.id = pm.profesor_id
        JOIN materia m ON pm.materia_id = m.id
        ORDER BY p.nombre";

$result = $conn->query($sql);

$profesores = [];
while ($row = $result->fetch_assoc()) {
    $profId = $row['profesor_id'];
    if (!isset($profesores[$profId])) {
        $profesores[$profId] = [
            'id' => $profId,
            'nombre' => $row['profesor_nombre'],
            'materias' => []
        ];
    }
    $profesores[$profId]['materias'][] = [
        'id' => $row['materia_id'],
        'nombre' => $row['materia_nombre']
    ];
}

$conn->close();

// Reindexar para enviar array simple
echo json_encode(array_values($profesores));
