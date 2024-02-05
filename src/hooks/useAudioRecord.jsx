import { create } from 'zustand'

const useAudioRecorder = create((set) => ({
	isRecording: false,
	blobObject: null,
	startRecording: () => set({ isRecording: true }),
	stopRecording: (recordedBlob) =>
		set({ isRecording: false, blobObject: recordedBlob }),
	downloadAudio: () => {
		set((state) => {
			const { blobObject } = state
			if (blobObject) {
				const url = URL.createObjectURL(blobObject.blob)
				const a = document.createElement('a')
				document.body.appendChild(a)
				a.style = 'display: none'
				a.href = url
				a.download = 'recorded_audio.wav'
				a.click()
				window.URL.revokeObjectURL(url)
				document.body.removeChild(a)
			}
		})
	},
}))

export default useAudioRecorder
