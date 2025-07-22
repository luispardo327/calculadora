// main.js

// Función para manejar la entrada de números y operadores en la pantalla
function result(val) {
    const display = document.getElementById('result');
    const currentValue = display.value;

    // Si el display está en '0' y no se presiona '.', se reemplaza el '0'
    // Esto evita tener un '0' inicial antes de un número.
    if (currentValue === '0' && val !== '.') {
        display.value = val;
    } else {
        // Evita múltiples puntos decimales en un mismo número
        if (val === '.' && currentValue.includes('.')) {
            return; // No hacer nada si ya hay un punto
        }
        // Evita que un operador se repita si el último caracter es un operador
        const lastChar = currentValue[currentValue.length - 1];
        if (['+', '-', '*', '/'].includes(val) && ['+', '-', '*', '/'].includes(lastChar)) {
            // Reemplaza el operador anterior por el nuevo si ya hay uno
            display.value = currentValue.slice(0, -1) + val;
            return;
        }
        // Si el resultado anterior fue un error, reinicia
        if (currentValue === 'Error') {
            display.value = val;
        } else {
            display.value += val;
        }
    }
}

// Función para evaluar la expresión en la pantalla
function equal() {
    let x = document.getElementById('result').value;
    try {
        // Evalúa la expresión. Aquí se puede añadir lógica para el '%'
        // Si la expresión termina en '%', la convierte a /100
        if (x.endsWith('%')) {
            x = x.slice(0, -1) / 100;
        }

        let y = eval(x);
        // Si el resultado es infinito o NaN (ej. 5/0), muestra "Error"
        if (!isFinite(y) || isNaN(y)) {
            document.getElementById('result').value = 'Error';
        } else {
            document.getElementById('result').value = y;
        }
    } catch (e) {
        // Captura cualquier error en la evaluación (ej. sintaxis inválida)
        document.getElementById('result').value = 'Error';
    }
}

// Función para limpiar la pantalla de la calculadora
function clearResult() {
    document.getElementById('result').value = '0'; // Vuelve a '0' en lugar de vacío
}

// Nueva función para cambiar el signo del número actual
function toggleSign() {
    const display = document.getElementById('result');
    let currentValue = display.value;

    // Solo si el valor actual es un número y no es '0' o 'Error'
    if (!isNaN(currentValue) && currentValue !== '' && currentValue !== '0' && currentValue !== 'Error') {
        display.value = -parseFloat(currentValue);
    } else if (currentValue === '0') {
        // Si es '0', al aplicar +/- se mantiene '0'
        display.value = '0';
    }
    // Para casos más complejos (ej. expresiones "5+3"), esta lógica sería más avanzada.
    // Para una calculadora básica, solo afecta al número actual si es el único en pantalla.
}

// Asegúrate de que al cargar la página, el display muestre '0'
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('result').value = '0';
});