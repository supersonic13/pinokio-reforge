const path = require('path')
const execSync = require('child_process').execSync
module.exports = {
  version: "1.2",
  title: "Re-Forge",
  description: "Stable Diffusion WebUI Forge is a platform on top of Stable Diffusion WebUI (based on Gradio) to make development easier, optimize resource management, and speed up inference. https://github.com/Panchovix/stable-diffusion-webui-reForge",
  icon: "icon.jpeg",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "venv")
    let installing = kernel.running(__dirname, "install.js")
    if (installing) {
      return [{ icon: "fa-solid fa-plug", text: "Installing", href: "install.js" }]
    } else if (installed) {
      let running = kernel.running(__dirname, "start.js")
      let arr
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          arr = [{
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url
          }, {
            icon: "fa-solid fa-desktop",
            text: "Terminal",
            href: "start.js"
          }]
        } else {
          arr = [{
            icon: "fa-solid fa-desktop",
            text: "Terminal",
            href: "start.js"
          }]
        }
      } else {
        arr = [{
          icon: "fa-solid fa-rocket",
          text: "Start",
          href: "start.js"
        }]
      }
      arr = arr.concat([{
        icon: "fa-solid fa-download",
        text: "Download Models",
        menu: [
          { text: "Download by URL", icon: "fa-solid fa-download", href: "download.html?raw=true" },
          { text: "SDXL", icon: "fa-solid fa-download", href: "download-sdxl.json", mode: "refresh" },
          { text: "SDXL Turbo", icon: "fa-solid fa-download", href: "download-turbo.json", mode: "refresh" },
          { text: "Stable Video XT 1.1", icon: "fa-solid fa-download", href: "download-svd-xt-1.1.json", mode: "refresh" },
          { text: "Stable Video XT", icon: "fa-solid fa-download", href: "download-svd-xt.json", mode: "refresh" },
          { text: "Stable Video", icon: "fa-solid fa-download", href: "download-svd.json", mode: "refresh" },
          { text: "LCM LoRA", icon: "fa-solid fa-download", href: "download-lcm-lora.json", mode: "refresh" },
          { text: "SD 1.5", icon: "fa-solid fa-download", href: "download-sd15.json", mode: "refresh" },
          { text: "SD 2.1", icon: "fa-solid fa-download", href: "download-sd21.json", mode: "refresh" },
        ]
      }, {
        icon: "fa-solid fa-rotate", text: "Update", href: "update.json"
      }, {
        icon: "fa-solid fa-plug", text: "Reinstall", href: "install.js"
      }])
      if (!running) {
        arr.push({
          icon: "fa-solid fa-circle-xmark", text: "Reset", href: "reset.json", confirm: "Are you sure you wish to reset the app?"
        })
      }
      return arr
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }, {
        icon: "fa-solid fa-rotate",
        text: "Update",
        href: "update.json"
      }]
    }
  }
}
