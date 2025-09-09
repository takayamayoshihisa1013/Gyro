const output = document.getElementById("output");

function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then(PermissionStatus => {
                if (PermissionStatus == "granted") {
                    window.addEventListener("devicemotion", handleMotion);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("devicemotion", handleMotion)
    }
}

function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (acc) {
        const x = acc.x?.toFixed(2);
        const y = acc.y?.toFixed(2);
        const z = acc.z?.toFixed(2);

        output.innerHTML = `加速度<br>
        X: ${x}<br>
        Y: ${y}<br>
        Z: ${z}`;

        // 簡単な「振った」判定
        const threshold = 15; // 加速度のしきい値
        if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
            output.innerHTML += "<br><b>振った！</b>";
        }
    }
}