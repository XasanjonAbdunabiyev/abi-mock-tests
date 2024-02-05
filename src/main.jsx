import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { QueryProvider } from '@/services/providers/QueryProvider.jsx'
import { UiProvider } from '@/services/providers/UiProvider.jsx'

import StepperContextProvider from './contexts/StepperContext.jsx'
import SpeakingAudioContextProvider from './contexts/SpeakingAudioContext.jsx'

const container = document.getElementById('root')

ReactDOM.createRoot(container).render(
	<UiProvider>
		<QueryProvider>
			<SpeakingAudioContextProvider>
				<StepperContextProvider>
					<App />
				</StepperContextProvider>
			</SpeakingAudioContextProvider>
		</QueryProvider>
	</UiProvider>
)
