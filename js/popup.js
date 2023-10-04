document.addEventListener("DOMContentLoaded", () => {
	const startRecordingButton = document.querySelector("#start_recording");
	const cameraToggle = document.querySelector("#camera_toggle");
	const audioToggle = document.querySelector("#audio_toggle");
	const closeButton = document.querySelector("#close_button");

	closeButton.addEventListener("click", () => {
		window.close();
	});

	startRecordingButton.addEventListener("click", () => {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ action: "request_recording" },
					function (response) {
						if (!chrome.runtime.lastError) {
							console.log(response);
						} else {
							console.log(
								chrome.runtime.lastError,
								"error line 14"
							);
						}
					}
				);
			}
		);
	});
});
