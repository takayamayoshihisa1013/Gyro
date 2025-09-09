const output = document.getElementById("output"); // 表示用のdiv
    const startBtn = document.getElementById("startBtn"); // ボタン

    // 出力を画面とコンソールに両方出す関数
    function log(message) {
      console.log(message); // デベロッパーツールに表示
      output.innerHTML += `<div>${message}</div>`; // 画面に追記表示
    }

    // ユーザーからセンサー利用の許可をもらい、イベントを登録する関数
    function requestPermission() {
      log("requestPermission 呼び出し"); // 呼ばれたことを表示

      // iOS Safari では requestPermission が必須
      if (typeof DeviceMotionEvent !== "undefined" &&
          typeof DeviceMotionEvent.requestPermission === "function") {
        
        // iOS: 許可を求める
        DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            log("permissionState: " + permissionState); // 許可/拒否の状態を表示

            if (permissionState === "granted") {
              // 許可されたら devicemotion イベントを監視
              window.addEventListener("devicemotion", handleMotion);
              log("イベントリスナー登録 (iOS)");
            } else {
              log("センサー利用が拒否されました");
            }
          })
          .catch(err => log("エラー: " + err)); // 許可処理でエラーが出たとき
      } else {
        // Android Chrome 等では requestPermission は不要
        window.addEventListener("devicemotion", handleMotion);
        log("イベントリスナー登録 (Android/PC)");
      }
    }

    // 加速度センサーの値を処理する関数
    function handleMotion(event) {
      // accelerationIncludingGravity = 重力を含めた加速度 [m/s^2]
      const acc = event.accelerationIncludingGravity;

      if (acc) {
        // X, Y, Z の値を少数2桁に丸める
        const x = acc.x?.toFixed(2);
        const y = acc.y?.toFixed(2);
        const z = acc.z?.toFixed(2);

        // 画面に加速度を表示
        output.innerHTML = `
          加速度:<br>
          X: ${x}<br>
          Y: ${y}<br>
          Z: ${z}`;
      } else {
        // 端末によっては null が返ることもある
        log("accelerationIncludingGravity が null");
      }
    }

    // ボタンが押されたらセンサー利用を開始する
    startBtn.addEventListener("click", requestPermission);