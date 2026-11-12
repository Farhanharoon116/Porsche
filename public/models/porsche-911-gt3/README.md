# Porsche 911 GT3 - 3D Model Directory

Place your 3D model files in this directory. The system will automatically detect and load them.

## Supported File Formats
- `.glb` (recommended - binary glTF)
- `.gltf` (glTF with external resources)

## Expected File Name
The system looks for any of:
- `scene.glb`
- `porsche-911-gt3.glb`
- `model.glb`

If multiple files are present, the system will pick the first `.glb` or `.gltf` file found.

## How to Upload
1. Upload your `.glb` file directly into this directory: `/public/models/porsche-911-gt3/`
2. The website's Portfolio section will automatically render your 3D model
3. If no model is present, the system will show a stylish fallback 3D representation of the 911 GT3

## Recommended Model Specs
- Format: glTF 2.0 (.glb)
- Polygon count: 50k - 500k triangles for smooth web rendering
- Textures: Bake textures, use KTX2 compression if possible
- Size: Under 20MB for fast loading
- Origin: Centered at the model's geometric center
- Rotation: Model facing forward (-Z direction in glTF convention)
