Ambiently — Discover and stream ambient soundscapes powered by the Freesound API.

SUMMARY:
As a studier, background noise is essential for focus.
YouTube ambient videos work — but they're clunky, ad-laden, and not customizable.
So I built a clean, dedicated app to host curated Sound Environments — no distractions.

FEATURES:

1. Hosts 8 curated relaxing soundscapes to study/relax to. Each sound environment features a looped audio track.
2. Sleep Timer feature lets the user control a Timer function to stop the Audio player after it is finished.
3. Filter each sound by keyword.
4. Search page gives you access to a paginated list of all the sounds on FreeSound API, also with a filter function. After previewing a sound, you can save it in session to the homepage and it becomes another SoundEnvironment.

TECH STACK:

1. React/React-Router
2. Freesound public API

INSTALLATION:
git clone https://github.com/ATMPorkandBeans-code/ambiently.git
cd ambiently
npm install
npm start

API KEY SETUP:

1. Get a free API key at freesound.org/apiv2/apply
2. Create a .env file in the root of the project
3. Add: REACT_APP_FREESOUND_API_KEY=your_key_here

HOW IT WORKS:
Explore the sound environments from the Home page and click on each to play and set a Timer. About section provides a brief explanation of the App, and the Search page gives the user access to all of the Freesound API resources. Each sound from the Search page can be previewed and saved to the Home page as a new Sound Environment.
