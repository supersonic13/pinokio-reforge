module.exports = async (kernel) => {
  let script = {
    run: [{
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/Panchovix/stable-diffusion-webui-reForge.git app",
        ]
      }
    }, {
      method: "fs.share",
      params: {
        drive: {
          checkpoints: "app/models/Stable-diffusion",
          vae: "app/models/VAE",
          loras: [
            "app/models/Lora",
            "app/models/LyCORIS"
          ],
          upscale_models: [
            "app/models/ESRGAN",
            "app/models/RealESRGAN",
            "app/models/SwinIR"
          ],
          embeddings: "app/embeddings",
          hypernetworks: "app/models/hypernetworks",
          controlnet: "app/models/ControlNet",
          ControlNetPreprocessor: "app/models/ControlNetPreprocessor",
          adetailer: "app/models/adetailer",
          vae_approx: "app/models/VAE-approx",
          diffusers: "app/models/diffusers",
          insightface: "app/models/insightface",
          z123: "app/models/z123",
          svd: "app/models/svd"
        },
        peers: [
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
		      "https://github.com/cocktailpeanutlabs/forge.git",
        ]
      }
    }, {
      method: "fs.share",
      params: {
        drive: {
          outputs: "app/output"
        }
      }
    }, {
      method: "self.set",
      params: {
        "app/ui-config.json": {
          "txt2img/Sampling steps/value": 35,
          "txt2img/CFG Scale/value": 7
        }
      }
    }, 
    {
      method: "shell.run",
      params: {
        message: "{{platform === 'win32' ? 'webui-user.bat' : 'bash webui.sh -f'}}",
        env: {
          SD_WEBUI_RESTARTING: 1,
        },
        path: "app",
        on: [{ "event": "/http:\/\/[0-9.:]+/", "kill": true }]
      }
    }, {
      method: "notify",
      params: {
        html: "Click the 'start' tab to launch the app"
      }
    }]
  }
  if (kernel.platform === 'darwin') {
    script.requires = [{
      platform: "darwin",
      type: "conda",
      name: ["cmake", "protobuf", "rust", "wget"],
      args: "-c conda-forge"
    }]
  }
  return script
}
