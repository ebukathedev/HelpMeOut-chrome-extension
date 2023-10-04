document.addEventListener("DOMContentLoaded", () => {
	const startRecordingButton = document.querySelector("#start_recording");
	const cameraToggle = document.querySelector("#camera_toggle");
	const audioToggle = document.querySelector("#audio_toggle");
	const closeButton = document.querySelector("#close_button");
	const tabScreen = document.querySelector("#tab_screen");
	const fullScreen = document.querySelector("#full_screen");

	let isCurrentTab = true;
	const tabScreenClasses = tabScreen.classList;
	const fullScreenClasses = fullScreen.classList;

	tabScreen.addEventListener("click", () => {
		if (!isCurrentTab && !tabScreenClasses.contains("active")) {
			tabScreenClasses.add("active");
			fullScreenClasses.remove("active");
			isCurrentTab = true;
			console.log(tabScreenClasses);
		}
	});

	fullScreen.addEventListener("click", () => {
		if (isCurrentTab && !fullScreenClasses.contains("active")) {
			fullScreenClasses.add("active");
			tabScreenClasses.remove("active");
			isCurrentTab = false;
			console.log(fullScreenClasses);
		}
	});

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
							console.log(chrome.runtime.lastError.message);
						}
					}
				);
			}
		);
	});

	;

});
