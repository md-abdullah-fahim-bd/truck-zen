# Truck Zen

A relaxing truck driving simulator inspired by Slow Roads, featuring endless procedurally generated roads, PWA support, and offline play. Built with HTML5, JavaScript, and Three.js.

## Features
- Drive a truck on an infinite, procedurally generated road.
- Dynamic weather (sunny, rainy, night) via a dropdown menu.
- Simple controls: WASD or arrow keys to drive, R to reset.
- PWA-enabled: Install on mobile devices with an offline mode.
- Hosted on GitHub Pages for easy access.

## Setup
1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd truck-zen
   ```

2. **Add an Icon**:
   - Create a `truck-icon.png` (192x192 and 512x512) and place it in the project root.

3. **Deploy to GitHub Pages**:
   - Push the files to a GitHub repository.
   - Enable GitHub Pages in the repository settings (use the `main` branch).
   - Access the game at `https://<your-username>.github.io/<repo-name>`.

4. **Local Development**:
   - Install Node.js and run `npm install -g http-server`.
   - Start a local server: `http-server -p 8080`.
   - Open `http://localhost:8080` in your browser.

## Controls
- **WASD or Arrow Keys**: Accelerate, brake, steer.
- **R**: Reset truck position.
- **Weather Dropdown**: Change to sunny, rainy, or night.

## PWA and Offline Play
- The game is a Progressive Web App (PWA) with a `manifest.json` and `service-worker.js`.
- On mobile devices, a prompt appears to install the app.
- Assets are cached for offline play (requires HTTPS).

## Enhancements
To improve the game, consider:
- **3D Models**: Replace the box truck with a detailed model (e.g., GLTF format).
- **Traffic and Cities**: Add AI-controlled vehicles and urban environments using Three.js meshes.
- **Pedestrians**: Implement animated pedestrian models with pathfinding.
- **Traffic Lights**: Add signal logic to control traffic flow.
- **Gamepad Support**: Use the Gamepad API for controller input.
- **Advanced Terrain**: Use heightmaps or Simplex noise for more complex landscapes.
- **Sound**: Add engine sounds and ambient music (use Howler.js).
- **Performance**: Optimize with LOD (Level of Detail) for distant objects.
- **Multiplayer**: Integrate WebSocket for shared driving sessions.

## License
MIT License