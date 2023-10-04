// content scripts has been injected
console.log("Injected!!!");

const fetchBlob = async (url) => {
	const response = await fetch(url);
	const blob = await response.blob();
	const base64 = await convertBlobToBase64(blob);

	return base64;
};

const convertBlobToBase64 = (blob) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			const base64data = reader.result;

			resolve(base64data);
		};
	});
};

// the object responsible fo recording the screen
var recorder = null;

// starts recording when access has been approved
const onAccessApproved = (stream) => {
	recorder = new MediaRecorder(stream);
	const chunks = [];
	recorder.start();

	// stops recording when the function is called
	recorder.onstop = function () {
		stream.getTracks().forEach((track) => {
			if (track.readyState === "live") {
				track.stop();
			}
		});
	};

	// we handle the recorded data and covert it from a blob to base64 for easy storage
	recorder.ondataavailable = async function (event) {
		// chunks.push(event.data);
		let recordedBlob = event.data;
		let url = URL.createObjectURL(recordedBlob);

		let a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = "screen_recording.webm";
		document.body.appendChild(a);

		a.click();
		document.body.removeChild(a);

		URL.revokeObjectURL(url);

		// if (event.data.size > 0) {
		// 	const blobFile = new Blob(event.data, { type: "video/webm" });
		// 	const base64 = await fetchBlob(URL.createObjectURL(blobFile));

		// 	// if we actually have a video, send it to the backend after it has been converted to a blob
		// 	sendChunkToBackend(base64);
		// }
	};
};

const sendChunkToBackend = (chunkData) => {
	console.log("video", chunkData);

	// const backendEndpoint = "";

	// fetch(backendEndpoint, {
	// 	method: "POST",
	// 	body: JSON.stringify({ chunkData }), // Send the chunk data in the request body
	// 	headers: {
	// 		"Content-Type": "application/json", // Adjust the content type as needed
	// 	},
	// })
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			throw new Error("Network response was not ok");
	// 		}
	// 		return response.json(); // Parse the response if it's JSON
	// 	})
	// 	.then((data) => {
	// 		// Handle the response from the backend as needed
	// 		console.log("Backend Response:", data);
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error sending chunk to the backend:", error);
	// 	});
};

// listens for when the record button is click and a recording request is sent
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "request_recording") {
		console.log("requesting recording...");
		sendResponse(`processed ${message.action}`);

		navigator.mediaDevices
			.getDisplayMedia({
				audio: true,
				video: {
					width: 99999999999,
					height: 99999999999,
				},
			})
			.then((stream) => {
				onAccessApproved(stream);
			});
	}
});
